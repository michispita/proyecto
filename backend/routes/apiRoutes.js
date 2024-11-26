const express = require("express");
const router = express.Router();


// Ruta para devolver categorías
router.get("/categories", (req, res) => {
  const filePath = path.join(__dirname, "../data/cats/cat.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error al leer el archivo de categorías" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

// Ruta para devolver productos
router.get("/catsProducts", (req, res) => {
  const filePath = path.join(__dirname, "../data/cats_products.json"); //aca habria que hacer un for each?
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ message: "Error al leer el archivo de categoria de productos" });
    } else {
      res.json(JSON.parse(data));
    }
  });
});

module.exports = router;