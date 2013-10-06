

tipJS.view("renderer", {

	updateView : function( globalTodos ){
		var todos = globalTodos.todos,
			todoCount = todos.length,
			activeTodoCount = this.activeTodoCount( todos ),
			activeTodoWord = this.pluralize( activeTodoCount, 'item' ),
			footer = {
				activeTodoCount: activeTodoCount,
				activeTodoWord: activeTodoWord,
				completedTodos: todoCount - activeTodoCount
			};
		
		globalTodos.$todoList.html( this.render(this.getById("tplTodos").innerHTML, todos));
		globalTodos.$main.toggle( !!todos.length );
		globalTodos.$toggleAll.prop( 'checked', !activeTodoCount );
		globalTodos.$footer.toggle( !!todoCount );
		globalTodos.$footer.html( this.render(this.getById("tplFooter").innerHTML, footer));
	},
	activeTodoCount: function(todos) {
		var count = 0;
		$.each( todos, function( i, val ) {
			if ( !val.completed ) {
				count++;
			}
		});
		return count;
	},
	pluralize: function( count, word ) {
		return count === 1 ? word : word + 's';
	}
});
