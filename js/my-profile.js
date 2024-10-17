
/*
const btnGuardar= document.getElementsByClassName("userbtn"); // boton guarda cambios definidos en el perfil del usuario.
const htmlProInfo= document.getElementById("proBody"); // agrege id en la etiqueta html del archivo de product-info.html
const checkbox= document.getElementById("toggle");

let darkmode= localStorage.getItem("darkmode")

const enableDarkmode= () =>{
// document.body.classList.add("darkmode")
htmlProInfo.classList.add("darkmode")
localStorage.setItem("darkmode","active")
}

const disableDarkmode= () => {
    htmlProInfo.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}
if(darkmode==="active") {
    enableDarkmode()
}
 /*themeSwitch.addEventListener("change", ()=>{    //NO OLVIDAR agregar addevent al btnGuardar
  darkmode=localStorage.getItem("darkmode")
  darkmode!=="active"? enableDarkmode() : disableDarkmode() //zzz? xxx : xxy same sintax if(zzz){xxx} else{xxy}
 });

checkbox.addEventListener("change", () => {
    darkmode = localStorage.getItem("darkmode");
    darkmode !== "active" ? enableDarkmode() : disableDarkmode();
  });
/* Cargar la preferencia del usuario al iniciar
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
*/

// Cambio de Imagen de perfil

const inputFotoPerfil = document.getElementById("inputFotoPerfil");
const fotoPerfil = document.getElementById("fotoPerfil");
const btnGuardar = document.getElementsByClassName("userbtn")[0];

// Función para cargar la imagen seleccionada y mostrarla inmediatamente
fotoPerfil.addEventListener("click", function () {
    inputFotoPerfil.click(); 
  });

inputFotoPerfil.addEventListener("change", function () {
  const file = inputFotoPerfil.files[0];
  
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const imagenBase64 = e.target.result;
      fotoPerfil.src = imagenBase64; // Muestra la imagen en la página
      localStorage.setItem("fotoPerfil", imagenBase64); // Guardar la imagen en localStorage
    };
    reader.readAsDataURL(file); // Leer la imagen como base64
  }
});

// Cargala imagen de perfil guardada en localStorage 
window.addEventListener("DOMContentLoaded", function () {
  const imagenGuardada = localStorage.getItem("fotoPerfil");
  if (imagenGuardada) {
    fotoPerfil.src = imagenGuardada; // Muestra la imagen 
  }
});


// Guardar cambios del usuario
btnGuardar.addEventListener("click", function () {
  alert("¡Cambios guardados!"); //Le puse un alert porque no sabia si guardaba 
});
