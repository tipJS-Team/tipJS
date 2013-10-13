

tipJS.controller("print", {
	//async:true,
	beforeInvoke:function(params){
		tipJS.debug(".beforeInvoke Start");
		
		tipJS.debug(".beforeInvoke Done");
	},
	invoke:function(params){
		tipJS.debug(".invoke Start");
		var hash = location.hash;
		var id = "divTemp0";
		if (hash == "#!/page1") id = "divTemp1";
		if (hash == "#!/page2") id = "divTemp2";
		if (hash == "#!/page3") id = "divTemp3";
		this.getById("content").innerHTML = this.render(this.getById(id).innerHTML, {});
	},
	afterInvoke:function(params){
		tipJS.debug(".afterInvoke Start");
		
		tipJS.debug(".afterInvoke Done");
	}
});
