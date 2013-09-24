test('exists test', function() {
  ok(typeof tipJS === 'object', "tipJS object exists");
  ok(typeof tipJS.util === 'object', 'tipJS util module exists');

  var u = tipJS.util;
  ok(u.isFunction(tipJS.app), 'tipJS controller constructor exists');
  ok(u.isFunction(tipJS.controller), 'tipJS define function exists');
  ok(u.isFunction(tipJS.model), 'tipJS model function exists');
  ok(u.isFunction(tipJS.view), 'tipJS view function exists');
  ok(u.isFunction(tipJS.loadApp), 'tipJS loadApp function exists');
});

test('simple app test', function() {

  var $scope = {
    controllers: [],
    models: [],
    views: [],
    testData: {
      id: "test",
      content: "This is a TestCase"
    }
  };

  stop();

  tipJS.app({
    appPath:"./app",
    noCache:true,
    noCacheParam:"tipJS",
    noCacheAuto:true,
    controllers:[
      "testController.js"
    ],
    models:[
      "testModel.js"
    ],
    views:[
      "testView.js"
    ],
    onLoad:function($scope) {
      tipJS.action.test($scope);

      // load component test
      ok(tipJS.util.isObject($scope), 'app loaded and $scope object exists');
      ok($scope.controllers.length > 0, 'controllers load length greater than 1');
      ok($scope.models.length > 0, 'models load length greater than 1');
      ok($scope.views.length > 0, 'views load length greater than 1');

      // view template test
      var rendered = tipJS.util.getById($scope.testData.id);
      ok(rendered.innerHTML === $scope.testData.content, 'template test success');

    }
  });

  // test start
  setTimeout(function() {
    start();
  }, 3000);

  tipJS.loadApp($scope);

});

test('interceptor test', function() {
  ok(true, 'implement test required')
});

test('i18n test', function() {
  ok(true, 'implement test required')
});