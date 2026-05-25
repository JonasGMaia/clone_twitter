from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User

User = get_user_model()

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

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email', ''),
            password=validated_data['password']
        )
        return user