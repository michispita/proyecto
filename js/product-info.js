// Obtener el ID de la categoría guardado en el localStorage
const prodID = localStorage.getItem("selectedProductId");
const catID = localStorage.getItem("catID");

if (prodID) {
    // Construir la URL dinámicamente con el ID de la categoría
    const url = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

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

            const selectedProduct = data;

            if (selectedProduct) {
                // Crear el HTML para mostrar el producto
                const productDiv = document.createElement('div');
                productDiv.classList.add('selectedProduct');

                const productImage = document.createElement('img');
                productImage.src = selectedProduct.images[0];
                productImage.alt = selectedProduct.name;

                const productName = document.createElement('h2');
                productName.textContent = selectedProduct.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = selectedProduct.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `${selectedProduct.currency} $${selectedProduct.cost}`;

                const productCategory = document.createElement('p');
                productCategory.textContent = `Categoría: ${catID}`; 

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
          // Crear las estrellas dinámicamente según la calificación del comentario
          const estrellasDiv = document.createElement('div');
          estrellasDiv.classList.add('rating-static');
  
          for (let i = 1; i <= 5; i++) {
              const estrella = document.createElement('label');
              estrella.classList.add('star');
              estrella.textContent = '★'; // Mostrar la estrella
  
              // Rellenar la estrella si está por debajo o igual a la calificación
              if (i <= comentario.score) {
                  estrella.classList.add('filled');
              }
  
              estrellasDiv.appendChild(estrella);
          }

                comentarioDiv.innerHTML = `
                <div class="header-comentario">
                  <span class="usuario">${comentario.user}</span>
                  <div class="rating-static">
                  <p>Calificación:</p>
                    ${estrellasDiv.innerHTML}
                  </div>
                  <p class="fecha"><em>${comentario.dateTime}</em></p>
                </div>
                <p class="comentario-texto">${comentario.description}</p>
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

