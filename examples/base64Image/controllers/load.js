

tipJS.controller("load", {
	invoke:function(params) {
		
		var imageFiles = this.getById("imageFile").files;
		if (imageFiles.length < 1) {
			alert("이미지를 선택해 주세요.");
			return;
		}
		var imageFile = imageFiles[0];
		if (imageFile.type.indexOf("image/") != 0){
			alert("이미지 형식만 지원합니다.");
			return;
		}
		// 각 영역 초기화
		this.initLayout();
		// FileReader 객체에 이벤트 정의
		this.getModel("readerEventMgr").setEvent();
		// FileReader 객체로 DataURL형식으로 파일을 읽어들임
		this.getModel("globalModelVO", true).imageReader.readAsDataURL(imageFile);
		// 이미지정보 출력
		this.getView("imageInfo").imageInfoLog(imageFile);
		
	},
	initLayout:function(){
		this.getById("imageInfo").innerHTML = "";
		this.getById("imageList").innerHTML = "";
		this.getById("base64String").value = "";
	}
});
