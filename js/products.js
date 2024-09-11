// Obtener el ID de la categoría guardado en el localStorage 
const catID = localStorage.getItem("catID");
let products = []; // Variable para almacenar los productos
let filteredProducts = []; // Variable para almacenar productos filtrados

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
                filteredProducts = products; // Inicialmente, todos los productos están filtrados
                displayProducts(filteredProducts);
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
                productDiv.appendChild(productDescription);
                productDiv.appendChild(productPrice);
                productDiv.appendChild(productSold);

                productList.appendChild(productDiv);
            });
        } else {
            productList.textContent = "No se encontraron productos.";
        }
    }

    // Función para filtrar y ordenar productos
    function updateProducts() {
        // Filtrar por precio
        const minPrice = parseFloat(document.getElementById('priceMin').value) || 0;
        const maxPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
        filteredProducts = products.filter(product => product.cost >= minPrice && product.cost <= maxPrice);

        // Ordenar productos
        const sortByPriceAsc = document.getElementById('sortByPriceAsc').checked;
        const sortByPriceDesc = document.getElementById('sortByPriceDesc').checked;
        const sortByRelevance = document.getElementById('sortByRelevance').checked;

        if (sortByPriceAsc) {
            filteredProducts.sort((a, b) => a.cost - b.cost);
        } else if (sortByPriceDesc) {
            filteredProducts.sort((a, b) => b.cost - a.cost);
        } else if (sortByRelevance) {
            filteredProducts.sort((a, b) => b.soldCount - a.soldCount);
        }

        displayProducts(filteredProducts);
    }

    // Función para limpiar filtros
    function clearFilters() {
        document.getElementById('priceMin').value = '';
        document.getElementById('priceMax').value = '';
        document.getElementById('sortByRelevance').checked = true;
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

    // Función para seleccionar un producto
    function selectProduct(productId) {
        localStorage.setItem('selectedProductId', productId);
        window.location.href = 'product-info.html';
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
            usernameMenuItem.innerHTML = `<a class="nav-link" href="#">${storedUsername}</a>`;
        }
    }
});