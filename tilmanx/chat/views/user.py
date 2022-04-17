from django.contrib.auth.models import User
from django.db.models import Q
from drf_spectacular.utils import extend_schema

from rest_framework import permissions, mixins
from rest_framework import filters
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.models import Friendship, Conversation
from chat.serializers import UserSerializer, FriendshipSerializer, ConversationSerializer, ParticipantSerializer


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

    @action(detail=True, methods=['GET'])
    def friendship(self, request, pk=None):
        user: User = self.get_object()
        friendship = get_object_or_404(
            Friendship,
            Q(requester=self.request.user, addressee=user) | Q(requester=user, addressee=self.request.user)
        )
        serializer = FriendshipSerializer(friendship)
        return Response(serializer.data)

    @extend_schema(responses=ConversationSerializer)
    @action(detail=True, methods=['GET'])
    def conversation(self, request, pk=None):
        requester: User = self.request.user
        addressee: User = self.get_object()
        conversation = Conversation.get_private_conversation_for_users(requester, addressee)
        if conversation:
            conversation_serializer = ConversationSerializer(conversation)
            return Response(conversation_serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_404_NOT_FOUND)

    @extend_schema(responses=ConversationSerializer)
    @action(detail=True, methods=['POST'])
    def create_conversation(self, request, pk=None):
        requester: User = self.request.user
        addressee: User = self.get_object()
        conversation = Conversation.get_private_conversation_for_users(requester, addressee)
        if conversation:
            conversation_serializer = ConversationSerializer(conversation)
            return Response(conversation_serializer.data, status=status.HTTP_304_NOT_MODIFIED)
        else:
            conversation = ConversationSerializer.create_private_conversation_with(requester)
            ParticipantSerializer.create_participant_for_conversation(requester, conversation)
            ParticipantSerializer.create_participant_for_conversation(addressee, conversation)
            conversation_serializer = ConversationSerializer(conversation)
            return Response(conversation_serializer.data, status=status.HTTP_201_CREATED)
