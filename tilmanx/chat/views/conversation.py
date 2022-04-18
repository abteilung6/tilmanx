from rest_framework import mixins, permissions
from rest_framework.viewsets import GenericViewSet

from chat.models import Conversation
from chat.serializers import ConversationSerializer


class ConversationViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = Conversation.objects.prefetch_related('participant_set__user').all()
    serializer_class = ConversationSerializer
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
        return context

    def get_queryset(self):
        queryset = Conversation.objects.filter(participant__user=self.request.user)
        return queryset
