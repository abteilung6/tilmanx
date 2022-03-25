from django.db import models
from django.contrib.auth.models import User

from chat.enum import FriendshipStatus


class Friendship(models.Model):
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['requester', 'addressee'], name="%(app_label)s_%(class)s_unique")
        ]

    requester = models.ForeignKey(User, on_delete=models.CASCADE, related_name='requester_friendships')
    addressee = models.ForeignKey(User, on_delete=models.CASCADE, related_name='addressee_friendships')
    offered_at = models.DateTimeField(auto_now_add=True)
    accepted_at = models.DateTimeField(null=True, blank=True, default=None)
    updated_at = models.DateTimeField(auto_now=True)

    @property
    def status(self) -> FriendshipStatus:
        if self.accepted_at:
            return FriendshipStatus.ACCEPTED
        else:
            return FriendshipStatus.OFFERED
