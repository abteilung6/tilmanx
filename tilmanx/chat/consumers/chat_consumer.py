import json

from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth.models import User


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        user: User = self.scope["user"]
        await self.channel_layer.group_add(user.username, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code=None):
        user: User = self.scope["user"]
        await self.channel_layer.group_discard(user.username, self.channel_name)

    async def chat_message(self, message: dict):
        await self.send(text_data=json.dumps(message))
