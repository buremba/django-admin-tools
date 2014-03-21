from django.contrib.admin import options
from django.db.models import DateTimeField, ImageField, DateField
from admin_tools.widgets import AdminSplitDateUITime, AdvancedFileInput, AdminDateUIWidget

options.FORMFIELD_FOR_DBFIELD_DEFAULTS[DateTimeField]['widget'] = AdminSplitDateUITime
options.FORMFIELD_FOR_DBFIELD_DEFAULTS[DateField]['widget'] = AdminDateUIWidget
options.FORMFIELD_FOR_DBFIELD_DEFAULTS[ImageField] = {'widget': AdvancedFileInput}