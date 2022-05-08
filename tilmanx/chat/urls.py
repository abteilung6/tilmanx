from django.urls import include, path
from rest_framework import routers

from chat.views import ConversationViewSet, FriendshipViewSet, MessageViewSet, UserViewSet

router = routers.DefaultRouter()
router.register(r'conversations', ConversationViewSet, basename='Conversation')
router.register(r'friendships', FriendshipViewSet, basename='Friendship')
router.register(r'messages', MessageViewSet, basename='Message')
router.register(r'users', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
