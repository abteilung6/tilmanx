from django.db.models import QuerySet
from django.db.models import Q

from rest_framework import mixins, permissions
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.enum import FriendshipAction
from chat.models import Friendship
from chat.serializers import FriendshipSerializer


class FriendshipViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = Friendship.objects.all()
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

    def list(self, request, *args, **kwargs):
        queryset: QuerySet = self.filter_queryset(self.get_queryset())
        friendships = queryset.filter(Q(requester=self.request.user) | Q(addressee=self.request.user))
        serializer = self.get_serializer(friendships, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['PUT'])
    def accept(self, request, pk=None):
        friendship = Friendship.objects.get(id=pk)
        serializer = self.get_serializer(friendship, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
