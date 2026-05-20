from django.urls import path
from .views import ToggleFollowView, ProfileView

urlpatterns = [
    path('me/', ProfileView.as_view(), name='my-profile'),
    path('<str:username>/follow/', ToggleFollowView.as_view(), name='toggle-follow'),
]