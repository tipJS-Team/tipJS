/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.view("viewParent", {
	parent : "parent property",
	parentFn : function(){
		tipJS.debug("modelParent.parentFn()");
		tipJS.debug(this.child);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["parent-1","parent-2","parent-3","parent-4"]
		}
		this.render(opt);
	}
});
