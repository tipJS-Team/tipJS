

tipJS.view("basicView", {
	print : function( model ){
		this.render({
			url:"./app/template/layout.html",
			renderTo:"content",
			data:{
				msg : model.getMsg()
			}
		});
	}
});
