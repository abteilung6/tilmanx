from rest_framework import mixins, permissions
from rest_framework.viewsets import GenericViewSet

from chat.models import Message
from chat.serializers import MessageSerializer


class MessageViewSet(mixins.CreateModelMixin, GenericViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)

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
