

tipJS.model("modelA", {
	proper : "modelA property",
	methodA : function(){
		tipJS.debug("modelA.methodA()");
		tipJS.debug(this.proper);
		
		return this.proper;
	}
});
