

tipJS.view("imageInfo", {
	imageInfoLog:function(imageFile){
		var _templateConfig = {
			url:"./templates/imageInfo.tpl",
			renderTo:"imageInfo",
			data:imageFile
		};
		this.render(_templateConfig);
	}
});