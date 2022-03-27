from collections import OrderedDict
from typing import Optional, Dict

from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.utils.timezone import now
from rest_framework import serializers

from chat.enum import FriendshipStatus, FriendshipAction
from chat.models import Friendship


class FriendshipSerializer(serializers.ModelSerializer):

    class Meta:
        model = Friendship

    def get_fields(self) -> Dict[str, serializers.Field]:
        """
        Field instances that should be used for `self.fields` when instantiating the serializer:
        """
        # field changes
        addressee_readonly = True if self.instance else False

        fields = OrderedDict([
            ('id', serializers.IntegerField(read_only=True)),
            ('requester_id', serializers.IntegerField(source='requester.id', read_only=True)),
            ('requester_username', serializers.CharField(source='requester.username', read_only=True)),
            ('addressee_id', serializers.IntegerField(source='addressee.id', read_only=addressee_readonly)),
            ('addressee_username', serializers.CharField(source='addressee.username', read_only=True)),
            ('offered_at', serializers.DateTimeField(read_only=True)),
            ('accepted_at', serializers.DateTimeField(allow_null=True, read_only=True)),
            ('updated_at', serializers.DateTimeField(read_only=True)),
            ('status', serializers.CharField(source='status.value', read_only=True)),
        ])

        return fields

    def validate(self, attrs: dict) -> dict:
        if self.instance:
            return self.validate_for_update(attrs)
        else:
            return self.validate_for_create(attrs)

    def validate_for_create(self, attrs: dict) -> dict:
        errors = {}
        requester = self.context.get('user', None)
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

    def validate_for_update(self, attrs: dict) -> dict:
        errors = {}
        friendship_action = self.context.get('action', None)
        if friendship_action == FriendshipAction.ACCEPT:
            unverified_addressee = self.context['user']
            self._validate_friendship_for_acceptance(unverified_addressee, errors)
        else:
            raise serializers.ValidationError('Invalid friendship action.')

        if errors:
            raise serializers.ValidationError(errors)
        return attrs

    def _validate_friendship_for_acceptance(self, unverified_addressee: User, errors: dict):
        friendship: Friendship = self.instance
        if friendship.addressee != unverified_addressee:
            errors.setdefault('addressee', []).append('Only the addressee can accept this friendship.')
        if friendship.status != FriendshipStatus.OFFERED:
            errors.setdefault('status', []).append('The friendship status must be offered.')

    def create(self, validated_data: dict):
        requester = validated_data.pop('_requester')
        addressee = validated_data.pop('_addressee')
        return Friendship.objects.create(requester=requester, addressee=addressee)

    def update(self, instance: Friendship, validated_data):
        instance.accepted_at = now()
        instance.save()
        return instance
