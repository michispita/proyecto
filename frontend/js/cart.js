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
        localStorage.setItem('subtotalCheck', subtotal);
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

    // si la cantidad no es menor a 1
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
    localStorage.setItem('cart', JSON.stringify(carts)); // USAR

    // Actualiza el carrito en la vista
    carritoVacio(); // Llama a esta función para actualizar el estado del carrito
}

// Desafiate carrito
function updateCartCount() {
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


function calcularCostoEnvio(subtotal, porcentajeEnvio) {
    return subtotal * porcentajeEnvio;
}

function actualizarModalCostos() {
    const subtotal = calcularSubtotal(); // esta arriba del todo
    const porcentajeEnvio = parseFloat(metodoEnvioSelect.value || 0); // valor selecionado
    const costoEnvio = calcularCostoEnvio(subtotal, porcentajeEnvio); // costo del envío
    const total = subtotal + costoEnvio; // calculado total

    // actu los valores en modal
    document.getElementById('subtotal').textContent = `Subtotal: $${subtotal.toFixed(2)} UYU`;
    document.getElementById('costEnvio').textContent = `Costo de Envío: $${costoEnvio.toFixed(2)} UYU`;
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)} UYU`;
}


btnCheckout.addEventListener('click', () => {
    actualizarModalCostos();
    modal.show(); // Muestra el modal
});

// abrir el modal
document.getElementById('modal').addEventListener('shown.bs.modal', () => {
})


// Sección Costos 
const metodoEnvioSelect = document.getElementById('metodoEnvio');
const espacioSubtotal = document.getElementById('subtotal');
const espacioTotal = document.getElementById('total');
const subtotalCheckout = parseFloat(localStorage.getItem('subtotalCheck')) || 0;
//Costo de envío (subtotal * porcentaje del envío seleccionado:Premium (0.15), Express (0.07) y Standard (0.05)

function actualizarTotal() {
    const porcentajeEnvio = parseFloat(metodoEnvioSelect.value); // Obtiene el porcentaje del envío
    const costoEnvio = subtotalCheckout * porcentajeEnvio; // Calcula el costo de envío
    const total = subtotalCheckout + costoEnvio; // Calcula el total

    // muestra el total actualizado
    espacioTotal.textContent = `Total: $${total.toFixed(2)} UYU`;
}

metodoEnvioSelect.addEventListener('change', actualizarTotal);

// da el total al cargar la página (en caso de que haya un valor preseleccionado)
document.addEventListener('DOMContentLoaded', actualizarTotal);

// finalizar compra y validaciones
document.addEventListener('DOMContentLoaded', function () {
    // recupera el botón y asigna el evento 
    const btnFinalizarCompra = document.getElementById("btnFinalizarCompra");
    if (btnFinalizarCompra) {
        btnFinalizarCompra.addEventListener("click", finalizarCompra);
    }
    metodoEnvioSelect.addEventListener('change', actualizarModalCostos);
    
});


// opciones de pago
const btnOpcionesPago = document.getElementById("btnOpcionesPago");
const opcionesPago = document.querySelectorAll(".formaPago-item");

let metodoPagoSeleccionado = "";  

// Agrega un evento a cada opción 
opcionesPago.forEach(opcion => {
    opcion.addEventListener("click", function(event) {
        event.preventDefault(); 

        // Actualiza el texto del botón 
        btnOpcionesPago.textContent = this.textContent;
        // Guarda
        metodoPagoSeleccionado = this.textContent;
    });
});


function finalizarCompra() {
    const inputDep = document.getElementById('inputDep').value.trim();
    const inputBarrio = document.getElementById('inputBarrio').value.trim();
    const inputCalle = document.getElementById('inputCalle').value.trim();
    const metodoEnvioSeleccionado = metodoEnvioSelect.value;
    let mensajeError = ""; // guarda errores para mostrarlos si falta algo

    //  dirección
    if (!inputDep || !inputBarrio || !inputCalle) {
        mensajeError += "Completa todos los campos de dirección.\n";
    }

    //  opción de pago 
    if (!metodoPagoSeleccionado) {
        mensajeError += "Selecciona una forma de pago.\n";
    }

    if (!metodoEnvioSeleccionado || parseFloat(metodoEnvioSeleccionado) === 0) {
        mensajeError += "Selecciona un método de envío.\n";
    }
    // cantidad de productos en el carrito
    const cantidadesValidas = carts.every(cart => cart.quantity > 0);
    if (!cantidadesValidas) {
        mensajeError += "Verifica las cantidades de cada producto en el carrito.\n";
    }

    // da errores o confirmar la compra
    if (mensajeError) {
        alert(mensajeError); 
    } else {
        // oculta el modal y confirma la compra
        modal.hide();
        alert("¡Compra finalizada con éxito!");
    }
}

document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);


function eliminarProducto(index) {
    // aqui se elimina el producto del array 'carts'
    carts.splice(index, 1);

    // Actualizamos el localStorage
    localStorage.setItem('cart', JSON.stringify(carts));

    // Recalculamos el subtotal
    const subtotal = calcularSubtotal();
    localStorage.setItem('subtotalCheck', subtotal);

    // Actualizamos la vista del carrito
    carritoVacio(); 
    updateCartCount(); // Actualizamos el badge con la cantidad total
}

