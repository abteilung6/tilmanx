from django.contrib.auth.models import User
from django.test import TestCase

from rest_framework import status
from rest_framework.response import Response
from rest_framework.test import APIRequestFactory, force_authenticate

from chat.enum import ConversationType
from chat.models import Conversation, Participant
from chat.views import UserViewSet


class TestUserViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view_list = UserViewSet.as_view(actions={'get': 'list'})
        self.view_create_conversation = UserViewSet.as_view(actions={'post': 'create_conversation'})
        self.view_get_conversation = UserViewSet.as_view(actions={'get': 'conversation'})

    def test_list(self):
        # Arrange
        user = User.objects.create(
            username='username', first_name='first_name', last_name='last_name'
        )
        User.objects.create(
            username='terra', first_name='John', last_name='0123'
        )
        # Act & Assert
        self._check_search('username', user, 1)
        self._check_search('first_name', user, 1)
        self._check_search('last_name', user, 1)
        self._check_search('0123', user, 1)
        self._check_search('username first_name', user, 1)
        self._check_search('username first_name last_name', user, 1)

        self._check_search('user', user, 1)
        self._check_search('first', user, 1)
        self._check_search('last', user, 1)
        self._check_search('0', user, 1)
        self._check_search('user first', user, 1)
        self._check_search('user first last', user, 1)

        self._check_search('User', user, 1)
        self._check_search('First', user, 1)
        self._check_search('Last', user, 1)
        self._check_search('USER FIRST LAST', user, 1)

        self._check_search('', user, 2)
        self._check_search('e', user, 2)
        self._check_search('R', user, 2)

        self._check_search('unique', user, 0)
        self._check_search('username terra', user, 0)

    def _check_search(self, search: str, user: User, expected_length: int):
        # Arrange
        route = f"/api/users/?search={search}"
        request = self.factory.get(route)
        with self.subTest(search=search, user=user, expected_length=expected_length):
            # Act
            force_authenticate(request, user=user)
            response: Response = self.view_list(request)
            # Assert
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            self.assertEqual(len(response.data), expected_length)

    def test_create_conversation(self):
        # Arrange
        requester = User.objects.create(
            username='requester', first_name='first_name', last_name='last_name'
        )
        addressee = User.objects.create(
            username='addressee', first_name='first_name', last_name='last_name'
        )
        request = self.factory.post(f'/api/users/{addressee.id}/create_conversation/')
        force_authenticate(request, user=requester)
        # Act
        response: Response = self.view_create_conversation(request, pk=addressee.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['creator'], requester.id)

    def test_create_conversation_with_no_modification(self):
        # Arrange
        requester = User.objects.create(
            username='requester', first_name='first_name', last_name='last_name'
        )
        addressee = User.objects.create(
            username='addressee', first_name='first_name', last_name='last_name'
        )
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=requester
        )
        Participant.objects.create(conversation=conversation, user=requester)
        Participant.objects.create(conversation=conversation, user=addressee)
        request = self.factory.post(f'/api/users/{addressee.id}/create_conversation/')
        force_authenticate(request, user=requester)
        # Act
        response: Response = self.view_create_conversation(request, pk=addressee.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_304_NOT_MODIFIED)
        self.assertEqual(response.data['id'], conversation.id)
        self.assertEqual(response.data['creator'], requester.id)

    def test_get_conversation(self):
        # Arrange
        requester = User.objects.create(
            username='requester', first_name='first_name', last_name='last_name'
        )
        addressee = User.objects.create(
            username='addressee', first_name='first_name', last_name='last_name'
        )
        conversation = Conversation.objects.create(
            type=ConversationType.PRIVATE.value, creator=requester
        )
        Participant.objects.create(conversation=conversation, user=requester)
        Participant.objects.create(conversation=conversation, user=addressee)
        request = self.factory.get(f'/api/users/{addressee.id}/conversation/')
        force_authenticate(request, user=requester)
        # Act
        response: Response = self.view_get_conversation(request, pk=addressee.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['id'], conversation.id)
        self.assertEqual(response.data['creator'], requester.id)

    def test_get_conversation_with_not_found(self):
        # Arrange
        requester = User.objects.create(
            username='requester', first_name='first_name', last_name='last_name'
        )
        addressee = User.objects.create(
            username='addressee', first_name='first_name', last_name='last_name'
        )
        request = self.factory.get(f'/api/users/{addressee.id}/conversation/')
        force_authenticate(request, user=requester)
        # Act
        response: Response = self.view_get_conversation(request, pk=addressee.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
