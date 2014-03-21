from django.contrib.admin import ModelAdmin

from django.core.exceptions import ValidationError
from django.db import models
from django.forms import ModelForm

from admin_tools.forms import SortableListForm, SortableChangeList, SortableModelAdminBase


class RichModelAdminForm(ModelForm):
    def clean(self):
        super(RichModelAdminForm, self).clean()


class RichModelAdmin(ModelAdmin):
    def get_form(self, request, obj=None, **kwargs):
        form = super(RichModelAdmin, self).get_form(request, obj, **kwargs)
        if hasattr(self, 'date_range'):
            widget_start = form.base_fields[self.date_range[0]].widget
            if hasattr(widget_start, "widgets"):
                widget_start = widget_start.widgets[0]
            start_id = form.base_fields[self.date_range[0]].creation_counter
            widget_end = form.base_fields[self.date_range[1]].widget
            if hasattr(widget_end, "widgets"):
                widget_end = widget_end.widgets[0]
            end_id = form.base_fields[self.date_range[1]].creation_counter

            widget_start.attrs['class'] += ' daterange'
            widget_start.attrs['data-target'] = end_id
            widget_start.attrs['data-position'] = 'start'
            widget_start.attrs['data-auto'] = start_id

            widget_end.attrs['class'] += ' daterange'
            widget_end.attrs['data-position'] = 'end'
            widget_end.attrs['data-auto'] = end_id
            widget_end.attrs['data-target'] = start_id
        if hasattr(self, 'require_one_of'):
            class Media:
                js = ('admin_tools/js/either_one_selector.js',)

            form.Media = Media
            if not isinstance(self.require_one_of, list):
                self.require_one_of = [self.require_one_of]
            for index, group in enumerate(self.require_one_of):
                for a in group:
                    w = form.base_fields[a].widget
                    if getattr(w, 'widget', False):
                        w = w.widget
                    attrs = w.attrs
                    attrs['class'] = (attrs['class'] if 'class' in attrs else '') + ' require_one_of '
                    attrs['require_one_of_id'] = index
            require_one_of = self.require_one_of

            def form_clean(self):
                cleaned_data = super(self.__class__, self).clean()
                for index, group in enumerate(require_one_of):
                    fields = []
                    for a in group:
                        el = cleaned_data.get(a)
                        if isinstance(el, int):
                            el = str(el)
                        fields.append(True if len(str(el) or '') > 0 and el is not None else False)
                    if fields.count(True) != 1:
                        raise ValidationError("Enter only one of %s." % ", ".join(group))
                return cleaned_data

            form.clean = form_clean

        if hasattr(self, 'only_one_of'):
            class Media:
                js = ('admin_tools/js/either_one_selector.js',)

            form.Media = Media
            if not isinstance(self.only_one_of, list):
                self.only_one_of = [self.only_one_of]
            for index, group in enumerate(self.only_one_of):
                for a in group:
                    w = form.base_fields[a].widget
                    if getattr(w, 'widget', False):
                        w = w.widget
                    attrs = w.attrs
                    attrs['class'] = (attrs['class'] if 'class' in attrs else '') + ' require_one_of '
                    attrs['require_one_of_id'] = index
            require_one_of = self.only_one_of

            def form_clean(self):
                cleaned_data = super(self.__class__, self).clean()
                for index, group in enumerate(require_one_of):
                    fields = []
                    for a in group:
                        el = cleaned_data.get(a)
                        if isinstance(el, int):
                            el = str(el)
                        fields.append(True if len(str(el) or '') > 0 and el is not None else False)
                    if fields.count(True) > 1:
                        raise ValidationError("Enter only one of %s." % ", ".join(group))
                return cleaned_data

            form.clean = form_clean

        return form

    def render_change_form(self, request, context, *args, **kwargs):
        self.change_form_template = 'admin_tools/change_form.html'
        extra = {
            'help_text': "This is a help message. Good luck filling out the form."
        }
        context.update(extra)
        return super(RichModelAdmin, self).render_change_form(request, context, *args, **kwargs)


class SortableModelAdmin(SortableModelAdminBase, ModelAdmin):
    """
    Sortable tabular inline
    """
    list_per_page = 500

    def __init__(self, *args, **kwargs):
        super(SortableModelAdmin, self).__init__(*args, **kwargs)

        self.ordering = (self.sortable,)
        if self.list_display and self.sortable not in self.list_display:
            self.list_display = list(self.list_display) + [self.sortable]

        self.list_editable = self.list_editable or []
        if self.sortable not in self.list_editable:
            self.list_editable = list(self.list_editable) + [self.sortable]

        self.exclude = self.exclude or []
        if self.sortable not in self.exclude:
            self.exclude = list(self.exclude) + [self.sortable]

        self.prepare_form()

    def prepare_form(self):
        """
        Merge originally defined form if any and prepare Meta class widgets
        """
        if not getattr(self.form, 'Meta', None):
            self.form.Meta = SortableListForm.Meta
        if not getattr(self.form.Meta, 'widgets', None):
            self.form.Meta.widgets = {}
        self.form.Meta.widgets[self.sortable] = SortableListForm.Meta.widgets[
            'order']

    def get_changelist(self, request, **kwargs):
        return SortableChangeList

    def save_model(self, request, obj, form, change):
        if not obj.pk:
            max_order = obj.__class__.objects.aggregate(
                models.Max(self.sortable))
            try:
                next_order = max_order['%s__max' % self.sortable] + 1
            except TypeError:
                next_order = 1
            setattr(obj, self.sortable, next_order)
        super(SortableModelAdmin, self).save_model(request, obj, form, change)