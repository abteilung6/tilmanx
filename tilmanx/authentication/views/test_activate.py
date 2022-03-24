from django.contrib.auth.models import User
from django.test import TestCase, RequestFactory
from rest_framework import status
from rest_framework.response import Response
from unittest.mock import patch

from authentication.models import Profile
from authentication.utils.token_generator import TokenGenerator
from authentication.views import ActivateView


class TestActivateView(TestCase):
    def setUp(self):
        self.factory = RequestFactory()

    def test_invalid_parameters(self):
        # Arrange
        request = self.factory.get('/api/auth/activate/')
        # Act
        response: Response = ActivateView.as_view()(request)
        # Assert
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_verify_profile(self):
        # Arrange
        user = User.objects.create(username='alice')
        profile = Profile.objects.create(user=user, is_verified=False)
        request = self.factory.get('/api/auth/activate/?uidb64=foo&token=bar')
        # Act
        with patch.object(ActivateView, '_get_user_for_uidb64', return_value=user) as mock_get_user_for_uidb64:
            with patch.object(TokenGenerator, 'check_token', return_value=True) as mock_check_token:
                response: Response = ActivateView.as_view()(request)
        # Assert
        mock_check_token.assert_called_once()
        mock_get_user_for_uidb64.assert_called_once()
        self.assertEqual(profile.is_verified, True)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
