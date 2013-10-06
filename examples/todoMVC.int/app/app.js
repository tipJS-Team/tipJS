

tipJS.app({
	appPath:"./app",
	noCache:true,
	noCacheParam:"tipJS",
	noCacheAuto:true,
	controllers:[
		"init.js",
		"create.js",
		"toggleAll.js",
		"destroyCompleted.js",
		"toggle.js",
		"edit.js",
		"blurOnEnter.js",
		"update.js",
		"destroy.js"
	],
	models:[
		"bindAction.js",
		"globalTodos.js",
		"utils.js"
	],
	views:[
		"renderer.js"
	],
	onLoad:function(){
		tipJS.log("todoMVC.onLoad()");
		tipJS.action.init();
	}
});

$(document).ready(function(e){
	tipJS.log('Document is Ready');
	tipJS.loadApp();
});
