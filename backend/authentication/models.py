# todo_backend/users/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='profile_pics/', null=True, blank=True)
    phone_number = models.CharField(max_length=15, blank=True)


    def __str__(self):
        return self.username