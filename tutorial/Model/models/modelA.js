/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("modelA", {
	proper : "modelA property",
	methodA : function(){
		tipJS.debug("modelA.methodA()");
		tipJS.debug(this.proper);
		
		return this.proper;
	}
});
