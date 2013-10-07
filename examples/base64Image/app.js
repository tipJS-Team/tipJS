

tipJS.app({
	controllers:[
		"init.js",
		"onLoad.js",
		"load.js"
	],
	models:[
		"readerEventMgr.js",
		"globalModelVO.js"
	],
	views:[
		"imageInfo.js"
	],
	onLoad:function(){
		tipJS.debug(this.name + ".onLoad Done");
	}
});

window.onload = function(){
	tipJS.loadApp();
	// call Controller
	tipJS.action("init");
};