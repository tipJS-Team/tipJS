

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
