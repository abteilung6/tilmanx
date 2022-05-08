from django.contrib.auth.models import User
from django.test import TestCase

from chat.enum import ConversationType
from chat.models import Conversation, Participant
from chat.serializers import ParticipantSerializer


class TestParticipantSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create(username='username')
        self.conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.user
        )
        self.required_data = {
            'conversation': self.conversation.id,
            'user': self.user.id
        }

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        # Act
        serializer = ParticipantSerializer(data=data)
        # Assert
        self.assertEqual(serializer.is_valid(), True, msg=serializer.errors)
        participant: Participant = serializer.save()
        self.assertEqual(participant.conversation.id, self.conversation.id)
        self.assertEqual(participant.user.id, self.user.id)

    def test_update(self):
        # Arrange
        data = {}
        participant = Participant.objects.create(conversation=self.conversation, user=self.user)
        # Act
        serializer = ParticipantSerializer(participant, data=data)
        # Assert
        self.assertEqual(serializer.is_valid(), True, msg=serializer.errors)
        participant: Participant = serializer.save()
        self.assertEqual(participant.conversation.id, self.conversation.id)
        self.assertEqual(participant.user.id, self.user.id)

    def test_user_is_already_participant(self):
        data = self.required_data.copy()
        participant = Participant.objects.create(conversation=self.conversation, user=self.user)
        # Act
        serializer = ParticipantSerializer(data=data)
        self.assertEqual(serializer.is_valid(), False)

    def test_private_conversation_has_two_participants(self):
        second_user = User.objects.create(username='second_user')
        third_user = User.objects.create(username='third_user')
        Participant.objects.create(conversation=self.conversation, user=self.user)
        Participant.objects.create(conversation=self.conversation, user=second_user)
        data = self.required_data.copy()
        data['user'] = third_user.id
        # Act
        serializer = ParticipantSerializer(data=data)
        self.assertEqual(serializer.is_valid(), False)
