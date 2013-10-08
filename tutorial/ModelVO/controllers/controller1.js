

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");
		
		tipJS.log("##### modelA start #####");
		tipJS.echo(this.getModel("modelA"));
		tipJS.log("##### modelA finish #####");
		tipJS.log("##### modelVO start #####");
		tipJS.echo(this.getModel("modelVO"));
		tipJS.log("##### modelVO finish #####");
		document.getElementById("contents").innerHTML = "<h2>check your browser console</h2>";
	}
});
