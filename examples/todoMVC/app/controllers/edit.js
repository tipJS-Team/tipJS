

tipJS.controller("edit", {

	invoke : function( label ){

		$(label).closest('li').addClass('editing').find('.edit').focus();
	}
});
