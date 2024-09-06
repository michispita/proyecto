// Obtener el ID de la categoría guardado en el localStorage
const catID = localStorage.getItem("catID");
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
                const productList = document.getElementById('product-list');

localStorage
const catID = localStorage.getItem("catID");
// creo una constante llamada url con el json que contiene la info
const url = 'https://japceibal.github.io/emercado-api/cats_products$(catID).json'; 

//funcion para obtener y mostrar los products

function fetchProducts() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la petición');
            }
            return response.json();
        })
        
        .then(data => {
            const productList = document.getElementById('product-list');
            console.log(data);
            // Asegurarse de que la categoría tenga productos
            if (data.products && data.products.length > 0) {
                // Recorrer cada producto en la categoría "Autos"
                data.products.forEach(producto => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('product');
 

                // Asegurarse de que la categoría tenga productos
                if (data.products && data.products.length > 0) {
                    // Recorrer cada producto en la categoría "Autos"
                    data.products.forEach(producto => {
                        const productDiv = document.createElement('div');
                        productDiv.classList.add('product');
                        productDiv.onclick = () => selectProduct(producto.id); // Almacenar ID del producto

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

                    // Añadir elementos al div del producto
                    productDiv.appendChild(productImage);
                    productDiv.appendChild(productName);
                    productDiv.appendChild(productPrice);
                    productDiv.appendChild(productSold);
                    productDiv.appendChild(productDescription);

                    // Añadir el producto al contenedor principal
                    productList.appendChild(productDiv);
                });
            } else {
                productList.textContent = "No se encontraron productos en esta categoría.";
            }
        })
        .catch(error => {
            console.error('Hubo un problema con la petición:', error);
        });
}

    // Llamar a la función para cargar los productos cuando la página haya cargado
    document.addEventListener('DOMContentLoaded', fetchProducts);
};

// Función para filtrar y ordenar productos
let filteredProducts = [];

function updateProducts() {
    // Filtrar por precio
    const minPrice = parseFloat(document.getElementById('priceMin').value) || 0;
    const maxPrice = parseFloat(document.getElementById('priceMax').value) || Infinity;
    filteredProducts = filteredProducts.filter(product => product.cost >= minPrice && product.cost <= maxPrice);

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
// Llamar a la función para cargar los productos cuando la página haya cargado
document.addEventListener('DOMContentLoaded', fetchProducts);// creo una constante llamada url con el json que contiene la info

// Simulación de click en un producto para seleccionar
function selectProduct(productId) {
    // Guardar el ID del producto en el localStorage
    localStorage.setItem('selectedProductId', productId);
    
    // Redirigir a la página del producto
    window.location.href = 'product-info.html';
};