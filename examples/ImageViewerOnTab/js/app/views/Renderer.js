/**
 * User: javarouka
 * Date: 13. 7. 2
 * Time: 오후 5:31
 */
tipJS.view("Renderer", {

  E: {
    "contentWrapper": "#content-wrapper",
    "reloadButton": "#content-wrapper .reload"
  },

  _createjqElements: function() {
    var eleSet = this.E,
      k;
    for(k in eleSet) {
      if(!eleSet.hasOwnProperty(k)) continue;
      eleSet[k] = $(eleSet[k]);
    }
  },

  __init: function() {
    this._createjqElements();
  },

  showImage : function(imageModel) {
    var self = this;
    var _templateConfig = {
      url:"/js/app/tpl/images.tpl",
      renderTo: "image-list",
      data: imageModel.list()
    };
    self.render(_templateConfig);
    self.E.images = $("img");
  },

  getElements: function() {
    return this.E;
  }

});