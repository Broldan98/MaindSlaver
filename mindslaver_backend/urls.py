from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('cartas/', include('cartas.urls')),
    path('', include('cartas.urls')), # Conecta la raíz directamente a la vista
]