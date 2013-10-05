/**
 * User: javarouka
 * Date: 13. 7. 2
 * Time: 오후 5:26
 */
tipJS.controller("Main", {

  invoke: function() {

    var self = this;

    var imageModel = self.getModel("Images", true);
    var renderer = self.getView("Renderer");

    imageModel.load();
    renderer.showImage(imageModel);
    self.bindEvent(renderer);
  },

  // @TODO: 이미지 상세정보 보여주기
  onImageClick: function(e) {
    console.log(e.target);
  },

  bindEvent: function(view) {
    var self = this;
    view.getElements().reloadButton.click("click", function() {
      chrome.extension.sendRequest({ method: "refresh" }, function(res) {
        console.log(res);
      });
    });
    view.getElements().images.on("click", function(e) {
      self.onImageClick.call(e.target, e);
    });
  }

});
