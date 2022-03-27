from typing import Optional

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers

from chat.enum import FriendshipStatus
from chat.models import Friendship


class FriendshipSerializer(serializers.ModelSerializer):
    requester_id = serializers.IntegerField(source='requester.id', read_only=True)
    requester_username = serializers.CharField(source='requester.username', read_only=True)
    addressee_id = serializers.IntegerField(source='addressee.id')
    addressee_username = serializers.CharField(source='addressee.username', read_only=True)
    offered_at = serializers.DateTimeField(read_only=True)
    accepted_at = serializers.DateTimeField(allow_null=True, read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    status = serializers.CharField(source='status.value', read_only=True)

    class Meta:
        model = Friendship
        fields = [
            'id', 'requester_id', 'requester_username', 'addressee_id', 'addressee_username',
            'offered_at', 'accepted_at', 'updated_at', 'status'
        ]

    def validate(self, attrs: dict) -> dict:
        if self.instance:
            return attrs
        else:
            return self.validate_for_create(attrs)

    def validate_for_create(self, attrs: dict) -> dict:
        errors = {}
        requester = self.context['user']
        addressee = User.objects.get(id=attrs.get('addressee')['id'])
        forward_friendship = self._get_friendship_for(requester, addressee)
        backwards_friendship = self._get_friendship_for(addressee, requester)

        self._validate_forward_friendship(forward_friendship, errors)
        self._validate_backwards_friendship(backwards_friendship, errors)
        if errors:
            raise serializers.ValidationError(errors)

        attrs['_requester'] = requester
        attrs['_addressee'] = addressee
        return attrs

    @staticmethod
    def _validate_forward_friendship(forward_friendship: Optional[Friendship], errors: dict):
        """Check weather the forward friendship might exist and in which way."""
        if forward_friendship:
            if forward_friendship.status == FriendshipStatus.OFFERED:
                errors.setdefault('friendship', []).append('Friendship already offered.')
            else:
                errors.setdefault('friendship', []).append('Friendship already exist.')

    @staticmethod
    def _validate_backwards_friendship(backwards_friendship: Optional[Friendship], errors: dict):
        """Check weather the backwards friendship might exist and in which way."""
        if backwards_friendship:
            if backwards_friendship.status == FriendshipStatus.OFFERED:
                errors.setdefault('friendship', []).append('The addressee already offered a friendship.')
            else:
                errors.setdefault('friendship', []).append('Friendship already exist.')

    @staticmethod
    def _get_friendship_for(requester: User, addressee: User) -> Optional[Friendship]:
        friendship: Optional[Friendship] = None
        try:
            friendship = Friendship.objects.get(requester=requester, addressee=addressee)
        except ObjectDoesNotExist:
            pass
        return friendship

    def create(self, validated_data: dict):
        requester = validated_data.pop('_requester')
        addressee = validated_data.pop('_addressee')
        return Friendship.objects.create(requester=requester, addressee=addressee)

    def update(self, instance, validated_data):
        pass
