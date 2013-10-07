
tipJS.controller("init", {
	invoke:function(){
		
		if (!window.File) {
			alert("does not support the File API");
			return;
		}
		// Global 변수 초기화
		this.getModel("globalModelVO", true).init();
		
		// Load 버튼 객체에 이벤트 정의
		this.setEvents();
		
	},
	setEvents:function(){
		this.getById("btLoad").addEventListener("click", tipJS.action.load, true);
	}
});
