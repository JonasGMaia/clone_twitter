
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from .models import Tweet,Comment
from .serializers import TweetSerializer, CommentSerializer

class TweetViewSet(viewsets.ModelViewSet):
    queryset = Tweet.objects.all()
    serializer_class = TweetSerializer
    
    # Exige que o usuário esteja logado para interagir
    permission_classes = [permissions.IsAuthenticated]

    # Sobrescrevemos o método de criação para injetar o usuário logado como autor
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    # Rota: POST /api/tweets/<id>/like/
    @action(detail=True, methods=['post'])
    def like(self, request, pk=None):
        tweet = self.get_object()
        user = request.user
        
        # Lógica de Toggle (igual ao botão de seguir)
        if tweet.likes.filter(id=user.id).exists():
            tweet.likes.remove(user)
            return Response({"status": "unliked"}, status=status.HTTP_200_OK)
        else:
            tweet.likes.add(user)
            return Response({"status": "liked"}, status=status.HTTP_200_OK)

    # Rota: GET e POST /api/tweets/<id>/comments/
    @action(detail=True, methods=['get', 'post'])
    def comments(self, request, pk=None):
        tweet = self.get_object()
        
        if request.method == 'GET':
            # Lista os comentários deste tweet
            comments = tweet.comments.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
            
        elif request.method == 'POST':
            # Cria um novo comentário neste tweet
            serializer = CommentSerializer(data=request.data)
            if serializer.is_valid():
                # Injeta o autor logado e o tweet atual antes de salvar
                serializer.save(author=request.user, tweet=tweet)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Rota do Feed - GET /api/tweets/feed/
    # Usamos detail=False porque essa rota não se refere a um tweet específico (não recebe ID)
    @action(detail=False, methods=['get'])
    def feed(self, request):
        user = request.user
        
        # Filtra tweets onde o autor está na lista de quem o usuário segue OU é o próprio usuário
        tweets = Tweet.objects.filter(
            Q(author__in=user.following.all()) | Q(author=user)
        ).distinct() # distinct() garante que não venham resultados duplicados
        
        # Aplica a paginação 
        page = self.paginate_queryset(tweets)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        # Fallback caso a paginação não esteja ativada
        serializer = self.get_serializer(tweets, many=True)
        return Response(serializer.data)