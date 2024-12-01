const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
// Clave secreta para JWT
const SECRET_KEY = 'mi_clave_secreta';

// Mock de usuarios 
const users = [
    {
        id: 1,
        username: 'usuario1',
        password: bcrypt.hashSync('password123', 10),
    },
    {
        id: 2,
        username: 'usuario2',
        password: bcrypt.hashSync('contraseña456', 10),
    },
];

// Endpoint POST /login
apiRouter.post('/login', (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
        return res.status(400).json({ message: 'Usuario y contraseña son requeridos.' });
    }
  
    // Busca usuario
    const user = users.find((u) => u.username === username);
  
    if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
  
    // Verifica contraseña
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Credenciales incorrectas.' });
    }
  
    // Genera token
    const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
    );
  
    res.status(200).json({ token });
  });

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



// Nuevas rutas para el carrito
apiRouter.post("/cart", apiController.saveUserCart); // Guarda el carrito de un usuario
apiRouter.get("/cart/:id", apiController.getUserCart); // Obtiene el carrito de un usuario por su ID

// Rutas de inicialización
apiRouter.post("/init/categories", apiController.initCategories); // Inicializa las categorías desde JSON
apiRouter.post("/init/products", apiController.initProducts); // Inicializa los productos desde JSON


module.exports = apiRouter;
