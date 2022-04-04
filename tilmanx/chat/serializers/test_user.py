
from django.contrib.auth.models import User
from django.test import TestCase

from authentication.models import Profile
from chat.serializers import UserSerializer


class TestUserSerializer(TestCase):
    def setUp(self):
        self.user = User.objects.create(
            username='requester', email='email', first_name='first_name', last_name='last_name'
        )
        self.profile = Profile.objects.create(user=self.user, is_verified=True)

    def test_data(self):
        # Arrange
        serializer = UserSerializer(self.user)
        # Act
        data = serializer.data.copy()
        # Assert
        self.assertEqual(data["id"], self.user.id)
        self.assertEqual(data["username"], self.user.username)
        self.assertEqual(data["email"], self.user.email)
        self.assertEqual(data["first_name"], self.user.first_name)
        self.assertEqual(data["last_name"], self.user.last_name)
        self.assertEqual(data["profile_id"], self.profile.id)
        self.assertEqual(data["is_verified"], self.profile.is_verified)
