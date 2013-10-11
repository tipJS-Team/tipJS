

tipJS.model("readerEventMgr", {
	setEvent : function() {
		var globalModel = this.getModel("globalModelVO", true);
		var imageReader = globalModel.imageReader;

		imageReader.onload = tipJS.action.onLoad;
	}
});
