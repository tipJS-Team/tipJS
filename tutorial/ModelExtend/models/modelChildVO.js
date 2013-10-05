/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("modelChildVO", {
	__extend:"modelParent",
	child : "child property",
	childFn : function(){
		tipJS.debug("modelChild.childFn()");
		tipJS.debug(this.child);
		
		document.getElementById("contents").innerHTML += "<h3>" + this.child + "</h3>";
	}
});
