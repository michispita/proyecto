const fs = require("fs");
const path = require("path");
const db = require("./db");


const getCats = () => {
  try {
    const filePath = path.join(__dirname, "../data/cats/cat.json"); 
    const data = fs.readFileSync(filePath, "utf-8"); 
    const cats = JSON.parse(data); 
    return cats; 
  } catch (error) {
    console.error("Error en el modelo getCats:", error);
    return false; 
  }
};

const getCatById = (id) => {
const filePath = path.join(__dirname, "../data/cats/cat.json"); 
const data = fs.readFileSync(filePath, "utf-8"); 
const cats = JSON.parse(data);
  return cats.find((cat) => cat.id === parseInt(id));
};

const getCatProds = (id) => {
  try {
    const filePath = path.join(__dirname, `../data/cats_products/${id}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    const cats = JSON.parse(data);
    return cats;
  } catch (error) {
    console.error("Error en el modelo getCatProds:", error);
    return null; 
  }
};

const getProds = (id) => {
  try {
    const filePath = path.join(__dirname, `../data/products/${id}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    const cats = JSON.parse(data);
    return cats;
  } catch (error) {
    console.error("Error en el modelo getProds:", error);
    return null; 
  }
};

const getComm = (id) => {
  try {
    const filePath = path.join(__dirname, `../data/products_comments/${id}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    const cats = JSON.parse(data);
    return cats;
  } catch (error) {
    console.error("Error en el modelo getComm:", error);
    return null; 
  }
};

// const getUserCart = (id) => {
//   try {
//     const filePath = path.join(__dirname, `../data/user_cart/${id}.json`);
//     const data = fs.readFileSync(filePath, "utf-8");
//     const cats = JSON.parse(data);
//     return cats;
//   } catch (error) {
//     console.error("Error en el modelo getUserCart:", error);
//     return null; 
//   }
// };

// Función para insertar categorías en la base de datos
const insertCategories = () => {
  const filePath = path.join(__dirname, "../data/cats/cat.json");
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  data.forEach((cat) => {
    const query = "INSERT INTO Categories (id, name, description, productCount, imgSrc) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [cat.id, cat.name, cat.description, cat.productCount, cat.imgSrc], (err, result) => {
      if (err) {
        console.error("Error al insertar categoría:", err);
      }
    });
  });
};

// Función para insertar productos en la base de datos
const insertProducts = () => {
  const productsDir = path.join(__dirname, "../data/products"); // Directorio de productos

  // Leer todos los archivos JSON en el directorio
  const files = fs.readdirSync(productsDir).filter((file) => file.endsWith(".json"));

  // Iterar sobre cada archivo y procesar su contenido
  files.forEach((file) => {
    const filePath = path.join(productsDir, file);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const query =
      "INSERT INTO Products (id, name, description, cost, currency, soldCount, category, images, relatedProducts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

    const relatedProducts = JSON.stringify(data.relatedProducts || []);
    const images = JSON.stringify(data.images || []);

    // Ejecutar la consulta para insertar el producto en la base de datos
    db.query(
      query,
      [
        data.id,
        data.name,
        data.description,
        data.cost,
        data.currency,
        data.soldCount,
        data.category,
        images,
        relatedProducts,
      ],
      (err) => {
        if (err) {
          console.error(`Error al insertar producto ${data.name}:`, err);
        } else {
          console.log(`Producto ${data.name} insertado correctamente.`);
        }
      }
    );
  });
};

// Guardar el carrito
const saveUserCart = (userId, articles, callback) => {
  const query = "REPLACE INTO UserCart (userId, articles) VALUES (?, ?)";
  db.query(query, [userId, JSON.stringify(articles)], (err, results) => {
    if (err) {
      console.error("Error al guardar el carrito:", err);
      callback(false);
    } else {
      callback(true);
    }
  });
};

// Obtener el carrito del usuario
const getUserCart = (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM UserCart WHERE userId = ?";
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error al obtener el carrito:", err);
        reject(err); // Rechazar la promesa en caso de error
      } else {
        resolve(results.length > 0 ? JSON.parse(results[0].articles) : []); // Resolver con los artículos del carrito
      }
    });
  });
};



  
  module.exports = {
    getCats,
    getCatById,
    getCatProds,
    getProds,
    getComm,
    saveUserCart,
    getUserCart,
    insertCategories,
    insertProducts
  };
  