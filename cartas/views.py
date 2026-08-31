from django.shortcuts import render

from django.shortcuts import render, redirect, get_object_or_404
from django.core.paginator import Paginator
from django.contrib import messages
from .models import Carta
from .forms import CartaForm

# 1. LISTAR (con paginación de 10 por página)
def listar_cartas(request):
    cartas_list = Carta.objects.all().order_by('-fecha_registro')
    paginator = Paginator(cartas_list, 10)
    page_number = request.GET.get('page')
    cartas = paginator.get_page(page_number)
    return render(request, 'cartas/lista.html', {'cartas': cartas})

# 2. CREAR
def crear_carta(request):
    if request.method == 'POST':
        form = CartaForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Carta registrada exitosamente!')
            return redirect('listar_cartas')
    else:
        form = CartaForm()
    return render(request, 'cartas/formulario.html', {'form': form, 'titulo': 'Registrar Nueva Carta'})

# 3. EDITAR
def editar_carta(request, pk):
    carta = get_object_or_404(Carta, pk=pk)
    if request.method == 'POST':
        form = CartaForm(request.POST, instance=carta)
        if form.is_valid():
            form.save()
            messages.success(request, '¡Carta actualizada correctamente!')
            return redirect('listar_cartas')
    else:
        form = CartaForm(instance=carta)
    return render(request, 'cartas/formulario.html', {'form': form, 'titulo': 'Editar Carta'})

# 4. ELIMINAR
def eliminar_carta(request, pk):
    carta = get_object_or_404(Carta, pk=pk)
    if request.method == 'POST':
        carta.delete()
        messages.success(request, '¡Carta eliminada correctamente!')
        return redirect('listar_cartas')
    return render(request, 'cartas/eliminar.html', {'carta': carta})
