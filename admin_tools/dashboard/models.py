"""
This module contains the base classes for the dashboard and dashboard modules.
"""
from django.conf import settings
from django.db import models

user_model = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')


class DashboardPreferences(models.Model):
    """
    This model represents the dashboard preferences for a user.
    """
    user = models.ForeignKey(user_model)
    data = models.TextField()
    dashboard_id = models.CharField(max_length=100)

    def __unicode__(self):
        return "%s dashboard preferences" % self.user.username

    class Meta:
        db_table = 'admin_tools_dashboard_preferences'
        unique_together = ('user', 'dashboard_id',)
        ordering = ('user',)