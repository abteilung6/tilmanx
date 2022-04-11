from collections import OrderedDict
from typing import Dict

from django.contrib.auth.models import User
from rest_framework import serializers

from chat.models import Message, Conversation, Participant


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message

    def get_fields(self) -> Dict[str, serializers.Field]:
        # field changes
        conversation_readonly = True if self.instance else False
        sender_readonly = True if self.instance else False
        message_readonly = True if self.instance else False

        fields = OrderedDict([
            ('id', serializers.IntegerField(read_only=True)),
            ('conversation', serializers.PrimaryKeyRelatedField(
                queryset=None if conversation_readonly else Conversation.objects.all(), read_only=conversation_readonly)
             ),
            ('sender', serializers.PrimaryKeyRelatedField(
                queryset=None if sender_readonly else User.objects.all(), read_only=sender_readonly)
             ),
            ('created_at', serializers.DateTimeField(read_only=True)),
            ('updated_at', serializers.DateTimeField(read_only=True)),
            ('message', serializers.CharField(read_only=message_readonly)),
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
        sender: User = attrs['sender']
        if not Participant.is_user_participant_of(sender, conversation):
            errors.setdefault('sender', []).append('Sender is not participant of conversation.')
        if errors:
            raise serializers.ValidationError(errors)
        return attrs
