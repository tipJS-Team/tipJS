test('exists test', function() {
  ok(typeof tipJS === 'object', "tipJS object exists");
  ok(typeof tipJS.util === 'object', 'tipJS util module exists');

  var u = tipJS.util;
  ok(u.isFunction(tipJS.app), 'tipJS controller constructor exists');
  ok(u.isFunction(tipJS.config), 'tipJS config function exists');
  ok(u.isFunction(tipJS.controller), 'tipJS define function exists');
  ok(u.isFunction(tipJS.model), 'tipJS model function exists');
  ok(u.isFunction(tipJS.view), 'tipJS view function exists');
  ok(u.isFunction(tipJS.loadApp), 'tipJS loadApp function exists');
});

test('app test', function() {

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
    onLoad:function(){
      tipJS.action.init();
    }
  });

  var test = tipJS.loadApp();

  ok(1, "Ah!");

});