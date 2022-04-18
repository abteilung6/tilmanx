from typing import Optional

from django.contrib.auth.models import User
from django.test import TestCase

from chat.enum import ConversationType
from chat.models import Conversation, Participant
from chat.serializers import ConversationSerializer


class TestConversationSerializer(TestCase):
    def setUp(self):
        self.first_user = User.objects.create(
            username='first_user', first_name='first_name1', last_name='last_name1'
        )
        self.second_user = User.objects.create(
            username='second_user', first_name='first_name2', last_name='last_name2'
        )
        self.required_data = {
            'type': ConversationType.PRIVATE.value
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        context = {
            'creator': self.first_user
        }
        # Act && Assert
        self._check_create(
            data, context, expected=True, expected_creator=self.first_user, expected_type=ConversationType.PRIVATE.value
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

    def test_get_addressee(self):
        # Arrange
        conversation = Conversation.objects.create(type=ConversationType.PRIVATE.value, creator=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        context = {
            "user": self.first_user
        }
        # Act
        serializer = ConversationSerializer(conversation, context=context)
        actual = serializer.data
        # Assert
        self.assertEqual(actual["addressee"], f"{self.second_user.first_name} {self.second_user.last_name}")
