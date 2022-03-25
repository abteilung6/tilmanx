from tilmanx.settings import BASE_DIR

SECRET_KEY = 'django-insecure-dp026)4)6l715p31dzg7a#sv6oh-%etc7kajz#($y^5yt$!(c5'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# email backend
EMAIL_BACKEND = 'django.core.mail.backends.locmem.EmailBackend'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
