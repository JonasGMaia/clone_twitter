from django.urls import path
from .views import ToggleFollowView

urlpatterns = [
    # Exemplo de URL: /api/users/jonas/follow/
    path('<str:username>/follow/', ToggleFollowView.as_view(), name='toggle-follow'),
]