

tipJS.model("globalModelVO", {
	imageReader:null,
	layerFileInfo:null,
	init:function(){
		this.imageReader = new FileReader();
		this.layerFileInfo = document.getElementById("imageInfo");
	}
});
