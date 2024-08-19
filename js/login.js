
const button = document.getElementById('but'); //creamos la constante del boton

button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita que el formulario se envíe

    const usuario = document.getElementById('user').value; //contante de los campos
    const password = document.getElementById('pass').value;

    if (!usuario || !password) {  //condicion para redirigir
        alert("Los campos deben estar llenos");
    } else {
        window.location.href = "index.html";
    }
});

/* aquí, la funcion saveloguin (que en este caso es anonima), almacenará las credenciales de el usuario.
En la funcion podemos ver que se definen dos constantes (userkey y passwordkey) que sirven como claves
para almacenar valores en el almacenamiento local del navegador,el (localstorage)*/

let saveLogin = function (usuario, password) {
    const userkey = "user_key";
    const passwordkey = "password_key";

    localStorage.setItem(userkey, usuario);
    localStorage.setItem(passwordkey, password);
}


