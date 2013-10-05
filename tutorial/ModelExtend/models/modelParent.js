/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("modelParent", {
	parent : "parent property",
	parentFn : function(){
		tipJS.debug("modelParent.parentFn()");
		tipJS.debug(this.parent);
		
		document.getElementById("contents").innerHTML += "<h2>" + this.parent + "</h2>";
	}
});
