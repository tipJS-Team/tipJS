

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");
		var modelChild = this.getModel("modelChildVO");
		tipJS.echo(modelChild);
		modelChild.parentFn();
		modelChild.childFn();
	}
});
