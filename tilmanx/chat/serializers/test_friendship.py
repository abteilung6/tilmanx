from datetime import datetime
from typing import Optional

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone

from chat.enum import FriendshipStatus
from chat.models import Friendship
from chat.serializers import FriendshipSerializer


class TestFriendshipSerializer(TestCase):
    def setUp(self):
        self.requester = User.objects.create(username='requester')
        self.addressee = User.objects.create(username='addressee')
        self.required_data = {
            'addressee_id': self.addressee.id,
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        # Act
        serializer = FriendshipSerializer(data=data, context={'user': self.requester})
        # Assert
        self.assertEqual(serializer.is_valid(), True, msg=serializer.errors)
        friendship: Friendship = serializer.save()
        self.assertEqual(friendship.requester, self.requester)
        self.assertEqual(friendship.addressee, self.addressee)
        self.assertEqual(friendship.status, FriendshipStatus.OFFERED)

    def test_create_with_existing_forward_friendship(self):
        date = datetime(2022, 12, 24, 0, 0, 0, 0, timezone.utc)
        self._check_create_with_existing_friendship(self.requester, self.addressee, date, None, False)
        self._check_create_with_existing_friendship(self.requester, self.addressee, date, date, False)
        self._check_create_with_existing_friendship(self.requester, self.addressee, date, date, True)
        self._check_create_with_existing_friendship(self.requester, self.addressee, date, None, True)

    def _check_create_with_existing_friendship(
            self, requester: User, addressee: User, offered_at: datetime, accepted_at: Optional[datetime],
            _reversed: bool, expected: bool = False
    ):
        # Arrange
        data = self.required_data.copy()
        friendship = Friendship.objects.create(
            requester=addressee if _reversed else requester,
            addressee=requester if _reversed else addressee,
            offered_at=offered_at, accepted_at=accepted_at
        )
        # Act
        serializer = FriendshipSerializer(data=data, context={'user': requester})
        # Assert
        with self.subTest(
                requester=requester, addressee=addressee, offered_at=friendship.offered_at, accepted_at=accepted_at
        ):
            self.assertEqual(serializer.is_valid(), expected, msg=serializer.errors)
        # Clean
        friendship.delete()
