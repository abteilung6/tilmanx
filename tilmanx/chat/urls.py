from django.urls import include, path
from rest_framework import routers

from chat.views import FriendshipViewSet

router = routers.DefaultRouter()
router.register(r'friendships', FriendshipViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
