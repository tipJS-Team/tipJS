

tipJS.controller("blurOnEnter", {
	invoke : function( evt ){

		if ( evt.keyCode === this.getModel("globalTodos", true).ENTER_KEY ) {
			evt.target.blur();
		}
	}
});
