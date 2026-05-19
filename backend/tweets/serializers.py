from rest_framework import serializers
from .models import Tweet

class TweetSerializer(serializers.ModelSerializer):
    # Adicionamos o nome de usuário do autor como um campo apenas de leitura
    # para facilitar a exibição no front-end sem precisar de requisições extras
    author_username = serializers.ReadOnlyField(source='author.username')

    class Meta:
        model = Tweet
        fields = ['id', 'author', 'author_username', 'content', 'created_at']
        read_only_fields = ['author', 'created_at']