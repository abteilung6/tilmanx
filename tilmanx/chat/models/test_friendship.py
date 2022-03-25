from datetime import datetime
from typing import Optional

from django.contrib.auth.models import User
from django.db import IntegrityError
from django.test import TestCase
from django.utils import timezone

from chat.enum import FriendshipStatus
from chat.models import Friendship


class TestFriendship(TestCase):
    def setUp(self):
        self.requester = User.objects.create(username='requester')
        self.addressee = User.objects.create(username='addressee')

    def test_status(self):
        # Arrange
        date = datetime(2022, 12, 24, 0, 0, 0, 0, timezone.utc)
        # Act && Assert
        self._check_status( None, FriendshipStatus.OFFERED)
        self._check_status( date, FriendshipStatus.ACCEPTED)

    def _check_status(self, accepted_at: Optional[datetime], expected: FriendshipStatus):
        friendship = Friendship(requester=self.requester, addressee=self.addressee)
        friendship.accepted_at = accepted_at
        with self.subTest(offered_at=friendship.offered_at, accepted_at=accepted_at):
            self.assertEqual(friendship.status, expected)

    def test_unique_constraint(self):
        # Arrange
        Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        # Act && Assert
        self.assertRaises(
            IntegrityError,
            lambda: Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        )

    def test_get_addressee_friendships(self):
        # Arrange
        friendship = Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        # Act
        addressee: User = User.objects.get(addressee_friendships=friendship)
        # Act
        self.assertEqual(addressee.id, self.addressee.id)

    def test_get_requester_friendships(self):
        # Arrange
        friendship = Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        # Act
        requester: User = User.objects.get(requester_friendships=friendship)
        # Assert
        self.assertEqual(requester.id, self.requester.id)
