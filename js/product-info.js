// Obtener el ID de la categoría guardado en el localStorage
const catID = localStorage.getItem("catID");

if (catID) {
    // Construir la URL dinámicamente con el ID de la categoría
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

// Función para obtener y mostrar el producto
function fetchProduct() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        .then(data => {
            const productList = document.getElementById('product');

            // Obtener el ID del producto que seleccionó el usuario
            const selectedProductId = localStorage.getItem('selectedProductId');
            if (!selectedProductId) {
                productList.textContent = "No se seleccionó ningún producto";
                return;
            }

            // Buscar el producto por ID
            const selectedProduct = data.products.find(producto => producto.id == selectedProductId);

            if (selectedProduct) {
                // Crear el HTML para mostrar el producto
                const productDiv = document.createElement('div');
                productDiv.classList.add('selectedProduct');

                const productImage = document.createElement('img');
                productImage.src = selectedProduct.image;
                productImage.alt = selectedProduct.name;

                const productName = document.createElement('h2');
                productName.textContent = selectedProduct.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = selectedProduct.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `${selectedProduct.currency} $${selectedProduct.cost}`;

                const productCategory = document.createElement('p');
                productCategory.textContent = `Categoría: ${data.catName}`; // Asegúrate de que catName exista

                const productSold = document.createElement('p');
                productSold.textContent = `Vendidos: ${selectedProduct.soldCount}`;

                // Añadir los elementos al div del producto
                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productSold);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productCategory);

                // Añadir el producto al contenedor principal
                productList.appendChild(productDiv);
                // Cargar los comentarios del producto
                cargarComentarios(selectedProductId);
            } else {
                productList.textContent = "El producto seleccionado no existe.";
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
}

// Función para cargar los comentarios de un producto
function cargarComentarios(productId) {
    const comentariosUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
    
    fetch(comentariosUrl)
        .then(response => response.json())
        .then(data => {
            mostrarComentarios(data);
        })
        .catch(error => {
            console.error('Error al cargar los comentarios:', error);
        });
}

// Función para mostrar los comentarios en el HTML
function mostrarComentarios(comentarios) {
    const contenedorComentarios = document.getElementById('comentarios-producto');
    contenedorComentarios.innerHTML = '';  // Limpiar comentarios previos

    if (comentarios.length === 0) {
        contenedorComentarios.textContent = "No hay comentarios para este producto.";
        return;
    }

    comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario');
        
        comentarioDiv.innerHTML = `
            <p><strong>Usuario:</strong> ${comentario.user}</p>
            <p><strong>Calificación:</strong> ${comentario.score} ⭐</p>
            <p><strong>Comentario:</strong> ${comentario.description}</p>
            <p><em>${comentario.dateTime}</em></p>
        `;

        contenedorComentarios.appendChild(comentarioDiv);
    });
}

// Llamar a la función para cargar el producto cuando la página haya cargado
document.addEventListener('DOMContentLoaded', fetchProduct);
};

//Para ver el nombre de usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');

    // Si hay un nombre de usuario almacenado, actualizar el menú
    if (storedUsername) {
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="#">${storedUsername}</a>`;
        }
    }
});

