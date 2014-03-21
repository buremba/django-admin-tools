from django.conf import settings

try:
    from django.conf.urls import patterns, url, include
except ImportError: # django < 1.4
    from django.conf.urls.defaults import patterns, url, include

urls = []
if 'admin_tools.dashboard' in settings.INSTALLED_APPS:
    urls.append(url(r'^dashboard/', include('admin_tools.dashboard.urls')))
if 'admin_tools.theming' in settings.INSTALLED_APPS:
    urls.append(url(r'^search/', 'admin_tools.views.search', name="admin_tools_quick_search"))

urlpatterns = patterns('', *urls)
