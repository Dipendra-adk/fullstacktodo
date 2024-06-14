from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserLoginSerializer, UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CustomUser



class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





class UserLoginView(APIView):
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=serializer.validated_data['username'], password=serializer.validated_data['password'])
            if user:
                login(request, user)
                token, created = Token.objects.get_or_create(user=user)
                return Response({'token': token.key})
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)




class UserProfileUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class UserPhotoUpdateView(generics.UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def patch(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
