from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.db.models import Q

from rest_framework import mixins, permissions
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.enum import FriendshipAction, MessageType
from chat.models import Friendship
from chat.serializers import FriendshipSerializer


class FriendshipViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet
):
    serializer_class = FriendshipSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        """Flattens user from request"""
        context = {
            'request': self.request,
            'user': self.request.user,
            'format': self.format_kwarg,
            'view': self
        }
        if self.action == 'accept':
            context['action'] = FriendshipAction.ACCEPT
        return context

    def get_queryset(self):
        return Friendship.objects.select_related(
            'requester', 'addressee'
        ).filter(
            Q(requester=self.request.user) | Q(addressee=self.request.user)
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance: Friendship = serializer.save()
        self.publish_friendship(instance, serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=True, methods=['PUT'])
    def accept(self, request, pk=None):
        friendship = self.get_object()
        serializer = self.get_serializer(friendship, data=request.data)
        serializer.is_valid(raise_exception=True)
        instance: Friendship = serializer.save()
        self.publish_friendship(instance, serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @staticmethod
    def publish_friendship(friendship: Friendship, data: dict):
        channel_layer = get_channel_layer()
        users = [friendship.requester, friendship.addressee]
        message = {
            'type': MessageType.FRIENDSHIP_MESSAGE.value,
            'message': data
        }
        for user in users:
            async_to_sync(channel_layer.group_send)(user.username, message)

    def destroy(self, request, *args, **kwargs):
        instance: Friendship = self.get_object()
        if instance.requester == self.request.user or instance.addressee == self.request.user:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
