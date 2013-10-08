

tipJS.app({
	developmentHostList:[
		'localhost'
		,'127.0.0.1'
		,'tipjs.com'
	],
	controllers:[
		"sync.js",
		"async.js",
		"beforeInvoke.js",
		"invoke.js",
		"afterInvoke.js",
		"exceptionInvoke.js"
	],
	beforeController:function(param){
		tipJS.debug("beforeController");
		document.getElementById("contents").innerHTML = "<h2>READY...</h2>";
	},
	afterController:function(param){
		tipJS.debug("afterController");
	}
});

