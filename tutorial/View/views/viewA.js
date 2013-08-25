/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.view("viewA", {
	proper : "viewA property",
	methodA : function(){
		tipJS.debug("viewA.methodA()");
		tipJS.debug(this.proper);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["aaa","bbb","ccc","ddd","eee"]
		}
		this.render(opt);
	}
});
