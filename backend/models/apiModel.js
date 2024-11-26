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

const getUserCart = (id) => {
  try {
    const filePath = path.join(__dirname, `../data/user_cart/${id}.json`);
    const data = fs.readFileSync(filePath, "utf-8");
    const cats = JSON.parse(data);
    return cats;
  } catch (error) {
    console.error("Error en el modelo getUserCart:", error);
    return null; 
  }
};

  
  module.exports = {
    getCats,
    getCatById,
    getCatProds,
    getProds,
    getComm,
    getUserCart
  };