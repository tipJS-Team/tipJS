

tipJS.controller("init", {

	invoke : function(){
		var globalTodos = this.getModel("globalTodos", true);

		globalTodos.init();
		this.getView("renderer").updateView( globalTodos );
		this.getModel("utils").store( globalTodos.STORE_KEY, globalTodos.todos );
		this.getModel("bindAction").bindActions();
	}
});
