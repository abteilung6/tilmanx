from django.contrib.auth.models import User
from django.db.models import Q

from rest_framework import permissions, mixins
from rest_framework import filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.models import Friendship
from chat.serializers import UserSerializer, FriendshipSerializer


class UserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, GenericViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'first_name', 'last_name']

    @action(detail=False, methods=['GET'])
    def me(self, request, pk=None):
        serializer = self.get_serializer(request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['Get'])
    def friendship(self, request, pk=None):
        user: User = self.get_object()
        friendship = get_object_or_404(
            Friendship,
            Q(requester=self.request.user, addressee=user) | Q(requester=user, addressee=self.request.user)
        )
        serializer = FriendshipSerializer(friendship)
        return Response(serializer.data)
