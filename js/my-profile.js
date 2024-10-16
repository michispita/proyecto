

const btnGuardar= document.getElementsByClassName("userbtn"); // boton guarda cambios definidos en el perfil del usuario.
const htmlProInfo= document.getElementById("htmlProInfo"); // agrege id en la etiqueta html del archivo de product-info.html
const checkbox= document.getElementById("toggle");
let modo;

// Cargar la preferencia del usuario al iniciar
document.addEventListener("DOMContentLoaded", () => {
    const userPref = localStorage.getItem("userPref");
    if (userPref) {
        htmlProInfo.setAttribute("data-bs-theme", userPref);
        checkbox.checked = userPref === "dark"; // Sincronizar el estado del checkbox
    }
});

// Escuchar el cambio en el checkbox
checkbox.addEventListener("change", function guardarCambios() {
    if (checkbox.checked) {
        modo = "dark";
    } else {
        modo = "light";
    }
    
    // Cambiar el atributo del tema
    htmlProInfo.setAttribute("data-bs-theme", modo);
    
    // Guardar la preferencia en localStorage
    localStorage.setItem("userPref", modo);
    console.log(localStorage);
});


