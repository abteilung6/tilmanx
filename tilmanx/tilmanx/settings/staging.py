import os
import dj_database_url

from django.core.management.utils import get_random_secret_key

"""
If you don’t set this environment variable, then every time the app is re-deployed, this key will change. 
This can have adverse effects on cookies and will require users to log in again every time this key changes. 
"""
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY", get_random_secret_key())

DEBUG = False

ALLOWED_HOSTS = ['*']

# email backend
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# database
if os.getenv("DATABASE_URL", None) is None:
    raise Exception("DATABASE_URL environment variable not defined")

DATABASES = {
    "default": dj_database_url.parse(os.environ.get("DATABASE_URL")),
}
