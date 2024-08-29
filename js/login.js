
document.addEventListener('DOMContentLoaded', function () {
const button = document.getElementById('but'); //creamos la constante del boton

button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe

    const usuario = document.getElementById('user').value; //contante de los campos
    const password = document.getElementById('pass').value;

    if (!usuario || !password) {  //condicion para redirigir
        alert("Los campos deben estar llenos");
    } else {
        // Guarda el nombre de usuario en el almacenamiento local
        localStorage.setItem('username', usuario);

        // Redirige a la página principal
        window.location.href = "index.html";
     }
 });
 });



let saveLogin = function (usuario, password) {
    const userkey = "user_key";
    const passwordkey = "password_key";

    localStorage.setItem(userkey, usuario);
    localStorage.setItem(passwordkey, password);
}



