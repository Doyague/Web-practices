(function (global) {

var wp = {}; // namespace for "web-practices"

var homeHtml = "rsc/snippets/home-snippet.html";
var allCategoriesUrl =
  "rsc/jsonFiles/categories.json";
var categoriesTitleHtml = "rsc/snippets/categories-title-snippet.html";
var categoryHtml = "rsc/snippets/category-snippet.html";

var singleItemsUrl =
  "rsc/jsonFiles/";
var singleItemsTitleHtml = "rsc/snippets/single-item-title-snippet.html";
var singleItemHtml = "rsc/snippets/single-item-snippet.html";



                                      //******************* PRIMERO ****
// Convenience function for inserting innerHTML for 'selector'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);// Coge un selector y lo mete en una variable
  targetElem.innerHTML = html;  //hace que el innerHTML de la variable sea la STRING (sic) que pasamos como argumento ("html")
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {        // Icono Loading
  var html = "<div class='text-center'>";
  html += "<img src='rsc/pictures/ajax-loader.gif'></div>"; // ajaxload.info gifs de 'loading'
  insertHtml(selector, html);
};

                        //******  CUARTO *******. Empieza "category snippet"
// Sustitutye el nombre de la propiedad por su valor y devuelve el snippet como cadena
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue); //RegExp = Objeto de Expresión Regular (Hacer coincidir el texto con un PATRÓN) ****** "g" se usa para indicar que sustituya todos los resultados, no solo el primero
  return string;
}

                                  //**************** SEGUNDO *******
// eventListener para la carga de la página (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

                                  //**************** TERCERO *******
// On first load, show home view.
showLoading("#main-content"); // shows loading gif
$ajaxUtils.sendGetRequest(      // AJAX call solicitando el snippet a traves de la url almacenada en "homeHtml"
  homeHtml,                     // (var homeHtml = "rsc/snippets/home-snippet.html")
  function (responseText) {       // responseHandler FUNCTION!!:
    document.querySelector("#main-content")  // elige selector
      .innerHTML = responseText;  // fija como "innerHTML" el texto de respuesta
    var homeHtmlInserted =
    document.querySelector("#main-content").innerHTML
  },
  false); //***NOT JASON FILE, es sólo un trozo de html
});

                    //**AÑADIDO para regresar al la página "Home"
// Load the products categories view
wp.loadHomePage = function () {
  // showLoading("#main-content");
  $ajaxUtils.sendGetRequest(      // AJAX call solicitando el snippet a traves de la url almacenada en "homeHtml"
    homeHtml,                     // (var homeHtml = "rsc/snippets/home-snippet.html")
    function (responseText) {       // responseHandler FUNCTION!!:
      document.querySelector("#main-content")  // elige selector
        .innerHTML = responseText;  // fija como "innerHTML" el texto de respuesta
      var homeHtmlInserted =
      document.querySelector("#main-content").innerHTML
    },
    false);
};

                              //***** QUINTO *******
// Load the products categories view
wp.loadProductsCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);    //True por defecto porque usará Json
};

                  //***** OCTAVO *****
// Load the menu items view
// 'categoryShort' is a short_name for a category
wp.loadCatItems = function (categoryShort) {  // Es el argumento que vemos en el CATEGORY-SNIPPET ("$wp.loadCatItems('{{short_name}}');")
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(          //// WARNING: CAMBIADO!!!
    singleItemsUrl + categoryShort + ".json", //categoryShort = {{short_name}}
    buildAndShowSingleItemsHTML); //json true default
};


                            //***** SEXTO *****
// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,          // Primero carga el snippet del título de la categoría y DESPUÉS el cuerpo de la categoría, por eso van anidados
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml); //Se inserta aquí el contenido ed categoriesViewHtml, creado más abajo
        },
        false);
    },
    false);
}
                //***** SÉPTIMO ******* definimos la función de más arriba, que devuelve el valor de categoriesViewHtml
// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;  //categoriesTitleHtml = "rsc/snippets/categories-title-snippet.html"
  finalHtml += "<section class='row'>"; //añadimos un <section> con class "row" para colgar los snippet de las categorías

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;  //categoryHtml = "rsc/snippets/category-snippet.html"
    var name = "" + categories[i].name;
    var short_name = categories[i].short_name;
    html =
      insertProperty(html, "name", name);
    html =
      insertProperty(html,
                     "short_name",
                     short_name);
    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml; // Va a ser el valor de categoriesViewHtml más arriba
}
                //***** NOVENO   ****
// Builds HTML for the single category page based on the data
// from the server. Muestra los items de la categoría
function buildAndShowSingleItemsHTML (categorySingleItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    singleItemsTitleHtml,
    function (singleItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        singleItemHtml,
        function (singleItemHtml) {
          var singleItemsViewHtml =
            buildSingleItemsViewHtml(categorySingleItems,
                                   singleItemsTitleHtml,
                                   singleItemHtml);
          insertHtml("#main-content", singleItemsViewHtml);
        },
        false);
    },
    false);
}

// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildSingleItemsViewHtml(categorySingleItems,
                                singleItemsTitleHtml,
                                singleItemHtml) {

  singleItemsTitleHtml =
    insertProperty(singleItemsTitleHtml,
                   "name",
                   categorySingleItems.category.name);
  // singleItemsTitleHtml =
  //   insertProperty(singleItemsTitleHtml,
  //                  "special_instructions",
  //                  categorySingleItems.category.special_instructions);

  var finalHtml = singleItemsTitleHtml;
  finalHtml += "<section class='row'>";



// Loop over single items
var singleItems = categorySingleItems.cat_items;
console.log(categorySingleItems.cat_items);
var catShortName = categorySingleItems.category.short_name;
console.log(categorySingleItems.category.short_name);
var catLongName = categorySingleItems.category.name;
console.log(categorySingleItems.category.name);
for (var i = 0; i < singleItems.length; i++) {
  // Insert menu item values
  var html = singleItemHtml;
  html =
    insertProperty(html, "short_name", singleItems[i].short_name);

  html =
    insertProperty(html, "catLongName", catLongName);
  html =
    insertProperty(html,
                   "catShortName",
                   catShortName);
  // html =
  //   insertItemPrice(html,
  //                   "price_small",
  //                   singleItems[i].price_small);
  // html =
  //   insertItemPortionName(html,
  //                         "small_portion_name",
  //                         singleItems[i].small_portion_name);
  // html =
  //   insertItemPrice(html,
  //                   "price_large",
  //                   singleItems[i].price_large);
  // html =
  //   insertItemPortionName(html,
  //                         "large_portion_name",
  //                         singleItems[i].large_portion_name);
  html =
    insertProperty(html,
                   "short_name",
                   singleItems[i].short_name);
  html =
    insertProperty(html,
                   "name",
                   singleItems[i].name);
  html =
    insertProperty(html,
                   "description",
                   singleItems[i].description);

  html =
    insertItemPrice(html,
                   "price",
                   singleItems[i].price);


  // Add clearfix after every second menu item
  if (i % 2 != 0) {
    html +=
      "<div class='clearfix visible-lg-block visible-md-block'></div>";
  }

  finalHtml += html;
}

finalHtml += "</section>";
return finalHtml;
}


// Appends price with '$' if price exists
function insertItemPrice(html,
                       pricePropName,
                       priceValue) {
// If not specified, replace with empty string
if (!priceValue) {
  return insertProperty(html, pricePropName, "");;
}

priceValue = priceValue.toFixed(2) + "€";
html = insertProperty(html, pricePropName, priceValue);
return html;
}





global.$wp = wp;

})(window);
