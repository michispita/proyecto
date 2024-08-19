
const button = document.getElementById('but'); //creamos la constante del boton

button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe

    const usuario = document.getElementById('user').value; //contante de los campos
    const password = document.getElementById('pass').value;

    if (usuario && password) {
        sessionStorage.setItem('authenticatedUser', usuario);

        // Redirige al usuario a la página principal
        window.location.href = "index.html";
    } else {
        alert("Los campos deben estar llenos");
    }
});
