

tipJS.controller("afterInvoke", {
	beforeInvoke:function(){
		tipJS.debug(".beforeInvoke");
		document.getElementById("contents").innerHTML = "<h1>beforeInvoke</h1>";
	},
	invoke:function(params){
		tipJS.debug(".invoke");
		document.getElementById("contents").innerHTML += "<h1>invoke</h1>";
	},
	afterInvoke:function(){
		tipJS.debug(".afterInvoke");
		document.getElementById("contents").innerHTML += "<h1>afterInvoke</h1>";
		return false;
	},
	exceptionInvoke:function(){
		tipJS.debug(".exceptionInvoke");
		document.getElementById("contents").innerHTML += "<h1>exceptionInvoke</h1>";
	}
});
