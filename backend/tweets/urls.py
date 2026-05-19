from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TweetViewSet

router = DefaultRouter()
# Isso gera as rotas GET, POST, PUT, PATCH e DELETE para /tweets/
router.register(r'', TweetViewSet, basename='tweet')

urlpatterns = [
    path('', include(router.urls)),
]