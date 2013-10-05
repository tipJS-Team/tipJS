tipJS.controller("removeController", {
	async: true,

	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},
	invoke : function( params ){
		tipJS.log(this.name + " params:"+params);
		var parserModel = this.getModel("parserModel");
		var parserView = this.getView("parserView");

		if ( parserModel.getListParsedSQL().length === 0 ) {
			parserView.set$div_alertType("Warning");
			parserView.set$div_alertMsg("저장된 ParseSQL 이 없습니다.");
			parserView.get$class_alert().show();
			return false;
		}

		if (params === "clear") {
			parserModel.clear();
		}
		parserModel.removeMaxParsedSQL();

		//view Update
		var list = parserModel.getListParsedSQL();
		parserView.set$div_history(list);
		parserView.set$span_cnt(list.length);
	}
});
