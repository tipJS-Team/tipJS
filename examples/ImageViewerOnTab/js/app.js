/**
 * User: javarouka
 * Date: 13. 7. 5
 * Time: 오전 12:27
 */
require([ "tipJS", "underscore", "jquery" ], function() {

  console.log("app initialize...");

  tipJS.app({
    appPath:"./js/app",
    noCache:false,
    noCacheVersion:"1.000",
    noCacheAuto:true,
    noCacheParam:"noCacheVersion",
    controllers:[
      "Main.js"
    ],
    models:[
      "Images.js"
    ],
    views:[
      "Renderer.js"
    ],
    onLoad:function() {
      tipJS.action.Main();
    }
  });

  tipJS.loadApp();

});