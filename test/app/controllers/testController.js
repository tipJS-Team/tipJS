tipJS.controller("test", {
  invoke : function($scope) {
//    tipJS.log('controller:test is Ready');
    $scope.controllers.push(this);

    var m = this.getModel("test");
    var v = this.getView("test");

    m.init($scope);
    m.setTestData($scope.testData);

    v.init($scope);

    v.updateView(m.getTestData());
  }
});
