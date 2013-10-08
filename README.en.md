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
You don’t necessarily have to implement ViewModel Object in tipJS JavaScript MVC Framework.
Model Object and View Object can be implemented if required.

ViewModel is for seperating logics of HTML Template from Controller.

You can load a different ViewModel in the same Layer.

When you define ViewModel, methods automatically defined by Framework are as follows.

- __init
__init method will invoke only once when corresponding ViewModel is created following call by getView.
- getView(viewName)
loads Application ViewModel defined in tipJS.model method.
- getById(id) equivalent to document.getElementById.
- getByName(name) equivalent to document.getElementsByName.
- getByTag(tagName) equivalent to document.getElementsByTagName
- render(options)
Please refer to following HTML Template[HTML Template] section for further details.

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


##ViewModel extension(Inheritance)

tipJS JavaScript MVC Framework has provided functions for extension of ViewModel.

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
tipJS JavaScript MVC Framework provides HTML based template engine.

render method implements data mapping in HTML template
Then, if id value is defined as renderTo property, the method will return HTML string including mapping data after printing it out to corresponding element.

Once a HTML template file has been loaded, tipJS will load it from cache.
if you don’t want to load a template file from cache, please change templateCache property of tipJS.app method from default value to ‘false’.(default:true)

If renderTo property is skipped, renderTemplate method always returns HTML string including mapping data without printing it out.

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

tipJS prints out values to <@= value @> in HTML Template, and loop control statement should be located in <@for(…)@>.
Please note with caution that an error occurs when you put a termination character (;) in front of a termination tag (@>).

Properties of Object, an argument of this.renderTemplate method, are as follows:

- url  
It defines url of HTML Template file. There is no limit on extention name of files.
- renderTo  
It defines id value of HTML element in which HTML string including mapping data will be printed. (Not necessary).
- data  
It defines data will be mapped.

You can receive rendered HTML as formats of HTML string and data Object.

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

## Logical split of HTML Template file
tipJS provides function spliting a file logically and using it.

Logical id name used in specified tplId property, it will be matching the template file with [[#id]].

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

tipJS JavaScript MVC Framework provides inernationalization/i18n. add 'localSet : true' property in the tipJS.app method when you want activate it.

<pre>
tipJS.app({
    ...
    localSet:true,
    ...
});
</pre>

Create lang folder below the application folder and make each language files likes below. tipJS define default language it depends on the browser user-agent (navigator.language || navigator.systemLanguage || navigator.userLanguage).

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
Set the langauge to manually, change tipJS.lang property before invoke tipJS.loadApp. The code is as follows:
<pre>
...
    tipJS.lang = "ja"; // set to Japaness
    tipJS.loadApp();
...
</pre>

Use the tipJS.msg method when you want to get a specified language set.

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
If you do not have the language files (tipJS.localSet), the value is returned unchanged message from tipJS.msg method.
<pre>
tipJS.model("someModel", {
    someMethod:function(params){
        console.log( tipJS.msg("Some Message") ); // result "Some Message"
    }
});
</pre>

#AOP(Aspect-Oriented Programming)
tipJS JavaScript MVC Framework provides AOP(Aspect-Oriented Programming). add 'interceptors' property in the tipJS.app method when you want activate it.

<pre>
tipJS.app({
    ...
    interceptors:[
        "interceptor.js"
    ]
    ...
});
</pre>

Create interceptors folder below the application folder and add interceptor JS
 files. Use tipJS.interceptor method for interceptor registration.

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

target property means point cut.

For example,

If it applies to the entire range of Model puts the models(ex:”models”).
If it applies to a Model puts the Model Name(ex:”models.modelName” or “models.modelNam*”).
If it applies to particular method of a particular Model puts method Name.
(ex:”models.modelName.getName” or “models.modelName.get*”).

The target property of an array and more than one available.

This context in before and after means target's context.

The Before, the after can be specify more than one, too.

There is Controller code.
<pre>
tipJS.controller("someCtrler", {
    msg:"some Message",
    invoke:function(params){
        console.log( this.msg ); // "some Message"
    }
});
</pre>

The result is as follows: 
<pre>
interceptor.before : some Message
some Message
interceptor.after #1 : some Message
interceptor.after #2 : some Message
</pre>

## Specifies the execution priority
A order of the interceptor property can be specified execution priority of interceptors.
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

The result is as follows: 
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
tipJS JavaScript MVC Framework provides debug method that is tipJS.debug.

It is console logger method and it works only with developer tools likes Chrome Inspector, Firebug and another.

It can shows console log when host is registered in developerHostList property that defined tipJS.app method.

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

If browser url is correct with defined host name at developmentHostList then You can see the message that you wrote.

You can use the tipJS.log method even if It's not on the development mode.

##Benchmark
tipJS JavaScript MVC Framework provides benchmark method.

There are no precondition to use tipJS.benchmark method.

Use the tipJS.benchmark.mark method for register start point and Use the tipJS.bechmark.elapsedTime method where you want to see the end of duration.

<pre>
tipJS.benchmark.mark("point1");
... 
tipJS.benchmark.mark("point2");
tipJS.benchmark.elapsedTime("point1", "point2");
</pre>

You can use the callback function as a third argument of tipJS.benchmark.elapsedTime method.

<pre>
tipJS.benchmark.mark("point1");
... 
tipJS.benchmark.mark("point2");
tipJS.benchmark.elapsedTime("point1", "point2", function(startName, endName, startTime, endTime, elapsedTime){
    ...
});
</pre>

##echo

# Tutorials
- Controller
- Model
- ModelSync
- ModelVO
- ModelExtend
- View(HTML Template)
- ViewExtend

# Examples
# Contributor
