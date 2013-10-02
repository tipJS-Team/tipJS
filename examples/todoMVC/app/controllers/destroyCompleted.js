

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
