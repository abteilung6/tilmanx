from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django_filters import rest_framework as filters


from rest_framework import mixins, permissions, status
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from chat.enum import MessageType
from chat.models import Message
from chat.serializers import MessageSerializer


class MessageFilter(filters.FilterSet):
    class Meta:
        model = Message
        fields = ['conversation_id']


class MessageViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)
    filterset_class = MessageFilter

    def get_serializer(self, *args, **kwargs):
        serializer_class = self.get_serializer_class()
        kwargs['context'] = self.get_serializer_context()
        return serializer_class(*args, **kwargs)

    def get_serializer_context(self):
        context = {
            'request': self.request,
            'user': self.request.user,
            'format': self.format_kwarg,
            'view': self
        }
        if self.action == "create":
            context["sender"] = self.request.user
        return context

    def get_queryset(self):
        return Message.objects.select_related(
            'conversation'
        ).filter(
            conversation__participant__user=self.request.user
        )

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        instance: Message = serializer.save()
        self.publish_create(instance, serializer.data)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @staticmethod
    def publish_create(message: Message, data: dict):
        channel_layer = get_channel_layer()
        participants = list(message.conversation.participant_set.all())
        message = {
            'type': MessageType.CHAT_MESSAGE.value,
            'message': data
        }
        for participant in participants:
            async_to_sync(channel_layer.group_send)(participant.user.username, message)
