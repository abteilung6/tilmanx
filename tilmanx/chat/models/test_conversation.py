from unittest import mock

from django.contrib.auth.models import User
from django.test import TestCase
from django.utils import timezone
from django.utils.datetime_safe import datetime

from chat.enum import ConversationType
from chat.models import Conversation, Participant, Message


class TestConversation(TestCase):
    def setUp(self):
        self.first_user = User.objects.create(username='first_user')
        self.second_user = User.objects.create(username='second_user')
        self.third_user = User.objects.create(username='third_user')
        self.fourth_user = User.objects.create(username='fourth_user')

    def test_get_private_conversation_for_users(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        another_conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=another_conversation, user=self.first_user)
        Participant.objects.create(conversation=another_conversation, user=self.third_user)
        # Act
        actual = Conversation.get_private_conversation_for_users(self.first_user, self.second_user)
        another_actual = Conversation.get_private_conversation_for_users(self.first_user, self.third_user)
        unrelated_actual = Conversation.get_private_conversation_for_users(self.first_user, self.fourth_user)
        # Assert
        self.assertEqual(actual.id, conversation.id)
        self.assertEqual(another_actual.id, another_conversation.id)
        self.assertEqual(unrelated_actual, None)

    def test_latest_message(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = datetime(2020, 12, 24, 0, 0, 0, 0, timezone.utc)
            Message.objects.create(conversation=conversation, sender=self.first_user, message="foo1")
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = datetime(2022, 12, 24, 0, 0, 0, 0, timezone.utc)
            latest_message = Message.objects.create(conversation=conversation, sender=self.first_user, message="foo1")
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = datetime(2021, 12, 24, 0, 0, 0, 0, timezone.utc)
            Message.objects.create(conversation=conversation, sender=self.first_user, message="foo1")
        # Act
        actual: Message = conversation.latest_message
        # Assert
        self.assertEqual(actual, latest_message)

    def test_latest_message_at(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        mock_date = datetime(2020, 12, 24, 0, 0, 0, 0, timezone.utc)
        with mock.patch('django.utils.timezone.now') as mock_now:
            mock_now.return_value = mock_date
            Message.objects.create(conversation=conversation, sender=self.first_user, message="foo1")
        # Act
        actual = conversation.latest_message_at
        # Assert
        self.assertEqual(actual, mock_date)
