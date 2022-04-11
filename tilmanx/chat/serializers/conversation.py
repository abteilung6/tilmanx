from collections import OrderedDict
from typing import Dict

from rest_framework import serializers

from chat.enum import ConversationType
from chat.models import Conversation


class ConversationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Conversation

    def get_fields(self) -> Dict[str, serializers.Field]:
        # field changes
        type_readonly = True if self.instance else False

        fields = OrderedDict([
            ('id', serializers.IntegerField(read_only=True)),
            ('type', serializers.ChoiceField(choices=ConversationType.choices(), read_only=type_readonly)),
            ('creator', serializers.PrimaryKeyRelatedField(read_only=True)),
            ('created_at', serializers.DateTimeField(read_only=True)),
            ('updated_at', serializers.DateTimeField(read_only=True)),
        ])

        return fields

    def validate(self, attrs: dict) -> dict:
        if self.instance:
            return attrs
        else:
            return self.validate_for_create(attrs)

    def validate_for_create(self, attrs: dict) -> dict:
        errors = {}
        creator = self.context.get('creator', None)
        if creator is None:
            errors.setdefault('creator', []).append('Creator in context required.')
        else:
            attrs['creator'] = creator
        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def validate_type(self, value: str) -> str:
        if self.instance:
            return value
        else:
            if value == ConversationType.PRIVATE.value:
                return value
            else:
                raise serializers.ValidationError("Currently conversations with type {value} are not allowed.")
