from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status

from rest_framework.response import Response
from rest_framework.test import APIRequestFactory, force_authenticate

from chat.enum import ConversationType
from chat.models import Conversation, Participant
from chat.views import ConversationViewSet


class TestConversationViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view_retrieve = ConversationViewSet.as_view(actions={'get': 'retrieve'})
        self.first_user = User.objects.create(username='first_user')
        self.second_user = User.objects.create(username='second_user', first_name='first_name', last_name='last_name')
        self.unexpected_user = User.objects.create(username='unexpected_user')
        self.conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=self.first_user
        )
        Participant.objects.create(conversation=self.conversation, user=self.first_user)
        Participant.objects.create(conversation=self.conversation, user=self.second_user)

    def test_retrieve(self):
        # Arrange
        request = self.factory.get(f'/api/conversations/{self.conversation.id}/')
        force_authenticate(request, user=self.first_user)
        # Act
        response: Response = self.view_retrieve(request, pk=self.conversation.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["id"], self.conversation.id)
        self.assertEqual(response.data["type"], self.conversation.type)
        self.assertEqual(response.data["addressee"], f"{self.second_user.first_name} {self.second_user.last_name}")

    def test_retrieve_as_non_participant(self):
        # Arrange
        request = self.factory.get(f'/api/conversations/{self.conversation.id}/')
        force_authenticate(request, user=self.unexpected_user)
        # Act
        response: Response = self.view_retrieve(request, pk=self.conversation.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
