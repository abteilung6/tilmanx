from datetime import datetime

from django.core.exceptions import ObjectDoesNotExist
from django.db import models
from django.contrib.auth.models import User
from typing import TYPE_CHECKING, Optional

from chat.enum import ConversationType

if TYPE_CHECKING:
    from chat.models import Friendship, Message


class Conversation(models.Model):
    type = models.CharField(max_length=48, choices=ConversationType.choices(), default=ConversationType.PRIVATE.value)
    """The type determines weather the conversation is a private or group conversation"""
    creator = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def latest_message(self) -> Optional['Message']:
        try:
            return self.message_set.latest('created_at')
        except ObjectDoesNotExist:
            return None

    @property
    def latest_message_at(self) -> Optional[datetime]:
        latest_message = self.latest_message
        if latest_message:
            return latest_message.created_at
        else:
            return None

    @classmethod
    def get_private_conversation_for_users(cls, first_user: User, second_user: User) -> Optional['Conversation']:
        try:
            return cls.objects.filter(
                type=ConversationType.PRIVATE.value, participant__user=first_user
            ).get(participant__user=second_user)
        except cls.DoesNotExist:
            return None
