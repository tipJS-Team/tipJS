

tipJS.controller("onLoad", {
	invoke:function(ev) {
		var globalModel = this.getModel("globalModelVO", true);
		var totalData = ev.total;
		globalModel.layerFileInfo.innerHTML += "complete<br />";
		
		// 썸네일 작성
		var imgTag = document.createElement("img");
		imgTag.src = ev.target.result;
		this.getById("base64String").value = ev.target.result;
		imgTag.onload = function(){
			document.getElementById("imageList").appendChild(imgTag);
		}
		
		var _templateConfig = {
			url:"./templates/css-background.tpl",
			data:ev.target.result
		};
		this.getById("base64Css").value = this.render(_templateConfig);
		_templateConfig.url = "./templates/img-tag.tpl";
		this.getById("base64Img").value = this.render(_templateConfig);
	}
});
