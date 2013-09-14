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
		"blurOnEnter.js",
		"update.js",
		"destroy.js"
	],
	models:[
		"bindAction.js",
		"globalTodos.js",
		"utils.js"
	],
	views:[
		"renderer.js"
	],
	onLoad:function(){
		tipJS.log("todoMVC.onLoad()");
		tipJS.action.init();
	}
});

