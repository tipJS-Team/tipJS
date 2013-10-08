

tipJS.controller("controller2", {
	invoke:function(params){
		tipJS.debug(".invoke");
		var modelChild = this.getModel("modelChild2VO");
		tipJS.echo(modelChild);
		modelChild.parentFn();
		modelChild.childFn();
	}
});
