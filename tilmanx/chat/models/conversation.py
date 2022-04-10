from django.db import models
from django.contrib.auth.models import User
from typing import TYPE_CHECKING

from chat.enum import ConversationType

if TYPE_CHECKING:
    from chat.models import Friendship


class Conversation(models.Model):
    type = models.CharField(max_length=48, choices=ConversationType.choices(), default=ConversationType.PRIVATE.value)
    """The type determines weather the conversation is a private or group conversation"""
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
