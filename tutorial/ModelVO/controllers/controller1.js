/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");
		
		tipJS.log("##### modelA start #####");
		tipJS.echo(this.getModel("modelA"));
		tipJS.log("##### modelA finish #####");
		tipJS.log("##### modelVO start #####");
		tipJS.echo(this.getModel("modelVO"));
		tipJS.log("##### modelVO finish #####");
		document.getElementById("contents").innerHTML = "<h2>check your browser console</h2>";
	}
});
