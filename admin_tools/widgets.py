from django import forms
from django.utils.html import format_html
from django.utils.translation import ugettext as _


class AdminDateUIWidget(forms.DateInput):
    @property
    def media(self):
        js = ["jquery-ui/js/jquery-ui-1.10.3.custom.min.js", "widget/js/date.js"]
        css = {'screen': ('jquery-ui/css/flick/jquery-ui-1.10.3.custom.min.css',), }
        return forms.Media(js=js, css=css)

    def __init__(self, attrs=None, format=None):
        final_attrs = {'class': 'datepickerfield', 'size': '12'}
        if attrs is not None:
            final_attrs.update(attrs)
        return super(AdminDateUIWidget, self).__init__(attrs=final_attrs, format=format)


class AdminTimeWidget(forms.TimeInput):
    @property
    def media(self):
        js = ["jquery-ui/js/jquery-ui-1.10.3.custom.min.js", "jquery-ui/js/globalize.js", "jquery-ui/js/jquery.ui.mask.js", "widget/js/time.js"]
        css = {'screen': ('jquery-ui/css/flick/jquery-ui-1.10.3.custom.min.css',), }

        return forms.Media(js=js, css=css)

    def __init__(self, attrs=None, format=None):
        final_attrs = {'class': 'timepickerfield', 'size': '8'}
        if attrs is not None:
            final_attrs.update(attrs)
        super(AdminTimeWidget, self).__init__(attrs=final_attrs, format=format)


class AdminSplitDateUITime(forms.SplitDateTimeWidget):
    """
    A SplitDateTime Widget that has some admin-specific styling.
    """

    def __init__(self, attrs=None, date_format=None, time_format=None):
        widgets = (AdminDateUIWidget(attrs=attrs, format=date_format),
                   AdminTimeWidget(attrs=attrs, format=time_format))
        forms.MultiWidget.__init__(self, widgets, attrs)

    def format_output(self, rendered_widgets):
        return format_html('<p class="datetime">{0} {1} &nbsp; {2} {3}</p>',
                           _('Date:'), rendered_widgets[0],
                           _('Time:'), rendered_widgets[1])


from django.utils.html import escape, conditional_escape
from django.utils.encoding import force_unicode
from django.utils.safestring import mark_safe
from django.forms.widgets import ClearableFileInput, CheckboxInput


class AdvancedFileInput(ClearableFileInput):
    @property
    def media(self):
        js = ["widget/js/file.js"]
        return forms.Media(js=js)

    def __init__(self, *args, **kwargs):

        self.url_length = kwargs.pop('url_length', 30)
        self.preview = kwargs.pop('preview', True)
        self.image_width = kwargs.pop('image_width', 150)
        super(AdvancedFileInput, self).__init__(*args, **kwargs)

    def render(self, name, value, attrs=None, ):

        substitutions = {
            'initial_text': u'Currently',
            'input_text': self.input_text,
            'clear_template': '',
            'clear_checkbox_label': self.clear_checkbox_label,
        }
        template = '<p class="file-input">' + u'%(input)s' + \
                   ('<a href="javascript:FileBrowser.show(\'id_productimage_set-0-image\', \'/admin/filebrowser/browse/?pop=1&dir=images/products\');" class="fb_show"><img src="/static/filebrowser/img/filebrowser_icon_show.gif" alt=""></a><br><img class="preupload_thumbnail" width="%s"></p>' % self.image_width)
        if 'class' in attrs:
            attrs['class'] += ' advancedfileinput'
        else:
            attrs['class'] = 'advancedfileinput'
        substitutions['input'] = super(ClearableFileInput, self).render(name, value, attrs)

        if value and hasattr(value, "url"):

            template = '<p class="file-input"> %(initial_text)s: %(initial)s<span style="display:inline-block;margin-left: 7px;">%(clear_template)s</span> <br>%(input_text)s: %(input)s <br> %(thumbnail)s </p>'
            if self.preview:
                substitutions['initial'] = (u'<a href="{0}">{1}</a>'.format(escape(value.url), '...' + escape(force_unicode(value))[-self.url_length:]))
                substitutions['thumbnail'] = (u'<a href="{0}" target="_blank"><img src="{1}" width="{2}"></a>'.format(escape(value.url), escape(value.url), self.image_width))
            else:
                substitutions['initial'] = (u'<a href="{0}">{1}</a>'.format(escape(value.url), '...' + escape(force_unicode(value))[-self.url_length:]))
            if not self.is_required:
                checkbox_name = self.clear_checkbox_name(name)
                checkbox_id = self.clear_checkbox_id(checkbox_name)
                substitutions['clear_checkbox_name'] = conditional_escape(checkbox_name)
                substitutions['clear_checkbox_id'] = conditional_escape(checkbox_id)
                substitutions['clear'] = CheckboxInput().render(checkbox_name, False, attrs={'id': checkbox_id, 'style': 'margin-top: 2px; margin-left: 1px;'})
                substitutions['clear_template'] = self.template_with_clear % substitutions
        return mark_safe(template % substitutions)