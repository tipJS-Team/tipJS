/*
 * tipJS - Javascript MVC Framework ver.1.21
 * 
 * Copyright 2012.07 SeungHyun PAEK
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

tipJS.model("bindAction", {
	
	bindActions: function() {
		var globalTodos = this.getModel("globalTodos", true);
		globalTodos.$newTodo.on( 'keyup', this.create );
		globalTodos.$toggleAll.on( 'change', this.toggleAll );
		globalTodos.$footer.on( 'click', '#clear-completed', this.destroyCompleted );
		
		var list = globalTodos.$todoList;
		list.on( 'change', '.toggle', this.toggle );
		list.on( 'dblclick', 'label', this.edit );
		list.on( 'keypress', '.edit', this.blurOnEnter );
		list.on( 'blur', '.edit', this.update );
		list.on( 'click', '.destroy', this.destroy );
	},
	create: function(e) {
		var params = {
			event : e,
			input : $(this)
		}
		tipJS.action.create(params);
	},
	toggleAll: function() {
		tipJS.action.toggleAll(this);
	},
	destroyCompleted: function() {
		tipJS.action.destroyCompleted();
	},
	toggle: function() {
		tipJS.action.toggle(this);
	},
	edit: function() {
		tipJS.action.edit(this);
	},
	blurOnEnter: function( e ) {
		tipJS.action.blurOnEnter(e);
	},
	update: function() {
		tipJS.action.update(this);
	},
	destroy: function() {
		tipJS.action.destroy(this);
	}
});
