!function() {
  "use strict";

  var DEFAULT_LOCALE = "ko",
    INDEX_PAGE = "index.html";

  var navigator = window.navigator,
    location = window.location,
    getQueryKeyValue = function(sVar) {
      return decodeURI(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURI(sVar).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    };

  var locale = (navigator.language||navigator.systemLanguage||navigator.userLanguage).substr(0,2),
    currentFilename = location.pathname.split("/").pop();

  var p = INDEX_PAGE;
  if(locale !== DEFAULT_LOCALE) {
    p = locale + "." + INDEX_PAGE;
  }
  if(getQueryKeyValue("no") !== 'y' && currentFilename !== p) {
    location.href = p + "?no=y";
  }

}();