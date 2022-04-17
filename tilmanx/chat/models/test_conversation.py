from django.contrib.auth.models import User
from django.test import TestCase

from chat.enum import ConversationType
from chat.models import Conversation, Participant


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
