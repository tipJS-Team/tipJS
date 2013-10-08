

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");

		var ret = this.getModel("modelB").methodB();
		document.getElementById("contents").innerHTML = "<h1>" + ret + "</h1>";
	}
});
