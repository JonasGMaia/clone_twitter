from django.db import models
from django.conf import settings

class Tweet(models.Model):
    # Relacionamento com o usuário: se o usuário for deletado, os tweets dele também serão (CASCADE)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE, 
        related_name='tweets'
    )
    content = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_tweets', blank=True)
    
    class Meta:
        # Garante que os tweets mais recentes apareçam primeiro
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.author.username}: {self.content[:20]}..."

class Comment(models.Model):
    tweet = models.ForeignKey(Tweet, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    content = models.CharField(max_length=280)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at'] # Comentários mais antigos primeiro (ordem natural de leitura)

    def __str__(self):
        return f"Comentário de {self.author.username} em {self.tweet.id}"