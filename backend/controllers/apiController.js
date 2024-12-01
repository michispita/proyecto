// Importamos los models necesarios
const apiModel = require("../models/apiModel");

const getCats = async (req, res) => {
  try {
    const cats = await apiModel.getCats(); // Llama al modelo para obtener las categorías
    if (cats && cats.length > 0) { // Asegúrate de que hay categorías
      console.log("Categorías obtenidas:", cats);
      res.json(cats); // Devuelve las categorías en formato JSON
    } else {
      res.status(404).json({ message: "No se encontraron categorías" });
    }
  } catch (error) {
    console.error("Error en el controlador getCats:", error);
    res.status(500).json({ message: "Error al obtener las categorías" });
  }
};

const getCatById = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await apiModel.getCatById(id);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  } 
};

const getCatProds = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cat = await apiModel.getCatProds(id);

    if (cat) {
      res.json(cat); 
    } else {
      res.status(404).json({ message: "Categoría no encontrada" });
    }
  } catch (error) {
    console.error("Error en el controlador getCatProds:", error);
    res.status(500).json({ message: "Error al obtener la categoría" });
  }
};

const getProds = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cat = await apiModel.getProds(id);

    if (cat) {
      res.json(cat); 
    } else {
      res.status(404).json({ message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error en el controlador getProds:", error);
    res.status(500).json({ message: "Error al obtener el producto" });
  }
};

const getComm = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const cat = await apiModel.getComm(id);

    if (cat) {
      res.json(cat); 
    } else {
      res.status(404).json({ message: "Comentario no encontrado" });
    }
  } catch (error) {
    console.error("Error en el controlador getComm:", error);
    res.status(500).json({ message: "Error al obtener el comentario" });
  }
};

const getUserCart = async (req, res) => {
  const userId = parseInt(req.params.id);
  if (isNaN(userId)) {
    return res.status(400).json({ message: "ID de usuario inválido" });
  }

  try {
    const cart = await apiModel.getUserCart(userId);
    if (!cart || cart.length === 0) {
      return res.status(200).json({ message: "El carrito está vacío", cart: [] });
    }
    res.json({ message: "Carrito obtenido", cart });
  } catch (error) {
    console.error("Error en el controlador getUserCart:", error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};


// Guardar el carrito
const saveUserCart = (req, res) => {
  const { userId, articles } = req.body;
  if (!userId || !articles) {
    return res.status(400).json({ message: "Datos inválidos" });
  }
  apiModel.saveUserCart(userId, articles, (success) => {
    if (success) {
      res.status(200).json({ message: "Carrito guardado correctamente" });
    } else {
      res.status(500).json({ message: "Error al guardar el carrito" });
    }
  });
};



// Inicializar categorías desde JSON
const initCategories = (req, res) => {
  try {
    apiModel.insertCategories(); // Llama al modelo para insertar categorías
    res.status(200).json({ message: "Categorías insertadas correctamente." });
  } catch (error) {
    console.error("Error en initCategories:", error);
    res.status(500).json({ message: "Error al insertar categorías." });
  }
};

// Inicializar productos desde JSON
const initProducts = (req, res) => {
  try {
    apiModel.insertProducts(); // Llama al modelo para insertar productos
    res.status(200).json({ message: "Productos insertados correctamente." });
  } catch (error) {
    console.error("Error en initProducts:", error);
    res.status(500).json({ message: "Error al insertar productos." });
  }
};


module.exports = { 
    getCats,
    getCatById,
    getCatProds,
    getProds,
    getComm,
    saveUserCart,
    getUserCart,
    initCategories,
    initProducts,
  };
