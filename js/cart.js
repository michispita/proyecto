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
        <div class="row align-items-start" id="carritoFinal">
            <div class="col">
                    <h3>Subtotal:</h3>
            </div>
            <div class="col">
                    <h3>$${subtotal} UYU</h3> <!-- Muestra el subtotal aquí -->
            </div>
            <div class="row">
                        <button type="button" class="btn btn-light" id="btnCheckout">Checkout</button>
            </div>
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
            <div class="row" id="prodCarritoDiv">
                <div class="col">
                    <h2 class="prodCarritoName">${producto.name}</h2>
                    <img src="${producto.img}" alt="${producto.name}" class="prodCarritoImg">
            
                    <!-- Botones de cantidad -->

                    <div class="prodCarritoQuantity d-flex align-items-center">

                        <button onclick="updateQuantity(${index}, -1)">-</button>
                        <span id="quantityDisplay-${index}">${cart.quantity}</span>
                        <button onclick="updateQuantity(${index}, 1)">+</button>
                        
                        <!-- Ícono de basura -->
                     <button onclick="eliminarProducto(${index})" class="btn btn-danger ms-3 btn-trash">
                      <i class="fas fa-trash"></i>
                     </button>
                    </div>
                </div>
                <div class="col">
                    <h2 class="prodCarritoTotal">$${precioTotal}</h2>
                </div>
            </div>
            `;
        }
    });
}


function updateQuantity(index, change) {
    const cart = carts[index];
    cart.quantity += change;

    // Asegúrate de que la cantidad no sea menor a 1
    if (cart.quantity < 1) cart.quantity = 1;

    // Actualiza el HTML de la cantidad
    document.getElementById(`quantityDisplay-${index}`).textContent = cart.quantity;

    // Actualiza el precio total del producto específico
    const producto = productosSeleccionados.find(prod => prod.prodID === cart.prodID);
    if (producto) {
        const precioTotal = producto.cost * cart.quantity;
        const precioTotalElemento = document.querySelectorAll(".col h2")[index * 2 + 1];
        precioTotalElemento.textContent = `$${precioTotal}`; // Muestra el precio total correcto
    }

    // Recalcula el subtotal y actualiza el elemento correspondiente
    const subtotal = calcularSubtotal();
    const subtotalElement = document.querySelector("#carritoFinal h3:nth-child(2)");
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal} UYU`; // Actualiza el subtotal en el DOM
    }

    // Actualiza localStorage
    localStorage.setItem('cart', JSON.stringify(carts));

    // Actualiza el carrito en la vista
    carritoVacio(); // Llama a esta función para actualizar el estado del carrito
}

// Desafiate carrito
function updateCartCount() {
    let carts = JSON.parse(localStorage.getItem('cart')) || [];
    let totalItems = 0;

    // Sumar la cantidad de todos los productos en el carrito
    carts.forEach(item => {
        totalItems += item.quantity;
    });

    // Actualizar el contador en el icono del carrito
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Llama la funcion
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

carritoVacio ();

//Modal
const modal = new bootstrap.Modal(document.getElementById('modal'));
const inputModal = document.getElementById('inputModal');
const btnCheckout = document.getElementById('btnCheckout');

btnCheckout.addEventListener('click', () => {
    modal.show(); // Muestra el modal
});

// abrir el modal
document.getElementById('modal').addEventListener('shown.bs.modal', () => {
})
