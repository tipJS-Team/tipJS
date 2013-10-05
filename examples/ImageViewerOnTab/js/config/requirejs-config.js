/**
 * User: javarouka
 * Date: 13. 7. 5
 * Time: 오전 12:27
 */
var requirejs = {
  baseUrl: chrome.extension.getURL("/js"),
  paths : {
    jquery: [
      "https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min"
    ],
    underscore: [
      "extlib/underscore"
    ],
    tipJS: [
      "extlib/tipJS.min"
    ],
    app: "app"
  }
};