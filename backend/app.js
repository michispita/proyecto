const express = require("express");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");
const db = require("./models/db");

const app = express();
const PORT = 3000;

// Habilitar CORS con configuración específica
app.use(cors({
  origin: "http://127.0.0.1:5502", // URL del frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


// Middleware para permitir JSON
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
  res.send("¡Bienvenido al backend del proyecto!");
});

// Usar las rutas de la API
app.use("/api", apiRoutes);

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Ocurrió un error en el servidor." });
});

// Conectar a la base de datos y luego iniciar el servidor
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  } else {
    console.log("Conectado a la base de datos.");
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  }
});

