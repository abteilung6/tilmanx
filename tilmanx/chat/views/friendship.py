from django.contrib.auth.models import User

from rest_framework import mixins
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.serializers import FriendshipSerializer


class FriendshipViewSet(
    mixins.CreateModelMixin, mixins.RetrieveModelMixin, mixins.DestroyModelMixin, mixins.ListModelMixin, GenericViewSet
):
    queryset = User.objects.all()
    serializer_class = FriendshipSerializer

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        """Flattens user from request"""
        return {
            'request': self.request,
            'user': self.request.user,
            'format': self.format_kwarg,
            'view': self
        }

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        pass
