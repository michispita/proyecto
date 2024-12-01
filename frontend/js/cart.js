const userId = 1; // ID de usuario fijo
const backendUrl = "http://localhost:3000/api"; // URL base del backend

// Para ver el nombre de usuario
document.addEventListener("DOMContentLoaded", async function () {
  const storedUsername = localStorage.getItem("username");

  if (storedUsername) {
    const usernameMenuItem = document.getElementById("username-menu-item");
    if (usernameMenuItem) {
      usernameMenuItem.innerHTML = `<a class="nav-link" href="my-profile.html">${storedUsername}</a>`;
    }
  }

  await fetchCart(); // Mostrar el carrito al cargar la página
});

// Obtener el carrito del backend
let carts = [];

const fetchCart = async () => {
  try {
    const response = await fetch(`${backendUrl}/cart/${userId}`);
    if (!response.ok) throw new Error("Error al obtener el carrito");
    const data = await response.json();
    carts = data.cart || []; // Actualiza el carrito local con el del backend
    displayCart();
  } catch (error) {
    console.error("Error al obtener el carrito:", error);
    const carritoEspacio = document.getElementById("carritoEspacio");
    carritoEspacio.innerHTML = `
      <div class="alert alert-dark" role="alert">
        ¡Aún no has seleccionado un producto!
      </div>`;
  }
};

// Guardar carrito en el backend
const saveCart = async () => {
  try {
    const response = await fetch(`${backendUrl}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, articles: carts }),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el carrito en el backend");
    }
  } catch (error) {
    console.error("Error al guardar el carrito:", error);
  }
};

// Mostrar carrito en el DOM
const displayCart = () => {
  const carritoEspacio = document.getElementById("carritoEspacio");
  carritoEspacio.innerHTML = ""; // Limpia el contenedor

  if (carts.length === 0) {
    carritoEspacio.innerHTML = `
      <div class="alert alert-dark" role="alert">
          ¡Aún no has seleccionado un producto!
      </div>`;
    return;
  }

  carts.forEach((item, index) => {
    const precioTotal = item.cost * item.quantity;
    carritoEspacio.innerHTML += `
      <div class="row" id="prodCarritoDiv">
          <div class="col">
              <h2 class="prodCarritoName">${item.name}</h2>
              <img src="${item.img}" alt="${item.name}" class="prodCarritoImg">
              <div class="prodCarritoQuantity d-flex align-items-center">
                  <button onclick="updateQuantity(${index}, -1)">-</button>
                  <span id="quantityDisplay-${index}">${item.quantity}</span>
                  <button onclick="updateQuantity(${index}, 1)">+</button>
                  <button onclick="removeProduct(${index})" class="btn btn-danger ms-3 btn-trash">
                      <i class="fas fa-trash"></i>
                  </button>
              </div>
          </div>
          <div class="col">
              <h2 class="prodCarritoTotal">$${precioTotal}</h2>
          </div>
      </div>`;
  });

  updateCartCount();
};

// Actualizar la cantidad de un producto en el carrito
const updateQuantity = (index, change) => {
  carts[index].quantity += change;

  if (carts[index].quantity < 1) carts[index].quantity = 1;

  saveCart(); // Guarda el carrito actualizado
  displayCart(); // Refresca la vista del carrito
};

// Eliminar un producto del carrito
const removeProduct = (index) => {
  carts.splice(index, 1);
  saveCart(); // Guarda el carrito actualizado
  displayCart(); // Refresca la vista del carrito
};

// Calcular el subtotal del carrito
const calcularSubtotal = () => {
  return carts.reduce((total, item) => total + item.cost * item.quantity, 0);
};

// Actualizar contador del carrito
const updateCartCount = () => {
  const totalItems = carts.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalItems;
  }
};

// Mostrar costos en el modal de checkout
const actualizarModalCostos = () => {
  const subtotal = calcularSubtotal();
  const porcentajeEnvio = parseFloat(document.getElementById("metodoEnvio").value || 0);
  const costoEnvio = subtotal * porcentajeEnvio;
  const total = subtotal + costoEnvio;

  document.getElementById("subtotal").textContent = `Subtotal: $${subtotal.toFixed(2)} UYU`;
  document.getElementById("costEnvio").textContent = `Costo de Envío: $${costoEnvio.toFixed(2)} UYU`;
  document.getElementById("total").textContent = `Total: $${total.toFixed(2)} UYU`;
};

// Finalizar compra
const finalizarCompra = () => {
  const inputDep = document.getElementById("inputDep").value.trim();
  const inputBarrio = document.getElementById("inputBarrio").value.trim();
  const inputCalle = document.getElementById("inputCalle").value.trim();
  const metodoEnvioSeleccionado = document.getElementById("metodoEnvio").value;
  let mensajeError = "";

  if (!inputDep || !inputBarrio || !inputCalle) {
    mensajeError += "Completa todos los campos de dirección.\n";
  }
  if (!metodoEnvioSeleccionado || parseFloat(metodoEnvioSeleccionado) === 0) {
    mensajeError += "Selecciona un método de envío.\n";
  }

  if (carts.length === 0) {
    mensajeError += "El carrito está vacío.\n";
  }

  if (mensajeError) {
    alert(mensajeError);
    return;
  }

  alert("¡Compra finalizada con éxito!");
};

// Asociar eventos
document.getElementById("btnFinalizarCompra").addEventListener("click", finalizarCompra);
document.getElementById("metodoEnvio").addEventListener("change", actualizarModalCostos);
