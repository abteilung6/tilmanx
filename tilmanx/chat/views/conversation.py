from rest_framework import mixins, permissions
from rest_framework.viewsets import GenericViewSet

from chat.models import Conversation
from chat.serializers import ConversationSerializer


class ConversationViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = Conversation.objects.all()
    serializer_class = ConversationSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_queryset(self):
        queryset = Conversation.objects.filter(participant__user=self.request.user)
        return queryset
