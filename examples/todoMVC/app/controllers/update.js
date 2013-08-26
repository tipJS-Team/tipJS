/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("update", {

	invoke : function( input ){

		var globalTodos = this.getModel("globalTodos", true),
			renderer = this.getView("renderer"),
			utils = this.getModel("utils"),
			val = $.trim( $(input).removeClass('editing').val() );

		globalTodos.getTodo( input, function( i ) {
			if ( val ) {
				globalTodos.todos[ i ].title = val;
			} else {
				globalTodos.todos.splice( i, 1 );
			}
			renderer.updateView( globalTodos );
			utils.store( globalTodos.STORE_KEY, globalTodos.todos );
		});
	}
});
