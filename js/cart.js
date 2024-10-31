//Para ver el nombre de usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');

    // Si hay un nombre de usuario almacenado, actualizar el menú
    if (storedUsername) {
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="my-profile.html">${storedUsername}</a>`;
        }
    }
});


/*
document.addEventListener('DOMContentLoaded', () => {
    const precio = 100; // Precio del producto
    const cantidadInput = document.getElementById('cantidad');
    const subtotalDisplay = document.getElementById('subtotal');

    // Función para actualizar el subtotal
    function actualizarSubtotal() {
        const cantidad = parseInt(cantidadInput.value) || 0; // Obtiene la cantidad
        const subtotal = precio * cantidad; // Calcula el subtotal
        subtotalDisplay.textContent = subtotal; // Actualiza el subtotal en el DOM
    }

    // Evento que escucha cambios en el campo de cantidad
    cantidadInput.addEventListener('change', actualizarSubtotal);

    // Llamar a la función al cargar la página para mostrar el subtotal inicial
    actualizarSubtotal();
});
*/


//recuperar el prod agregado al carrito 
const productosSeleccionados = carts = JSON.parse(localStorage.getItem('cart'));
console.log(productosSeleccionados[0])
console.log(productosSeleccionados)

    /*en la constante de la url hay que suplantar la id del prod para poder recuperar la info
    para eso hay que acceder al indice de lo agurardado en el carrito, para poder acceder despues
    al id de ese indice y recien ahi suplantar ese id en la url que se fetchea  */

    /*let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];  
    cartItems.forEach(item => { console.log(`ID: ${item.id}, Nombre: ${item.name}, Precio: ${item.price}`); }); */

//espacio en el html
const carritoEspacio = document.getElementById("carritoEspacio");


function carritoVacio () { //se verifica si el carrito esta vacio
    if (productosSeleccionados.length === 0) {
        carritoEspacio.innerHTML += `
        <div class="alert alert-dark" role="alert">
            Aún no has seleccionado un producto!
        </div>
        `;
    } else {
        displayProd ();
        carritoEspacio.innerHTML += `
        <div class="final">
            <div class=col>
            <div class=row>
                <h3>Subtotal:</h3>
            </div>
            <div class=row>
                <h3>Sumatoria que tengo que ver como se hace</h3>
            </div>
            </div>
                <button type="button" class="btn btn-secondary">Checkout</button>
        </div>
        `;
    };
};

const displayProd = () => {
    carritoEspacio.innerHTML += '';
    carts.forEach(cart => {
        // Buscar el producto en el catálogo principal por su prodID
        const producto = productosSeleccionados.find(prod => prod.prodID === cart.prodID);

        if (producto) { // Solo mostrar si el producto existe en el catálogo
            const precioTotal = producto.cost * cart.quantity;

            carritoEspacio.innerHTML += `
            <div class="row">
                <div class="col">
                    <h2>${producto.name}</h2>
                    <img src="${producto.img}" alt="${producto.name}">
                    <p>Cantidad: ${cart.quantity}</p>
                </div>
                <div class="col">
                    <h2>Precio total: $${precioTotal}</h2>
                </div>
            </div>
            `;
        }
    });
}




carritoVacio ();


/* { //si hay productos se despliegan
    // Mostrar productos 
    let positionOfProd = carts.findIndex((index) => index.prodID == prodID)

    positionOfProd.forEach(producto => {
        carritoEspacio.innerHTML += `
        <div class="row">
            <div class="col">
                <h2>${producto.productName}</h2>
                <img src="${producto.productImage}" alt="${producto.productName}">
                <p>Cantidad: ${producto.cantidad}</p>
                <a href="#" class="badge badge-secondary">Cantidad</a> 
            </div>
            <div class="col">
                <h2>Precio total: $${producto.precioTotal}</h2>
            </div>
        </div>
        `;
    });
} */