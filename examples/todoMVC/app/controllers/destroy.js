/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("destroy", {

	invoke : function( btn ){

		var globalTodos = this.getModel("globalTodos", true),
			renderer = this.getView("renderer"),
			utils = this.getModel("utils");

		globalTodos.getTodo( btn, function( i ) {
			globalTodos.todos.splice( i, 1 );
			renderer.updateView( globalTodos );
			utils.store( globalTodos.STORE_KEY, globalTodos.todos );
		});
	}
});
