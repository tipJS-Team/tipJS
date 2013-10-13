

tipJS.controller("print5", {
	//async:true,
	beforeInvoke:function(params){
		tipJS.debug(".beforeInvoke Start");
		
		tipJS.debug(".beforeInvoke Done");
	},
	invoke:function(params){
		tipJS.debug(".invoke Start");
		
		var id = "divTemp5";
		this.getById("content").innerHTML = this.render(this.getById(id).innerHTML, {});
	},
	afterInvoke:function(params){
		tipJS.debug(".afterInvoke Start");
		
		tipJS.debug(".afterInvoke Done");
	}
});
