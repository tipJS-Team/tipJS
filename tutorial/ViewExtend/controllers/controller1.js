

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");
		var viewChild = this.getView("viewChild");
		tipJS.echo(viewChild);
		viewChild.parentFn();
		viewChild.childFn();
	}
});
