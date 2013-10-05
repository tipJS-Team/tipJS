tipJS.controller("listController", {
	async: true,


	sample : function () {
		var parserModel = this.getModel("parserModel");
		var parserView = this.getView("parserView");
		var sampleText = parserModel.getSampleText();
		parserView.set$txt_origin (sampleText);	
	},

	invoke : function( params ){

		//tipJS.log(this.name + " params:"+params);
		var parserModel = this.getModel("parserModel");
		var parserView = this.getView("parserView");

		var list = parserModel.getListParsedSQL();

		if (list.length === 0) {
			parserView.set$div_alertType("Warning");
			parserView.set$div_alertMsg("저장된 ParseSQL 이 없습니다.");
			parserView.get$class_alert().show();
			return false;
		}

		parserView.set$div_history(list);

		//parserView.set$span_cnt("");
		parserView.set$span_cnt(list.length);

	}
});
