

from django.urls import path, include

urlpatterns = [
    path('api/', include('authentication.urls')),
]


from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterUserView.as_view(), name='register'),
    path('login/', views.CustomAuthToken.as_view(), name='login'),
    path('profile/', views.ProfileView.as_view(), name='profile'),
    path('tasks/', views.TaskListView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', views.TaskDetailView.as_view(), name='task-detail'),
]

