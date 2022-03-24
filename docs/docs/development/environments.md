---
sidebar_position: 1
---

# Environments

Tilmanx is able to run in following environments

- testing
- development
- staging
- production

## Django

The django runner indicates the environment by the environment variable `ENV_NAME`.

```
export ENV_NAME=testing
export ENV_NAME=development
export ENV_NAME=staging
export ENV_NAME=production
```

Running django test with `python manage.py test` will automatically set the environment variable `ENV_NAME` to `testing`.

If you're using PyCharm, just hit `Edit Configurations` button and set the environment variable
or use `Settings -> Languages & Frameworks -> Django`.
