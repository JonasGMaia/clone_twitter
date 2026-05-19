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
    
    class Meta:
        # Garante que os tweets mais recentes apareçam primeiro
        ordering = ['-created_at']
        
    def __str__(self):
        return f"{self.author.username}: {self.content[:20]}..."