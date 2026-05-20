from rest_framework import serializers
from .models import Tweet, Comment



class CommentSerializer(serializers.ModelSerializer):
    # Adicionamos o nome de usuário do autor como um campo apenas de leitura
    # para facilitar a exibição no front-end sem precisar de requisições extras
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Comment
        fields = ['id', 'tweet', 'author', 'author_username', 'content', 'created_at']
        read_only_fields = ['author', 'created_at', 'tweet']

class TweetSerializer(serializers.ModelSerializer):
    # Adicionamos o nome de usuário do autor como um campo apenas de leitura
    # para facilitar a exibição no front-end sem precisar de requisições extras
    author_username = serializers.ReadOnlyField(source='author.username')

    # Campos calculados em tempo real
    likes_count = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Tweet
        fields = ['id', 'author', 'author_username', 'content', 'created_at', 'likes_count', 'comments_count']
        read_only_fields = ['author', 'created_at']

    # Métodos que calculam as contagens
    def get_likes_count(self, obj):
        return obj.likes.count()

    def get_comments_count(self, obj):
        return obj.comments.count()