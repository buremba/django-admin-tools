import urllib
from django.contrib import admin
from django.core.urlresolvers import reverse
from django.db import models
from django.http import HttpResponse, HttpResponseRedirect
from django.db.models.fields import FieldDoesNotExist
import operator
from django.shortcuts import render_to_response
from django.template import RequestContext
from django.utils.translation import ugettext as _


def get_search_results(search_fields, queryset, search_term):
    """
    Returns the queryset to implement the search,
    and a boolean indicating if the results may contain duplicates.
    """
    # Apply keyword searches.
    def construct_search(field_name):
        if field_name.startswith('^'):
            return "%s__istartswith" % field_name[1:]
        elif field_name.startswith('='):
            return "%s__iexact" % field_name[1:]
        elif field_name.startswith('@'):
            return "%s__search" % field_name[1:]
        else:
            return "%s__icontains" % field_name

    if search_fields and search_term:
        orm_lookups = [construct_search(str(search_field))
                       for search_field in search_fields]
        for bit in search_term.split():
            or_queries = [models.Q(**{orm_lookup: bit})
                          for orm_lookup in orm_lookups]
            queryset = queryset.filter(reduce(operator.or_, or_queries))

    return queryset


def search(request):
    search_results = []
    total_sum = 0
    error = None
    q = request.GET.get('qs')
    if q is not None:
        for model, model_admin in admin.site._registry.items():
            meta = model._meta
            search_fields = []
            for field_name in model_admin.search_fields:
                try:
                    field = meta.get_field(field_name)
                    if hasattr(field, 'foreign_related_fields') and len(field.foreign_related_fields) > 0:
                        continue
                except FieldDoesNotExist, e:
                    pass
                search_fields.append(field_name)
                
            if len(search_fields):
                results = get_search_results(search_fields, model.objects.all(), q).count()
                total_sum += results
                if results:
                    search_results.append((
                        meta.verbose_name,
                        reverse(
                            'admin:%s_%s_changelist' % (meta.app_label, meta.model_name)) + "?q=%s" % urllib.quote_plus(
                            q),
                        results
                    ))

        if len(search_results) == 1:
            return HttpResponseRedirect(search_results[0][1])
    else:
        error = _('The search parameter is missing.')

    return render_to_response('admin_tools/search_results.html', {"title": _("Quick Search"), "error": error, "sum": total_sum, "results": search_results},
                              context_instance=RequestContext(request))
