/**
 * User: javarouka
 * Date: 13. 7. 4
 * Time: 오후 10:26
 */

(function() {
  "use strict";

  var photos;

  var crawImages = function() {
    photos = [];
    Array.prototype.slice.call(document.images).forEach(function(image) {
      if (image.naturalWidth > 1) {
        photos.push({
          width: image.naturalWidth,
          height: image.naturalHeight,
          src: image.src
        });
      }
    });
  };

  var sendToBackground = function() {
    chrome.extension.sendMessage({"imgSources" : photos }, function(res) {
      console.log("send ok to background " + res);
    });
  };

  chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {
      console.log("request!", request);
    }
  );

  window.addEventListener("load", function() {

    crawImages();
    sendToBackground();

  }, true);

})();


