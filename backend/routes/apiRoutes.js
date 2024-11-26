const express = require("express");
const apiRouter = express.Router();

// Importamos los controllers necesarios
const apiController = require("../controllers/apiController");

apiRouter.get("/cats", apiController.getCats);

apiRouter.get("/cats/:id", apiController.getCatById);


module.exports = apiRouter;