document.addEventListener("DOMContentLoaded", function(){
    /*Aqui agregue un condicional if, que va a verificar si el usuario está logueado, mediante la funcion checklogin, si está
    logueado, establece eventos en 3 elementos para redirigir a una página de productos, 
    y si no está logueado va a redirigir al usuario al loguin*/
    
     if (checkLogin()) { 
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
  } else {
        window.location = "login.html"
    }
});
/* Esta funcion verifica si el usuario esta logueado, revisando si exsiten ciertas claves en el localstorage, en este caso busca las claves 
(user-key  y password-key)*/

let checkLogin = function(){
    const userkey = "user_key";
    const passwordkey = "password_key";

    const user = localStorage.getItem(userkey);
    const password = localStorage.getItem(passwordkey);

    const isLogged = user !== null && password !== null;
    return isLogged;
}
