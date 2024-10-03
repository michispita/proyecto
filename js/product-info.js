// Obtener el ID del producto y la categoría guardados en el localStorage
const prodID = localStorage.getItem("selectedProductId");
const catID = localStorage.getItem("catID");

if (prodID) {
    const url = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

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
                const carouselImages = document.getElementById('carouselImages');

                // Limpiar el contenido previo
                productList.innerHTML = '';
                carouselImages.innerHTML = ''; // Asegúrate de limpiar el carrusel también

                if (!data) {
                    productList.textContent = "El producto seleccionado no existe.";
                    return;
                }

                // Crear el HTML para mostrar el producto
                const productDiv = document.createElement('div');
                productDiv.classList.add('selectedProduct');

                productDiv.innerHTML = `
                    <h2>${data.name}</h2>
                    <p>${data.currency} $${data.cost}</p>
                    <p>Vendidos: ${data.soldCount}</p>
                    <p>${data.description}</p>
                    <p>Categoría: ${catID}</p> 
                `;                 // Muestra en numero de categoria, no el nombre? Acceder a category.name por lista currentCategoriesArray[1] def en categories.js?

                // Añadir el producto al contenedor principal
                productList.appendChild(productDiv);

                // Cargar las imágenes en el carrusel
                data.images.forEach((imagen, index) => {
                    const carouselItem = document.createElement('div');
                    carouselItem.classList.add('carousel-item');
                    if (index === 0) carouselItem.classList.add('active'); // La primera imagen debe estar activa por defecto

                    carouselItem.innerHTML = `<img src="${imagen}" class=".d-block w-100" alt="Imagen ${index + 1}">`;
                    carouselImages.appendChild(carouselItem);
                });

                // Cargar los comentarios del producto
                cargarComentarios(prodID);
            })
            .catch(error => {
                console.error('Hubo un problema con la petición:', error);
            });
    }

    document.addEventListener('DOMContentLoaded', fetchProduct);

    function cargarComentarios(productId) {
        const comentariosUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;

        fetch(comentariosUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar comentarios');
                }
                return response.json();
            })
            .then(data => {
                mostrarComentarios(data);
            })
            .catch(error => {
                console.error('Error al cargar los comentarios:', error);
            });
    }

    function mostrarComentarios(comentarios) {
        const contenedorComentarios = document.getElementById('comentarios-producto');
        contenedorComentarios.innerHTML = '';  // Limpiar comentarios previos

        if (!comentarios || comentarios.length === 0) {
            contenedorComentarios.textContent = "No hay comentarios para este producto.";
            return;
        }

        comentarios.forEach(comentario => {
            const comentarioDiv = document.createElement('div');
            comentarioDiv.classList.add('comentario');

            const estrellasDiv = document.createElement('div');
            estrellasDiv.classList.add('rating-static');

            for (let i = 1; i <= 5; i++) {
                const estrella = document.createElement('label');
                estrella.classList.add('star');
                estrella.textContent = '★';

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

    document.addEventListener('DOMContentLoaded', function () {
        const storedUsername = localStorage.getItem('username');
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (storedUsername && usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="#">${storedUsername}</a>`;
        }
    });
} else {
    console.error('No hay producto seleccionado.');
}
