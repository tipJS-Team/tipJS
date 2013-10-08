

tipJS.controller("controller3", {
	invoke:function(params){
		tipJS.debug(".invoke");
		
		var modelA = this.getModel("modelA");
		var modelB = this.getModel("modelB", true);
		
		tipJS.debug( modelA.name );
		document.getElementById("contentsA").innerHTML = modelA.name;
		modelA.name = "modelE";
		
		tipJS.debug( modelB.name );
		document.getElementById("contentsB").innerHTML = modelB.name;
		modelB.name = "modelE";
	}
});
