tipJS.view("test", {
// 이 코드를 추가하면 Maxmun limit 오류...어째서일까.
//  el: {
//     wrapper: tipJS.util.getById("outer-wrapper")
//  },
  init: function($scope) {
//    tipJS.log('view:test is Ready');
    $scope.views.push(this);
  },
  updateView: function(data) {
    tipJS.util.getById("outer-wrapper").innerHTML = this.render({
      url: "./app/template/hello-test.html",
      data: data
    });
  }
});
