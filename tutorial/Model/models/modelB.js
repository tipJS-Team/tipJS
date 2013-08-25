/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("modelB", {
	proper : "modelB property",
	methodB : function(){
		tipJS.debug("modelB.methodB()");
		tipJS.debug(this.proper);
		
		return this.getModel("modelA").methodA();
	}
});
