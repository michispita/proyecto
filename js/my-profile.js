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

// Script de validación de Bootstrap
(() => {
  'use strict'

  const forms = document.querySelectorAll('.needs-validation')

  // Recorremos todos los formularios que tienen la clase needs-validation
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // Si el formulario no es válido
      if (!form.checkValidity()) {
        event.preventDefault() // Prevenimos el envío del formulario
        event.stopPropagation() // Evitamos la propagación del evento
      } else {
        // Si el formulario es válido, llamamos a la función para guardar los datos
        guardarDatos();
      }
      // Añadimos la clase 'was-validated' para mostrar los estilos de validación de Bootstrap
      form.classList.add('was-validated')
    }, false)
  })
})();



// para poder guardar datos en el localStorage
function guardarDatos() {

  //recuperamos el mail que ingreso el usuario al principio del login
  const storedUsername = localStorage.getItem("username");
  if (!storedUsername) {
    alert("No se encontró un storedUsername. Asegúrate de haber iniciado sesión correctamente.");
    return;
  };


  const nombre = document.getElementById("nombre").value;
  const segNombre = document.getElementById("segNombre").value;
  const apellido = document.getElementById("apellido").value;
  const segApellido = document.getElementById("segApellido").value;
        //const email = document.getElementById("email").value;
  //sustituimos en el email ese ingreso
  const email = storedUsername;
  const contacto = document.getElementById("contacto").value;


  // creamos un objeto con los datos del formulario
  const datosUsuario = {
    nombre: nombre,
    segNombre: segNombre,
    apellido: apellido,
    segApellido: segApellido,
    email: email,
    contacto: contacto
  };

  // se gudarda el obj en el localStorage como un string usando el stringify
  localStorage.setItem("datosUsuario", JSON.stringify(datosUsuario));

  console.log(localStorage.getItem("datosUsuario"));

  actualizarNombreApellido();

};





  // actualizar el nombre y apellido en el div .userName
  function actualizarNombreApellido() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
  
    const userNameDiv = document.querySelector(".userName h2");
  
    userNameDiv.textContent = nombre + " " + apellido;
  };


  // función para cargar los datos guardados en localStorage cuando se carga la página
  function cargarDatos() {
    const storedUsername = localStorage.getItem("username");
      // Si existe storedUsername, llenamos el campo email
  if (storedUsername) {
    document.getElementById("email").value = storedUsername;
  } else {
    document.getElementById("email").value = '';
  } 

    const datosGuardados = localStorage.getItem("datosUsuario");
  
    if (datosGuardados) {
      // convertimos el string de vuelta a un objeto
      const datosUsuario = JSON.parse(datosGuardados);
  
      // Actualizamos los campos del formulario con los datos guardados
      document.getElementById("nombre").value = datosUsuario.nombre || '';
      document.getElementById("segNombre").value = datosUsuario.segNombre || '';
      document.getElementById("apellido").value = datosUsuario.apellido || '';
      document.getElementById("segApellido").value = datosUsuario.segApellido || '';
      //document.getElementById("email").value = datosUsuario.email;
      document.getElementById("contacto").value = datosUsuario.contacto || '';
  
      // actualizamos el div .userName con el nombre y apellido
      const userNameDiv = document.querySelector(".userName h2");
      userNameDiv.textContent = `${datosUsuario.nombre} ${datosUsuario.apellido}`;
    };
  };


  
  
  // llamamos a cargarDatos() cuando la página se carga
  window.onload = cargarDatos;



/*
const btnGuardar= document.getElementsByClassName("userbtn"); // boton guarda cambios definidos en el perfil del usuario.

const htmlProInfo= document.getElementById("htmlProInfo"); // agrege id en la etiqueta html del archivo de product-info.html
const htmlProfile= document.getElementById("htmlProfile");
let checkbox= document.getElementById("checkbox");
let modo;
let darkmode= localStorage.setItem("mode","darkmode")
const themeSwitch= document.getElementById("checkbox")
   

const htmlProInfo= document.getElementById("proBody"); // agrege id en la etiqueta html del archivo de product-info.html
const checkbox= document.getElementById("toggle");

let darkmode= localStorage.getItem("darkmode")


const enableDarkmode= () =>{
// document.body.classList.add("darkmode")
htmlProfile.classList.add("darkmode")
localStorage.setItem("darkmode","active")
}

const disableDarkmode= () => {
    htmlProfile.classList.remove("darkmode")
    localStorage.setItem("darkmode", null)
}
if(darkmode==="active") {
    enableDarkmode()
}
 /*themeSwitch.addEventListener("change", ()=>{    //NO OLVIDAR agregar addevent al btnGuardar
  darkmode=localStorage.getItem("darkmode")
  darkmode!=="active"? enableDarkmode() : disableDarkmode() //zzz? xxx : xxy same sintax if(zzz){xxx} else{xxy}
 });


/*Cargar la preferencia del usuario al iniciar

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
}); */

/*Escuchar el cambio en el checkbox
checkbox.addEventListener("change", () => {
    //alert("Entro");
   if (checkbox.checked) {
        htmlProfile.setAttribute("data-bs-theme","dark" );
    } else {
       htmlProfile.setAttribute("data-bs-theme","light" );
    }
   /* 
    // Cambiar el atributo del tema
    htmlProInfo.setAttribute("data-bs-theme", modo);
    
    // Guardar la preferencia en localStorage
    localStorage.setItem("userPref", modo);

    console.log(localStorage); 
});*/



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

// Probando el modo oscuro y claro Meli
  // Funcionalidad de cambio de modo oscuro y claro

  const globalToggle = document.getElementById("globalThemeToggle");

  // Cargar el tema actual desde localStorage
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    globalToggle.checked = savedTheme === "dark"; // Ajusta el toggle según el tema guardado
  });

  // Guardar el tema seleccionado en localStorage sin afectar el perfil
  globalToggle.addEventListener("change", () => {
    const theme = globalToggle.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    alert(`Has cambiado el tema global a ${theme}. Este cambio afectará otras páginas, pero no el perfil.`);
  });
