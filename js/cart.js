//Para ver el nombre de usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');

    // Si hay un nombre de usuario almacenado, actualizar el menú
    if (storedUsername) {
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="my-profile.html">${storedUsername}</a>`;
        }
    }
});




/*
document.addEventListener('DOMContentLoaded', () => {
    const precio = 100; // Precio del producto
    const cantidadInput = document.getElementById('cantidad');
    const subtotalDisplay = document.getElementById('subtotal');

    // Función para actualizar el subtotal
    function actualizarSubtotal() {
        const cantidad = parseInt(cantidadInput.value) || 0; // Obtiene la cantidad
        const subtotal = precio * cantidad; // Calcula el subtotal
        subtotalDisplay.textContent = subtotal; // Actualiza el subtotal en el DOM
    }

    // Evento que escucha cambios en el campo de cantidad
    cantidadInput.addEventListener('change', actualizarSubtotal);

    // Llamar a la función al cargar la página para mostrar el subtotal inicial
    actualizarSubtotal();
});
*/

