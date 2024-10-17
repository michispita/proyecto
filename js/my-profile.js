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
  const nombre = document.getElementById("nombre").value;
  const segNombre = document.getElementById("segNombre").value;
  const apellido = document.getElementById("apellido").value;
  const segApellido = document.getElementById("segApellido").value;
  const email = document.getElementById("email").value;
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

  // actualizar el nombre y apellido en el div .userName
  function actualizarNombreApellido() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
  
    const userNameDiv = document.querySelector(".userName h2");
  
    // Actualizamos el contenido del <h2> con el nombre y apellido ingresados
    userNameDiv.textContent = nombre + " " + apellido;
  };

  actualizarNombreApellido();

};

  // función para cargar los datos guardados en localStorage cuando se carga la página
  function cargarDatos() {
    const datosGuardados = localStorage.getItem("datosUsuario");
  
    if (datosGuardados) {
      // convertimos el string de vuelta a un objeto
      const datosUsuario = JSON.parse(datosGuardados);
  
      // Actualizamos los campos del formulario con los datos guardados
      document.getElementById("nombre").value = datosUsuario.nombre;
      document.getElementById("segNombre").value = datosUsuario.segNombre;
      document.getElementById("apellido").value = datosUsuario.apellido;
      document.getElementById("segApellido").value = datosUsuario.segApellido;
      document.getElementById("email").value = datosUsuario.email;
      document.getElementById("contacto").value = datosUsuario.contacto;
  
      // actualizamos el div .userName con el nombre y apellido
      const userNameDiv = document.querySelector(".userName h2");
      userNameDiv.textContent = `${datosUsuario.nombre} ${datosUsuario.apellido}`;
    };
  };
  
  console.log(cargarDatos);
  
  // llamamos a cargarDatos() cuando la página se carga
  window.onload = cargarDatos;





const btnGuardar= document.getElementsByClassName("userbtn"); // boton guarda cambios definidos en el perfil del usuario.
const htmlProInfo= document.getElementById("proBody"); // agrege id en la etiqueta html del archivo de product-info.html
const checkbox= document.getElementById("toggle");
let modo;
let darkmode= localStorage.setItem("mode","darkmode")
const themeSwitch= document.getElementById("toggle")
    
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
 themeSwitch.addEventListener("change", ()=>{    //NO OLVIDAR agregar addevent al btnGuardar
  darkmode=localStorage.getItem("darkmode")
  darkmode!=="active"? enableDarkmode() : disableDarkmode() //zzz? xxx : xxy same sintax if(zzz){xxx} else{xxy}
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

