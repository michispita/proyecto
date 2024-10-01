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
                    <p>${data.description}</p>
                    <p>${data.currency} $${data.cost}</p>
                    <p>Vendidos: ${data.soldCount}</p>
                    <p>Categoría: ${catID}</p>
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
// Llamar a la función para cargar el producto cuando la página haya cargado
document.addEventListener('DOMContentLoaded', fetchProduct);
};

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
        user: 'Usuario', // queda fijo 'usuario'
        score: score, //calificacion en estrellas que selecciono usuario
        description: comentarioText, // comentario que ingreso el usuario
        dateTime: new Date().toLocaleString() // fecha y hora actual
    };
    console.log("Comentario creado:", nuevoComentario);

    //agregamos comentario
    listaComentarios.push(nuevoComentario);

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
}

//Para ver el nombre de usuario
document.addEventListener('DOMContentLoaded', function () {
    // Obtener el nombre de usuario almacenado
    const storedUsername = localStorage.getItem('username');

    // Si hay un nombre de usuario almacenado, actualizar el menú
    if (storedUsername) {
>>>>>>> 383227bc3343e763104f074ad123b7be1145b016
        const usernameMenuItem = document.getElementById('username-menu-item');
        if (storedUsername && usernameMenuItem) {
            usernameMenuItem.innerHTML = `<a class="nav-link" href="#">${storedUsername}</a>`;
        }
    });
} else {
    console.error('No hay producto seleccionado.');
}
