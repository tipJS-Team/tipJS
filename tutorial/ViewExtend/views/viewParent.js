

tipJS.view("viewParent", {
	parent : "parent property",
	parentFn : function(){
		tipJS.debug("modelParent.parentFn()");
		tipJS.debug(this.child);
		var opt = {
			url:"./views/template.html",
			renderTo:"contents",
			data:["parent-1","parent-2","parent-3","parent-4"]
		}
		this.render(opt);
	}
});
