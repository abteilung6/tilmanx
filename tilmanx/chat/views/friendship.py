from django.db.models import QuerySet
from django.db.models import Q

from rest_framework import mixins, permissions
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.enum import FriendshipAction
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

    @action(detail=True, methods=['PUT'])
    def accept(self, request, pk=None):
        friendship = self.get_object()
        serializer = self.get_serializer(friendship, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance: Friendship = self.get_object()
        if instance.requester == self.request.user or instance.addressee == self.request.user:
            instance.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
