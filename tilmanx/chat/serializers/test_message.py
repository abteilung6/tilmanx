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
            'conversation': self.conversation.id,
            'message': 'text'
        }
        self.context = {
            'sender': self.sender
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        context = self.context.copy()
        Participant.objects.create(conversation=self.conversation, user=self.sender)
        # Act && Assert
        self._check_create(data, context, True, expected_sender=self.sender, expected_conversation=self.conversation)
        self._check_create({**data, **{"conversation": None}}, context, False)
        self._check_create({**data, **{"conversation": -1}}, context, False)
        self._check_create({**data, **{"message": None}}, context, False)
        self._check_create(data, {}, False)

    def test_create_as_non_participant(self):
        # Arrange
        data = self.required_data.copy()
        context = self.context.copy()
        self._check_create(data, context, False)

    def _check_create(
            self, data: dict, context: dict, expected: bool,
            expected_sender: Optional[User] = None, expected_conversation: Optional[Conversation] = None
    ):
        with self.subTest(data=data, context=context, expected=expected):
            # Act
            serializer = MessageSerializer(data=data, context=context)
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
