const express = require("express");
const apiRoutes = require("./routes/apiRoutes"); 
const app = express();
const PORT = 3000;


// Middleware para permitir JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend del proyecto!");
});

// Usar las rutas de la API
app.use("/api", apiRoutes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
