document.addEventListener("DOMContentLoaded", function () {
    if (checkLogin()) {
        document.getElementById("autos").addEventListener("click", function () {
            localStorage.setItem("catID", 101);
            window.location = "products.html"
        });
        document.getElementById("juguetes").addEventListener("click", function () {
            localStorage.setItem("catID", 102);
            window.location = "products.html"
        });
        document.getElementById("muebles").addEventListener("click", function () {
            localStorage.setItem("catID", 103);
            window.location = "products.html"
        });
    } else {
        window.location = "login.html"
    }

});

let checkLogin = function(){
    const userkey = "user_key";
    const passwordkey = "password_key";

    const user = localStorage.getItem(userkey);
    const password = localStorage.getItem(passwordkey);

    const isLogged = user !== null && password !== null;
    return isLogged;
}

