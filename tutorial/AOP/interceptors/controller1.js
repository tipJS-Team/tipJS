

tipJS.interceptor("controller1", {
    order:1,
    target:"controllers",
    before:function(){
        console.log("interceptor.before #1-1 : " + this.msg);
    },
    after:[
        function(){
            console.log("interceptor.after #1-1 : " + this.msg);
        },
        function(){
            console.log("interceptor.after #1-2 : " + this.msg);
        }
    ]
});
