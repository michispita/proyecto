// Obtener el ID del producto y la categoría guardados en el localStorage
const prodID = localStorage.getItem("selectedProductId");
const catID = localStorage.getItem("catID");
const userId = 1; // ID de usuario fijo (para simplificar)
const backendUrl = "http://localhost:3000/api"; // URL base del backend

let carts = [];

if (prodID) {
    const url = `https://japceibal.github.io/emercado-api/products/${prodID}.json`;

    async function fetchProduct() {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error en la petición");

            const data = await response.json();
            const productList = document.getElementById("product");
            const carouselImages = document.getElementById("carouselImages");

            // Limpiar el contenido previo
            productList.innerHTML = "";
            carouselImages.innerHTML = "";

            if (!data) {
                productList.textContent = "El producto seleccionado no existe.";
                return;
            }

            // Crear el HTML para mostrar el producto
            const productDiv = document.createElement("div");
            productDiv.classList.add("selectedProduct");

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
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) carouselItem.classList.add("active");

                carouselItem.innerHTML = `<img src="${imagen}" class="d-block w-100" alt="Imagen ${index + 1}">`;
                carouselImages.appendChild(carouselItem);
            });

            // Procesar los productos relacionados
            const relatedProductsContainer = document.getElementById("carouselRelatedProductsInner");
            relatedProductsContainer.innerHTML = ""; // Limpia los productos relacionados
            data.relatedProducts.forEach((productoRelacionado, index) => {
                const carouselItem = document.createElement("div");
                carouselItem.classList.add("carousel-item");
                if (index === 0) carouselItem.classList.add("active");

                carouselItem.innerHTML = `
                    <div class="related-product d-block w-100">
                        <img id="carouselimg" src="${productoRelacionado.image}" alt="${productoRelacionado.name}">
                        <p>${productoRelacionado.name}</p>
                    </div>
                `;

                carouselItem.addEventListener("click", () => {
                    localStorage.setItem("selectedProductId", productoRelacionado.id);
                    window.location.href = "product-info.html";
                });

                relatedProductsContainer.appendChild(carouselItem);
            });

            // Cargar los comentarios del producto
            cargarComentarios(prodID);

            // Asociar la funcionalidad al botón de comprar
            document.getElementById("btn-comprar").addEventListener("click", () => {
                addToCart(prodID, data); // Agregar al carrito con la información del producto
                window.location.href = "cart.html";
            });
        } catch (error) {
            console.error("Hubo un problema con la petición:", error);
        }
    }

    async function addToCart(prodID, productData) {
        try {
            // Obtener el carrito actual del backend
            const response = await fetch(`${backendUrl}/cart/${userId}`, { method: "GET" });
            const cartData = await response.json(); // Asegúrate de manejar el JSON correctamente
            const currentCart = cartData.cart || []; // Si `cart` es undefined, usa un array vacío
    
            // Verificar si el producto ya está en el carrito
            const existingProductIndex = currentCart.findIndex(item => item.prodID === prodID);
    
            if (existingProductIndex === -1) {
                // Si no está, añadirlo
                currentCart.push({
                    prodID: prodID,
                    quantity: 1,
                    name: productData.name,
                    img: productData.images[0],
                    cost: productData.cost,
                    currency: productData.currency
                });
            } else {
                // Si ya está, incrementar la cantidad
                currentCart[existingProductIndex].quantity += 1;
            }
    
            // Guardar el carrito actualizado en el backend
            const saveResponse = await fetch(`${backendUrl}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, articles: currentCart }),
            });
    
            if (saveResponse.ok) {
                console.log("Carrito actualizado:", currentCart);
            } else {
                throw new Error("Error al guardar el carrito en el backend");
            }
        } catch (error) {
            console.error("Error en addToCart:", error);
        }
    }
    

    document.addEventListener("DOMContentLoaded", fetchProduct);
}

// Cargar comentarios
async function cargarComentarios(productId) {
    try {
        const comentariosUrl = `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`;
        const response = await fetch(comentariosUrl);
        if (!response.ok) throw new Error("Error al cargar comentarios");

        const comentarios = await response.json();
        mostrarComentarios(comentarios);
    } catch (error) {
        console.error("Error al cargar los comentarios:", error);
    }
}

function mostrarComentarios(comentarios) {
    const contenedorComentarios = document.getElementById("comentarios-producto");
    contenedorComentarios.innerHTML = ""; // Limpiar comentarios previos

    if (!comentarios || comentarios.length === 0) {
        contenedorComentarios.textContent = "No hay comentarios para este producto.";
        return;
    }

    comentarios.forEach(comentario => {
        const comentarioDiv = document.createElement("div");
        comentarioDiv.classList.add("comentario");

        const estrellasDiv = document.createElement("div");
        estrellasDiv.classList.add("rating-static");

        for (let i = 1; i <= 5; i++) {
            const estrella = document.createElement("label");
            estrella.classList.add("star");
            estrella.textContent = "★";

            if (i <= comentario.score) {
                estrella.classList.add("filled");
            }

            estrellasDiv.appendChild(estrella);
        }

        comentarioDiv.innerHTML = `
            <div class="header-comentario">
                <span class="usuario">${comentario.user}</span>
                <div class="rating-static">${estrellasDiv.innerHTML}</div>
                <p class="fecha"><em>${comentario.dateTime}</em></p>
            </div>
            <p class="comentario-texto">${comentario.description}</p>
        `;

        contenedorComentarios.appendChild(comentarioDiv);
    });
}

// Configuración del tema (modo oscuro o claro)
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.body.setAttribute("data-bs-theme", savedTheme);
});
