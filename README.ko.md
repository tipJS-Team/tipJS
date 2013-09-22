#Language
##KR
    
#about
##소개글 - Introduction
tipJS JavaScript MVC Framework 는 작고(gzip 5.x KByte) Simple하며 강력한 JavaScript MVC Framework 입니다.
당신은 tipJS 를 이용해 복잡한 구조의 Web Application 을 Controller로 제어되는 Model과 ViewModel, HTMLTemplate로 간단하게 구현할 수 있습니다. tipJS JavaScript MVC Framework로 당신의 Web Application의 개발과 Maintenance 효율을 월등히 높힐 수 있을 것입니다.


##다운로드 - Download

##기능 - Feature
-복잡한 JavaScript Application을 MVC Pattern 형태로 구현할 수 있습니다.
-Back-end 개발자를 위한 최적의 JavaScript MVC Framework 입니다.
-AOP(Aspect-Oriented Programming) 가능한 JavaScript MVC Framework 입니다.
-HTML Template 기능을 지원하여 사용자 View 를 간단히 생성할 수 있습니다.(version 1.10 부터 지원)
-다양한 Browser와 호환됩니다.(IE 7/8/9, Chrome, Firefox, Safari, etc…)
-독립된 작동을 위해 JavaScript ECMAScript Code 로 개발되어 별도의 외부 Library도 필요로 하지 않습니다.
-다양한 외부 JavaScript Library 와 호환됩니다.(JQuery, ExtJS, etc…)
-Browser Cache를 간단하게 제어할 수 있습니다.
-Model과 ViewModel 만이 아닌 다양한 Timing에서 당신의 Application을 제어할 수 있습니다.
-tipJS JavaScript MVC Framework는 최소한의 Rule에 의해 작동하므로 개발형식이 자유롭습니다.
-지정된 작동구간의 benchmark 기능을 지원합니다.
-다국어 지원(국제화/i18n) 기능을 제공합니다.
-etc…

##구조 - Structure

#License
Dual licensed under the MIT or GPL Version 2 licenses.

#설치하기 - Installation 
    ...
    ...
#App Configuration
##기본 - Essentional
tipJS 의 설정은 tipJS.app method 에 의해 이루어집니다. 모든 설정값에는 기본값(default value)가 존재하고, 기본값의 변경을 위해서는 thpJS.app method 의 인수 객체에 설정값을 지정하면 됩니다.
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
아래는 tipJS.app method에서 설정할 수 있는 속성에 대한 설명입니다.

-controllers
array type으로 Controller file들을 정의합니다.
-models
array type으로 Model file들을 정의합니다.
-views
array type으로 View file들을 정의합니다.
-onLoad
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
-beforeController
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
-afterController
function type으로 등록된 afterController method 는 application 내에서 어떤 Controller 를 호출하더라도 공통적으로 실행되는 method입니다.이 method 는 Controller 가 실행종료된 후 실행됩니다. argument로 Controller를 호출하는 tipJS.action method의 두번째 argument 인 parameter를 사용할 수 있습니다. Controller 와 동일한 method들을 사용할 수 있습니다.
-noCache
Browser cache 를 boolean type으로 설정할 수 있으며, true일 경우 noCacheAuto, noCacheVersion, noCacheParam 속성과 연동되어 version value 가 변경 될때마다 JavaScript file을 다시 load 하게합니다.(default:false)
-noCacheVersion
Browser cache 제어를 위한 버젼 정보를 설정합니다.(default:"1.000")
-noCacheAuto
true로 설정된 경우 noCacheVersion option의 value와는 상관없이 version을 랜덤하게 출력하여 Browser cache를 무효하게 합니다.(default:false)
-noCacheParam
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
-tipJS.action("controller name", parameter)
-tipJS.action.controllerName(parameter)
tipJS.controller method 에서 정의된 Controller 처리가 실행되기 전에 tipJS.app method에서 정의한 beforeController method 가 실행되며 Controller 처리가 모두 완료된 후에 define.js에서 정의한 afterController method가 실행됩니다.
http://tipjs.com/wp/wp-content/uploads/2012/08/tipJS_MVC_Framework_process_flow.png
Controller Tutorial[http://tipjs.com/tipJS/tutorial/Controller/]

tipJS.action method의 두번째 argument 는 tipJS.app method에서 정의한 beforeController method, afterController method 와 호출된 Controller의 beforeInvoke, invoke, afterInvoke, exceptionInvoke method 에서 input argument로 사용가능합니다.

beforeController / afterController method 안에서 this.controllerName 속성으로 현재 처리중인 controller 명이 참조 가능합니다.

<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
<pre>
</pre>
Model
    동기 모델 - Syncronous Model
    Value Object Model
    상속 - Inheritance

ViewModel
    template

Utility
    i18n

AOP

ETC
    Debug Mode
    Benchmark
    echo

튜토리얼 - Tutorials
    Controller
    Model
    ModelSync
    ModelVO
    ModelExtend
    View(HTML Template)
    ViewExtend

예제들 - Examples
Contributor
