/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("blurOnEnter", {
	invoke : function( evt ){

		if ( evt.keyCode === this.getModel("globalTodos", true).ENTER_KEY ) {
			evt.target.blur();
		}
	}
});
