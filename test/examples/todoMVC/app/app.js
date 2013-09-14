/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.app({
	appPath:"./app",
	noCache:true,
	noCacheParam:"tipJS",
	noCacheAuto:true,
	controllers:[
		"init.js",
		"create.js",
		"toggleAll.js",
		"destroyCompleted.js",
		"toggle.js",
		"edit.js",
		"testController.js",
		"update.js",
		"destroy.js"
	],
	models:[
		"testModel.js",
		"globalTodos.js",
		"utils.js"
	],
	views:[
		"testView.js"
	],
	onLoad:function(){
		tipJS.log("todoMVC.onLoad()");
		tipJS.action.init();
	}
});

