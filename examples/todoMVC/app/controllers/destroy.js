

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
