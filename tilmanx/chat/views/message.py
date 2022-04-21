from django_filters import rest_framework as filters


from rest_framework import mixins, permissions
from rest_framework.viewsets import GenericViewSet

from chat.models import Message
from chat.serializers import MessageSerializer


class MessageFilter(filters.FilterSet):
    conversation_id = filters.NumberFilter()

    class Meta:
        model = Message
        fields = ['conversation_id']


class MessageViewSet(mixins.ListModelMixin, mixins.CreateModelMixin, GenericViewSet):
    serializer_class = MessageSerializer
    permission_classes = (permissions.IsAuthenticated,)
    filter_backends = (filters.DjangoFilterBackend,)

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
