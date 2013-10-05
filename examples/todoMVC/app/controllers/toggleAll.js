

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
