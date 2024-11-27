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
  const id = parseInt(req.params.id);
  try {
    const cat = await apiModel.getUserCart(id);

    if (cat) {
      res.json(cat); 
    } else {
      res.status(404).json({ message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error en el controlador getUserCart:", error);
    res.status(500).json({ message: "Error al obtener el carrito" });
  }
};


module.exports = {
    getCats,
    getCatById,
    getCatProds,
    getProds,
    getComm,
    getUserCart
  };
