

tipJS.controller("controller1", {
	invoke:function(params){
		tipJS.debug(".invoke");
		
		this.getView("viewA").methodA();
	}
});
