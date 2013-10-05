tipJS.controller("sampleController", {
	async: true,
	invoke : function( params ){
		//tipJS.log(this.name + " params:"+params);
		var sampleText = this.getModel("parserModel").getSampleText();
		this.getView("parserView").set$txt_origin(sampleText);	
	}
});
