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
function calcularSubtotal() {
    return carts.reduce((total, cart) => {
        const producto = productosSeleccionados.find(prod => prod.prodID === cart.prodID);
        return producto ? total + producto.cost * cart.quantity : total;
    }, 0);
}

function carritoVacio () { // Verifica si el carrito está vacío
    if (productosSeleccionados.length === 0) {
        carritoEspacio.innerHTML = `
        <div class="alert alert-dark" role="alert">
            ¡Aún no has seleccionado un producto!
        </div>
        `;
    } else {
        displayProd();
        
        const subtotal = calcularSubtotal(); // Calcula el subtotal

        carritoEspacio.innerHTML += `
        <div class="final">
            <div class="col">
                <div class="row">
                    <h3>Subtotal:</h3>
                </div>
                <div class="row">
                    <h3>$${subtotal}</h3> <!-- Muestra el subtotal aquí -->
                </div>
            </div>
            <button type="button" class="btn btn-secondary">Checkout</button>
        </div>
        `;
    }
}


const displayProd = () => {
    carritoEspacio.innerHTML = ''; // Reinicia el contenido
    carts.forEach((cart, index) => {
        // Buscar el producto en el catálogo principal por su prodID
        const producto = productosSeleccionados.find(prod => prod.prodID === cart.prodID);

        if (producto) { 
            const precioTotal = producto.cost * cart.quantity;

            carritoEspacio.innerHTML += `
            <div class="row">
                <div class="col">
                    <h2>${producto.name}</h2>
                    <img src="${producto.img}" alt="${producto.name}">

                    <!-- Botones de cantidad -->
                    <button onclick="updateQuantity(${index}, -1)">-</button>
                    <span id="quantityDisplay-${index}">${cart.quantity}</span>
                    <button onclick="updateQuantity(${index}, 1)">+</button>
                </div>
                <div class="col">
                    <h2>Precio total: $${precioTotal}</h2>
                </div>
            </div>
            `;
        }
    });
}


function updateQuantity(index, change) {
    const cart = carts[index];
    cart.quantity += change;

    // Esto va a hacer que la cantidad no sea menor a 1 
    if (cart.quantity < 1) cart.quantity = 1;

    // Actualiza el HTML de la cantidad y el precio total de ese producto
    document.getElementById(`quantityDisplay-${index}`).textContent = cart.quantity;

    // Esto va a actualizar el precio total del producto específico
    const producto = productosSeleccionados.find(prod => prod.prodID === cart.prodID);
    if (producto) {
        const precioTotal = producto.cost * cart.quantity;
        const precioTotalElemento = document.querySelectorAll(".col h2")[index * 2 + 1];
        precioTotalElemento.textContent = `Precio total: $${precioTotal}`;
    }

    //Con esto recalcula todo y va a actualizar el subtotal
    const subtotal = calcularSubtotal();
    document.querySelector(".final .row:nth-child(2) h3").textContent = `$${subtotal}`;
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