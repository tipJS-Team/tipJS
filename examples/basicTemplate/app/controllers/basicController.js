
tipJS.controller("basicController", {

	invoke : function(){
		var model = this.getModel("basicModel");
		var view = this.getView("basicView");

		view.print(model);
	}
});
