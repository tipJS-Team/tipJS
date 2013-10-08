

tipJS.view("viewA", {
	proper : "viewA property",
	methodA : function(){
		tipJS.debug("viewA.methodA()");
		tipJS.debug(this.proper);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["aaa","bbb","ccc","ddd","eee"]
		}
		this.render(opt);
	}
});
