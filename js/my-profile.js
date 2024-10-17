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


