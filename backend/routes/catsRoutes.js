// Carpeta donde colocaremos todas las rutas (o endpoints) los cuales el servidor espera respuesta.
const express = require("express");
const catsRouter = express.Router();

// Importamos los controllers necesarios
const catsController = require("../controllers/catsController");

catsRouter.get("/", catsController.getCats);

catsRouter.get("/:id", catsController.getCatById);

catsRouter.post("/", catsController.createCat);

catsRouter.put("/:id", catsController.updateCat);

catsRouter.delete("/:id", catsController.deleteCat);

module.exports = catsRouter;
