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
You don’t necessarily have to implement Model Object in tipJS JavaScript MVC Framework.
Model Object can be implemented if required.

You can load a different Model in the same Layer.

When you define Model, methods automatically defined by Framework are as follows:

- __init  
__init method will invoke only once when corresponding Model or View is created following call by loadModel or loadView.
- getModel(modelName)  
get Application Model Object defined in tipJS.model method.
- getById(id)  
equivalent to document.getElementById.
- getByName(name)  
equivalent to document.getElementsByName.
- getByTag(tagName)  
equivalent to document.getElementsByTagName

VO (Value Object) Model should be used if you don’t need methods automatically defined. Please refer to following VO (Value Object) Model section for further details.

Model Tutorial[Model Tutorial]
<pre>
// models/someModel.js
tipJS.model("someModel", {
    __init:function(){
        // Object was created by the framework is executed only once and destroyed.
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
tipJS JavaScript MVC Framework has provided synchronization of Model.
Synchronization of Model means that a Model Object created by a user remains with changed values and will not be destroyed.

ModelSync Tutorial[ModelSync Tutorial]
<pre>
// models/someModel.js
tipJS.model("someModel", {
    __init:function(){
        // Object was created by the framework is executed only once and destroyed.
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
You can use functions for synchronization of Model when the second parameter of getModel method is defined as ‘true’.


##VO(Value Object) Model
tipJS Javacript MVC Framework has provided VO (Value Object) Model.

VO model will not introduce properties or methods added automatically when defining Model in tipJS.
It will only reflect properties and methods defined by users.

Configuration is not required to use VO Model.
If the last value of  Model Name is “VO”, the Model will be VO Model.

ModelVO Tutorial[ModelVO Tutorial]
<pre>
// models/modelVO.js
tipJS.model("modelVO", {
    __init:function(){
        // Object was created by the framework is executed only once and destroyed.
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
tipJS JavaScript MVC Framework has provided functions for extension of Model.

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
tipJS JavaScript MVC Framework 서 ViewModel Object 는 필요에 따라 구현하시기 바랍니다.

ViewModel 은 HTML Template 기능을 Controller로 부터 분리하여 수행하기 위한 Model 입니다.

ViewModel 에서는 같은 Layer인 다른 ViewModel을 load할 수 있습니다.

ViewModel 정의시 Framework에 의해 자동으로 정의되는 method는 다음과 같습니다.

- __init
__init 메서드는 선언후 해당 ViewModel 이 getView 메서드에 의해 호출되어 생성되는 시점에서 단 한번 실행되는 메서드 입니다.
- getView(viewName)
tipJS.model method에서 정의한 Application ViewModel을 반환합니다.
- getById(id)
document.getElementById 와 동일합니다.
- getByName(name)
document.getElementsByName 와 동일합니다.
- getByTag(tagName)
document.getElementsByTagName 와 동일합니다.
- render(options)
HTML Template[HTML Template] 항목을 참고합니다.

View(HTML Template) Tutorial[View(HTML Template) Tutorial]
<pre>
// views/someView.js
tipJS.view("someView", {
    properties:...
    methods:function(){
        ...
    }
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller({
    ...
    invoke:function(params){
        // load Application ViewModel
        var someView = this.loadView("someView");
 
        someView.someMethod();
    },
    ...
});
</pre>


##ViewModel 의 extension(Inheritance)
tipJS JavaScript MVC Framework는 ViewModel의 확장 기능을 제공합니다.

ViewModel Extend Tutorial[ViewModel Extend Tutorial]
<pre>
tipJS.view("viewParent", {
    parent1 : "viewParent",
    parentFn : function() {
        console.log(this.parent1); // viewParent
    }
});
</pre>
<pre>
tipJS.view("viewChild",{
    __extend : "viewParent",
    child1 : "viewChild",
    childFn : function() {
        console.log(this.child1); // viewChild
    }
});
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    ...
    invoke : function() {
        var viewChild = this.getView("viewChild");
        viewChild.parentFn(); // viewParent
        viewChild.childFn(); // viewChild
    },
    ...
});
</pre>

#HTML Template
tipJS JavaScript MVC Framework는 Model과 View의 분리를 위한 HTML 형식의 Template 기능을 제공합니다.

render method 는 HTML Template 에 data를 맵핑한후 renderTo 속성에 id 값이 지정되어 있으면 해당 element에 HTML Template 의 내용을 출력한 후  data가 mapping된 html 을 반환합니다. 한번 읽어들인 HTML template file은 tipJS에 의해 cache 처리됩니다.
만약 template의 cache 처리를 원하지 않을경우에는 tipJS.app method 의 templateCache 속성값을 false로 설정하시기 바랍니다.(default:true)

renderTo 속성은 생략 가능하며 render method는 항상 data가 mapping된 html 을 반환합니다.

// index.html
<pre>
&lt;html&gt;
&lt;head&gt;
&lt;script type="text/javascript" src="/tipJS/tipJS-MVC-x.xx.js"&gt;
&lt;/script&gt;
&lt;script&gt;
window.onload = function(){
    tipJS.loadApp(["someApplication"]);
};
&lt;/script&gt;
&lt;body&gt;
    &lt;div id="target_id"&gt;&lt;/div&gt;
&lt;/body&gt;
&lt;/html&gt;
</pre>

// someTpl.tpl
<pre>
&lt;h1&gt;
&lt;@= data.someString @&gt;
&lt;/h1&gt;
&lt;ul&gt;
&lt;@ for(var i=0; i&lt;data.someArray.length; i++) { @&gt;
    &lt;li&gt; &lt;@= data.someArray[i] @&gt; &lt;/li&gt;
&lt;@ } @&gt;
&lt;/ul&gt;
</pre>
<pre>
// controllers/someController.js
tipJS.controller("someController", {
    invoke:function(params){
        var _templateConfig = {
            url:"/templates/someTemplate.tpl",
            renderTo:"target_id",
            data:{
                someString:"some String " + params,
                someArray:["some1","some2","some3"]
            }
        };
        var returnHTML = this.render(_templateConfig); // return html
    }
});
</pre>

ViewModel(HTML Template) Tutorial[View(HTML Template) Tutorial]

// someTpl.tpl
<pre>
&lt;div&gt;
    &lt;ul&gt;
        &lt;@ for(var i=0; i&lt;data.length; i++) { @&gt;
            &lt;@ if (i != 0) {@&gt;&lt;li class="&lt;@=( (i==2) ? "foo":"bar" )@&gt;"&gt;&lt;@= data[i] @&gt;&lt;/li&gt;
            &lt;@}else{@&gt;&lt;div class="&lt;@=( (i==2) ? "foo":"bar" )@&gt;"&gt;&lt;@= data[i] @&gt;&lt;/div&gt;&lt;@}@&gt;
        &lt;@ } @&gt;
    &lt;/ul&gt;
&lt;/div&gt;
</pre>

ViewExtend(HTML Template) Tutorial[ViewExtend(HTML Template) Tutorial]

HTML Template 에서의 값의 출력은 <@= value @> 사이에서 이루어 지며, 루프등의 제어는 <@ for(…) @> 사이에서 이루어집니다.
종료태그 @> 앞에 종료문자(;)를 넣을 경우 에러를 발생하니 주의하십시오.

render method의 argument인 설정 Object의 속성은 다음과 같습니다.
- url  
HTML Template file의 url를 정의합니다. file의 extention name에 대한 제한은 없습니다.
- renderTo  
HTML Template의 내용이 data속성에 의해 mapping 된 후에 반환되는 html이 출력 될 html요소의 id를 정의합니다.(생략가능)
- data  
HTML Template 에서 정의한 data변수에 mapping될 data를 정의합니다.

단순히 html string 과 data object 를 통해 렌더링된 html 을 받을 수도 있습니다.

<pre>
tipJS.controller("someController", {
    invoke:function(params){
        var htmlString = "&lt;div&gt;&lt;@= data.foo @&gt;&lt;/div&gt;";
        var data = {
            foo:"foo"
        };
        var returnHTML = this.render(htmlString, data); // return html
    }
});
</pre>

## HTML Template file 의 논리적 분할
하나의 물리적 file 을 논리적으로 분할하여 사용하는 기능에 대해 설명합니다.

논리 id 명은 tplId 속성에 지정하여 사용해야 하며 template file 의 [[#id]] 와 matching 됩니다.

// someTpl.tpl
<pre>
[[#template01]] &lt;!-- id : "template01" --&gt;
&lt;ul&gt;
    &lt;li&gt;&lt;@= data.foo @&gt;&lt;/li&gt;
&lt;/ul&gt;
[[#template02]] &lt;!-- id : "template02" --&gt;
&lt;span&gt;&lt;@= data.bar @&gt;&lt;/span&gt;
</pre>

<pre>
// someController1.js
tipJS.controller("someController1", {
    invoke : function(params){
        var _templateConfig = {
            url:"/templates/someTemplate.tpl",
            renderTo:"target_id",
            tplId:"template01",  // id : "template01"
            data:{
                foo:"foo"
            }
        };
        var returnHTML = this.render(_templateConfig); // return template01 html
    }
});
</pre>

<pre>
// someController2.js
tipJS.controller("someController2", {
    invoke : function(params){
        var _templateConfig = {
            url:"/templates/someTemplate.tpl",
            renderTo:"target_id",
            tplId:"template02", // id : "template02"
            data:{
                bar:"bar"
            }
        };
        var returnHTML = this.render(_templateConfig); // return template02 html
    }
});
</pre>

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
tipJS.benchmark.mark("point2");
tipJS.benchmark.elapsedTime("point1", "point2", function(startName, endName, startTime, endTime, elapsedTime){
    ...
});
</pre>

##echo

#튜토리얼 - Tutorials
- Controller
- Model
- ModelSync
- ModelVO
- ModelExtend
- View(HTML Template)
- ViewExtend

#예제들 - Examples
#Contributor
