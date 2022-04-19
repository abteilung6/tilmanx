from collections import OrderedDict
from typing import Dict, Optional

from django.contrib.auth.models import User
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
            ('latest_message_at', serializers.DateTimeField(read_only=True, allow_null=True)),
            ('latest_message', serializers.CharField(
                source="latest_message.message", read_only=True, allow_null=True)
             ),
            ('addressee', serializers.SerializerMethodField(read_only=True)),
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

    @classmethod
    def get_context_with(cls, creator: Optional[User] = None, requester: Optional[User] = None) -> dict:
        result = {}
        if creator:
            result.update({'creator': creator})
        if requester:
            result.update({'user': requester})
        return result

    @classmethod
    def create_private_conversation_with(cls, creator: User) -> Conversation:
        required_data = {
            'type': ConversationType.PRIVATE.value
        }
        context = cls.get_context_with(creator=creator, requester=creator)
        serializer = ConversationSerializer(data=required_data, context=context)
        serializer.is_valid(raise_exception=True)
        return serializer.save()

    def get_addressee(self, conversation: 'Conversation') -> str:
        user = self._get_user_from_context()
        if conversation.type == ConversationType.PRIVATE.value:
            addressee = conversation.participant_set.exclude(user=user).get()
            user = addressee.user
            return f"{user.first_name} {user.last_name}"
        else:
            raise serializers.ValidationError(
                f'Conversation with {ConversationType.GROUP.value} currently not supported.'
            )

    def _get_user_from_context(self) -> User:
        user = self.context.get('user', None)
        if user:
            return user
        else:
            raise serializers.ValidationError('User missing.')
