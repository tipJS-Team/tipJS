/**
 * User: javarouka
 * Date: 13. 7. 5
 * Time: 오전 12:11
 */
tipJS.model("Images", {

  images: [],

  load: function() {
    this.images = chrome.extension.getBackgroundPage().photos;
  },

  get: function(index) {
    return this.images[index || 0];
  },

//  reload: function() {
//    throw new Error("not implements");
//  },
//
//  empty: function() {
//    this.images = [];
//  },

  list: function() {
     return this.images;
  }

});