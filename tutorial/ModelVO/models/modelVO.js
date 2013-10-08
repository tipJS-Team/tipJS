

tipJS.model("modelVO", {
	proper : "modelVO property",
	methodB : function(){
		tipJS.debug("modelB.methodB()");
		tipJS.debug(this.proper);
		
		return this.loadModel("modelA").methodA();
	}
});
