from rest_framework import serializers
from .models import User, Profile, Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstname', 'lastname','username', 'email', 'password', 'confirm_password']
        extra_kwargs = {
            'password': {'write_only': True},
            'confirm_password': {'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance




class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'user', 'phone_number', 'profile_image']
        read_only_fields = ['user'] 

    def update(self, instance, validated_data):
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.profile_image = validated_data.get('profile_image', instance.profile_image)
        instance.save()
        return instance



class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'user', 'title', 'description', 'completed', 'created_at', 'updated_at']
        read_only_fields = ['user'] 
