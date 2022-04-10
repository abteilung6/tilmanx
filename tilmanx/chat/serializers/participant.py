from collections import OrderedDict
from typing import Dict

from django.contrib.auth.models import User
from rest_framework import serializers

from chat.enum import ConversationType
from chat.models import Participant, Conversation


class ParticipantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Participant

    def get_fields(self) -> Dict[str, serializers.Field]:
        # field changes
        conversation_readonly = True if self.instance else False
        user_readonly = True if self.instance else False

        fields = OrderedDict([
            ('id', serializers.IntegerField(read_only=True)),
            ('conversation', serializers.PrimaryKeyRelatedField(
                queryset=None if conversation_readonly else Conversation.objects.all(), read_only=conversation_readonly)
             ),
            ('user', serializers.PrimaryKeyRelatedField(
                queryset=None if user_readonly else User.objects.all(), read_only=user_readonly)
             ),
            ('created_at', serializers.DateTimeField(read_only=True)),
            ('updated_at', serializers.DateTimeField(read_only=True)),
        ])

        return fields

    def validate(self, attrs: dict) -> dict:
        if self.instance:
            return attrs
        else:
            return self.validate_for_create(attrs)

    @staticmethod
    def validate_for_create(attrs: dict) -> dict:
        errors = {}
        conversation: Conversation = attrs['conversation']
        user: User = attrs['user']

        if conversation.type == ConversationType.PRIVATE.value:
            participants = conversation.participant_set.all()
            if Participant.is_user_participant_of(user, conversation):
                errors.setdefault('user', []).append('User is already a participant.')
            elif participants.count() >= 2:
                errors.setdefault('conversation', []).append('Private conversation has already two participants.')
        elif conversation.type == ConversationType.GROUP.value:
            errors.setdefault('type', []).append('Conversation type not allowed.')

        if errors:
            raise serializers.ValidationError(errors)

        return attrs
