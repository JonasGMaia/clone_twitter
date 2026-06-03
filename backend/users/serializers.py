from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import User

User = get_user_model()

class UserProfileSerializer(serializers.ModelSerializer):
    # Contadores calculados em tempo real
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    is_following = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = [
            'id', 'username', 'first_name', 'last_name', 'email', 
            'bio', 'profile_picture', 'cover_picture', 
            'followers_count', 'following_count', 'is_following'
        ]
        # Impedimos que o usuário altere seu username ou contadores por essa rota
        read_only_fields = ['username', 'email', 'followers_count', 'following_count', 'is_following']

    def get_followers_count(self, obj):
        return obj.followers.count()

    def get_following_count(self, obj):
        return obj.following.count()

    def get_is_following(self, obj):
        request = self.context.get('request')
        # Verifica se há um usuário logado e se o ID deste perfil está na lista de quem ele segue
        if request and request.user.is_authenticated:
            return request.user.following.filter(id=obj.id).exists()
        return False

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