from django.db import models

class Carta(models.Model):
    JUEGOS_CHOICES = [
        ('Pokemon', 'Pokémon'),
        ('MTG', 'Magic: The Gathering'),
        ('Yugioh', 'Yu-Gi-Oh!'),
        ('Lorcana', 'Lorcana'),
        ('OnePiece', 'One Piece'),
    ]

    ESTADO_CHOICES = [
        ('NM', 'Near Mint (NM)'),
        ('LP', 'Lightly Played (LP)'),
        ('MP', 'Moderately Played (MP)'),
        ('HP', 'Heavily Played (HP)'),
    ]

    nombre = models.CharField(max_length=150, verbose_name="Nombre de la Carta")
    juego = models.CharField(max_length=20, choices=JUEGOS_CHOICES, verbose_name="Juego TCG")
    coleccion = models.CharField(max_length=100, verbose_name="Edición / Colección")
    rareza = models.CharField(max_length=50, verbose_name="Rareza")
    estado = models.CharField(max_length=2, choices=ESTADO_CHOICES, default='NM', verbose_name="Estado de Conservación")
    precio = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Precio Estimado ($)")
    fecha_registro = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de Registro")

    def __str__(self):
        return f"{self.nombre} ({self.juego}) - ${self.precio}"
