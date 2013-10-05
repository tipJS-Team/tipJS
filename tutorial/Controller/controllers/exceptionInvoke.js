/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("exceptionInvoke", {
	beforeInvoke:function(){
		tipJS.debug(".beforeInvoke");
		document.getElementById("contents").innerHTML = "<h1>beforeInvoke</h1>";
	},
	invoke:function(params){
		tipJS.debug(".invoke");
		document.getElementById("contents").innerHTML = "<h1>invoke</h1>";
	},
	afterInvoke:function(){
		tipJS.debug(".afterInvoke");
		document.getElementById("contents").innerHTML = "<h1>afterInvoke</h1>";
	},
	exceptionInvoke:function(){
		tipJS.debug(".exceptionInvoke");
		document.getElementById("contents").innerHTML = "<h1>exceptionInvoke</h1>";
	}
});
