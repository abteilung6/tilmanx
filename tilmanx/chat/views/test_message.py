from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status

from rest_framework.response import Response
from rest_framework.test import APIRequestFactory, force_authenticate

from chat.enum import ConversationType
from chat.models import Conversation, Participant, Message
from chat.views import MessageViewSet, MessageFilter


class TestMessageViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view_list = MessageViewSet.as_view(actions={'get': 'list'})
        self.view_create = MessageViewSet.as_view(actions={'post': 'create'})
        self.first_user = User.objects.create(username='first_user')
        self.second_user = User.objects.create(username='second_user')
        self.third_user = User.objects.create(username='third_user')

    def test_create(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        message = "A message"
        data = {
            "conversation": conversation.id,
            "message": message
        }
        request = self.factory.post('/api/messages/', data=data)
        force_authenticate(request, user=self.first_user)
        # Act
        response: Response = self.view_create(request)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['conversation'], conversation.id)
        self.assertEqual(response.data['sender'], self.first_user.id)
        self.assertEqual(response.data['message'], message)

    def test_list(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        Message.objects.create(conversation=conversation, sender=self.first_user, message="foo1")
        unrelated_conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.second_user
        )
        Participant.objects.create(conversation=unrelated_conversation, user=self.second_user)
        Participant.objects.create(conversation=unrelated_conversation, user=self.third_user)
        Message.objects.create(conversation=unrelated_conversation, sender=self.second_user, message="foo2")
        request = self.factory.get('/api/messages/')
        force_authenticate(request, user=self.first_user)
        # Act
        response: Response = self.view_list(request)
        # Assert
        self.assertEqual(len(response.data), 1)


class TestMessageFilter(TestCase):
    def setUp(self):
        self.first_user = User.objects.create(username='first_user')
        self.second_user = User.objects.create(username='second_user')

    def test_conversation_id(self):
        # Arrange
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=conversation, user=self.first_user)
        Participant.objects.create(conversation=conversation, user=self.second_user)
        Message.objects.create(conversation=conversation, sender=self.first_user, message="foo")
        unrelated_conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=unrelated_conversation, user=self.first_user)
        Participant.objects.create(conversation=unrelated_conversation, user=self.second_user)
        Message.objects.create(conversation=unrelated_conversation, sender=self.first_user, message="foo")
        queryset = Message.objects.all()
        data = {
            'conversation_id': conversation.id
        }
        # Act
        message_filter = MessageFilter(data=data, queryset=queryset)
        # Assert
        self.assertEqual(len(message_filter.qs), 1)
