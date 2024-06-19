# # todo_app/views.py
# from rest_framework import generics, permissions
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from rest_framework.decorators import api_view
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated
# from .models import User, Profile, Task
# from .serializers import UserSerializer, ProfileSerializer, TaskSerializer
# from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework.authtoken.models import Token



# @api_view(['POST'])
# def register_user(request):
#     if request.method == 'POST':
#         serializer = UserSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class CustomAuthToken(ObtainAuthToken):
#     def post(self, request, *args, **kwargs):
#         serializer = self.serializer_class(data=request.data, context={'request': request})
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         token, created = Token.objects.get_or_create(user=user)
#         return Response({
#             'token': token.key,
#             'user_id': user.pk,
#             'email': user.email
#         }, status=status.HTTP_200_OK)

# class RegisterUserView(generics.CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserSerializer

# class ProfileView(generics.RetrieveUpdateAPIView):
#     serializer_class = ProfileSerializer
#     permission_classes = [IsAuthenticated]

#     def get_object(self):
#         return self.request.user.profile

# class TaskListCreate(generics.ListCreateAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated] 

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)

# class TaskListView(generics.ListCreateAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# class IsOwner(permissions.BasePermission):
#     def has_object_permission(self, request, view, obj):
#         return obj.user == request.user
    

# class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = TaskSerializer
#     permission_classes = [IsAuthenticated, IsOwner]

#     def get_queryset(self):
#         return Task.objects.filter(user=self.request.user)

#     def perform_update(self, serializer):
#         serializer.save(user=self.request.user)

#     def perform_destroy(self, instance):
#         if instance.user == self.request.user:
#             instance.delete()
#         else:
#             raise PermissionDenied("You can only delete your own tasks.")



from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import User, Profile, Task
from .serializers import UserSerializer, ProfileSerializer, TaskSerializer
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

class RegisterUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Allow unauthenticated users to register

class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        }, status=status.HTTP_200_OK)

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user.profile

class TaskListView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class TaskDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def perform_destroy(self, instance):
        if instance.user == self.request.user:
            instance.delete()
        else:
            raise PermissionDenied("You can only delete your own tasks.")

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user

class TaskApiView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        tasks = Task.objects.filter(user=request.user)
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
