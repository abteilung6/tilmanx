"""
ASGI config for tilmanx project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.0/howto/deployment/asgi/
"""

import os

from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from django.urls import re_path

from chat.consumers import ChatConsumer
from chat.middleware import TokenAuthMiddleware

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tilmanx.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    # Just HTTP for now. (We can add other protocols later.)
    "websocket": TokenAuthMiddleware(
        URLRouter(
            [
                re_path(r"lobby$", ChatConsumer.as_asgi()),
            ]
        )
    ),
})
