// Obtener el ID del producto y la categoría guardados en el localStorage
const prodID = localStorage.getItem("selectedProductId");
const catID = localStorage.getItem("catID");

let carts = [];

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
                    <p>Categoría: ${data.category}</p>
                `;

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

                    // Procesar los productos relacionados
                    data.relatedProducts.forEach((productoRelacionado, index) => {
                        const carouselItem = document.createElement('div');
                        carouselItem.classList.add('carousel-item');
                        if (index === 0) carouselItem.classList.add('active'); // Activar el primer producto del carrusel

                        // Crear el contenido de cada producto relacionado
                        carouselItem.innerHTML = `
                            <div class="related-product" class="d-block w-100">
                                <img id="carouselimg" src="${productoRelacionado.image}" alt="${productoRelacionado.name}">
                                <p>${productoRelacionado.name}</p>
                            </div>
                        `;

                        // Añadir un evento de clic para redirigir al producto relacionado
                        carouselItem.addEventListener('click', () => {
                            // Guardar el ID del producto relacionado en el localStorage y redirigir
                            localStorage.setItem('selectedProductId', productoRelacionado.id);
                            window.location.href = 'product-info.html'; 
                        });

                        // Agregar el producto al carrusel de productos relacionados
                        document.getElementById('carouselRelatedProducts').appendChild(carouselItem);
                    });

                // Cargar los comentarios del producto
                cargarComentarios(prodID);
                document.getElementById('btn-comprar').addEventListener('click', () => {
                    addToCart(prodID);
                });

                const addToCart = (prodID) => {
                    let positionThisProdInCart = carts.findIndex((value) => value.prodID == prodID)
                    if(carts.length <= 0) {
                        carts = [{
                            prodID: prodID,
                            quantity: 1,
                            name: data.name,
                            img: data.images[0],
                            cost: data.cost,
                            currency: data.currency
                        }]
                    } else if(positionThisProdInCart < 0){
                        carts.push({
                            prodID: prodID,
                            quantity: 1,
                            name: data.name,
                            img: data.images[0],
                            cost: data.cost,
                            currency: data.currency
                        });
                    } else {
                        carts[positionThisProdInCart].quantity = carts[positionThisProdInCart].quantity + 1;
                    }
                    console.log(carts)
                    addCartToMemory();
                };

                const addCartToMemory = () => {
                    localStorage.setItem('cart', JSON.stringify(carts));
                };

                console.log(localStorage.getItem('cart'))
        
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

 // agregar comentarios de json a la lista de comentarios
    listaComentarios = comentarios;

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
            usernameMenuItem.innerHTML = `<a class="nav-link" href="my-profile.html">${storedUsername}</a>`;
        }
    });
} else {
    console.error('No hay producto seleccionado.');
}

/*DESAFIATE ENTREGA 4*/

//  lista vacia para guardar los comentarios
let listaComentarios = [];

//  agregar calificación y comentario
function agregarComentario() {
    let score = 0; // si no se selecciona ninguno, queda 0 por defecto

    //estrellas que puede seleccionar el usuario
    const calificaciones = document.getElementsByName('rating');

    //buscamos cual selecciono el usuario
    for (let i = 0; i < calificaciones.length; i++) {
        if (calificaciones[i].checked) {
            score = calificaciones[i].value; // se guarda la calificacion
            console.log("Calificación seleccionada:", score);
        }
    }

    // obtenemos comentario que se escribio
    const comentarioInput = document.getElementsByClassName('review')[0].getElementsByTagName('textarea')[0];
    const comentarioText = comentarioInput.value || 'Sin comentario'; // si no hay comentario, por defecto 'sin comentario'

    // creamos un objeto con calificacion, comentario y fecha
    const nuevoComentario = {
        user: localStorage.getItem('username'), // el usuario cambia en base al local storage
        score: score, //calificacion en estrellas que selecciono usuario
        description: comentarioText, // comentario que ingreso el usuario
        dateTime: new Date().toLocaleString() // fecha y hora actual
    };
  

    //agregamos comentario
    /* listaComentarios.push(nuevoComentario); */
    listaComentarios.push(nuevoComentario);

      console.log(listaComentarios);

    // mostramos comentario nuevo
    mostrarComentarios(listaComentarios);

    // se limpia el campo de texyo y estrellas
    comentarioInput.value = '';
    for (let i = 0; i < calificaciones.length; i++) {
        calificaciones[i].checked = false;
    }
}

// le damos funcionalidad al boton enviar
const enviarBtn = document.getElementsByClassName('submit-btn')[0];
if (enviarBtn) {
    enviarBtn.addEventListener('click', agregarComentario);
    window.location.href = 'cart.html';
}

// probando temas modo oscuro
  // Aplicar el tema guardado en localStorage en la carga de la página
  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-bs-theme", savedTheme);
  });


