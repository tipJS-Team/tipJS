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
```javascript
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
```
tipJS.app method that you can set in the property description.

- controllers   
Controller files are defined as the array type.
- models  
Model files are defined as the array type.
- views  
View files are defined as the array type.
- onLoad  
The onLoad event occurs once after tipJS.loadApp method is called.
The arguments cat set from the parameters of tipJS.loadApp method.
```javascript
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
```
- beforeController  
The Application will invoke The beforeController method of function type when called any Controller.
The method is called before executing any method in Controller.
And the method can use the parameter of tipJS.action method's second argument, Controller's same method.
```javascript
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
```
- afterController  
The Application will invoke The afterController method of function type when called any Controller.  
The method is called after executing the Controller.
And the method can use the parameter of tipJS.action method's second argument, Controller's same method.
- noCache  
Browser cache can be set to a boolean type, If value is true, 
whenever modify version value with noCacheAuto, noCacheVersion, noCacheParam propertiy, 
be reload JavaScript file. (default:false)
- noCacheVersion  
It is set Version information for Browser cache control.(default:"1.000")
- noCacheAuto  
If value is true,  Browser cache is disabled by output version random 
that irrespective of noCacheVersion option value.(default:false)
- noCacheParam  
It is set parameter name for Browser cache control.(default:"noCacheVersion")

##Cache Control
tipJS JavaScript MVC Framework control Browser cache through properties of tipJS.app method.
```javascript
tipJS.app({
    noCache:false,
    noCacheVersion:"1.000",
    noCacheAuto:true,
    noCacheParam:"noCacheVersion",
    ...
});
```
If noCache attribute is false, tipJS will be load JavaScript file as follows:
```javascript
<script type="text/javascript" src="./controllers/some.js"></script>
```
If noCache attribute is true, the result is as follows:
```javascript
<script type="text/javascript" src="./controllers/some.js?noCacheVersion=1.000"></script>
```
When the noCache attribute is true and noCacheAuto attribute is true,
any time loads a new JavaScript file by parameter of noCacheVersion generate is generated randomly.
```javascript
<script type="text/javascript" src="./controllers/some.js?noCacheVersion=0.5478912648"></script>
```
If your application is updated, Browser will load latest JavaScript file without cache through modify the value of noCacheVersion or set true of noCacheAuto.

#Controller
To invoke Controller, as follows:
- ```tipJS.action("controller name", parameter)```
- ```tipJS.action.controllerName(parameter)```

It invokes beforeController method that defined in tipJS.app method
before processing the Controller that defined in tipJS.controller method. 
And it is invoked afterController method that defeind in define.js
after completed process of Controller.

![tipJS_MVC_Framework_process_flow](http://tipjs.com/wp/wp-content/uploads/2012/08/tipJS_MVC_Framework_process_flow.png)  
  
[Controller Tutorial](http://tipjs.com/tipJS/tutorial/Controller/)

The second argument of tipJS.action method can be used as input argument for:
- beforeController method and afterController method in tipJS.define method
- beforeInvoke, invoke, afterInvoke and exceptionInvoke method in Controller

An attribute “this.controllerName” in beforeController / afterController method represents a name of a controller currently running.

```javascript
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
```
```javascript
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
```
You can invoke tipJS.action method at any location since you have invoked tipJS.loadApp method.

Here is a general structure of Controller:
```javascript
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
```
```javascript
tipJS.app({
    ...
    onLoad:function(params){
        tipJS.action("someController", params);
    },
    ...
});
```
There are four basic methods in Controller. They run as below.

The tipJS Javascript MVC Framework in general cases runs beforeInvoke method first, invoke method second and afterInvoke method last. The exceptionInvoke method is called only if 1) exceptionInvoke method is defined in Controller and 2) an exception is raised while running Controller.

You can call any user defined methods in Controller.
```javascript
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
```
If “async” attribute is set as true when Controller declared, the controller runs in async mode. You can also set delay time with “delay” attribute. Its unit value is 1/1000 sec.
```javascript
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
```
Here are attributes details defined in Controller besides four basic methods.
- async  
sets async mode (true – async mode)
- delay  
sets async delay in 1/1000 sec unit (default: 15)
- getModel(ModelName)  
get Application Model Object defined in tipJS.model method
- getView(ViewName)  
get Application View Object defined in tipJS.view method
- renderTemplate(option)  
see HTML Template
- getById(id)  
equivalent to document.getElementById
- getByName(name)  
equivalent to document.getElementsByName
- getByTag(tagName)  
equivalent to document.getElementsByTagName

#Model
tipJS JavaScript MVC Framework 서 Model Object 는 필요에 따라 구현하시기 바랍니다.

Model 에서는 같은 Layer인 다른 Model을 load할 수 있습니다.

Model 정의시 Framework에 의해 자동으로 정의되는 method는 다음과 같습니다.

- __init  
__init 메서드는 선언후 해당 Model 이 getModel 메서드에 의해 호출되어 생성되는 시점에서 단 한번 실행되는 메서드 입니다.
- getModel(modelName)  
tipJS.model method에서 정의한 Application Model을 반환합니다.
- getById(id)  
document.getElementById 와 동일합니다.
- getByName(name)  
document.getElementsByName 와 동일합니다.
- getByTag(tagName)  
document.getElementsByTagName 와 동일합니다.

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

#AOP(Aspect-Oriented Programming)
여기서는 tipJS JavaScript MVC Framework 를 통한 AOP(Aspect-Oriented Programming) 기능을 설명합니다.

AOP 를 활성화 하기 위해서 tipJS.app method 에 interceptors 속성을 추가합니다.

<pre>
tipJS.app({
    ...
    interceptors:[
        "interceptor.js"
    ]
    ...
});
</pre>

application 폴더 하위에 interceptors 폴더를 작성하고 interceptor JS 파일을 작성합니다.

interceptor 의 등록은 tipJS.interceptor method를 사용합니다.

<pre>
tipJS.interceptor("interceptor", {
    target:"controllers",
    before:function(){
        console.log("interceptor.before : " + this.msg);
    },
    after:[
        function(){
            console.log("interceptor.after #1 : " + this.msg);
        },
        function(){
            console.log("interceptor.after #2 : " + this.msg);
        }
    ]
});
</pre>

target 속성은 적용할 범위(point cut)를 의미합니다.

예를 들어 Model 전체에 적용할 때는 models 를(ex:”models”)
특정 Model을 지정하고 싶을때는 Model 명을(ex:”models.modelName” or “models.modelNam*”)
특정 Model의 특정 method 를 지정하고 싶을때는 method 명을(ex:”models.modelName.getName” or “models.modelName.get*”) 작성합니다.

target 속성은 배열타입으로 복수개 지정 가능합니다.

상기 before, after 안의 this context는 target 의 context를 의미합니다.

before, after 또한 배열타입으로 복수개 지정 가능합니다.

아래와 같은 Controller 가 있다고 가정한다면
<pre>
tipJS.controller("someCtrler", {
    msg:"some Message",
    invoke:function(params){
        console.log( this.msg ); // "some Message"
    }
});
</pre>

상기의 Controller 의 실행결과는 아래와 같이 console에 출력됩니다.
<pre>
interceptor.before : some Message
some Message
interceptor.after #1 : some Message
interceptor.after #2 : some Message
</pre>

## 실행 우선순위 지정
interceptor 의 order 속성값을 지정하여 interceptor들간의 실행 우선순위를 지정할수 있습니다.
<pre>
tipJS.controller("someCtrler", {
    msg:"some Message",
    invoke:function(params){
        console.log( this.msg ); // "some Message"
    }
});
</pre>
<pre>
tipJS.interceptor("interceptor1", {
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
</pre>
<pre>
tipJS.interceptor({
    __name:"someApp.interceptor2",
    order:2,
    target:"controllers",
    before:function(){
        console.log("interceptor.before #2-1 : " + this.msg);
    },
    after:[
        function(){
            console.log("interceptor.after #2-1 : " + this.msg);
        },
        function(){
            console.log("interceptor.after #2-2 : " + this.msg);
        }
    ]
});
</pre>

상기 예의 실행결과는 아래와 같습니다.
<pre>
interceptor.before #1-1 : some Message
interceptor.before #2-1 : some Message
some Message
interceptor.after #1-1 : some Message
interceptor.after #1-2 : some Message
interceptor.after #2-1 : some Message
interceptor.after #2-2 : some Message
</pre>

#ETC
##Debug Mode
tipJS JavaScript MVC Framework는 당신의 debug 작업을 위해 tipJS.debug method 를 제공합니다.

tipJS.debug method 를 간단히 설명하면 development mode 에서만 작동하는 browser console logger method 입니다.

tipJS.debug method 는 tipJS.app method에서 정의한 developmentHostList 속성에 등록된 host 의 경우 console log를 출력합니다.
<pre>
tipJS.app({
    ...
    developmentHostList:[
        'localhost'
        ,'127.0.0.1'
        ,'tipjs.com'
    ],
    ...
});
</pre>
<pre>
var someValue = someMethod();
tipJS.debug("someValue is " + someValue);
</pre>
만약 당신의 browser에 표시된 host name 이 developmentHostList 속성에 등록된 host의 경우 위의 source는 browser console 에 당신이 설정한 message를 출력할 것입니다.

development mode 와 상관없이 console log 를 출력하고 싶다면 browser 의 console.log method 혹은 tipJS.log method 를 사용하시기 바랍니다.

##Benchmark
tipJS JavaScript MVC Framework는 tipJS.benchmark 기능을 제공합니다.

tipJS.benchmark 기능을 사용하기 위한 별도의 설정작업은 필요하지 않습니다.

tipJS.benchmark.mark method 로 기점들을 등록합니다.
tipJS.benchmark.elapsedTime method 로 두 기점간의 경과시간을 console 에 출력합니다.

<pre>
tipJS.benchmark.mark("point1");
... 
tipJS.benchmark.mark("point2");
tipJS.benchmark.elapsedTime("point1", "point2");
</pre>

tipJS.benchmark.elapsedTime의 세번째 인수로 callback function을 지정 할 수 있습니다.
<pre>
tipJS.benchmark.mark("point1");
... 
