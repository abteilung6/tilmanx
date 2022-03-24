import os

SECRET_KEY = os.environ['SECRET_KEY']

DEBUG = False

# email backend
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'
