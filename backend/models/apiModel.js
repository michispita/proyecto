const fs = require("fs");
const path = require("path");

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


  
  module.exports = {
    getCats,
    getCatById,

  };