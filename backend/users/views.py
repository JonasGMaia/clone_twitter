from rest_framework.generics import RetrieveUpdateAPIView
from .serializers import UserProfileSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import User

class ToggleFollowView(APIView):
    # Exige que o usuário envie o token JWT (esteja logado) para acessar
    permission_classes = [IsAuthenticated]

    def post(self, request, username):
        # Busca o usuário que será seguido/deixado de seguir
        user_to_follow = get_object_or_404(User, username=username)
        current_user = request.user

        # Evita que o usuário siga a si mesmo
        if current_user == user_to_follow:
            return Response(
                {"error": "Você não pode seguir a si mesmo."}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        # A lógica do Toggle (Interruptor)
        if current_user.following.filter(username=username).exists():
            current_user.following.remove(user_to_follow)
            action = "unfollowed"
        else:
            current_user.following.add(user_to_follow)
            action = "followed"

        return Response(
            {
                "message": f"Successfully {action} {username}",
                "action": action
            }, 
            status=status.HTTP_200_OK
        )

        class ProfileView(RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    # Sobrescrevemos o get_object para sempre retornar o usuário dono do token,
    # dispensando a necessidade de passar o ID na URL.
    def get_object(self):
        return self.request.user