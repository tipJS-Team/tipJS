/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("destroyCompleted", {

	invoke : function(){

		var globalTodos = this.getModel("globalTodos", true),
			l = globalTodos.todos.length;

		while ( l-- ) {
			if ( globalTodos.todos[l].completed ) {
				globalTodos.todos.splice( l, 1 );
			}
		}
		this.getView("renderer").updateView( globalTodos );
		this.getModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
