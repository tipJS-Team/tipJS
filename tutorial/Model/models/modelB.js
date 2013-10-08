

tipJS.model("modelB", {
	proper : "modelB property",
	methodB : function(){
		tipJS.debug("modelB.methodB()");
		tipJS.debug(this.proper);
		
		return this.getModel("modelA").methodA();
	}
});
