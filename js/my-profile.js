//script de validacion
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()

const nombre = document.getElementById("nombre");
const segNombre = document.getElementById("segNombre");
const apellido = document.getElementById("apellido");
const segApellido = document.getElementById("segApellido");
const email = document.getElementById("email");
const contacto = document.getElementById("contacto");
const modo = document.getElementsByClassName("mode");
const btnGuardar = document.getElementsByClassName("userbtn");


btnGuardar.addEventListener('submit', function (event) {
    verificar () {
    
        if (!) {
    
          } else {
            
          }
        };



    });
