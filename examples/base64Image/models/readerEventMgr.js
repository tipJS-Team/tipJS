

tipJS.model("readerEventMgr", {
	setEvent : function() {
		var globalModel = this.getModel("globalModelVO", true);
		var imageReader = globalModel.imageReader;

		imageReader.onload = tipJS.action.onLoad;

		imageReader.onprogress = function(e){
			var loadData = e.loaded;
			var totalData = e.total;
			var per = (loadData/totalData) * 100;
			globalModel.loadingBar.innerHTML = per+"% ("+loadData+"/"+totalData+" Bytes)";
			globalModel.loadingBar.value = per;
		};
	}
});
