/*Modificar las rutas del archivo init.js para que apunten al servidor local.
será que se refiere a algo de esto?
los modulos desde node.js se importan asi ej: const express = require("express");
                                              const peopleRouter = express.Router();
                                              despues se importan los controllers necesrios
los modulos js propios del proyecto con ruta relativa ej: const peopleController = require("../controllers/peopleController");
y despues cada ruta asociada a su metodo. ej : peopleRouter.get("/", peopleController.getUsers);
*/
//O.O los exporta en models/apiModels.js y también en controllers/apiControllers.js ? NO deberia exportarlos en uno y despues importarlo en otro?
const CATEGORIES_URL = require( " ../backend/data/cats") ; //"https://japceibal.github.io/emercado-api/cats/cat.json"-las categorias
const PUBLISH_PRODUCT_URL = require( " ../backend/data/sell ");//"https://japceibal.github.io/emercado-api/sell/publish.json"- mensaje de publicacion exitosa
const PRODUCTS_URL = require( " ../backend/data/cats_products") ;//"https://japceibal.github.io/emercado-api/cats_products/"-los productos de cada categoria
const PRODUCT_INFO_URL =  require("../backend/data/products"); //"https://japceibal.github.io/emercado-api/products/"-info de cada producto
const PRODUCT_INFO_COMMENTS_URL =  require("../backend/data/products_comments");//"https://japceibal.github.io/emercado-api/products_comments/"-los comentarios
const CART_INFO_URL =  require( " ../backend/data/user_cart") ;//"https://japceibal.github.io/emercado-api/user_cart/"-la info del carrito
const CART_BUY_URL =  require( " ../backend/data/cart") ;//"https://japceibal.github.io/emercado-api/cart/buy.json";-mensaje de compra exitosa
const EXT_TYPE = ".json"; // ???

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}
