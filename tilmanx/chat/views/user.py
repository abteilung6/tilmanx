from django.contrib.auth.models import User

from rest_framework import permissions, mixins
from rest_framework import filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.serializers import UserSerializer


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
