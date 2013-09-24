#Language
##EN
    
#about
##Introduction
tipJS JavaScript MVC Framework is a small, simple, and effective JavaScript MVC Framework. You can implement Web Application with complex structure simply as Model and View using tipJS. tipJS JavaScript MVC Framework increases the maintenance efficacy of your Web Site extraordinarily.


##Download
- [2.0](https://github.com/tipJS-Team/tipJS/releases/tag/2.0.0) (Stable)  
- [1.4.3](https://github.com/tipjs/tipjs-JavaScript-MVC-Framework/blob/master/last_version/tipJS-MVC-1.43-dev.js) (Support Ends)

##Feature
- tipJS implements complex JavaScript Application in the form of MVC Pattern.
- tipJS is familiar framework for Back-end Developers.
- Supported AOP(Aspect-Oriented Programming).
- tipJS creates a user's view simply by providing simple HTML Template (since version 1.10).
- tipJS can be compatible with diverse browsers (IE 7/8/9, Chrome, Firefox, Safari, etc...)
- tipJS does not require any external library as it was developed as JavaScript ECMAScript Code for independent operation.
- tipJS can be compatible with diverse external JavaScript (JQuery, ExtJS, etc...)
- tipJS makes you control Browser Cache simply.
- tipJS makes you implement your Application as Models and Views.
- tipJS makes you control your Application at diverse timing.
- tipJS provides you diverse development formats by operating with the minimum rules.
- tipJS provides you specify operating range of the benchmark functions.
- tipJS is a multi-lingual(i18n) support.
- etc...


## Structure

#License
Dual licensed under the MIT or GPL Version 2 licenses.

# Installation 
    ...
    ...
#App Configuration
## Essentional
tipJS the setting is done by tipJS.app method. In all settings to default (default value) exists, tipJS.app method for changing the default settings to arguments of the object would specify.
<pre>
tipJS.app({
    controllers:[
        "someController1.js",
        "someController2.js"
    ],
    models:[
        "someModel1.js"
        "someModel2.js"
    ],
    views:[
        "someView1.js",
        "someView2.js"
    ],
    onLoad:function(args){
    	...
    },
...
});
window.onload = function() {
	tipJS.loadApp();
}
</pre>
tipJS.app method that you can set in the property description.

- controllers
array type으로 Controller file들을 정의합니다.
- models
array type으로 Model file들을 정의합니다.
- views
array type으로 View file들을 정의합니다.
- onLoad
function type으로 등록된 onLoad method 는 application 이 tipJS.loadApp method 로 load된 직후에 단 한번 실행되는 method입니다. argument로 tipJS.loadApp method 호출시 지정한 argument 인 parameter 를 사용할 수 있습니다.
<pre>
// tipJS
tipJS.app({
    ...
    onLoad:function(params){
        tipJS.debug(params.param1); // result is "some value"
    },
    ...
});
// JQuery
$(document).ready(function(e){
    var param = {param1:"some value"}
    tipJS.loadApp(param);
});
</pre>
- beforeController
function type으로 등록된 beforeController method 는 AOP의 개념으로 application 내에서 어떤 Controller 를 호출하더라도 공통적으로 실행되는 method입니다.이 method 는 Controller 의 그 어떤 method보다 우선적으로 실행됩니다. argument로 Controller를 호출하는 tipJS.action method의 두번째 argument 인 parameter를 사용할 수 있습니다. Controller 와 동일한 method들을 사용할 수 있습니다.
<pre>
tipJS.app({
    ...
    onLoad:function(params){
        tipJS.action("someController", params);
    },
    beforeController:function(params){
        console.log(params.param1); // result is "some value"
    }
    ...
});
</pre>
- afterController
function type으로 등록된 afterController method 는 application 내에서 어떤 Controller 를 호출하더라도 공통적으로 실행되는 method입니다.이 method 는 Controller 가 실행종료된 후 실행됩니다. argument로 Controller를 호출하는 tipJS.action method의 두번째 argument 인 parameter를 사용할 수 있습니다. Controller 와 동일한 method들을 사용할 수 있습니다.
- noCache
Browser cache 를 boolean type으로 설정할 수 있으며, true일 경우 noCacheAuto, noCacheVersion, noCacheParam 속성과 연동되어 version value 가 변경 될때마다 JavaScript file을 다시 load 하게합니다.(default:false)
- noCacheVersion
Browser cache 제어를 위한 버젼 정보를 설정합니다.(default:"1.000")
- noCacheAuto
true로 설정된 경우 noCacheVersion option의 value와는 상관없이 version을 랜덤하게 출력하여 Browser cache를 무효하게 합니다.(default:false)
- noCacheParam
Browser cache 제어를 위한 parameter name을 설정합니다.(default:"noCacheVersion")

##Cache Control
tipJS JavaScript MVC Framework 는 tipJS.app method 의 설정을 통해 Browser cache를 control합니다.
<pre>
tipJS.app({
    noCache:false,
    noCacheVersion:"1.000",
    noCacheAuto:true,
    noCacheParam:"noCacheVersion",
    ...
});
</pre>
noCache attribute가 false일 경우 tipJS 는 아래와 같이 JavaScript file 을 읽어들입니다.
<pre>
<script type="text/javascript" src="./controllers/some.js"></script>
</pre>
그러나 noCache attribute 가 true일 경우 아래와 같은 결과와 같습니다.
<pre>
<script type="text/javascript" src="./controllers/some.js?noCacheVersion=1.000"></script>
</pre>
noCache attribute 가 true 그리고 noCacheAuto attribute 가 true일 경우 noCacheVersion 의 parameter 값이 random 하게 생성되어 항상 새로 JavaScript file 을 load 하게 됩니다.
<pre>
<script type="text/javascript" src="./controllers/some.js?noCacheVersion=0.5478912648"></script>
</pre>
만약 당신의 application이 갱신되었다면 noCacheVersion 속성의 값을 변경하거나 noCacheAuto 속성의 값을 true 로 하는것 만으로 Browser는 cache 처리없이 최신의JavaScript file을 load하게 될 것입니다.

#Controller
Controller의 호출은 아래의 방식으로 이루어 집니다.
- tipJS.action("controller name", parameter)
- tipJS.action.controllerName(parameter)

tipJS.controller method 에서 정의된 Controller 처리가 실행되기 전에 tipJS.app method에서 정의한 beforeController method 가 실행되며 Controller 처리가 모두 완료된 후에 define.js에서 정의한 afterController method가 실행됩니다.

http://tipjs.com/wp/wp-content/uploads/2012/08/tipJS_MVC_Framework_process_flow.png
Controller Tutorial[http://tipjs.com/tipJS/tutorial/Controller/]

tipJS.action method의 두번째 argument 는 tipJS.app method에서 정의한 beforeController method, afterController method 와 호출된 Controller의 beforeInvoke, invoke, afterInvoke, exceptionInvoke method 에서 input argument로 사용가능합니다.

beforeController / afterController method 안에서 this.controllerName 속성으로 현재 처리중인 controller 명이 참조 가능합니다.
<pre>
tipJS.app({
    ...
    onLoad:function(params){
        // call Controller
        tipJS.action("someController", "someValue");
        // or
        tipJS.action.someController("someValue");
    },
    beforeController:function(params){
        console.log(params); // result is "someValue" 
        console.log(this.controllerName); // result is "someController"
    },
    afterController:function(params){
        console.log(params); // result is "someValue" 
        console.log(this.controllerName); // result is "someController"
    },
    ...
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    beforeInvoke:function(params){
        console.log(params); // result is "someValue"
    },
    invoke:function(params){
        console.log(params); // result is "someValue"
    },
    afterInvoke:function(params){
        console.log(params); // result is "someValue"
    },
    exceptionInvoke:function(exception, params){
        console.log(params); // result is "someValue"
    }
});
</pre>
tipJS.action method 의 호출 위치는 tipJS.loadApp method 호출 이후 자유롭습니다.

Controller 는 보통 아래와 같은 구성으로 이루어 집니다.
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    beforeInvoke:function(params){
        ....
    },
    invoke:function(params){
        console.log("invoke Start");
        // load Application Model
        var initModel = this.getModel("initModel");
        // load Application ViewModel
        var initView = this.getView("initView");
 
        initView.drawBody(bodyHtml);
 
        console.log("invoke Done");
    },
    afterInvoke:function(params){
        ....
    },
    exceptionInvoke:function(exception, params){
        alert(exception);
    }
});
</pre>
<pre>
tipJS.app({
    ...
    onLoad:function(params){
        tipJS.action("someController", params);
    },
    ...
});
</pre>
Controller는 기본 4가지의 method 가 조건에 의해 실행됩니다.

기본적으로 Controller 는 tipJS Javascript MVC Framework에 의해 beforeInvoke, invoke, afterInvoke method 의 순서로 자동호출되며 exceptionInvoke method 는 Controller에 exceptionInvoke method가 정의되어 있고 Controller 실행중 exception 이 발생할 경우에만 호출됩니다.

물론 Controller 내부에서 사용자가 작성한 method 를 호출하는 것도 가능합니다.
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    ...
    invoke:function(params){
        this.userFn();
    },
    userFn:function(){
        ...
        Some Process..
        ...
    }
});
</pre>
Controller 선언시 async 속성을 true로 설정하면 Controller 호출시 비동기 모드로 작동합니다. delay 속성을 1/1000 초단위 로 지정하여 비동기 지연시간을 지정할 수 있습니다.
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    async:true, // AnSynchronized Controller
    delay:500, // 0.5 sec.
    ...
    invoke:function(params){
        this.userFn();
    },
    userFn:function(){
        ...
        Some Process..
        ...
    }
});
</pre>
아래는 Controller 에 설정된 속성에 대한 설명입니다.(기본 4 method 이외)
- async
Controller 동작을 비동기모드로 실행할것인지 설정합니다.(true – 비동기모드)
- delay
Controller 비동기모드 시간을 1/1000 초 단위로 지정합니다.(defalut:15)
- getModel(ModelName)
tipJS.model method에서 정의한 Application Model Object 를 load 합니다.
- getView(ViewName)
tipJS.view method에서 정의한 Application ViewModel Object 를 load 합니다.
- renderTemplate(option)
HTML Template 항목 참고
- getById(id)
document.getElementById 와 동일합니다.
- getByName(name)
document.getElementsByName 와 동일합니다.
- getByTag(tagName)
document.getElementsByTagName 와 동일합니다.

#Model
tipJS JavaScript MVC Framework 서 Model Object 는 필요에 따라 구현하시기 바랍니다.

Model 에서는 같은 Layer인 다른 Model을 load할 수 있습니다.

Model 정의시 Framework에 의해 자동으로 정의되는 method는 다음과 같습니다.

- __init:__init 메서드는 선언후 해당 Model 이 getModel 메서드에 의해 호출되어 생성되는 시점에서 단 한번 실행되는 메서드 입니다.
- getModel(modelName):tipJS.model method에서 정의한 Application Model을 반환합니다.
- getById(id) – document.getElementById 와 동일합니다.
- getByName(name) – document.getElementsByName 와 동일합니다.
- getByTag(tagName) – document.getElementsByTagName 와 동일합니다.

자동으로 정의되는 method가 필요치 않을 경우 VO(Value Object) Model 을 사용하시기 바랍니다. 자세한 설명은 VO(Value Object) Model 항목을 참고하시기 바랍니다.
Model Tutorial[Model Tutorial]
<pre>
// models/someModel.js
tipJS.model("someModel", {
    __init:function(){
        // Object 생성시 framework에 의해 한번만 실행되고 소멸한다.
        ...
    },
    properties:...
    someMethods:function(){
        var someModel2 = this.getModel("someModel2");
        ... some process ...
    }
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    ...
    invoke:function(params){
        // load Application Model
        var someModel = this.getModel("someModel");
        // load Application View
        var someView = this.getView("someView");
 
        someModel.someMethod();
    },
    ...
});
</pre>

## Syncronous Model
tipJS JavaScript MVC Framework는 Model의 동기화 기능을 제공합니다.
Model 의 동기화 기능이란 하나의 생성된 Model Object가 소멸되지 않고 변경되어지는 값을 가진채 유지되는 것을 말합니다.

ModelSync Tutorial[ModelSync Tutorial]
<pre>
// models/someModel.js
tipJS.model("someModel", {
    __init:function(){
        // Object 생성시 framework에 의해 한번만 실행되고 소멸한다.
        ...
    },
    someValue:"foo"
});
</pre>
<pre>
// controller One
tipJS.controller("someController1", {
    ...
    invoke:function(params){
 
        // load Application Model(normal)
        var someModel = this.getModel("someModel");
        console.log(someModel.someValue); // "foo"
        someModel.someValue = "bar";
 
        // load Application Model(synchronized)
        var someModelSync = this.getModel("someModel", true);
        console.log(someModelSync.someValue); // "foo"
        someModelSync.someValue = "bar";
    },
    ...
});
</pre>
<pre>
// controller Two
tipJS.controller("someController2", {
    ...
    invoke:function(params){
 
        // load Application Model(normal)
        var someModel = this.getModel("someModel");
        console.log(someModel.someValue); // "foo"
 
        // load Application Model(synchronized)
        var someModelSync = this.getModel("someModel", true);
        console.log(someModelSync.someValue); // "bar"
    },
    ...
});
</pre>
getModel method 의 두번째 인자에 true를 설정하였을 경우 사용 할 수 있습니다.

##VO(Value Object) Model
tipJS JavaScript MVC Framework는 VO(Value Object) Model 기능을 제공합니다.

VO Model 은 tipJS에서 일반 model선언시 자동으로 추가되는 속성/method 를 추가하지 않습니다. 사용자가 선언한 내용만이 반환되는 model입니다.

VO Model 을 사용하기 위해 별도의 설정작업은 필요하지 않습니다.
Model 선언시 Model Name 값의 마지막이 “VO”로 선언되어 있으면 해당 Model은 VO Model로 동작합니다.

ModelVO Tutorial[ModelVO Tutorial]
<pre>
// models/modelVO.js
tipJS.model("modelVO", {
    __init:function(){
        // Object 생성시 framework에 의해 한번만 실행되고 소멸한다.
        ...
    },
    value1 : "123",
    value2 : "abcd"
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    ...
    invoke:function(params){
 
        console.dir(this.loadModel("someModel"));
        console.dir(this.loadModel("modelVO"));

    },
    ...
});
</pre>

##Model extension(Inheritance)
tipJS JavaScript MVC Framework는 Model의 확장 기능을 제공합니다.

ModelExtend Tutorial[ModelExtend Tutorial]
<pre>
tipJS.model("modelParent", {
    parent1 : "someApp.modelParent",
    parentFn : function() {
        console.log(this.parent1); // someApp.modelParent
    }
});
</pre>
<pre>
tipJS.model("modelChild",{
    __extend : "modelParent",
    child1 : "someApp.modelChild",
    childFn : function() {
        console.log(this.child1); // someApp.modelChild
    }
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    ...
    invoke : function() {
        var modelChild = this.getModel("modelChild");
        modelChild.parentFn(); // someApp.modelParent
        modelChild.childFn(); // someApp.modelChild
    },
    ...
});
</pre>


#ViewModel
##template

#Utility
##i18n
tipJS JavaScript MVC Framework 를 통한 다국어지원(internationalization/i18n) 기능을 설명합니다.
기능을 활성화 하기 위해서 tipJS.app method 에서 localSet 속성을 추가하고 true 값을 설정합니다.
<pre>
tipJS.app({
    ...
    localSet:true,
    ...
});
</pre>
controllers 등이 있는 application 폴더에 lang 폴더를 작성하고 lang폴더 안에 언어코드.js 파일을 아래와 같이 작성합니다. 언어코드는 tipJS가 브라우저 언어정보(navigator.language || navigator.systemLanguage || navigator.userLanguage)를 읽어 자동으로 기본값을 설정합니다.
<pre>
// lang/ko.js
tipJS.localSet({
    "Save":"저장",
    "Load":"불러오기"
});
</pre>
<pre>
// lang/ja.js
tipJS.localSet({
    "Save":"保存",
    "Load":"読み込み"
});
</pre>
언어코드를 수동으로 설정하려면 아래와 같이 tipJS.loadApp 메소드를 호출하기 전에 tipJS.lang 속성값을 설정하려는 언어코드로 변경해 줍니다.
<pre>
...
    tipJS.lang = "ja"; // set to Japaness
    tipJS.loadApp();
...
</pre>

해당 language set의 message 를 취득하려면 tipJS.msg 메소드를 사용합니다.
<pre>
tipJS.controller("someCtrler", {
    invoke:function(params){
        console.log( tipJS.msg("Save") ); // result "저장"
    }
});
</pre>
<pre>
tipJS.model({
    __name : "someApp.someModel",
    someMethod:function(params){
        console.log( tipJS.msg("Load") ); // result "불러오기"
    }
});
</pre>
언어코드.js 파일에서 tipJS.localSet method 로 등록되지 않은 메세지를 취득하려 하면 tipJS.msg method 는 입력한 메세지를 그대로 반환합니다.
<pre>
tipJS.model("someModel", {
    someMethod:function(params){
        console.log( tipJS.msg("Some Message") ); // result "Some Message"
    }
});
</pre>

##AOP

ETC
    Debug Mode
    Benchmark
    echo

Tutorials
    Controller
    Model
    ModelSync
    ModelVO
    ModelExtend
    View(HTML Template)
    ViewExtend

Examples
Contributor
