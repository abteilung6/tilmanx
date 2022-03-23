from typing import Optional

from django.contrib.auth.models import User
from django.utils.encoding import force_str
from django.utils.http import urlsafe_base64_decode

from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.utils.token_generator import account_activation_token


class ActivateView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)

    def get(self, request: Request, *args, **kwargs):
        params = request.query_params.copy()
        uidb64 = params.get('uidb64', None)
        token = params.get('uidb64', None)
        if uidb64 is None or token is None:
            return Response("Invalid parameters", status=status.HTTP_400_BAD_REQUEST)

        user = self._get_user_for_uidb64(uidb64)
        is_valid_token = account_activation_token.check_token(user, token)
        if user and is_valid_token:
            profile = user.profile
            if user.profile.is_verified:
                return Response("Account already verified!", status=status.HTTP_400_BAD_REQUEST)
            profile.is_verified = True
            profile.save()
            return Response("Account is now verified.", status=status.HTTP_200_OK)
        else:
            return Response("Account link is invalid!", status=status.HTTP_400_BAD_REQUEST)

    @staticmethod
    def _get_user_for_uidb64(uidb64: str) -> Optional[User]:
        user: Optional[User] = None
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except(TypeError, ValueError, OverflowError, User.DoesNotExist):
            pass
        return user

