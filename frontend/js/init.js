
const CATEGORIES_URL = "../backend/data/cats/cat.json"; //"https://japceibal.github.io/emercado-api/cats/cat.json"-las categorias
const PUBLISH_PRODUCT_URL = " ../backend/data/sell";//"https://japceibal.github.io/emercado-api/sell/publish.json"- mensaje de publicacion exitosa
const PRODUCTS_URL = "../backend/data/cats_products";//"https://japceibal.github.io/emercado-api/cats_products/"-los productos de cada categoria
const PRODUCT_INFO_URL = "../backend/data/products"; //"https://japceibal.github.io/emercado-api/products/"-info de cada producto
const PRODUCT_INFO_COMMENTS_URL = "../backend/data/products_comments";//"https://japceibal.github.io/emercado-api/products_comments/"-los comentarios
const CART_INFO_URL = "../backend/data/user_cart";//"https://japceibal.github.io/emercado-api/user_cart/"-la info del carrito
const CART_BUY_URL =  "../backend/data/cart";//"https://japceibal.github.io/emercado-api/cart/buy.json";-mensaje de compra exitosa
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
