document.addEventListener("DOMContentLoaded", function () {
    // Verifica la autenticación al cargar la página
    if (!checkAuthentication()) {
        // Redirige a la página de inicio de sesión si el usuario no está autenticado
        window.location.href = "login.html";
    } else {
        // Configura los eventos de los botones solo si el usuario está autenticado
        setupEventListeners();
    }
});

// Función para verificar la autenticación
function checkAuthentication() {
    const authUser = sessionStorage.getItem('authenticatedUser');
    return authUser !== null;
}

// Configura los eventos de los botones
function setupEventListeners() {
    document.getElementById("autos").addEventListener("click", function () {
        localStorage.setItem("catID", 101);
        window.location.href = "products.html";
    });

    document.getElementById("juguetes").addEventListener("click", function () {
        localStorage.setItem("catID", 102);
        window.location.href = "products.html";
    });

    document.getElementById("muebles").addEventListener("click", function () {
        localStorage.setItem("catID", 103);
        window.location.href = "products.html";
    });
}

});

