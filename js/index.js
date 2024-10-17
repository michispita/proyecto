document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

//Para ver el nombre de usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');
    // Sino hay un nombre de usuario lo manda al login
    if (!storedUsername) {
        window.location.href = 'login.html';
    } else {
            // Si hay un nombre de usuario almacenado, actualizar el menú
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="my-profile.html">${storedUsername}</a>`;
        }
    }
});

 // Elementos del DOM
 const usernameBtn = document.getElementById('usernameBtn');
 const dropdownMenu = document.getElementById('dropdownMenu');

 // Mostrar/ocultar el menú al hacer clic en el botón de usuario
 usernameBtn.addEventListener('click', function() {
     dropdownMenu.classList.toggle('show');
 });

 // Cerrar el menú si se hace clic fuera de él
 window.addEventListener('click', function(event) {
     if (!usernameBtn.contains(event.target)) {
         dropdownMenu.classList.remove('show');
     }
 });