
tipJS.app({
	developmentHostList:[
		'localhost'
		,'127.0.0.1'
		,'tipjs.com'
	],
	noCache:true,
	noCacheAuto:true,
	controllers:[
		"controller1.js",
		"controller2.js"
	],
	models:[
		"modelParent.js",
		"modelChildVO.js",
		"modelChild2VO.js"
	]
});

