/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("toggle", {

	invoke : function( chkbox ){

		var globalTodos = this.getModel("globalTodos", true);

		globalTodos.getTodo( chkbox, function( i, val ) {
			val.completed = !val.completed;
		});
		this.getView("renderer").updateView( globalTodos );
		this.getModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
