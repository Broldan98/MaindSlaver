from django.urls import path
from . import views

urlpatterns = [
    path('', views.listar_cartas, name='listar_cartas'),
    path('crear/', views.crear_carta, name='crear_carta'),
    path('editar/<int:pk>/', views.editar_carta, name='editar_carta'),
    path('eliminar/<int:pk>/', views.eliminar_carta, name='eliminar_carta'),
]