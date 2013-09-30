tipJS.model("parserModel", {
	sampleText: "",
	savedCount: 0,
	getSampleText : function(){
		tipJS.debug("parseModel.getSampleText()");
		this.sampleText = "DEBUG: java.sql.Connection - ==>  Preparing: SELECT TEST1, TEST2 FROM DUAL WHERE COL1 = ? AND COL2 = ? AND NO = ?";
		this.sampleText += "\nDEBUG: java.sql.PreparedStatement - ==> Parameters: test1(String), test2(String), 13(Long)";
		
		return this.sampleText;
	},
	getParsedSQL : function(key) {
		return localStorage.getItem(key);
	},
	setParsedSQL : function(key, value) {
		localStorage.setItem(key, value);
	},
	getMaxKey : function() {
		return localStorage.length;
	},
	getListParsedSQL : function() {
		var list = [];
		$.each ( localStorage, function (k,v) {
			list[k] = v;
		});
		return list;
	},
	removeMaxParsedSQL : function (key) {
		var maxKey = this.getMaxKey();
 		localStorage.removeItem(parseInt(maxKey-1));
	},
	clear : function () {
		localStorage.clear();
	}
});