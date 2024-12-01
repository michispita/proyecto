const express = require("express");
const apiRouter = express.Router();

// Middleware de autorización
const authorize = (req, res, next) => {
const authHeader = req.headers['authorization']; 
const token = authHeader && authHeader.split(' ')[1];  

    console.log('Authorization Header:', authHeader); // Verifica si el token está presente

    if (!token) {
        return res.status(401).json({ message: "Denegado. Token no proporcionado." });
    }

    // Verifica si el token es válido
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido o expirado." });
        }

        req.user = user; 
        console.log('Token verificado:', user); 
        next();
    });
};

// Importamos los controllers necesarios
const apiController = require("../controllers/apiController");

 // Middleware de autorización aplicado

apiRouter.get("/cats", authorize, apiController.getCats); //obitine las categorias 

apiRouter.get("/cats/:id", authorize, apiController.getCatById); //obtiene una categoria especifica

apiRouter.get("/catProds/:id", authorize, apiController.getCatProds); //obtiene todos los prods de una categoria segun su id

apiRouter.get("/prods/:id",authorize,apiController.getProds); //obtiene la info de un prod su id

apiRouter.get("/comm/:id", authorize, apiController.getComm); //obtiene los comentarios de un prod segun su id

apiRouter.get("/userCart/:id",authorize,apiController.getUserCart); //obtiene los productos que esten en el carrito del usuario segun su id


module.exports = apiRouter;
