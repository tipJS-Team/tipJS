tipJS.model("test", {
  store: {},
  init: function($scope) {
//    tipJS.log('model:test is Ready');
    $scope.models.push(this);
  },
  setTestData: function(data) {
    this.store = data;
  },
  getTestData: function() {
    return this.store;
  }
});
