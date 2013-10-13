

tipJS.controller("async", {
	async : true,
	delay: 1000,

	msg:"controller message 2",

	invoke:function(params){
		console.log( this.msg ); // "some Message"
	}

});
