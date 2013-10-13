/*
 * tipJS - OpenSource Javascript MVC Framework ver.2.1.1
 *
 * Copyright 2013.08 SeungHyun PAEK, tipJS-Team.
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * HomePage: http://www.tipjs.com
 * Contact: http://www.tipjs.com/contact
 */

(function(context) {
	"use strict";

	var tipJS = {};
	tipJS.ver = tipJS.version = tipJS.VERSION = "2.1.1";

	context.tipJS = tipJS;

/*************************
 *
 * tipJS.util Package
 * 
 *************************/
	var util__ = tipJS.util = {};
	// Type Check [ecmascript 15.2.4.2] 참조
	var __protoToString = Object.prototype.toString;

	/**
	 *  전달된 obj 가 아래 타입 중 어느 타입인지 체크
	 *  Arguments
	 *  Function
	 *  String
	 *  Number
	 *  Boolean
	 *  Date
	 *  RegExp
	 */
  var types = [ 'Arguments', 'Function', 'Number', 'String', 'Date', 'RegExp', 'Boolean' ],
    checker = function(type) {
      util__['is' + type] = function(obj) {
        return __protoToString.call(obj) === '[object ' + type + ']';
      };
    };
  for(var t = 0,len = types.length; t < len; t++) {
    checker(types[t]);
  }

	/**
	 * obj 가 Array 인지 체크
	 *
	 * @param obj
	 * @return boolean
	 */
	util__.isArray = Array.isArray || function(obj) {
		return __protoToString.call(obj) === '[object Array]';
	};

	/**
	* obj 가 Object 인지 체크 [ecmascript 15.2.1.1] 참조
	*
	* @param obj
	* @return boolean
	*/
	util__.isObject = function(obj) {
		return obj === Object(obj);
	};

	/**
	 * Array-liked-Object를 배열화함.
	 *
	 * @param obj
	 * @returns Array
	 */
	util__.toArray = function(obj) {
		var _ret = [];
		if (obj.length) {
			for(var i=0, len=obj.length;i<len; i++) {
        _ret[i] = obj[i];
      }
		}
		return _ret;
	};

	/**
	 * obj 로부터 id 를 통해 object 획득
	 *
	 * @param id
	 * @param obj
	 * @return HTMLElement
	 */
	util__.getById = function(id, obj){
		return !obj ? document.getElementById(id):obj.getElementById(id);
	};

	/**
	 * obj 로부터 name 를 통해 objects 획득
	 *
	 * @param name
	 * @param obj
	 * @return NodeList
	 */
	util__.getByName = function(name, obj){
		return !obj ? document.getElementsByName(name):obj.getElementsByName(name);
	};

	/**
	 * obj 로부터 tag 를 통해 objects 획득
	 *
	 * @param tag
	 * @param obj
	 * @return NodeList
	 */
	util__.getByTag = function(tag, obj){
		return !obj ? document.getElementsByTagName(tag):obj.getElementsByTagName(tag);
	};

	/**
	 * overwrite Object 에 존재하는 속성 이외의 항목을 base Object의 속성과 병합
	 *
	 * @param overwrite
	 * @param base
	 * @return 병합된 Object
	 */
	util__.mergeObject = function(overwrite, base) {
		for (var k in base) {
			if (overwrite[k])
				continue;
			overwrite[k] = base[k];
		}
		return overwrite;
	};

	/**
	 * 인수로 들어온 Object 의 복제를 반환
	 *
	 * @param target
	 * @param isFlat
	 * @return Object Clone
	 */
	util__.cloneObject = function(obj, isFlat){
		if (obj == null || typeof obj != "object") {
			return obj;
		}
		if (!isFlat) {
			var newObj = (obj instanceof Array) ? [] : {};
			for (var k in obj) {
				if (typeof obj[k] == "object") {
					newObj[k] = util__.cloneObject(obj[k], false);
				} else {
					newObj[k] = obj[k];
				}
			}
			return newObj;
		} else {
			return __cloneObjN(obj);
		}
	};

	/**
	 * 인수로 들어온 Object 가 단일 Object인가를 판별
	 *
	 * @param obj
	 * @return isFlatObject flag
	 */
	util__.hasChild = function(obj) {
		for (var k in obj) {
			// Array 와 Object 일때 true
			if (typeof obj[k] == "object")
				return true;
		}
		return false;
	};

	/**
	 * 인수로 들어온 array 의 요소들을 중복되지 않는 요소로 재작성 후 반환
	 *
	 * @param arr
	 * @return unique 한 요소를 갖는 array
	 */
	util__.uniqArray = function(arr) {
		var _ret = [], _len = arr.length;
		for (var i = 0; i < _len; i++) {
			for (var j = i + 1; j < _len; j++) {
				if (arr[i] === arr[j])
					j = ++i;
			}
			_ret.push(arr[i]);
		}
		return _ret;
	};

	/**
	 * JS File Load
	 *
	 * @param file
	 * @param callbackFn
	 * @param noCacheOpt
	 */
	util__.loadJS = function(file, callbackFn) {
		var _tagScript = document.createElement('script');
		_tagScript.type = 'text/javascript';
		_tagScript.src = app__.define ? app__.define.getNoCacheUrl(file) : file;
		if (callbackFn) {
			if (_tagScript.readyState) {
				_tagScript.onreadystatechange = function() {
					if (this.readyState == 'loaded' || this.readyState == 'complete') {
						this.onreadystatechange = null;
						callbackFn(this);
					}
				};
			} else {
				_tagScript.onload = function() {
					callbackFn(this);
				};
			}
		}
		util__.getByTag('head')[0].appendChild(_tagScript);
	};

/*************************
 *
 * inner util Package
 * 
 *************************/
	/**
	 * 인수로 들어온 Object 의 복제를 반환(속도용)
	 *
	 * @param target
	 * @return Object Clone
	 */
	var __cloneObjN = function(target) {
		if (util__.isFunction(Object.create)) {
			__cloneObjN = function(o) {
				return Object.create(o);
			};
		} else {
			__cloneObjN = function(o) {
				function F() {};
				F.prototype = o;
				return new F();
			};
		}
		return __cloneObjN(target);
	};

	/**
	 * 인수로 들어온 target object 의 내용을 console에 출력
	 *
	 * @param target
	 * @param filter
	 * @param parentName
	 */
	var __echo = tipJS.echo = function(target, filter, parentName) {
		if (parentName && (typeof parentName != "string" || typeof parentName == "string" && (parentName.split(".").length + parentName.split("]").length) > 3))
			return;

		if (!filter) filter = "";
		if (target === null || target === undefined) {
			console.log(((parentName) ? parentName + "." : "") + target);
			return;
		}
		if (typeof target != "object") {
			if (typeof target == filter || filter === "")
				console.log(((parentName) ? parentName + "." : "") + target + "["+ typeof target +"]");
			return;
		}
		if (target instanceof Array) {
			console.log(((parentName) ? parentName + ":" : "") + "[Array["+ target.length + "]]");
		} else {
			console.log(((parentName) ? parentName + ":" : "") + "[Object]");
		}
		for (var k in target) {
			if (target instanceof Array) {
				if (typeof target[k] == "object"){
					__echo(target[k], filter, ((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]"));
				} else {
					if (typeof target[k] == filter || filter === "")
						console.log(((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]") + ":" + target[k] + " ("+ typeof target[k] +")");
				}
			} else {
				if (typeof target[k] == "object"){
					__echo(target[k], filter, ((parentName) ? parentName + "." : "")+k);
				} else {
					if (typeof target[k] == filter || filter === "")
						console.log(((parentName) ? parentName + "." : "") + k + ":" + target[k] + " ("+ typeof target[k] +")");
				}
			}
		}
	};

	/**
	 * 정의 에러 메세지취득
	 *
	 * @param name
	 * @return errMsg
	 */
	var __getDefErrMsg = function(name){
		return "Please define " + name;
	};

	/**
	 * 자신을 확장하는지 체크
	 *
	 * @param ext
	 * @param name
	 * @return result
	 */
	var __isSelfExt = function(ext, name){
		if (util__.isArray(ext)) {
			for(var i=ext.length; i--;){
				if (ext[i] == name) {
					return true;
				}
			}
		} else {
			if (ext == name)
				return true;
		}
		return false;
	};

	/**
	 * Model object 의 extension
	 *
	 * @param child
	 * @param type
	 * @return extended Object
	 */
	var __extModel = function(child, type){
		var _parents = child.__extend;
		if (!_parents)
			return child;

		if (util__.isString(_parents)) {
			child = __getExtObj(child, _parents, type);
		} else if (_parents instanceof Array) {
			for (var i = _parents.length; i--;) {
				child = __getExtObj(child, _parents[i], type);
			}
		}
		return child;
	};

	/**
	 * Model object 의 extension
	 *
	 * @param child
	 * @param parent
	 * @return extended Object
	 */
	var __getExtObj = function(child, parent, type){
		if (type == "model") {
			return util__.mergeObject(child, util__.cloneObject(__getModel(parent)));
		} else {
			return util__.mergeObject(child, util__.cloneObject(__getView(parent)));
		}
	};

	/**
	 * 초단위 반환
	 *
	 * @return seconds
	 */
	var __getSecs = function(){
		if (Date.now) {
			__getSecs = function(){ return Date.now();};
		} else {
			__getSecs = function(){ return (new Date).getTime();};
		}
		return __getSecs();
	};

	/**
	 * 이벤트 바인딩
	 *
	 * @param target
	 * @param type
	 * @param fn
	 * @param isCapture
	 */
	var __addEvent = function(target, type, fn, isCapture){
		if (window.addEventListener) {
			__addEvent = function(target, type, fn, isCapture){
				if (isCapture === undefined) isCapture = false;
				target.addEventListener(type, fn, isCapture);
			};
			__addEvent(target, type, fn, isCapture);
		} else if (window.attachEvent) {
			__addEvent = function(target, type, fn, isCapture){
				if (type == "hashchange" && !('onhashchange' in window)) {
					onHashFn__.push(fn);
					return;
				}
				target.attachEvent("on"+type, fn);
			};
			__addEvent(target, type, fn, isCapture);
		}
	};

	/**
	 * ie7 이하 hashchange event 처리
	 *
	 */
	var __setOnHash = function(){
		if ('onhashchange' in window) {
			return;
		}
		var _oldHash = location.hash;
		setInterval(function(){
			if (_oldHash != location.hash) {
				_oldHash = location.hash;
				for(var i=0, fnLen=onHashFn__.length; i<fnLen; i++){
					onHashFn__[i]();
				}
			}
		}, 200);
	};

/*************************
 *
 * core Package
 *
 *************************/
	/**
	 * depart Object 를 departType 으로 등록
	 *
	 * @param departType
	 * @param key
	 * @param depart
	 */
	var __registDepart = function(departType, key, depart) {
		if (!util__.isObject(depart))
			throw new Error(__getDefErrMsg(departType));

		if (!util__.isString(key))
			throw new Error(__getDefErrMsg(departType));

		if (depart.__extend && departType != "controllers" && departType != "interceptors" && __isSelfExt(depart.__extend, key)) {
			throw new Error("Can't extend itself: " + key);
		}

		if (!app__)
			throw new Error(__getDefErrMsg(departType));

		if (app__.loadOrder.presentOrder() === departType || tipJS.isRelease) {
			switch(departType) {
				case "interceptors":
				case "controllers":
				case "models":
				case "views":
					depart__[departType][key] = depart;
					break;
			}
		}
	};

	/**
	 * Application 에 속하는 파일들을 경로가 포함된 파일로 리스트화
	 *
	 * @param define
	 * @param depart
	 * @return File Path를 포함한 List
	 */
	var __getAppReqList = function(define, depart) {
		var _path = app__.define.path[depart],
			_appRoot = define.appPath ? define.appPath : ".";

		if (depart === "lang" && define.localSet) {
			define[depart] = [_appRoot + "/" + _path + "/" + tipJS.lang + ".js"];
			return define[depart];
		}
		if (depart === "tipJSRelease") {
			define[depart] = [_appRoot + "/" + app__.define.releaseFile];
			return define[depart];
		}
		var _departs = util__.uniqArray(define[depart]),
			_ret = [];
		for (var i = _departs.length; i--;) {
			_ret.push(_appRoot + "/" + _path + "/" + _departs[i]);
		}
		return _ret;
	};

	/**
	 * Application에 속해 있는 각각의 Part 를 읽어들인 후 모두 완료되면 Application 초기화 메소드를 호출
	 *
	 * @param depart
	 */
	var __loadDepart = function(depart) {
		require__[depart] = require__[depart] || {};
		var _requireList = require__[depart].requireList = __getAppReqList(app__.define, depart);
		if (_requireList.length > 0) {
			for (var i = _requireList.length; i--;) {
				util__.loadJS(_requireList[i], function(scriptTag) {
					if (__chkAppLoaded(depart, scriptTag.src))
						__afterAppLoaded();
				});
			}
		} else
			__afterAppLoaded();
	};

	/**
	 * tipJS 의 define.js 에 정의된 Application Model 을 작성 후 반환
	 *
	 * @param modelName
	 * @param loadType
	 * @return Application Model Object
	 */
	var __getModel = function(modelName, loadType) {
		var _models = depart__.models;

		if (!_models[modelName] || _models[modelName] === undefined)
			throw new Error("Can't find model: " + modelName);

		// synchronized model
		if (loadType === true) {
			var _syncModels = depart__.syncModels;
			if (!_syncModels)
				_syncModels = depart__.syncModels = {};

			if (_syncModels[modelName])
				return _syncModels[modelName];

			var _syncModel = _syncModels[modelName] = util__.cloneObject(_models[modelName], isFlat__["models"+modelName]);

			if (util__.isFunction(_syncModel.__init)) {
				_syncModel.__init();
			}
			return _syncModel;
		}
		var _ret = util__.cloneObject(_models[modelName], isFlat__["models"+modelName]);

		if (util__.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};

	/**
	 * tipJS 의 define.js 에 정의된 Application ViewModel 을 작성 후 반환
	 *
	 * @param viewName
	 * @return Application viewModel Object
	 */
	var __getView = function(viewName) {
		var _views = depart__.views;
		if (!_views || !_views[viewName] || _views[viewName] === undefined)
			throw new Error("Can't find view: " + viewName);

		var _ret = util__.cloneObject(_views[viewName], isFlat__["views"+viewName]);
		if (util__.isFunction(_ret.__init)) {
			_ret.__init();
		}
		return _ret;
	};


	/**
	 * Action 의 하위 Controller tree 작성
	 *
	 */
	var __makeActionTree = function(){
		var _ctrlers = depart__.controllers, _ctrlName, _ctrler, _ctrlerWrapper;
		for (_ctrlName in _ctrlers){
			_ctrler = util__.cloneObject(_ctrlers[_ctrlName]);
			_ctrlerWrapper = {
				controllerName : _ctrlName,
				getModel : __getModel,
				getView : __getView,
				render : __render,
				getById : util__.getById,
				getByName : util__.getByName,
				getByTag : util__.getByTag
			};
			tipJS.action[_ctrlName] = (function(wrapper, ctrler){
				return function(){
					var _args = arguments, _ctrlerStartTime, _runCtrler;
					if (tipJS.isDevelopment === true)
						_ctrlerStartTime = __getSecs();

					if (app__.define.beforeController && app__.define.beforeController.apply(wrapper, arguments) === false) {
						return;
					}

					_runCtrler = function() {
						if (ctrler.exceptionInvoke) {
							try {
								__runController(ctrler, _args);
							} catch (e) {
								(_args = util__.toArray(_args)).unshift(e);
								ctrler.exceptionInvoke.apply(ctrler, _args);
							}
						} else
							__runController(ctrler, _args);

						if (app__.define.afterController)
							app__.define.afterController.apply(wrapper, _args);

						if (tipJS.isDevelopment === true)
							tipJS.debug(wrapper.controllerName + " completed in " + ((__getSecs() - _ctrlerStartTime)/1000) + " seconds");
					}; // _runCtrler

					if (ctrler.async === true)
						setTimeout(_runCtrler, (!ctrler.delay ? 15 : ctrler.delay));
					else
						_runCtrler();
				}; // return function
			})(_ctrlerWrapper, _ctrler);
		} // for
	};

	/**
	 * 컨트롤러 실행
	 *
	 */
	var __runController = function(ctrler, args){
		if (ctrler.beforeInvoke && ctrler.beforeInvoke.apply(ctrler, args) === false) return;
		if (ctrler.invoke && ctrler.invoke.apply(ctrler, args) === false) return;
		if (ctrler.afterInvoke)	ctrler.afterInvoke.apply(ctrler, args);
	};

	/**
	 * 사용자 입력 interceptor 의 규격화
	 *
	 */
	var __makeInterceptors = function(){
		var _interceptor, _interceptors = depart__.interceptors, _scope, _before, _after, _order;
		for (var k in _interceptors) {
			_scope = _before = _after = [];
			_interceptor = _interceptors[k];
			_order = (_interceptor.order) ? _interceptor.order : 0;
			if (_interceptor.target) _scope = (util__.isArray(_interceptor.target)) ? _interceptor.target : [_interceptor.target];
			if (_interceptor.before) _before = (util__.isArray(_interceptor.before)) ? _interceptor.before : [_interceptor.before];
			if (_interceptor.after) _after = (util__.isArray(_interceptor.after)) ? _interceptor.after : [_interceptor.after];
			sortedInterceptors__.push({
				order : _order,
				scope : _scope,
				before : _before,
				after : _after
			});
		}
		sortedInterceptors__.sort(function(l, r){
			return l.order - r.order;
		});
	};

	/**
	 * Before Advice 를 원 method 에 설정
	 *
	 * @param func
	 * @param depart
	 * @param interceptor
	 * @return function
	 */
	var __setBeforeAdvice = function(func, depart, interceptor){
		return function(){
			var _before = interceptor.before, _ret;
			for (var i=0,len=_before.length; i<len; i++){
				_ret = _before[i].apply(depart, arguments);
				if (_ret !== undefined) return _ret;
			}
			_ret = func.apply(depart, arguments);
			if (_ret !== undefined) return _ret;
		};
	};

	/**
	 * After Advice 를 원 method 에 설정
	 *
	 * @param func
	 * @param depart
	 * @param interceptor
	 * @return function
	 */
	var __setAfterAdvice = function(func, depart, interceptor){
		return function(){
			var _after = interceptor.after, _ret;
			_ret = func.apply(depart, arguments);
			if (_ret !== undefined) return _ret;
			for (var i=0,len=_after.length; i<len; i++){
				_ret = _after[i].apply(depart, arguments);
				if (_ret !== undefined) return _ret;
			}
		};
	};

	/**
	 * 각 point cut별로 intercept 처리
	 *
	 * @param departName
	 */
	var __interceptScope = function(departName, scope, interceptor, setAdviceFn){
		var _ranges = scope.split("."), _departs = depart__[departName];
		if (_ranges.length == 1 && (departName == scope || departName+"*" == scope)) {
			for(var k in _departs){
				var _depart = _departs[k];
				for(var kk in _depart) {
					if (util__.isFunction(_depart[kk])) {
						_depart[kk] = setAdviceFn(_depart[kk], _depart, interceptor);
					}
				}
			}
		} else if (_ranges.length == 2 && departName == _ranges[0]) {
			var _className = _ranges[1];
			for(var k in _departs){
				if (k == _className || (_className.indexOf("*") > 0 && k.indexOf(_className.substr(0,_className.indexOf("*"))) == 0)) {
					var _depart = _departs[k];
					for(var kk in _depart) {
						if (util__.isFunction(_depart[kk])) {
							_depart[kk] = setAdviceFn(_depart[kk], _depart, interceptor);
						}
					}
				}
			}
		} else if (_ranges.length == 3 && departName == _ranges[0]) {
			var _className = _ranges[1], _funcName = _ranges[2];
			for(var k in _departs){
				if (k == _className) {
					var _depart = _departs[k];
					for(var kk in _depart) {
						if (kk == _funcName || (_funcName.indexOf("*") > 0 && kk.indexOf(_funcName.substr(0,_funcName.indexOf("*"))) == 0)) {
							if (util__.isFunction(_depart[kk])) {
								_depart[kk] = setAdviceFn(_depart[kk], _depart, interceptor);
							}
						}
					}
				}
			}
		}
	};

	/**
	 * 각 파트별로 intercept 처리
	 *
	 * @param departName
	 */
	var __interceptDepart = function(departName){
		for (var i=sortedInterceptors__.length; i--;){
			var _interceptor = sortedInterceptors__[i],	_scopes = _interceptor.scope;
			for (var j=0, jlen=_scopes.length; j<jlen; j++){
				__interceptScope(departName, _scopes[j], _interceptor, __setBeforeAdvice);
			}
		}
		for (var i=0, len=sortedInterceptors__.length; i<len; i++){
			var _interceptor = sortedInterceptors__[i], _scopes = _interceptor.scope;
			for (var j=0, jlen = _scopes.length; j<jlen; j++){
				__interceptScope(departName, _scopes[j], _interceptor, __setAfterAdvice);
			}
		}
	};

	/**
	 * 라우터 등록
	 *
	 * @param opt
	 */
	var __addRoute = function(opt){
		route__[opt.url] = opt.controller;
		__addEvent(window, "hashchange", function(){
			var _newHash = location.hash;
			if (oldHash__ == _newHash) {
				return;
			}
			oldHash__ = _newHash;
			if (_newHash.length == 0 && route__["/"]) {
				tipJS.action[route__["/"]]();
			} else if (route__[_newHash]) {
				tipJS.action[route__[_newHash]]();
			} else if (route__["!"]) {
				tipJS.action[route__["!"]]();
			}
		});
	};

	/**
	 * Application 이 모두 load 된후 실행되는 메소드
	 * Application 의 모든 depart 를 재정의 후 define.js 에서 정의된 onLoad 메소드 호출
	 *
	 */
	var __afterAppLoaded = function() {
		var k, _mdlName;
		if (app__.loadOrder.isLastOrder() === false) {
			__loadDepart(app__.loadOrder.nextOrder());
			return;
		}
		// 유저 인터셉터의 정형화
		__makeInterceptors();
		// Controller build
		var _ctrlers = depart__.controllers;
		if (_ctrlers) {
			__interceptDepart("controllers");
			for (k in _ctrlers) {
				_ctrlers[k].getModel = __getModel;
				_ctrlers[k].getView = __getView;
				_ctrlers[k].render = __render;
				_ctrlers[k].getById = util__.getById;
				_ctrlers[k].getByName = util__.getByName;
				_ctrlers[k].getByTag = util__.getByTag;
			}
			// ActionTree build
			__makeActionTree();
		}
		// Model build
		var _mdls = depart__.models;
		if (_mdls) {
			__interceptDepart("models");
			for (k in _mdls) {
				_mdlName = k;
				__extModel(_mdls[k], "model");
				if (_mdlName.lastIndexOf("VO") != (_mdlName.length - 2)) {
					_mdls[k].getModel = __getModel;
					_mdls[k].getById = util__.getById;
					_mdls[k].getByName = util__.getByName;
					_mdls[k].getByTag = util__.getByTag;
				}
				isFlat__["models"+_mdlName] = !util__.hasChild(_mdls[k]);
			}
		}
		// View build
		var _views = depart__.views;
		if (_views) {
			__interceptDepart("views");
			for (k in _views) {
				_mdlName = k;
				__extModel(_views[k], "view");
				_views[k].getView = __getView;
				_views[k].render = __render;
				_views[k].getById = util__.getById;
				_views[k].getByName = util__.getByName;
				_views[k].getByTag = util__.getByTag;
				isFlat__["views"+_mdlName] = !util__.hasChild(_views[k]);
			}
		}
		tipJS.debug("tipJS version " + tipJS.version + "[" + tipJS.lang + "]");
		if (!util__.isArray(app__.onLoadArgs)) {
			app__.onLoadArgs = [];
		}
		app__.define.onLoad.apply(app__.define, app__.onLoadArgs);
		if (reservedStack__) {
			for (var i = 0, actionLen = reservedStack__.length; i < actionLen; i++) {
				var _action = reservedStack__[i];
				var _ctrler = tipJS.action[_action.name];
				_ctrler.apply(_ctrler, _action.param);
			}
			reservedStack__ = null;
		}
		for(var i=0, _routeLen=app__.define.routes.length; i<_routeLen; i++) {
			var _route = app__.define.routes[i];
			__addRoute(_route);
		}
		if (_routeLen > 0) {
			__setOnHash();
			var _newHash = oldHash__ = location.hash;
			if (_newHash.length == 0 && route__["/"]) {
				tipJS.action[route__["/"]]();
			} else if (route__[_newHash]) {
				tipJS.action[route__[_newHash]]();
			} else if (route__["!"]) {
				tipJS.action[route__["!"]]();
			}
		}
	};

	/**
	 * Application 의 각 part 의 모든 File 이 load 되었는지 확인
	 *
	 * @param depart
	 * @param src
	 * @return load 확인 Flag
	 */
	var __chkAppLoaded = function(depart, src) {
		var i, _requireList = require__[depart].requireList, _reqPath;

		for (i = _requireList.length; i--;) {
			if (_requireList[i] === true)
				continue;

			_reqPath = _requireList[i].indexOf("./") > -1 ? _requireList[i].substr(_requireList[i].lastIndexOf("./")+1):_requireList[i];
			if (src.indexOf(_reqPath) > -1) {
				_requireList[i] = true;
				break;
			}
		}
		for (i = _requireList.length; i--;) {
			if (_requireList[i] !== true)
				return false;
		}
		return true;
	};

	/* Benchmark */
	tipJS.benchmark = {};

	/**
	 * Benchmark 용 키등록
	 *
	 * @param markName
	 */
	tipJS.benchmark.mark = function(markName){
		benchRecs__[markName] = __getSecs();
	};

	/**
	 * Benchmark 용 키에 따라 경과시간을 출력
	 * 
	 * @param startName
	 * @param endName
	 * @param callbackFn
	 * @return elapsedTime
	 */
	tipJS.benchmark.elapsedTime = function(startName, endName, callbackFn){
		var _startTime = benchRecs__[startName],
		_endTime = benchRecs__[endName],
		_elapsedTime = (_endTime - _startTime) / 1000;
		// if exist callback function
		if (callbackFn)
			callbackFn(startName, endName, _startTime, _endTime, _elapsedTime);
		else
			tipJS.log("elapsed time[" + startName + " to " + endName + "] : " + _elapsedTime + " seconds", "[BENCHMARK]");
		return _elapsedTime;
	};

	/* Template */
	/**
	 * XML Request 객체의 생성 후 반환
	 *
	 * @return XML Request Object
	 */
	var __getXMLReq = function() {
		var _xmlreq = false;
		if (window.XMLHttpRequest)
			_xmlreq = new XMLHttpRequest();
		else if (window.ActiveXObject) {
			try {
				_xmlreq = new ActiveXObject("Msxml2.XMLHTTP");
			} catch (e1) {
				try {
					_xmlreq = new ActiveXObject("Microsoft.XMLHTTP");
				} catch (e2) {}
			}
		}
		__getXMLReq = function() {
			return _xmlreq;
		};
		return __getXMLReq();
	};

	/**
	 * HTML Template File 을 읽어들인 후 file 내용을 반환
	 *
	 * @param config
	 * @return Template string
	 */
	var __render = tipJS.render = function(config) {
		var _retTxt;
		if (arguments.length > 1) {
			return __renderTpl(arguments[0], arguments[1], arguments[2]);
		}

		if (app__.define.templateCache && templateCache__[config.url]) {
			_retTxt = __renderTpl(templateCache__[config.url], config.data, config.tplId);
			if (util__.isString(config.renderTo))
				util__.getById(config.renderTo).innerHTML += _retTxt;

			return _retTxt;
		}
		var _xmlhttp = __getXMLReq();
		_xmlhttp.open("GET", app__.define.getNoCacheUrl(config.url), false);
		try {
			_xmlhttp.send(null);
		} catch(e) {
			return null;
		}

		if (_xmlhttp.readyState == 4 && _xmlhttp.status == 200) {
			_retTxt = templateCache__[config.url] = _xmlhttp.responseText;
			_retTxt = __renderTpl(_retTxt, config.data, config.tplId);
			if (util__.isString(config.renderTo))
				util__.getById(config.renderTo).innerHTML += _retTxt;

			return _retTxt;
		} else
			throw new Error("Can't find templates file: " + config.url);
	};

	/**
	 * HTML Template 의 내용과 표시될 Data의 병합처리
	 *
	 * @param html
	 * @param data
	 * @param templateKey
	 * @return rendered HTML
	 */
	var __renderTpl = function(html, data, templateKey) {
		html = html.replace(/\r\n/g, "\n");
		html = html.replace(/\r/g, "\n");
		html = html.replace(/\\/g, '\\\\');
		html = html.replace(/\n/g, '');

		if (util__.isString(templateKey)) {
			var _applyAreas = html.split("[[#"),
				_regEx = new RegExp("^"+templateKey+"\]\]");
			for (var i = 0, len = _applyAreas.length; i < len; i++) {
				if (_applyAreas[i].match(_regEx)) {
					html = _applyAreas[i].replace(_regEx, '');
					break;
				}
			}
		} else {
			html = html.replace(/\[\[#[a-zA-Z0-9_-]*\]\]/g, '');
		}
		var _tokens = html.split("@>"),
			_evalFunc = new Function("data", __compileTpl(_tokens));

		return _evalFunc(data);
	};

	/**
	 * HTML Template 의 내용을 Parsing
	 *
	 * @param tokens
	 * @return tokens result
	 */
	var __compileTpl = function(tokens) {
		var _ret = [], _types = [], _newTokens = [],
			_TYPE_PLANE = "PLN", _TYPE_VALUE = "VAL", _TYPE_PARSE = "PAS",
			_cmdPush = '__tempArr__.push(',
			i, len, _token, _tokens;

		_ret.push('var __tempArr__ = [];');
		for (i = 0, len = tokens.length; i < len; i++) {
			_token = tokens[i];

			if (_token.indexOf("<@=") > -1) {
				_tokens = _token.split("<@=");
				if (_tokens.length > 1) {
					_newTokens.push(_tokens[0].replace(/"/g, '\\"'));
					_newTokens.push(_tokens[1]);
					_types.push(_TYPE_PLANE);
					_types.push(_TYPE_VALUE);
				} else {
					_newTokens.push(_tokens[0]);
					_types.push(_TYPE_VALUE);
				}
			} else if (_token.indexOf("<@") > -1) {
				_tokens = _token.split("<@");
				if (_tokens.length > 1) {
					_newTokens.push(_tokens[0].replace(/"/g, '\\"'));
					_newTokens.push(_tokens[1]);
					_types.push(_TYPE_PLANE);
					_types.push(_TYPE_PARSE);
				} else {
					_newTokens.push(_tokens[0]);
					_types.push(_TYPE_PARSE);
				}
			} else {
				_newTokens.push(_token.replace(/"/g, '\\"'));
				_types.push(_TYPE_PLANE);
			}
		} // for i
		for (i = 0, len = _newTokens.length; i < len; i++) {
			_token = _newTokens[i];
			if (_types[i] == _TYPE_VALUE) {
				_token = '"\"+' + _token + '+\""';
				_ret.push(_cmdPush + _token + ");");
			} else if (_types[i] == _TYPE_PARSE) {
				_ret.push(_token);
			} else {
				_token = '"' + _token + '"';
				_ret.push(_cmdPush + _token + ");");
			}
		}
		_ret.push("return __tempArr__.join('');");
		return _ret.join('');
	};

	/**
	 * tipJS 의 console logger
	 *
	 * @param msg
	 * @param prefix
	 */
	tipJS.log = function(msg, prefix) {
		window.console = window.console || {
			log : function() {},
			error : function() {}
		};
		var _today = new Date(), _yyyy = _today.getFullYear(), _mm = _today.getMonth() + 1, _dd = _today.getDate(), _hh = _today.getHours(), _mi = _today.getMinutes(), _ss = _today.getSeconds(), _ms = _today.getMilliseconds();
		console.log(((prefix) ? prefix : "") + _yyyy + '/' + _mm + '/' + _dd + ' ' + _hh + ':' + _mi + ':' + _ss + '.' + _ms + ' ' + msg);
	};

	/**
	 * tipJS 의 console debugger
	 *
	 * @param msg
	 */
	tipJS.debug = function(msg) {
		if (tipJS.isDevelopment)
			tipJS.log(msg, "[DEBUG]");
	};

	/**
	 * tipJS 의 localSet 정의 메소드
	 *
	 * @param msgs
	 */
	tipJS.localSet = function(msgs) {
		if (app__.loadOrder.presentOrder() === "lang") msg__ = msgs;
	};

	/**
	 * tipJS 의 localSet 메세지 취득
	 *
	 * @param key
	 */
	tipJS.msg = function(key){
		return msg__[key] ? msg__[key] : key;
	};

	/**
	 * tipJS 의 Interceptor 정의 메소드
	 *
	 * @param interceptor
	 */
	tipJS.interceptor = function(key, interceptor) {
		__registDepart("interceptors", key, interceptor);
	};

	/**
	 * tipJS 의 Controller 정의 메소드
	 *
	 * @param controller
	 */
	tipJS.controller = function(key, ctrler) {
		__registDepart("controllers", key, ctrler);
	};

	/**
	 * tipJS 의 Application Model 정의 메소드
	 *
	 * @param model
	 */
	tipJS.model = function(key, model) {
		__registDepart("models", key, model);
	};

	/**
	 * tipJS 의 Application View 정의 메소드
	 *
	 * @param view
	 */
	tipJS.view = function(key, view) {
		__registDepart("views", key, view);
	};

	/**
	 * tipJS 의 Application Controller 호출 메소드
	 *
	 * @param ctrlerName
	 * @param params
	 */
	tipJS.action = function(ctrlerName) {
		var _arrName, _ctrlerName, _app, _ctrler;
		if (!arguments.length) {
			return tipJS.action;
		}
		var _appCtrlName = arguments[0];
		var _args = util__.toArray(arguments).slice(1);
		_arrName = _appCtrlName.split(".");
		if (ctrlerName.length == 0)
			throw new Error("tipJS.action : invalid parameter");

		if (!app__.loadOrder || !app__.loadOrder.isLastOrder()) {
			reservedStack__ = reservedStack__ || [];
			reservedStack__.push({
				name : _appCtrlName,
				param : _args
			});
			return;
		}
		_ctrler = tipJS.action[ctrlerName];
		_ctrler.apply(_ctrler, _args);
	};

	/**
	 * tipJS 의 Application Load 메소드
	 *
	 * @param params
	 */
	tipJS.loadApp = function() {
		if (!define__) return;
		var _args = util__.toArray(arguments);
		if (_args.length) {
			app__.onLoadArgs = _args;
		}
		__define();
		delete tipJS.loadApp;
	};

	/**
	 * tipJS 의 Application 정의 메소드
	 *
	 * @param define
	 */
	tipJS.app = function(define) {
		define__ = define;
	};
	var __define = function() {
		var _define = define__;
		util__.mergeObject(_define, DEF_BASE__.define);
		if (tipJS.isDevelopment === null) {
			for (var i = _define.developmentHostList.length; i--;) {
				if (_winLoc.hostname.match(_define.developmentHostList[i]) !== null) {
					tipJS.isDevelopment = true;
					break;
				}
			}
			if (!tipJS.isDevelopment) {
				for (var i = _define.releaseHostList.length; i--;) {
					if (_winLoc.hostname.match(_define.releaseHostList[i]) !== null) {
						tipJS.isRelease = true;
						break;
					}
				}
			}
		}
		app__.define = _define;
		util__.mergeObject(app__.loadOrder = {}, DEF_BASE__.loadOrder);
		if (tipJS.isRelease) app__.loadOrder.order = ["lang", "tipJSRelease"];
		__loadDepart(app__.loadOrder.presentOrder());
	};

	/*
	 * Booting tipJS
	 */
	var require__ = {},
	depart__ = {
		interceptors : {},
		controllers : {},
		models : {},
		views : {}
	},
	sortedInterceptors__ = [],
	DEF_BASE__ = {
		define : {
			noCache : false,
			noCacheVersion : tipJS.ver,
			noCacheParam : "tipJS",
			noCacheAuto : false,
			getNoCacheUrl : function(url){
				if (this.noCache === false) return url;
				url += (url.indexOf("?") < 0) ? "?" : "&";
				url += this.noCacheParam + "=" + (this.noCacheAuto === true ? "" + Math.random() : this.noCacheVersion);
				return url;
			},
			templateCache : true,
			path : {
				lang : "lang",
				interceptors : "interceptors",
				controllers : "controllers",
				models : "models",
				views : "views"
			},
			releaseFile : "tipJSFile.js",
			developmentHostList : [],
			releaseHostList : [],
			lang : [],
			interceptors : [],
			controllers : [],
			models : [],
			views : [],
			routes : [],
			localSet : false,
			onLoad : function() {},
			beforeController : function() {},
			afterController : function() {},
			getModel : __getModel,
			getView : __getView
		},
		loadOrder : {
			index : 0,
			presentOrder : function() {
				return this.order[this.index];
			},
			nextOrder : function() {
				return this.order[++this.index];
			},
			isLastOrder : function() {
				return (this.index + 1) == this.order.length;
			},
			order : ["lang", "interceptors","controllers", "models", "views"]
		}
	},
	benchRecs__ = {},
	app__ = {},
	msg__ = {},
	route__ = {}, oldHash__, onHashFn__ = [],
	templateCache__ = {}, reservedStack__,
	isFlat__ = {}, define__,
	_winLoc = window.location, _pathname = _winLoc.pathname, _queryString = _winLoc.search, _isDevelopment = null, _lang = (navigator.language || navigator.systemLanguage || navigator.userLanguage).substr(0,2);

	if (_queryString.match('(\\?|&)debug') !== null || _pathname.match('debug') !== null)
		_isDevelopment = true;

	tipJS.lang = _lang;
	tipJS.isDevelopment = _isDevelopment;
	//tipJS.isRelease = null;
})(this);
