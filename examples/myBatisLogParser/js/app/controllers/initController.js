tipJS.controller("initController", {

	beforeClickHandler : function () {
		var parserView = this.getView("parserView");
		parserView.set$div_alertType("");
		parserView.set$div_alertMsg("");
		parserView.get$class_alert().hide();
	},
	invoke : function(){

		var superThis = this;
		$("#defaultForm").submit(function(e) {
			e.preventDefault();
		});

		$("#div_button_list")
		.on("click", "button", function(e) {
			superThis.beforeClickHandler();
			var btnActName = $(this).attr("id").substring(4);

			if (btnActName === "clear") {
				tipJS.action.removeController("clear");
			}else {
				tipJS.action(btnActName+"Controller");
			}
		});
	}
});
