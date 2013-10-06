

tipJS.controller("create", {
	invoke : function( params ){

		var globalTodos = this.getModel("globalTodos", true),
			utils = this.getModel("utils"),
			$input = params.input,
			e = params.event,
			val = $.trim( $input.val() );

		if ( e.which !== globalTodos.ENTER_KEY || !val ) {
			return;
		}
		globalTodos.todos.push({
			id: utils.uuid(),
			title: val,
			completed: false
		});
		$input.val('');
		this.getView("renderer").updateView( globalTodos );
		this.getModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
	}
});
