from django.urls import path
from .views import ToggleFollowView, ProfileView, UserCreateView

urlpatterns = [
    path('', UserCreateView.as_view(), name='user-register'),
    path('me/', ProfileView.as_view(), name='my-profile'),
    path('<str:username>/follow/', ToggleFollowView.as_view(), name='toggle-follow'),
]