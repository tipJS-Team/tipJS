/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.controller("toggleAll", {
	
	invoke : function( chkboxAll ){

		var isChecked = $( chkboxAll ).prop('checked'),
			globalTodos = this.getModel("globalTodos", true);

		$.each( globalTodos.todos, function( i, val ) {
			val.completed = isChecked;
		});
		this.getView("renderer").updateView( globalTodos );
		this.getModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
