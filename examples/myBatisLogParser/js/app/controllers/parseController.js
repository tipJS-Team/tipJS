tipJS.controller("parseController", {
	async: true,

	beforeInvoke:function(){
		tipJS.debug(this.name + ".beforeInvoke");
	},

	/**
	 * myBatis 로그 합치기
	 * Preparing: Select dummy from dual where col = ? and col2 = ?
	 * Parameters: val1(String), val2(String)
	 *
	 * Result) select ... where col = val1 and col2 = val2
	 *
	 * @return {[type]} [description]
	 */
	parse : function () {

		var parserModel = this.getModel("parserModel");
		var parserView = this.getView("parserView");

		var i=0, lastIdx = 0;

		var $txt_origin = parserView.get$txt_origin();
		var $txt_parsing = parserView.get$txt_parsing();

		var originArr = [], parsingArr = [], paramArr = [];
		var paramCnt = 0;
		var result,preparing = "";
		var param = {};

		originArr = $txt_origin.val().split("\n");
		parsingArr[0] = originArr[0].substring ( originArr[0].indexOf ("Preparing: ")+11 );
		parsingArr[1] = originArr[1].substring ( originArr[1].indexOf ("Parameters: ")+12 );

		if (originArr.length > 2) {
			for (i =2; i < originArr.length; i++ ) {
				parsingArr[1] += originArr[i];
			}
		}
		preparing  = parsingArr[0];
		paramArr = parsingArr[1].split(",");
		tipJS.debug("paramArr:"+paramArr);
		for (i = 0; i < paramArr.length; i++) {
			var tempParams = paramArr[i];
			lastIdx = tempParams.lastIndexOf("(");

			param.val = $.trim ( tempParams.substring(0, lastIdx ) );

			if (lastIdx < 0) {
				param.val  = "null";
			}

			param.typ = tempParams.substring(tempParams.lastIndexOf("(")+1, paramArr[i].lastIndexOf(")"));

			if ( preparing.indexOf("?") >= 0 ) {

				if (param.typ === "String") {
					param.val = "'"+param.val+"'";
				}
				preparing = preparing.replace("?", param.val);
			}

		}
		result = preparing;

		parserView.set$txt_parsing(result);
	},
	isRequiredOk : function ( params ) {
		var parserView = this.getView("parserView");
		if ( $.trim ( parserView.get$txt_origin().val() ) === "" ) {
			parserView.set$div_alertType("Required Error");
			parserView.set$div_alertMsg("Original Log 를 입력하세요. (잘모르겠으면 sample 버튼 누르세요)");
			parserView.get$txt_origin().focus();
			parserView.get$class_alert().show();
			return false;
		} 
		return true;
	},
	invoke : function( params ){

		if ( !this.isRequiredOk() ) {
			return false;
		}

		this.parse();
	}
});
