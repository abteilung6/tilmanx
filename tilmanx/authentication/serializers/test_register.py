from django.contrib.auth.models import User
from django.test import TestCase

from authentication.serializers import RegisterSerializer


class TestRegisterSerializer(TestCase):
    def setUp(self):
        self.required_data = {
            'username': 'username',
            'password': 'ValidPw42',
            'password2': 'ValidPw42',
            'email': 'username@locahost.com',
            'first_name': 'first_name',
            'last_name': 'last_name',
        }

    def test_required_data(self):
        # Arrange
        data = self.required_data.copy()
        # Act
        serializer = RegisterSerializer(data=data)
        # Assert
        self.assertEqual(serializer.is_valid(), True, msg=serializer.errors)

    def test_validate_password(self):
        # minimum length validation
        self._check_validate_password("short", "short", False)
        # second password equality
        self._check_validate_password("unequal1234", "unequalABCD", False)
        self._check_validate_password("Equal1234", "Equal1234", True)
        # common password
        self._check_validate_password("password", "password", False)

    def _check_validate_password(self, password: str, password2, expected: bool):
        # Arrange
        data = self.required_data.copy()
        data['password'] = password
        data['password2'] = password2
        # Act
        serializer = RegisterSerializer(data=data)
        # Assert
        self.assertEqual(serializer.is_valid(), expected, msg=serializer.errors)

    def test_validate_username(self):
        # Arrange
        data = self.required_data.copy()
        data.pop('password2')
        # Act
        User.objects.create(**data)
        serializer = RegisterSerializer(data=data)
        # Assert
        self.assertEqual(serializer.is_valid(), False, msg=serializer.errors)

    def test_create(self):
        # Arrange
        data = self.required_data.copy()
        # Act
        serializer = RegisterSerializer(data=data)
        self.assertEqual(serializer.is_valid(), True, msg=serializer.errors)
        instance: User = serializer.save()
        # Assert
        self.assertEqual(instance.username, data['username'])
        self.assertEqual(instance.email, data['email'])
        self.assertEqual(instance.first_name, data['first_name'])
        self.assertEqual(instance.last_name, data['last_name'])





