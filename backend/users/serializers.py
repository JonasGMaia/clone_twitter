from rest_framework import serializers
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    # Contadores calculados em tempo real
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 
            'bio', 'profile_picture', 'cover_picture', 
            'followers_count', 'following_count'
        ]
        # Impedimos que o usuário altere seu username ou contadores por essa rota
        read_only_fields = ['username', 'email', 'followers_count', 'following_count']

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()