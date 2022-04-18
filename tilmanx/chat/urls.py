from django.urls import include, path
from rest_framework import routers

from chat.views import FriendshipViewSet, UserViewSet, MessageViewSet

router = routers.DefaultRouter()
router.register(r'friendships', FriendshipViewSet)
router.register(r'messages', MessageViewSet)
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
