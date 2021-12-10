(function (global) {

var wp = {}; // namespace "Web-practices"

var homeHtml = "../rsc/snippets/home-snippet.html";

// Convenience function for inserting innerHTML for 'selector'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='../rsc/pictures/ajax-loader.gif'></div>"; //***ajaxload.info gifs de 'loading'
  insertHtml(selector, html);
};

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


global.$wp = wp;

})(window);
