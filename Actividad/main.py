# main.py - Punto de entrada principal del sistema MindSlaver

from modulos.cartas import registrar_carta, listar_cartas, eliminar_carta
from modulos.usuarios import registrar_usuario, listar_usuarios
from reportes.reportes_inventario import generar_resumen_inventario


def menu_principal():
    while True:
        print("\n=== SISTEMA MODULAR MINDSLAVER ===")
        print("1. Ver catálogo de cartas")
        print("2. Registrar nueva carta")
        print("3. Eliminar carta")
        print("4. Ver usuarios registrados")
        print("5. Registrar nuevo usuario")
        print("6. Generar reporte de inventario")
        print("7. Salir")

        opcion = input("\nSeleccione una opción (1-7): ")

        if opcion == "1":
            listar_cartas()
        elif opcion == "2":
            nombre = input("Nombre de la carta: ")
            juego = input("Juego (Pokémon, MTG, Yu-Gi-Oh, etc.): ")
            rareza = input("Rareza: ")
            estado = input("Estado (NM/LP/MP/HP): ")
            precio = input("Precio estimado ($): ")
            registrar_carta(nombre, juego, rareza, estado, precio)
        elif opcion == "3":
            try:
                carta_id = int(input("Ingrese el ID de la carta a eliminar: "))
                eliminar_carta(carta_id)
            except ValueError:
                print("\n[ERROR] Por favor ingrese un número entero de ID válido.")
        elif opcion == "4":
            listar_usuarios()
        elif opcion == "5":
            nombre = input("Nombre del usuario: ")
            registrar_usuario(nombre)
        elif opcion == "6":
            generar_resumen_inventario()
        elif opcion == "7":
            print("\n¡Gracias por utilizar el sistema MindSlaver!")
            break
        else:
            print("\nOpción no válida. Intente nuevamente.")


if __name__ == "__main__":
    menu_principal()