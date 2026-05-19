
from rest_framework import viewsets, permissions
from .models import Tweet
from .serializers import TweetSerializer

class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    
    # Exige que o usuário esteja logado para interagir
    permission_classes = [permissions.IsAuthenticated]

    # Sobrescrevemos o método de criação para injetar o usuário logado como autor
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
