from typing import Optional

from django.contrib.auth.models import User
from django.test import TestCase

from chat.enum import ConversationType
from chat.models import Conversation, Participant
from chat.serializers import MessageSerializer


class TestMessageSerializer(TestCase):
    def setUp(self):
        self.sender = User.objects.create(username='username')
        self.conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.sender
        )
        self.required_data = {
            'sender': self.sender.id,
            'conversation': self.conversation.id,
            'message': 'text'
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        Participant.objects.create(conversation=self.conversation, user=self.sender)
        # Act && Assert
        self._check_create(data, True, expected_sender=self.sender, expected_conversation=self.conversation)
        self._check_create({**data, **{"sender": None}}, False)
        self._check_create({**data, **{"sender": -1}}, False)
        self._check_create({**data, **{"conversation": None}}, False)
        self._check_create({**data, **{"conversation": -1}}, False)
        self._check_create({**data, **{"message": None}}, False)

    def test_create_as_non_participant(self):
        # Arrange
        data = self.required_data.copy()
        self._check_create(data, False)

    def _check_create(
            self, data: dict, expected: bool,
            expected_sender: Optional[User] = None, expected_conversation: Optional[Conversation] = None
    ):
        with self.subTest(data=data, expected=expected):
            # Act
            serializer = MessageSerializer(data=data)
            # Assert
            self.assertEqual(serializer.is_valid(), expected, msg=serializer.errors)
            if expected:
                message = serializer.save()
                if expected_sender:
                    self.assertEqual(message.sender, expected_sender)
                if expected_conversation:
                    self.assertEqual(message.conversation, expected_conversation)
                # Clean
                message.delete()
