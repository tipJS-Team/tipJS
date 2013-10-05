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
		"basicController.js"
	],
	models:[
		"basicModel.js"
	],
	views:[
		"basicView.js"
	],
	onLoad:function(){
		tipJS.log("onLoad()");
		tipJS.action.basicController();
	}
});

window.onload = function(){
	tipJS.loadApp();
};
