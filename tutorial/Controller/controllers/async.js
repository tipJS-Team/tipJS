

tipJS.controller("async", {
	async : true,
	delay: 1000,
	beforeInvoke:function(){
		tipJS.debug(".beforeInvoke");
	},
	invoke:function(params){
		tipJS.debug(".invoke");
		document.getElementById("contentsHidden").innerHTML = "";
		for (var i=0; i<10000; i++) {
			document.getElementById("contentsHidden").innerHTML += "a";
		}
		document.getElementById("contents").innerHTML = "<h1>Hello tipJS.com</h1>";
	},
	afterInvoke:function(){
		tipJS.debug(".afterInvoke");
	},
	exceptionInvoke:function(){
		tipJS.debug(".exceptionInvoke");
	}
});
