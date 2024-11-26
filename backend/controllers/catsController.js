// Carpeta donde se colocan los archivos encargados de manejar la lógica detrás del manejo de las peticiones.
// Importamos los models necesarios
const catsModel = require("../models/catsModel");

const getCats = async (req, res) => {
  const cats = await catsModel.getCats();
  res.json(cats);
};

const getCatById = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catModel.getCatById(id);
  if (cat) {
    res.json(cat);
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};

const createCat = async (req, res) => {
  const createdCat = await catModel.createCat(req.body);
  if (createdCat) {
    res.json(createdCat);
  } else {
    res.status(500).json({ message: "Se rompió el servidor" });
  }
};

const updateCat = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catsModel.getCatById(id);
  if (cat) {
    const updatedCat = await catsModel.updateCat(parseInt(req.params.id), {
      ...cat,
      ...req.body,
    });

    if (updatedCat) {
      res.json(updatedCat);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};

const deleteCat = async (req, res) => {
  const id = parseInt(req.params.id);
  const cat = await catsModel.getCatById(id);
  if (cat) {
    const result = await catsModel.deleteCat(parseInt(req.params.id));

    if (result) {
      res.json(cat);
    } else {
      res.status(500).json({ message: "Se rompió el servidor" });
    }
  } else {
    res.status(404).json({ message: "Categoria no encontrada" });
  }
};

module.exports = {
    getCats,
    getCatById,
    createCat,
    updateCat,
    deleteCat,
  };
