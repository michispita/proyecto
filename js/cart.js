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
const productosSeleccionados = JSON.parse(localStorage.getItem('prodSeleccionados')) || [];
//le puse ese nombre pero depdende de como se guarde, deberia ser un conjunto de objs
const carritoEspacio = document.getElementById("carritoEspacio");

// Función para agrupar productos y contar la cantidad
function agruparProductos(productos) {
    const productosAgrupados = {};

    productos.forEach(producto => {
        if (productosAgrupados[producto.productName]) {
            productosAgrupados[producto.productName].cantidad += 1;
            productosAgrupados[producto.productName].precioTotal += producto.productPrice;
        } else {
            productosAgrupados[producto.productName] = {
                ...producto,
                cantidad: 1,
                precioTotal: producto.productPrice
            };
        }
    });

    return productosAgrupados;
};

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

function displayProd () { //si hay productos se despliegan
    // Agrupar los productos
    const productosAgrupados = agruparProductos(productosSeleccionados);

    // Mostrar productos agrupados
    Object.values(productosAgrupados).forEach(producto => {
        carritoEspacio.innerHTML += `
        <div class="row">
            <div class="col">
                <h2>${producto.productName}</h2>
                <img src="${producto.productImage}" alt="${producto.productName}">
                <p>Cantidad: ${producto.cantidad}</p>
                <a href="#" class="badge badge-secondary">Cantidad</a> 
            </div>
            <div class="col">
                <h2>Precio total: $${producto.precioTotal.toFixed(2)}</h2>
            </div>
        </div>
        `;
    });
}

carritoVacio ();