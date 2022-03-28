from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework import status

from rest_framework.response import Response
from rest_framework.test import APIRequestFactory, force_authenticate

from chat.enum import FriendshipStatus
from chat.models import Friendship
from chat.views import FriendshipViewSet


class TestFriendshipViewSet(TestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.view_list = FriendshipViewSet.as_view(actions={'get': 'list'})
        self.view_retrieve = FriendshipViewSet.as_view(actions={'get': 'retrieve'})
        self.view_create = FriendshipViewSet.as_view(actions={'post': 'create'})
        self.view_accept = FriendshipViewSet.as_view(actions={'put': 'accept'})
        self.view_delete = FriendshipViewSet.as_view(actions={'delete': 'destroy'})
        self.requester = User.objects.create(username='requester')
        self.another_requester = User.objects.create(username='another_requester')
        self.addressee = User.objects.create(username='addressee')

    def test_list(self):
        # Arrange
        Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        Friendship.objects.create(requester=self.another_requester, addressee=self.addressee)
        request = self.factory.get('/api/friendships/')
        force_authenticate(request, user=self.requester)
        # Act
        response: Response = self.view_list(request)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_retrieve(self):
        # Arrange
        friendship = Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        request = self.factory.get(f'/api/friendships/{friendship.id}/accept/')
        force_authenticate(request, user=self.requester)
        # Act
        response: Response = self.view_retrieve(request, pk=friendship.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['requester_id'], self.requester.id)
        self.assertEqual(response.data['addressee_id'], self.addressee.id)

    def test_create(self):
        # Arrange
        data = {
            'addressee_id': self.addressee.id
        }
        request = self.factory.post('/api/friendships/', data=data)
        force_authenticate(request, user=self.requester)
        # Act
        response: Response = self.view_create(request)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['requester_id'], self.requester.id)
        self.assertEqual(response.data['addressee_id'], self.addressee.id)

    def test_accept(self):
        # Arrange
        friendship = Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        request = self.factory.put(f'/api/friendships/{friendship.id}/accept/')
        force_authenticate(request, user=self.addressee)
        # Act
        response: Response = self.view_accept(request, pk=friendship.id)
        # Arrange
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['requester_id'], self.requester.id)
        self.assertEqual(response.data['addressee_id'], self.addressee.id)
        self.assertEqual(response.data['status'], FriendshipStatus.ACCEPTED.value)

    def test_delete(self):
        # Arrange
        friendship = Friendship.objects.create(requester=self.requester, addressee=self.addressee)
        request = self.factory.delete(f'/api/friendships/{friendship.id}/')
        force_authenticate(request, user=self.addressee)
        # Act
        response: Response = self.view_delete(request, pk=friendship.id)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
