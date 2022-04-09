from django.db import models
from django.contrib.auth.models import User

from chat.models import Conversation


class Participant(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['conversation', 'user'], name="%(app_label)s_%(class)s_unique")
        ]

    conversation = models.ForeignKey(Conversation, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
