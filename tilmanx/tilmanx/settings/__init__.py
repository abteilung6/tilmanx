import os

from .base import *
from ..enum import Environment


print(f"ENV_NAME: {os.environ.get('ENV_NAME')}")
if os.environ.get('ENV_NAME') == Environment.PRODUCTION.value:
    from .production import *
    print('Environment: Production')
elif os.environ.get('ENV_NAME') == Environment.STAGING.value:
    from .staging import *
    print('Environment: Staging')
elif os.environ.get('ENV_NAME') == Environment.DEVELOPMENT.value:
    from .development import *
    print('Environment: Development')
elif os.environ.get('ENV_NAME') == Environment.TESTING.value:
    from .testing import *
    print('Environment: Testing')
else:
    # environment not specified
    from .development import *
    print('Environment: Development (Fallback)')
