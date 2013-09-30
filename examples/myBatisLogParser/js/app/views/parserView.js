tipJS.view("parserView", {

    get$txt_origin : function(){
    	return $("#txt_origin");
    },
    get$txt_parsing : function(){
    	return $("#txt_parsing");
    },
    get$div_history : function(){
        return $("#div_history");
    },
    get$span_cnt : function() {
        return $("#span_cnt");
    },
    get$class_alert : function() {
        return $(".alert");
    },
    set$txt_origin : function(param){
    	return $("#txt_origin").val(param);
    },
    set$txt_parsing : function(param){
    	return $("#txt_parsing").val(param);
    },
    set$div_history : function(param){

       if ( param == "" || param == null ) {
           return $("#div_history").html("");
       }

       var _templateConfig = {
            url:"js/app/tpl/parseTpl.html",
            //renderTo:"span_cnt",
            data: param
        };
        return $("#div_history").html ( this.renderTemplate(_templateConfig) );

        //return $("#div_history").html(param);
    },
    set$span_cnt : function(param) {
        $("#span_cnt").html( param );
    },
    set$div_alertType : function(param) {
        $("#div_alertType").html( param );
    },
    set$div_alertMsg : function(param) {
        $("#div_alertMsg").html( param );
    },


});