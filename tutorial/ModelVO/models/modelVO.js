/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("modelVO", {
	proper : "modelVO property",
	methodB : function(){
		tipJS.debug("modelB.methodB()");
		tipJS.debug(this.proper);
		
		return this.loadModel("modelA").methodA();
	}
});
