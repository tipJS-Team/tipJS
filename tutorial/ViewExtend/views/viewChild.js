

tipJS.view("viewChild", {
	__extend:"viewParent",
	child : "child property",
	common2 : "child common2 property",
	childFn : function(){
		tipJS.debug("modelChild.childFn()");
		tipJS.debug(this.child);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["child-1","child-2","child-3","child-4"]
		}
		this.render(opt);
	}
});
