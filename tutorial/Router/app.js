

tipJS.app({
	developmentHostList:[
		'localhost'
		,'127.0.0.1'
		,'tipjs.com'
	],
	noCache:true,
	noCacheAuto:true,
	controllers:[
		"print.js?ver=123",
		"print4.js?ver=123",
		"print5.js?ver=123"
	],
	routes:[
		{
			url:"/", // no hash
			controller:"print4"
		},
		{
			url:"!", // hash, not registered
			controller:"print5"
		},
		{
			url:"#!/",
			controller:"print"
		},
		{
			url:"#!/page1",
			controller:"print"
		},
		{
			url:"#!/page2",
			controller:"print"
		},
		{
			url:"#!/page3",
			controller:"print"
		}
	],
	onLoad:function(){
		//tipJS.action.print();
	}
});

window.onload = function(){
	tipJS.loadApp();
};