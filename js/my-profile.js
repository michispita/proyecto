document.getElementById("logout-btn").addEventListener("click", function() {
    //eliminar informacion de usuario al cerrar sesion
    localStorage.removeItem("usuario");

    //redirigir al login cuando se cierra
    window.location.href = "login.html";
  });
