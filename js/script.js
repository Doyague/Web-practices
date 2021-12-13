(function (global) {

var wp = {}; // namespace "Web-practices"

var homeHtml = "rsc/snippets/home-snippet.html";

var allCategoriesUrl =
  "rsc/jsonFiles/categories.json";
var categoriesTitleHtml = "rsc/snippets/categories-title-snippet.html";
var categoryHtml = "rsc/snippets/category-snippet.html";



// Convenience function for inserting innerHTML for 'selector'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='rsc/pictures/ajax-loader.gif'></div>"; //***ajaxload.info gifs de 'loading'
  insertHtml(selector, html);
};

// Sustitutye el nombre de la propiedad por su valor
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue); //RegExp = Objeto de Expresión Regular (Hacer coincidir el texto con un PATRÓN) ****** "g" se usa para indicar que sustituya todos los resultados, no solo el primero
  return string;
}


// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

// On first load, show home view
showLoading("#main-content"); //*****shows loading gif
$ajaxUtils.sendGetRequest(
  homeHtml,                     //***requestUrl, responseHandler
  function (responseText) {
    document.querySelector("#main-content")
      .innerHTML = responseText;
  },
  false); //***NOT JASON FILE
});

// Load the products categories view
wp.loadProductsCategories = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(
    allCategoriesUrl,
    buildAndShowCategoriesHTML);    //True por defecto porque usará Json
};

// Builds HTML for the categories page based on the data
// from the server
function buildAndShowCategoriesHTML (categories) {
  // Load title snippet of categories page
  $ajaxUtils.sendGetRequest(
    categoriesTitleHtml,
    function (categoriesTitleHtml) {
      // Retrieve single category snippet
      $ajaxUtils.sendGetRequest(
        categoryHtml,
        function (categoryHtml) {
          var categoriesViewHtml =
            buildCategoriesViewHtml(categories,
                                    categoriesTitleHtml,
                                    categoryHtml);
          insertHtml("#main-content", categoriesViewHtml);
        },
        false);
    },
    false);
}

// Using categories data and snippets html
// build categories view HTML to be inserted into page
function buildCategoriesViewHtml(categories,
                                 categoriesTitleHtml,
                                 categoryHtml) {

  var finalHtml = categoriesTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over categories
  for (var i = 0; i < categories.length; i++) {
    // Insert category values
    var html = categoryHtml;
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
  return finalHtml;
}

global.$wp = wp;

})(window);
