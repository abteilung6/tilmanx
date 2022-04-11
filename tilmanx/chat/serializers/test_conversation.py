from typing import Optional

from django.contrib.auth.models import User
from django.test import TestCase

from chat.enum import ConversationType
from chat.models import Conversation
from chat.serializers import ConversationSerializer


class TestConversationSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='username')
        self.required_data = {
            'type': ConversationType.PRIVATE.value
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        context = {
            'creator': self.user
        }
        # Act && Assert
        self._check_create(
            data, context, expected=True, expected_creator=self.user, expected_type=ConversationType.PRIVATE.value
        )
        self._check_create(data, {}, expected=False)
        self._check_create({}, context, expected=False)
        self._check_create(
            {**data, **{'type': ConversationType.GROUP.value}}, context, expected=False
        )

    def _check_create(
            self, data: dict, context: dict, expected: True,
            expected_creator: Optional[User] = None, expected_type: Optional[str] = None
    ):
        with self.subTest(data=data, context=context, expected=expected):
            # Act
            serializer = ConversationSerializer(data=data, context=context)
            # Assert
            self.assertEqual(serializer.is_valid(), expected, msg=serializer.errors)
            if expected:
                conversation: Conversation = serializer.save()
                if expected_creator:
                    self.assertEqual(conversation.creator, expected_creator)
                if expected_type is not None:
                    self.assertEqual(conversation.type, expected_type)

    def test_data(self):
        # Arrange
        conversation = Conversation.objects.create(type=ConversationType.PRIVATE.value, creator=self.user)
        serializer = ConversationSerializer(conversation)
        # Act && Assert
        self.assertEqual(conversation.type, ConversationType.PRIVATE.value)
        self.assertEqual(conversation.creator, self.user)
