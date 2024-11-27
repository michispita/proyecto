const express = require("express");
const apiRouter = express.Router();

// Importamos los controllers necesarios
const apiController = require("../controllers/apiController");

apiRouter.get("/cats", apiController.getCats); //obitine las categorias

apiRouter.get("/cats/:id", apiController.getCatById); //obtiene una categoria especifica

apiRouter.get("/catProds/:id", apiController.getCatProds); //obtiene todos los prods de una categoria segun su id

apiRouter.get("/prods/:id", apiController.getProds); //obtiene la info de un prod su id

apiRouter.get("/comm/:id", apiController.getComm); //obtiene los comentarios de un prod segun su id

apiRouter.get("/userCart/:id", apiController.getUserCart); //obtiene los productos que esten en el carrito del usuario segun su id

module.exports = apiRouter;