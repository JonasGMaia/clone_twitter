from django.urls import path
from .views import ToggleFollowView, ProfileView, UserCreateView, UserListView

urlpatterns = [
    path('', UserCreateView.as_view(), name='user-register'),
    path('me/', ProfileView.as_view(), name='my-profile'),
    path('all/', UserListView.as_view(), name='user-list'),
    path('<str:username>/follow/', ToggleFollowView.as_view(), name='toggle-follow'),
]