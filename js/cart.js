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