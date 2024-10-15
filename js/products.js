// Obtener el ID de la categoría guardado en el localStorage 
const catID = localStorage.getItem("catID");
let products = []; // Variable para almacenar los productos
let filtradoProductos = []; // Variable para almacenar productos filtrados

if (catID) {
    // Construir la URL dinámicamente con el ID de la categoría
    const url = `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`;

    // Función para obtener y mostrar los productos
    function fetchProducts() {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then(data => {
                products = data.products; // Guardar productos
                filtradoProductos = products; // Inicialmente, todos los productos están filtrados
                displayProducts(filtradoProductos);
            })
            .catch(error => {
                console.error('Hubo un problema con la petición:', error);
            });
    }

    // Función para mostrar los productos en la página
    function displayProducts(productsToDisplay) {
        const productList = document.getElementById('product-list');
        productList.innerHTML = ''; // Limpiar productos existentes

        if (productsToDisplay.length > 0) {
            productsToDisplay.forEach(producto => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');
                productDiv.onclick = () => selectProduct(producto.id);

                const productImage = document.createElement('img');
                productImage.src = producto.image;
                productImage.alt = producto.name;

                const productName = document.createElement('h2');
                productName.textContent = producto.name;

                const productDescription = document.createElement('p');
                productDescription.textContent = producto.description;

                const productPrice = document.createElement('p');
                productPrice.textContent = `${producto.currency} $${producto.cost}`;

                const productSold = document.createElement('p');
                productSold.textContent = `Vendidos: ${producto.soldCount}`;

                productDiv.appendChild(productImage);
                productDiv.appendChild(productName);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productSold);

                productList.appendChild(productDiv);
            });
        } else {
            productList.textContent = "No se encontraron productos.";
        }
    }

//input para realizar la busqueda
const searchInput = document.getElementById('search');

//agregamos un even listener para el input
searchInput.addEventListener('input', function(){

//tenemos el valor del input y lo convierte en minusculas 
    let searchQ = searchInput.value.toLowerCase();

//filtramos las busqueda, buscando coincidencias en el titulo o descripcion
    let filterProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchQ) || product.description.toLowerCase().includes(searchQ);
     });
//se muestran los resultados que coincidan con la busqueda
     displayProducts(filterProducts);
});


    // Función para filtrar y ordenar productos
    function updateProducts() {
        // Filtrar por precio
        const minPrice = parseFloat(document.getElementById('priceMin').value) || 0;
        const maxPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
        filtradoProductos = products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);

        // Ordenar productos
        const precioAsce = document.getElementById('precioAsce').checked;
        const precioDesc = document.getElementById('precioDesc').checked;
        const porRelevante = document.getElementById('porRelevante').checked;

        if (precioAsce) {
            filtradoProductos.sort((a, b) => a.cost - b.cost);
        } else if (precioDesc) {
            filtradoProductos.sort((a, b) => b.cost - a.cost);
        } else if (porRelevante) {
            filtradoProductos.sort((a, b) => b.soldCount - a.soldCount);
        }

        displayProducts(filtradoProductos);
    }

    // Función para limpiar filtros
    function clearFilters() {
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        document.getElementById('porRelevante').checked = true;
        updateProducts();
    }

    // Event listeners para los filtros y ordenamiento
    document.getElementById('applyFilters').addEventListener('click', updateProducts);
    document.getElementById('clearFilters').addEventListener('click', clearFilters);
    document.querySelectorAll('input[name="sortOptions"]').forEach(input =>
        input.addEventListener('change', updateProducts)
    );

    // Cargar productos cuando la página esté lista
    document.addEventListener('DOMContentLoaded', fetchProducts);

    // Simulación de click en un producto para seleccionar
    function selectProduct(productId) {
        localStorage.setItem('selectedProductId', productId); // Guardar el ID del producto en el localStorage
        window.location.href = 'product-info.html'; // Redirigir a la página del producto
    }
}

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