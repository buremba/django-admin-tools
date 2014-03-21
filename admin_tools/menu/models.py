"""
This module contains the base classes for menu and menu items.
"""
from django.conf import settings
from django.db import models

user_model = getattr(settings, 'AUTH_USER_MODEL', 'auth.User')