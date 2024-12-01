const db = require("./models/db");

// Consulta para probar la conexión
db.query("SHOW DATABASES;", (err, results) => {
  if (err) {
    console.error("Error ejecutando la consulta:", err);
    return;
  }
  console.log("Bases de datos disponibles:", results);
  db.end(); // Cierra la conexión
});
