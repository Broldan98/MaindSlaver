from django import forms
from .models import Carta

class CartaForm(forms.ModelForm):
    class Meta:
        model = Carta
        fields = ['nombre', 'juego', 'coleccion', 'rareza', 'estado', 'precio']
        widgets = {
            'nombre': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Nombre de la carta'}),
            'juego': forms.Select(attrs={'class': 'form-select'}),
            'coleccion': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Base Set, Modern Horizons'}),
            'rareza': forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Ej. Rara Holo, Mítica'}),
            'estado': forms.Select(attrs={'class': 'form-select'}),
            'precio': forms.NumberInput(attrs={'class': 'form-control', 'step': '0.01', 'placeholder': '0.00'}),
        }

    def clean_precio(self):
        precio = self.cleaned_data.get('precio')
        if precio is not None and precio < 0:
            raise forms.ValidationError("El precio no puede ser un valor negativo.")
        return precio