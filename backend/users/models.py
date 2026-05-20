from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):

    bio = models.TextField(max_length=160, blank=True, null=True)

    profile_picture = models.ImageField(upload_to='profiles/', blank=True, null=True)
    cover_picture = models.ImageField(upload_to='covers/', blank=True, null=True)

    following = models.ManyToManyField(
        'self', 
        symmetrical=False, 
        related_name='followers', 
        blank=True
    )

    def __str__(self):
        return self.username