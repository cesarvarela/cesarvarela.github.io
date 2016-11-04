/******/ (function(modules) { // webpackBootstrap
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(callback) { // eslint-disable-line no-unused-vars
/******/ 		if(typeof XMLHttpRequest === "undefined")
/******/ 			return callback(new Error("No browser support"));
/******/ 		try {
/******/ 			var request = new XMLHttpRequest();
/******/ 			var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 			request.open("GET", requestPath, true);
/******/ 			request.timeout = 10000;
/******/ 			request.send(null);
/******/ 		} catch(err) {
/******/ 			return callback(err);
/******/ 		}
/******/ 		request.onreadystatechange = function() {
/******/ 			if(request.readyState !== 4) return;
/******/ 			if(request.status === 0) {
/******/ 				// timeout
/******/ 				callback(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 			} else if(request.status === 404) {
/******/ 				// no update available
/******/ 				callback();
/******/ 			} else if(request.status !== 200 && request.status !== 304) {
/******/ 				// other failure
/******/ 				callback(new Error("Manifest request to " + requestPath + " failed."));
/******/ 			} else {
/******/ 				// success
/******/ 				try {
/******/ 					var update = JSON.parse(request.responseText);
/******/ 				} catch(e) {
/******/ 					callback(e);
/******/ 					return;
/******/ 				}
/******/ 				callback(null, update);
/******/ 			}
/******/ 		};
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	// Copied from https://github.com/facebook/react/blob/bef45b0/src/shared/utils/canDefineProperty.js
/******/ 	var canDefineProperty = false;
/******/ 	try {
/******/ 		Object.defineProperty({}, "x", {
/******/ 			get: function() {}
/******/ 		});
/******/ 		canDefineProperty = true;
/******/ 	} catch(x) {
/******/ 		// IE will fail on defineProperty
/******/ 	}
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "310663baf48f8a15ba05"; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					if(me.children.indexOf(request) < 0)
/******/ 						me.children.push(request);
/******/ 				} else hotCurrentParents = [moduleId];
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name)) {
/******/ 				if(canDefineProperty) {
/******/ 					Object.defineProperty(fn, name, (function(name) {
/******/ 						return {
/******/ 							configurable: true,
/******/ 							enumerable: true,
/******/ 							get: function() {
/******/ 								return __webpack_require__[name];
/******/ 							},
/******/ 							set: function(value) {
/******/ 								__webpack_require__[name] = value;
/******/ 							}
/******/ 						};
/******/ 					}(name)));
/******/ 				} else {
/******/ 					fn[name] = __webpack_require__[name];
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		function ensure(chunkId, callback) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			__webpack_require__.e(chunkId, function() {
/******/ 				try {
/******/ 					callback.call(null, fn);
/******/ 				} finally {
/******/ 					finishChunkLoading();
/******/ 				}
/******/ 	
/******/ 				function finishChunkLoading() {
/******/ 					hotChunksLoading--;
/******/ 					if(hotStatus === "prepare") {
/******/ 						if(!hotWaitingFilesMap[chunkId]) {
/******/ 							hotEnsureUpdateChunk(chunkId);
/******/ 						}
/******/ 						if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 							hotUpdateDownloaded();
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			});
/******/ 		}
/******/ 		if(canDefineProperty) {
/******/ 			Object.defineProperty(fn, "e", {
/******/ 				enumerable: true,
/******/ 				value: ensure
/******/ 			});
/******/ 		} else {
/******/ 			fn.e = ensure;
/******/ 		}
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback;
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback;
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "number")
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 				else
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailibleFilesMap = {};
/******/ 	var hotCallback;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply, callback) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		if(typeof apply === "function") {
/******/ 			hotApplyOnUpdate = false;
/******/ 			callback = apply;
/******/ 		} else {
/******/ 			hotApplyOnUpdate = apply;
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 		hotSetStatus("check");
/******/ 		hotDownloadManifest(function(err, update) {
/******/ 			if(err) return callback(err);
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				callback(null, null);
/******/ 				return;
/******/ 			}
/******/ 	
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotAvailibleFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			for(var i = 0; i < update.c.length; i++)
/******/ 				hotAvailibleFilesMap[update.c[i]] = true;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			hotCallback = callback;
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailibleFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailibleFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var callback = hotCallback;
/******/ 		hotCallback = null;
/******/ 		if(!callback) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate, callback);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			callback(null, outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options, callback) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		if(typeof options === "function") {
/******/ 			callback = options;
/******/ 			options = {};
/******/ 		} else if(options && typeof options === "object") {
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		} else {
/******/ 			options = {};
/******/ 			callback = callback || function(err) {
/******/ 				if(err) throw err;
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function getAffectedStuff(module) {
/******/ 			var outdatedModules = [module];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice();
/******/ 			while(queue.length > 0) {
/******/ 				var moduleId = queue.pop();
/******/ 				var module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return new Error("Aborted because of self decline: " + moduleId);
/******/ 				}
/******/ 				if(moduleId === 0) {
/******/ 					return;
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return new Error("Aborted because of declined dependency: " + moduleId + " in " + parentId);
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push(parentId);
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return [outdatedModules, outdatedDependencies];
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				var moduleId = toModuleId(id);
/******/ 				var result = getAffectedStuff(moduleId);
/******/ 				if(!result) {
/******/ 					if(options.ignoreUnaccepted)
/******/ 						continue;
/******/ 					hotSetStatus("abort");
/******/ 					return callback(new Error("Aborted because " + moduleId + " is not accepted"));
/******/ 				}
/******/ 				if(result instanceof Error) {
/******/ 					hotSetStatus("abort");
/******/ 					return callback(result);
/******/ 				}
/******/ 				appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 				addAllToSet(outdatedModules, result[0]);
/******/ 				for(var moduleId in result[1]) {
/******/ 					if(Object.prototype.hasOwnProperty.call(result[1], moduleId)) {
/******/ 						if(!outdatedDependencies[moduleId])
/******/ 							outdatedDependencies[moduleId] = [];
/******/ 						addAllToSet(outdatedDependencies[moduleId], result[1][moduleId]);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(var i = 0; i < outdatedModules.length; i++) {
/******/ 			var moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			var moduleId = queue.pop();
/******/ 			var module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(var j = 0; j < disposeHandlers.length; j++) {
/******/ 				var cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(var j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				var idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				for(var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 					var dependency = moduleOutdatedDependencies[j];
/******/ 					var idx = module.children.indexOf(dependency);
/******/ 					if(idx >= 0) module.children.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(var moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(var moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				var module = installedModules[moduleId];
/******/ 				var moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(var i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					var dependency = moduleOutdatedDependencies[i];
/******/ 					var cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(var i = 0; i < callbacks.length; i++) {
/******/ 					var cb = callbacks[i];
/******/ 					try {
/******/ 						cb(outdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(var i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			var moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else if(!error)
/******/ 					error = err;
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return callback(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		callback(null, outdatedModules);
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: hotCurrentParents,
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var React = __webpack_require__(1);
	var ReactDOM = __webpack_require__(2);
	var App_1 = __webpack_require__(3);
	__webpack_require__(20);
	__webpack_require__(30);
	ReactDOM.render(React.createElement(App_1.App, null), document.getElementById("example"));


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Header_1 = __webpack_require__(4);
	var Menu_1 = __webpack_require__(7);
	var Contact_1 = __webpack_require__(10);
	var About_1 = __webpack_require__(12);
	var Footer_1 = __webpack_require__(14);
	var Social_1 = __webpack_require__(15);
	var Projects_1 = __webpack_require__(16);
	var socialItems = [
	    {
	        key: 'stack-overflow',
	        description: 'Stack Overflow',
	        link: 'http://stackoverflow.com/users/1030208/cesar-varela'
	    },
	    {
	        key: 'linkedin',
	        description: 'Linkedin',
	        link: 'https://www.linkedin.com/in/cesarluisvarela'
	    },
	    {
	        key: 'github',
	        description: 'Github',
	        link: 'https://github.com/cesarvarela'
	    },
	    {
	        key: 'lastfm',
	        description: 'Lastfm',
	        link: 'http://www.last.fm/user/elcesarpo'
	    },
	    {
	        key: 'facebook',
	        description: 'Facebook',
	        link: 'https://www.facebook.com/elcesarpo'
	    },
	];
	var projectItems = [
	    {
	        key: 'poatm',
	        link: 'https://poandthemachines.com',
	        img: './poatm.png',
	        title: 'Po and the machines',
	        description: "This is where I host all my personal projects. I do all the design and development over there, please check it out and try my games!",
	    },
	    {
	        key: 'tbm',
	        link: 'https://thebotmakers',
	        img: './tbm.png',
	        title: 'The Bot Makers',
	        description: "A chatbots development studio I've started along with some friends. Need a chatbot? Don't hesitate and talk with us!",
	    }
	];
	var App = (function (_super) {
	    __extends(App, _super);
	    function App() {
	        _super.apply(this, arguments);
	    }
	    App.prototype.render = function () {
	        return React.createElement("div", null, 
	            React.createElement(Header_1.Header, null), 
	            React.createElement("hr", {className: "dot"}), 
	            React.createElement(Menu_1.Menu, null), 
	            React.createElement("hr", {className: "dot"}), 
	            React.createElement(Projects_1.Projects, {items: projectItems}), 
	            React.createElement(About_1.About, null), 
	            React.createElement(Social_1.Social, {items: socialItems}), 
	            React.createElement(Contact_1.Contact, null), 
	            React.createElement(Footer_1.Footer, null));
	    };
	    return App;
	}(React.Component));
	exports.App = App;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Section_1 = __webpack_require__(5);
	var Header = (function (_super) {
	    __extends(Header, _super);
	    function Header() {
	        _super.apply(this, arguments);
	    }
	    Header.prototype.render = function () {
	        return React.createElement(Section_1.Section, {id: "head"}, 
	            React.createElement("h1", null, "Cesar Varela"), 
	            React.createElement("img", {className: "po", src: __webpack_require__(6), alt: "po face"}), 
	            React.createElement("hr", {className: "dot"}), 
	            React.createElement("p", {className: "po-quote"}, "Hi, my name is Cesar Varela, this is my personal website," + ' ' + "scroll down to know a little more about me."));
	    };
	    return Header;
	}(React.Component));
	exports.Header = Header;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Section = (function (_super) {
	    __extends(Section, _super);
	    function Section() {
	        _super.apply(this, arguments);
	    }
	    Section.prototype.render = function () {
	        return React.createElement("section", {id: this.props.id}, 
	            React.createElement("div", {className: "container-fluid"}, 
	                React.createElement("p", {className: "pre-heading"}, this.props.preHeading), 
	                React.createElement("h2", {className: "line-heading"}, this.props.heading), 
	                React.createElement("p", {className: "sub-line-heading"}, this.props.postHeading)), 
	            React.createElement("div", {className: "container"}, this.props.children));
	    };
	    return Section;
	}(React.Component));
	exports.Section = Section;


/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADYCAYAAABm4kbTAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGQTY1RUVDQzAzMjE2ODExOEMxNEUwQjVENjQ3NEJERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTU4QjhFNjJEMjUxMUUzQjBFQURGRUU1RDY2MEM5NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTU4QjhFNTJEMjUxMUUzQjBFQURGRUU1RDY2MEM5NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ5MURGNTU3OTIxNjgxMThDMTRFMEI1RDY0NzRCREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkE2NUVFQ0MwMzIxNjgxMThDMTRFMEI1RDY0NzRCREYiLz4gPC9yZGY6RGVzY3Jp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7+eCkMo69F0k3nElUbZDDz30o82VRNnIuX1y8i88zC0l24e304gH5ATyU7ewZ70yxhjaFGrcIH7/+7//+8kHPvCB6fHf+MY3Tl1E/o+1M69mshdrVt3DnqIPuYzpqum6VRrV2HVocTImTDcwF5Ie+MH7VekyWa4CmiLI/3MMEElAEizaU5/61E88/vGP53+nt13P3YrJYjOfs9bNh1cfaA+aXnb72te+BhT/y82KnIHwP/rRj14BKjxughjzlKwqANYJJfrIRz4y+eu//uvpCo2L+KxnPWvlmngPparWqF5btV4VgjeWGiL+9lzEaqVrHJfxlPGZSpdbz1LWc8tFIM9dxZX1klZcVskTn/jEyWGHHYbSndEO8YG/+7u/2z103pwjHoHHwk1nAePZPuMZz5gubvwPwnWisxWNXesGieBBbcmaclEW8uYm3O/n5qNgBOC9m5ureVq1VPxcpf2f1uijH/3o5MMf/vCU2Puyl71sevNFHQU5XNVRSP4mTulRpBItzFcFLQQqUrCrQCVLvwekSAczX+d7eZ3VKgqILBKvpluZaYgay/HdpDq+//3vQy87o1m2M970pje9o+36t227/YEkl9seQAr2vPbwbmsx1/sh3uKKoBB1Neu5aRWSlglhzsoVGjSSFwwO3ESU+FWvetXUgpECQJFQbmK+CrXzeY9bBb8CGb5n7kxlyLKXCnoMJZy9HheOHuE4gY8ssUlkswI0uVj07m8tC8rvVNF5sfBQjbBr167Jt771rfe367ntzW9+8/O2YrK9S7kodPzV5sL9IS4EwEblEw65o0OomwqhYCFkHBul/dznPjc566yzpkoMTQqXJy2EsZjgQipGz1UccuUqe2NscaigSXV504qkQmaurirOvGMOub65qOUxM8dX/8cLDucFF1wwjduOPPLInW95y1v+fdvlLz/4wQ/evGXJ9qyC7WhCclNTgD/EeqEIQ1D0MptCp5BjmVAwSlT+6q/+aiqYp59++hSm539pWbQ4vdfQit8j+Fb4viabtRIZa47FvxUhrALvsaq1s4QnXcreK61WvlctXkVFU0mxat/4xjemVLT28w+bFb/pbW97244tS7ZnlIuyk/+hWa8/BWDARVsP5Vq5KU2oVAwEghiL2AGgA/cNF1ELhvso8yMFtVqCyr6oVqyXZO7lzHoBfI2hhixOj3/Zs3ZVObTM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"

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var $ = __webpack_require__(8);
	var classnames = __webpack_require__(9);
	var Menu = (function (_super) {
	    __extends(Menu, _super);
	    function Menu() {
	        _super.call(this);
	        this.state =
	            {
	                sticky: false,
	                menu: [
	                    { text: 'Projects', href: '#projects', active: false },
	                    { text: 'About', href: '#about', active: false },
	                    { text: 'Social', href: '#social', active: false },
	                    { text: 'Contact', href: '#contact', active: false },
	                ]
	            };
	    }
	    Menu.prototype.componentDidMount = function () {
	        window.addEventListener('scroll', this.handleScroll.bind(this));
	    };
	    Menu.prototype.componentWillUnMount = function () {
	        window.removeEventListener('scroll', this.handleScroll.bind(this));
	    };
	    Menu.prototype.handleScroll = function () {
	        var _this = this;
	        this.windowTop = $(window).scrollTop();
	        this.menuHeight = $(this.menuDom).height();
	        $(this.sectionDom).height(this.menuHeight);
	        if (!this.state.sticky) {
	            this.menuTop = $(this.menuDom).offset().top;
	        }
	        if (this.windowTop > this.menuTop) {
	            this.setState({ sticky: true });
	        }
	        else {
	            this.setState({ sticky: false });
	        }
	        var last;
	        this.state.menu.forEach(function (item) {
	            if (_this.windowTop + _this.menuHeight > $(item.href).offset().top) {
	                last = item;
	            }
	        });
	        this.state.menu.forEach(function (item) {
	            item.active = item == last;
	        });
	        this.setState({ menu: this.state.menu });
	    };
	    Menu.prototype.render = function () {
	        var _this = this;
	        var classes = classnames("main", { sticky: this.state.sticky });
	        var items = this.state.menu.map(function (item) {
	            return React.createElement("li", {key: item.href, className: classnames('list-inline-item', { active: item.active })}, 
	                React.createElement("a", {href: item.href}, item.text)
	            );
	        });
	        return React.createElement("section", {id: "menu", onScroll: this.handleScroll, ref: function (c) { return _this.sectionDom = c; }}, 
	            React.createElement("nav", {className: classes, ref: function (c) { return _this.menuDom = c; }}, 
	                React.createElement("ul", {className: "list-inline"}, items)
	            )
	        );
	    };
	    return Menu;
	}(React.Component));
	exports.Menu = Menu;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * jQuery JavaScript Library v3.1.1
	 * https://jquery.com/
	 *
	 * Includes Sizzle.js
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * https://jquery.org/license
	 *
	 * Date: 2016-09-22T22:30Z
	 */
	( function( global, factory ) {
	
		"use strict";
	
		if ( typeof module === "object" && typeof module.exports === "object" ) {
	
			// For CommonJS and CommonJS-like environments where a proper `window`
			// is present, execute the factory and get jQuery.
			// For environments that do not have a `window` with a `document`
			// (such as Node.js), expose a factory as module.exports.
			// This accentuates the need for the creation of a real `window`.
			// e.g. var jQuery = require("jquery")(window);
			// See ticket #14549 for more info.
			module.exports = global.document ?
				factory( global, true ) :
				function( w ) {
					if ( !w.document ) {
						throw new Error( "jQuery requires a window with a document" );
					}
					return factory( w );
				};
		} else {
			factory( global );
		}
	
	// Pass this if window is not defined yet
	} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {
	
	// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
	// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
	// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
	// enough that all such attempts are guarded in a try block.
	"use strict";
	
	var arr = [];
	
	var document = window.document;
	
	var getProto = Object.getPrototypeOf;
	
	var slice = arr.slice;
	
	var concat = arr.concat;
	
	var push = arr.push;
	
	var indexOf = arr.indexOf;
	
	var class2type = {};
	
	var toString = class2type.toString;
	
	var hasOwn = class2type.hasOwnProperty;
	
	var fnToString = hasOwn.toString;
	
	var ObjectFunctionString = fnToString.call( Object );
	
	var support = {};
	
	
	
		function DOMEval( code, doc ) {
			doc = doc || document;
	
			var script = doc.createElement( "script" );
	
			script.text = code;
			doc.head.appendChild( script ).parentNode.removeChild( script );
		}
	/* global Symbol */
	// Defining this global in .eslintrc.json would create a danger of using the global
	// unguarded in another place, it seems safer to define global only for this module
	
	
	
	var
		version = "3.1.1",
	
		// Define a local copy of jQuery
		jQuery = function( selector, context ) {
	
			// The jQuery object is actually just the init constructor 'enhanced'
			// Need init if jQuery is called (just allow error to be thrown if not included)
			return new jQuery.fn.init( selector, context );
		},
	
		// Support: Android <=4.0 only
		// Make sure we trim BOM and NBSP
		rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	
		// Matches dashed string for camelizing
		rmsPrefix = /^-ms-/,
		rdashAlpha = /-([a-z])/g,
	
		// Used by jQuery.camelCase as callback to replace()
		fcamelCase = function( all, letter ) {
			return letter.toUpperCase();
		};
	
	jQuery.fn = jQuery.prototype = {
	
		// The current version of jQuery being used
		jquery: version,
	
		constructor: jQuery,
	
		// The default length of a jQuery object is 0
		length: 0,
	
		toArray: function() {
			return slice.call( this );
		},
	
		// Get the Nth element in the matched element set OR
		// Get the whole matched element set as a clean array
		get: function( num ) {
	
			// Return all the elements in a clean array
			if ( num == null ) {
				return slice.call( this );
			}
	
			// Return just the one element from the set
			return num < 0 ? this[ num + this.length ] : this[ num ];
		},
	
		// Take an array of elements and push it onto the stack
		// (returning the new matched element set)
		pushStack: function( elems ) {
	
			// Build a new jQuery matched element set
			var ret = jQuery.merge( this.constructor(), elems );
	
			// Add the old object onto the stack (as a reference)
			ret.prevObject = this;
	
			// Return the newly-formed element set
			return ret;
		},
	
		// Execute a callback for every element in the matched set.
		each: function( callback ) {
			return jQuery.each( this, callback );
		},
	
		map: function( callback ) {
			return this.pushStack( jQuery.map( this, function( elem, i ) {
				return callback.call( elem, i, elem );
			} ) );
		},
	
		slice: function() {
			return this.pushStack( slice.apply( this, arguments ) );
		},
	
		first: function() {
			return this.eq( 0 );
		},
	
		last: function() {
			return this.eq( -1 );
		},
	
		eq: function( i ) {
			var len = this.length,
				j = +i + ( i < 0 ? len : 0 );
			return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
		},
	
		end: function() {
			return this.prevObject || this.constructor();
		},
	
		// For internal use only.
		// Behaves like an Array's method, not like a jQuery method.
		push: push,
		sort: arr.sort,
		splice: arr.splice
	};
	
	jQuery.extend = jQuery.fn.extend = function() {
		var options, name, src, copy, copyIsArray, clone,
			target = arguments[ 0 ] || {},
			i = 1,
			length = arguments.length,
			deep = false;
	
		// Handle a deep copy situation
		if ( typeof target === "boolean" ) {
			deep = target;
	
			// Skip the boolean and the target
			target = arguments[ i ] || {};
			i++;
		}
	
		// Handle case when target is a string or something (possible in deep copy)
		if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
			target = {};
		}
	
		// Extend jQuery itself if only one argument is passed
		if ( i === length ) {
			target = this;
			i--;
		}
	
		for ( ; i < length; i++ ) {
	
			// Only deal with non-null/undefined values
			if ( ( options = arguments[ i ] ) != null ) {
	
				// Extend the base object
				for ( name in options ) {
					src = target[ name ];
					copy = options[ name ];
	
					// Prevent never-ending loop
					if ( target === copy ) {
						continue;
					}
	
					// Recurse if we're merging plain objects or arrays
					if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
						( copyIsArray = jQuery.isArray( copy ) ) ) ) {
	
						if ( copyIsArray ) {
							copyIsArray = false;
							clone = src && jQuery.isArray( src ) ? src : [];
	
						} else {
							clone = src && jQuery.isPlainObject( src ) ? src : {};
						}
	
						// Never move original objects, clone them
						target[ name ] = jQuery.extend( deep, clone, copy );
	
					// Don't bring in undefined values
					} else if ( copy !== undefined ) {
						target[ name ] = copy;
					}
				}
			}
		}
	
		// Return the modified object
		return target;
	};
	
	jQuery.extend( {
	
		// Unique for each copy of jQuery on the page
		expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),
	
		// Assume jQuery is ready without the ready module
		isReady: true,
	
		error: function( msg ) {
			throw new Error( msg );
		},
	
		noop: function() {},
	
		isFunction: function( obj ) {
			return jQuery.type( obj ) === "function";
		},
	
		isArray: Array.isArray,
	
		isWindow: function( obj ) {
			return obj != null && obj === obj.window;
		},
	
		isNumeric: function( obj ) {
	
			// As of jQuery 3.0, isNumeric is limited to
			// strings and numbers (primitives or objects)
			// that can be coerced to finite numbers (gh-2662)
			var type = jQuery.type( obj );
			return ( type === "number" || type === "string" ) &&
	
				// parseFloat NaNs numeric-cast false positives ("")
				// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
				// subtraction forces infinities to NaN
				!isNaN( obj - parseFloat( obj ) );
		},
	
		isPlainObject: function( obj ) {
			var proto, Ctor;
	
			// Detect obvious negatives
			// Use toString instead of jQuery.type to catch host objects
			if ( !obj || toString.call( obj ) !== "[object Object]" ) {
				return false;
			}
	
			proto = getProto( obj );
	
			// Objects with no prototype (e.g., `Object.create( null )`) are plain
			if ( !proto ) {
				return true;
			}
	
			// Objects with prototype are plain iff they were constructed by a global Object function
			Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
			return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
		},
	
		isEmptyObject: function( obj ) {
	
			/* eslint-disable no-unused-vars */
			// See https://github.com/eslint/eslint/issues/6125
			var name;
	
			for ( name in obj ) {
				return false;
			}
			return true;
		},
	
		type: function( obj ) {
			if ( obj == null ) {
				return obj + "";
			}
	
			// Support: Android <=2.3 only (functionish RegExp)
			return typeof obj === "object" || typeof obj === "function" ?
				class2type[ toString.call( obj ) ] || "object" :
				typeof obj;
		},
	
		// Evaluates a script in a global context
		globalEval: function( code ) {
			DOMEval( code );
		},
	
		// Convert dashed to camelCase; used by the css and data modules
		// Support: IE <=9 - 11, Edge 12 - 13
		// Microsoft forgot to hump their vendor prefix (#9572)
		camelCase: function( string ) {
			return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
		},
	
		nodeName: function( elem, name ) {
			return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
		},
	
		each: function( obj, callback ) {
			var length, i = 0;
	
			if ( isArrayLike( obj ) ) {
				length = obj.length;
				for ( ; i < length; i++ ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
						break;
					}
				}
			}
	
			return obj;
		},
	
		// Support: Android <=4.0 only
		trim: function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},
	
		// results is for internal usage only
		makeArray: function( arr, results ) {
			var ret = results || [];
	
			if ( arr != null ) {
				if ( isArrayLike( Object( arr ) ) ) {
					jQuery.merge( ret,
						typeof arr === "string" ?
						[ arr ] : arr
					);
				} else {
					push.call( ret, arr );
				}
			}
	
			return ret;
		},
	
		inArray: function( elem, arr, i ) {
			return arr == null ? -1 : indexOf.call( arr, elem, i );
		},
	
		// Support: Android <=4.0 only, PhantomJS 1 only
		// push.apply(_, arraylike) throws on ancient WebKit
		merge: function( first, second ) {
			var len = +second.length,
				j = 0,
				i = first.length;
	
			for ( ; j < len; j++ ) {
				first[ i++ ] = second[ j ];
			}
	
			first.length = i;
	
			return first;
		},
	
		grep: function( elems, callback, invert ) {
			var callbackInverse,
				matches = [],
				i = 0,
				length = elems.length,
				callbackExpect = !invert;
	
			// Go through the array, only saving the items
			// that pass the validator function
			for ( ; i < length; i++ ) {
				callbackInverse = !callback( elems[ i ], i );
				if ( callbackInverse !== callbackExpect ) {
					matches.push( elems[ i ] );
				}
			}
	
			return matches;
		},
	
		// arg is for internal usage only
		map: function( elems, callback, arg ) {
			var length, value,
				i = 0,
				ret = [];
	
			// Go through the array, translating each of the items to their new values
			if ( isArrayLike( elems ) ) {
				length = elems.length;
				for ( ; i < length; i++ ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
	
			// Go through every key on the object,
			} else {
				for ( i in elems ) {
					value = callback( elems[ i ], i, arg );
	
					if ( value != null ) {
						ret.push( value );
					}
				}
			}
	
			// Flatten any nested arrays
			return concat.apply( [], ret );
		},
	
		// A global GUID counter for objects
		guid: 1,
	
		// Bind a function to a context, optionally partially applying any
		// arguments.
		proxy: function( fn, context ) {
			var tmp, args, proxy;
	
			if ( typeof context === "string" ) {
				tmp = fn[ context ];
				context = fn;
				fn = tmp;
			}
	
			// Quick check to determine if target is callable, in the spec
			// this throws a TypeError, but we will just return undefined.
			if ( !jQuery.isFunction( fn ) ) {
				return undefined;
			}
	
			// Simulated bind
			args = slice.call( arguments, 2 );
			proxy = function() {
				return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
			};
	
			// Set the guid of unique handler to the same of original handler, so it can be removed
			proxy.guid = fn.guid = fn.guid || jQuery.guid++;
	
			return proxy;
		},
	
		now: Date.now,
	
		// jQuery.support is not used in Core but other projects attach their
		// properties to it so it needs to exist.
		support: support
	} );
	
	if ( typeof Symbol === "function" ) {
		jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
	}
	
	// Populate the class2type map
	jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
	function( i, name ) {
		class2type[ "[object " + name + "]" ] = name.toLowerCase();
	} );
	
	function isArrayLike( obj ) {
	
		// Support: real iOS 8.2 only (not reproducible in simulator)
		// `in` check used to prevent JIT error (gh-2145)
		// hasOwn isn't used here due to false negatives
		// regarding Nodelist length in IE
		var length = !!obj && "length" in obj && obj.length,
			type = jQuery.type( obj );
	
		if ( type === "function" || jQuery.isWindow( obj ) ) {
			return false;
		}
	
		return type === "array" || length === 0 ||
			typeof length === "number" && length > 0 && ( length - 1 ) in obj;
	}
	var Sizzle =
	/*!
	 * Sizzle CSS Selector Engine v2.3.3
	 * https://sizzlejs.com/
	 *
	 * Copyright jQuery Foundation and other contributors
	 * Released under the MIT license
	 * http://jquery.org/license
	 *
	 * Date: 2016-08-08
	 */
	(function( window ) {
	
	var i,
		support,
		Expr,
		getText,
		isXML,
		tokenize,
		compile,
		select,
		outermostContext,
		sortInput,
		hasDuplicate,
	
		// Local document vars
		setDocument,
		document,
		docElem,
		documentIsHTML,
		rbuggyQSA,
		rbuggyMatches,
		matches,
		contains,
	
		// Instance-specific data
		expando = "sizzle" + 1 * new Date(),
		preferredDoc = window.document,
		dirruns = 0,
		done = 0,
		classCache = createCache(),
		tokenCache = createCache(),
		compilerCache = createCache(),
		sortOrder = function( a, b ) {
			if ( a === b ) {
				hasDuplicate = true;
			}
			return 0;
		},
	
		// Instance methods
		hasOwn = ({}).hasOwnProperty,
		arr = [],
		pop = arr.pop,
		push_native = arr.push,
		push = arr.push,
		slice = arr.slice,
		// Use a stripped-down indexOf as it's faster than native
		// https://jsperf.com/thor-indexof-vs-for/5
		indexOf = function( list, elem ) {
			var i = 0,
				len = list.length;
			for ( ; i < len; i++ ) {
				if ( list[i] === elem ) {
					return i;
				}
			}
			return -1;
		},
	
		booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
	
		// Regular expressions
	
		// http://www.w3.org/TR/css3-selectors/#whitespace
		whitespace = "[\\x20\\t\\r\\n\\f]",
	
		// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
		identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
	
		// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
		attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
			// Operator (capture 2)
			"*([*^$|!~]?=)" + whitespace +
			// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
			"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
			"*\\]",
	
		pseudos = ":(" + identifier + ")(?:\\((" +
			// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
			// 1. quoted (capture 3; capture 4 or capture 5)
			"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
			// 2. simple (capture 6)
			"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
			// 3. anything else (capture 2)
			".*" +
			")\\)|)",
	
		// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
		rwhitespace = new RegExp( whitespace + "+", "g" ),
		rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),
	
		rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
		rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),
	
		rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),
	
		rpseudo = new RegExp( pseudos ),
		ridentifier = new RegExp( "^" + identifier + "$" ),
	
		matchExpr = {
			"ID": new RegExp( "^#(" + identifier + ")" ),
			"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
			"TAG": new RegExp( "^(" + identifier + "|[*])" ),
			"ATTR": new RegExp( "^" + attributes ),
			"PSEUDO": new RegExp( "^" + pseudos ),
			"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
				"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
				"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
			"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
			// For use in libraries implementing .is()
			// We use this for POS matching in `select`
			"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
				whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
		},
	
		rinputs = /^(?:input|select|textarea|button)$/i,
		rheader = /^h\d$/i,
	
		rnative = /^[^{]+\{\s*\[native \w/,
	
		// Easily-parseable/retrievable ID or TAG or CLASS selectors
		rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
	
		rsibling = /[+~]/,
	
		// CSS escapes
		// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
		runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
		funescape = function( _, escaped, escapedWhitespace ) {
			var high = "0x" + escaped - 0x10000;
			// NaN means non-codepoint
			// Support: Firefox<24
			// Workaround erroneous numeric interpretation of +"0x"
			return high !== high || escapedWhitespace ?
				escaped :
				high < 0 ?
					// BMP codepoint
					String.fromCharCode( high + 0x10000 ) :
					// Supplemental Plane codepoint (surrogate pair)
					String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
		},
	
		// CSS string/identifier serialization
		// https://drafts.csswg.org/cssom/#common-serializing-idioms
		rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
		fcssescape = function( ch, asCodePoint ) {
			if ( asCodePoint ) {
	
				// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
				if ( ch === "\0" ) {
					return "\uFFFD";
				}
	
				// Control characters and (dependent upon position) numbers get escaped as code points
				return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
			}
	
			// Other potentially-special ASCII characters get backslash-escaped
			return "\\" + ch;
		},
	
		// Used for iframes
		// See setDocument()
		// Removing the function wrapper causes a "Permission Denied"
		// error in IE
		unloadHandler = function() {
			setDocument();
		},
	
		disabledAncestor = addCombinator(
			function( elem ) {
				return elem.disabled === true && ("form" in elem || "label" in elem);
			},
			{ dir: "parentNode", next: "legend" }
		);
	
	// Optimize for push.apply( _, NodeList )
	try {
		push.apply(
			(arr = slice.call( preferredDoc.childNodes )),
			preferredDoc.childNodes
		);
		// Support: Android<4.0
		// Detect silently failing push.apply
		arr[ preferredDoc.childNodes.length ].nodeType;
	} catch ( e ) {
		push = { apply: arr.length ?
	
			// Leverage slice if possible
			function( target, els ) {
				push_native.apply( target, slice.call(els) );
			} :
	
			// Support: IE<9
			// Otherwise append directly
			function( target, els ) {
				var j = target.length,
					i = 0;
				// Can't trust NodeList.length
				while ( (target[j++] = els[i++]) ) {}
				target.length = j - 1;
			}
		};
	}
	
	function Sizzle( selector, context, results, seed ) {
		var m, i, elem, nid, match, groups, newSelector,
			newContext = context && context.ownerDocument,
	
			// nodeType defaults to 9, since context defaults to document
			nodeType = context ? context.nodeType : 9;
	
		results = results || [];
	
		// Return early from calls with invalid selector or context
		if ( typeof selector !== "string" || !selector ||
			nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {
	
			return results;
		}
	
		// Try to shortcut find operations (as opposed to filters) in HTML documents
		if ( !seed ) {
	
			if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
				setDocument( context );
			}
			context = context || document;
	
			if ( documentIsHTML ) {
	
				// If the selector is sufficiently simple, try using a "get*By*" DOM method
				// (excepting DocumentFragment context, where the methods don't exist)
				if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
	
					// ID selector
					if ( (m = match[1]) ) {
	
						// Document context
						if ( nodeType === 9 ) {
							if ( (elem = context.getElementById( m )) ) {
	
								// Support: IE, Opera, Webkit
								// TODO: identify versions
								// getElementById can match elements by name instead of ID
								if ( elem.id === m ) {
									results.push( elem );
									return results;
								}
							} else {
								return results;
							}
	
						// Element context
						} else {
	
							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( newContext && (elem = newContext.getElementById( m )) &&
								contains( context, elem ) &&
								elem.id === m ) {
	
								results.push( elem );
								return results;
							}
						}
	
					// Type selector
					} else if ( match[2] ) {
						push.apply( results, context.getElementsByTagName( selector ) );
						return results;
	
					// Class selector
					} else if ( (m = match[3]) && support.getElementsByClassName &&
						context.getElementsByClassName ) {
	
						push.apply( results, context.getElementsByClassName( m ) );
						return results;
					}
				}
	
				// Take advantage of querySelectorAll
				if ( support.qsa &&
					!compilerCache[ selector + " " ] &&
					(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
	
					if ( nodeType !== 1 ) {
						newContext = context;
						newSelector = selector;
	
					// qSA looks outside Element context, which is not what we want
					// Thanks to Andrew Dupont for this workaround technique
					// Support: IE <=8
					// Exclude object elements
					} else if ( context.nodeName.toLowerCase() !== "object" ) {
	
						// Capture the context ID, setting it first if necessary
						if ( (nid = context.getAttribute( "id" )) ) {
							nid = nid.replace( rcssescape, fcssescape );
						} else {
							context.setAttribute( "id", (nid = expando) );
						}
	
						// Prefix every selector in the list
						groups = tokenize( selector );
						i = groups.length;
						while ( i-- ) {
							groups[i] = "#" + nid + " " + toSelector( groups[i] );
						}
						newSelector = groups.join( "," );
	
						// Expand context for sibling selectors
						newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
							context;
					}
	
					if ( newSelector ) {
						try {
							push.apply( results,
								newContext.querySelectorAll( newSelector )
							);
							return results;
						} catch ( qsaError ) {
						} finally {
							if ( nid === expando ) {
								context.removeAttribute( "id" );
							}
						}
					}
				}
			}
		}
	
		// All others
		return select( selector.replace( rtrim, "$1" ), context, results, seed );
	}
	
	/**
	 * Create key-value caches of limited size
	 * @returns {function(string, object)} Returns the Object data after storing it on itself with
	 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
	 *	deleting the oldest entry
	 */
	function createCache() {
		var keys = [];
	
		function cache( key, value ) {
			// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
			if ( keys.push( key + " " ) > Expr.cacheLength ) {
				// Only keep the most recent entries
				delete cache[ keys.shift() ];
			}
			return (cache[ key + " " ] = value);
		}
		return cache;
	}
	
	/**
	 * Mark a function for special use by Sizzle
	 * @param {Function} fn The function to mark
	 */
	function markFunction( fn ) {
		fn[ expando ] = true;
		return fn;
	}
	
	/**
	 * Support testing using an element
	 * @param {Function} fn Passed the created element and returns a boolean result
	 */
	function assert( fn ) {
		var el = document.createElement("fieldset");
	
		try {
			return !!fn( el );
		} catch (e) {
			return false;
		} finally {
			// Remove from its parent by default
			if ( el.parentNode ) {
				el.parentNode.removeChild( el );
			}
			// release memory in IE
			el = null;
		}
	}
	
	/**
	 * Adds the same handler for all of the specified attrs
	 * @param {String} attrs Pipe-separated list of attributes
	 * @param {Function} handler The method that will be applied
	 */
	function addHandle( attrs, handler ) {
		var arr = attrs.split("|"),
			i = arr.length;
	
		while ( i-- ) {
			Expr.attrHandle[ arr[i] ] = handler;
		}
	}
	
	/**
	 * Checks document order of two siblings
	 * @param {Element} a
	 * @param {Element} b
	 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
	 */
	function siblingCheck( a, b ) {
		var cur = b && a,
			diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
				a.sourceIndex - b.sourceIndex;
	
		// Use IE sourceIndex if available on both nodes
		if ( diff ) {
			return diff;
		}
	
		// Check if b follows a
		if ( cur ) {
			while ( (cur = cur.nextSibling) ) {
				if ( cur === b ) {
					return -1;
				}
			}
		}
	
		return a ? 1 : -1;
	}
	
	/**
	 * Returns a function to use in pseudos for input types
	 * @param {String} type
	 */
	function createInputPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for buttons
	 * @param {String} type
	 */
	function createButtonPseudo( type ) {
		return function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return (name === "input" || name === "button") && elem.type === type;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for :enabled/:disabled
	 * @param {Boolean} disabled true for :disabled; false for :enabled
	 */
	function createDisabledPseudo( disabled ) {
	
		// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
		return function( elem ) {
	
			// Only certain elements can match :enabled or :disabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
			// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
			if ( "form" in elem ) {
	
				// Check for inherited disabledness on relevant non-disabled elements:
				// * listed form-associated elements in a disabled fieldset
				//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
				// * option elements in a disabled optgroup
				//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
				// All such elements have a "form" property.
				if ( elem.parentNode && elem.disabled === false ) {
	
					// Option elements defer to a parent optgroup if present
					if ( "label" in elem ) {
						if ( "label" in elem.parentNode ) {
							return elem.parentNode.disabled === disabled;
						} else {
							return elem.disabled === disabled;
						}
					}
	
					// Support: IE 6 - 11
					// Use the isDisabled shortcut property to check for disabled fieldset ancestors
					return elem.isDisabled === disabled ||
	
						// Where there is no isDisabled, check manually
						/* jshint -W018 */
						elem.isDisabled !== !disabled &&
							disabledAncestor( elem ) === disabled;
				}
	
				return elem.disabled === disabled;
	
			// Try to winnow out elements that can't be disabled before trusting the disabled property.
			// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
			// even exist on them, let alone have a boolean value.
			} else if ( "label" in elem ) {
				return elem.disabled === disabled;
			}
	
			// Remaining elements are neither :enabled nor :disabled
			return false;
		};
	}
	
	/**
	 * Returns a function to use in pseudos for positionals
	 * @param {Function} fn
	 */
	function createPositionalPseudo( fn ) {
		return markFunction(function( argument ) {
			argument = +argument;
			return markFunction(function( seed, matches ) {
				var j,
					matchIndexes = fn( [], seed.length, argument ),
					i = matchIndexes.length;
	
				// Match elements found at the specified indexes
				while ( i-- ) {
					if ( seed[ (j = matchIndexes[i]) ] ) {
						seed[j] = !(matches[j] = seed[j]);
					}
				}
			});
		});
	}
	
	/**
	 * Checks a node for validity as a Sizzle context
	 * @param {Element|Object=} context
	 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
	 */
	function testContext( context ) {
		return context && typeof context.getElementsByTagName !== "undefined" && context;
	}
	
	// Expose support vars for convenience
	support = Sizzle.support = {};
	
	/**
	 * Detects XML nodes
	 * @param {Element|Object} elem An element or a document
	 * @returns {Boolean} True iff elem is a non-HTML XML node
	 */
	isXML = Sizzle.isXML = function( elem ) {
		// documentElement is verified for cases where it doesn't yet exist
		// (such as loading iframes in IE - #4833)
		var documentElement = elem && (elem.ownerDocument || elem).documentElement;
		return documentElement ? documentElement.nodeName !== "HTML" : false;
	};
	
	/**
	 * Sets document-related variables once based on the current document
	 * @param {Element|Object} [doc] An element or document object to use to set the document
	 * @returns {Object} Returns the current document
	 */
	setDocument = Sizzle.setDocument = function( node ) {
		var hasCompare, subWindow,
			doc = node ? node.ownerDocument || node : preferredDoc;
	
		// Return early if doc is invalid or already selected
		if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
			return document;
		}
	
		// Update global variables
		document = doc;
		docElem = document.documentElement;
		documentIsHTML = !isXML( document );
	
		// Support: IE 9-11, Edge
		// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
		if ( preferredDoc !== document &&
			(subWindow = document.defaultView) && subWindow.top !== subWindow ) {
	
			// Support: IE 11, Edge
			if ( subWindow.addEventListener ) {
				subWindow.addEventListener( "unload", unloadHandler, false );
	
			// Support: IE 9 - 10 only
			} else if ( subWindow.attachEvent ) {
				subWindow.attachEvent( "onunload", unloadHandler );
			}
		}
	
		/* Attributes
		---------------------------------------------------------------------- */
	
		// Support: IE<8
		// Verify that getAttribute really returns attributes and not properties
		// (excepting IE8 booleans)
		support.attributes = assert(function( el ) {
			el.className = "i";
			return !el.getAttribute("className");
		});
	
		/* getElement(s)By*
		---------------------------------------------------------------------- */
	
		// Check if getElementsByTagName("*") returns only elements
		support.getElementsByTagName = assert(function( el ) {
			el.appendChild( document.createComment("") );
			return !el.getElementsByTagName("*").length;
		});
	
		// Support: IE<9
		support.getElementsByClassName = rnative.test( document.getElementsByClassName );
	
		// Support: IE<10
		// Check if getElementById returns elements by name
		// The broken getElementById methods don't pick up programmatically-set names,
		// so use a roundabout getElementsByName test
		support.getById = assert(function( el ) {
			docElem.appendChild( el ).id = expando;
			return !document.getElementsByName || !document.getElementsByName( expando ).length;
		});
	
		// ID filter and find
		if ( support.getById ) {
			Expr.filter["ID"] = function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					return elem.getAttribute("id") === attrId;
				};
			};
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var elem = context.getElementById( id );
					return elem ? [ elem ] : [];
				}
			};
		} else {
			Expr.filter["ID"] =  function( id ) {
				var attrId = id.replace( runescape, funescape );
				return function( elem ) {
					var node = typeof elem.getAttributeNode !== "undefined" &&
						elem.getAttributeNode("id");
					return node && node.value === attrId;
				};
			};
	
			// Support: IE 6 - 7 only
			// getElementById is not reliable as a find shortcut
			Expr.find["ID"] = function( id, context ) {
				if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
					var node, i, elems,
						elem = context.getElementById( id );
	
					if ( elem ) {
	
						// Verify the id attribute
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
	
						// Fall back on getElementsByName
						elems = context.getElementsByName( id );
						i = 0;
						while ( (elem = elems[i++]) ) {
							node = elem.getAttributeNode("id");
							if ( node && node.value === id ) {
								return [ elem ];
							}
						}
					}
	
					return [];
				}
			};
		}
	
		// Tag
		Expr.find["TAG"] = support.getElementsByTagName ?
			function( tag, context ) {
				if ( typeof context.getElementsByTagName !== "undefined" ) {
					return context.getElementsByTagName( tag );
	
				// DocumentFragment nodes don't have gEBTN
				} else if ( support.qsa ) {
					return context.querySelectorAll( tag );
				}
			} :
	
			function( tag, context ) {
				var elem,
					tmp = [],
					i = 0,
					// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
					results = context.getElementsByTagName( tag );
	
				// Filter out possible comments
				if ( tag === "*" ) {
					while ( (elem = results[i++]) ) {
						if ( elem.nodeType === 1 ) {
							tmp.push( elem );
						}
					}
	
					return tmp;
				}
				return results;
			};
	
		// Class
		Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
			if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
				return context.getElementsByClassName( className );
			}
		};
	
		/* QSA/matchesSelector
		---------------------------------------------------------------------- */
	
		// QSA and matchesSelector support
	
		// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
		rbuggyMatches = [];
	
		// qSa(:focus) reports false when true (Chrome 21)
		// We allow this because of a bug in IE8/9 that throws an error
		// whenever `document.activeElement` is accessed on an iframe
		// So, we allow :focus to pass through QSA all the time to avoid the IE error
		// See https://bugs.jquery.com/ticket/13378
		rbuggyQSA = [];
	
		if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
			// Build QSA regex
			// Regex strategy adopted from Diego Perini
			assert(function( el ) {
				// Select is set to empty string on purpose
				// This is to test IE's treatment of not explicitly
				// setting a boolean content attribute,
				// since its presence should be enough
				// https://bugs.jquery.com/ticket/12359
				docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
					"<select id='" + expando + "-\r\\' msallowcapture=''>" +
					"<option selected=''></option></select>";
	
				// Support: IE8, Opera 11-12.16
				// Nothing should be selected when empty strings follow ^= or $= or *=
				// The test attribute must be unknown in Opera but "safe" for WinRT
				// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
				if ( el.querySelectorAll("[msallowcapture^='']").length ) {
					rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
				}
	
				// Support: IE8
				// Boolean attributes and "value" are not treated correctly
				if ( !el.querySelectorAll("[selected]").length ) {
					rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
				}
	
				// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
				if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
					rbuggyQSA.push("~=");
				}
	
				// Webkit/Opera - :checked should return selected option elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				// IE8 throws error here and will not see later tests
				if ( !el.querySelectorAll(":checked").length ) {
					rbuggyQSA.push(":checked");
				}
	
				// Support: Safari 8+, iOS 8+
				// https://bugs.webkit.org/show_bug.cgi?id=136851
				// In-page `selector#id sibling-combinator selector` fails
				if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
					rbuggyQSA.push(".#.+[+~]");
				}
			});
	
			assert(function( el ) {
				el.innerHTML = "<a href='' disabled='disabled'></a>" +
					"<select disabled='disabled'><option/></select>";
	
				// Support: Windows 8 Native Apps
				// The type and name attributes are restricted during .innerHTML assignment
				var input = document.createElement("input");
				input.setAttribute( "type", "hidden" );
				el.appendChild( input ).setAttribute( "name", "D" );
	
				// Support: IE8
				// Enforce case-sensitivity of name attribute
				if ( el.querySelectorAll("[name=d]").length ) {
					rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
				}
	
				// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
				// IE8 throws error here and will not see later tests
				if ( el.querySelectorAll(":enabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Support: IE9-11+
				// IE's :disabled selector does not pick up the children of disabled fieldsets
				docElem.appendChild( el ).disabled = true;
				if ( el.querySelectorAll(":disabled").length !== 2 ) {
					rbuggyQSA.push( ":enabled", ":disabled" );
				}
	
				// Opera 10-11 does not throw on post-comma invalid pseudos
				el.querySelectorAll("*,:x");
				rbuggyQSA.push(",.*:");
			});
		}
	
		if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
			docElem.webkitMatchesSelector ||
			docElem.mozMatchesSelector ||
			docElem.oMatchesSelector ||
			docElem.msMatchesSelector) )) ) {
	
			assert(function( el ) {
				// Check to see if it's possible to do matchesSelector
				// on a disconnected node (IE 9)
				support.disconnectedMatch = matches.call( el, "*" );
	
				// This should fail with an exception
				// Gecko does not error, returns false instead
				matches.call( el, "[s!='']:x" );
				rbuggyMatches.push( "!=", pseudos );
			});
		}
	
		rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
		rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );
	
		/* Contains
		---------------------------------------------------------------------- */
		hasCompare = rnative.test( docElem.compareDocumentPosition );
	
		// Element contains another
		// Purposefully self-exclusive
		// As in, an element does not contain itself
		contains = hasCompare || rnative.test( docElem.contains ) ?
			function( a, b ) {
				var adown = a.nodeType === 9 ? a.documentElement : a,
					bup = b && b.parentNode;
				return a === bup || !!( bup && bup.nodeType === 1 && (
					adown.contains ?
						adown.contains( bup ) :
						a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
				));
			} :
			function( a, b ) {
				if ( b ) {
					while ( (b = b.parentNode) ) {
						if ( b === a ) {
							return true;
						}
					}
				}
				return false;
			};
	
		/* Sorting
		---------------------------------------------------------------------- */
	
		// Document order sorting
		sortOrder = hasCompare ?
		function( a, b ) {
	
			// Flag for duplicate removal
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			// Sort on method existence if only one input has compareDocumentPosition
			var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
			if ( compare ) {
				return compare;
			}
	
			// Calculate position if both inputs belong to the same document
			compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
				a.compareDocumentPosition( b ) :
	
				// Otherwise we know they are disconnected
				1;
	
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {
	
				// Choose the first element that is related to our preferred document
				if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
					return 1;
				}
	
				// Maintain original order
				return sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
			}
	
			return compare & 4 ? -1 : 1;
		} :
		function( a, b ) {
			// Exit early if the nodes are identical
			if ( a === b ) {
				hasDuplicate = true;
				return 0;
			}
	
			var cur,
				i = 0,
				aup = a.parentNode,
				bup = b.parentNode,
				ap = [ a ],
				bp = [ b ];
	
			// Parentless nodes are either documents or disconnected
			if ( !aup || !bup ) {
				return a === document ? -1 :
					b === document ? 1 :
					aup ? -1 :
					bup ? 1 :
					sortInput ?
					( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
					0;
	
			// If the nodes are siblings, we can do a quick check
			} else if ( aup === bup ) {
				return siblingCheck( a, b );
			}
	
			// Otherwise we need full lists of their ancestors for comparison
			cur = a;
			while ( (cur = cur.parentNode) ) {
				ap.unshift( cur );
			}
			cur = b;
			while ( (cur = cur.parentNode) ) {
				bp.unshift( cur );
			}
	
			// Walk down the tree looking for a discrepancy
			while ( ap[i] === bp[i] ) {
				i++;
			}
	
			return i ?
				// Do a sibling check if the nodes have a common ancestor
				siblingCheck( ap[i], bp[i] ) :
	
				// Otherwise nodes in our document sort first
				ap[i] === preferredDoc ? -1 :
				bp[i] === preferredDoc ? 1 :
				0;
		};
	
		return document;
	};
	
	Sizzle.matches = function( expr, elements ) {
		return Sizzle( expr, null, null, elements );
	};
	
	Sizzle.matchesSelector = function( elem, expr ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		// Make sure that attribute selectors are quoted
		expr = expr.replace( rattributeQuotes, "='$1']" );
	
		if ( support.matchesSelector && documentIsHTML &&
			!compilerCache[ expr + " " ] &&
			( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
			( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {
	
			try {
				var ret = matches.call( elem, expr );
	
				// IE 9's matchesSelector returns false on disconnected nodes
				if ( ret || support.disconnectedMatch ||
						// As well, disconnected nodes are said to be in a document
						// fragment in IE 9
						elem.document && elem.document.nodeType !== 11 ) {
					return ret;
				}
			} catch (e) {}
		}
	
		return Sizzle( expr, document, null, [ elem ] ).length > 0;
	};
	
	Sizzle.contains = function( context, elem ) {
		// Set document vars if needed
		if ( ( context.ownerDocument || context ) !== document ) {
			setDocument( context );
		}
		return contains( context, elem );
	};
	
	Sizzle.attr = function( elem, name ) {
		// Set document vars if needed
		if ( ( elem.ownerDocument || elem ) !== document ) {
			setDocument( elem );
		}
	
		var fn = Expr.attrHandle[ name.toLowerCase() ],
			// Don't get fooled by Object.prototype properties (jQuery #13807)
			val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
				fn( elem, name, !documentIsHTML ) :
				undefined;
	
		return val !== undefined ?
			val :
			support.attributes || !documentIsHTML ?
				elem.getAttribute( name ) :
				(val = elem.getAttributeNode(name)) && val.specified ?
					val.value :
					null;
	};
	
	Sizzle.escape = function( sel ) {
		return (sel + "").replace( rcssescape, fcssescape );
	};
	
	Sizzle.error = function( msg ) {
		throw new Error( "Syntax error, unrecognized expression: " + msg );
	};
	
	/**
	 * Document sorting and removing duplicates
	 * @param {ArrayLike} results
	 */
	Sizzle.uniqueSort = function( results ) {
		var elem,
			duplicates = [],
			j = 0,
			i = 0;
	
		// Unless we *know* we can detect duplicates, assume their presence
		hasDuplicate = !support.detectDuplicates;
		sortInput = !support.sortStable && results.slice( 0 );
		results.sort( sortOrder );
	
		if ( hasDuplicate ) {
			while ( (elem = results[i++]) ) {
				if ( elem === results[ i ] ) {
					j = duplicates.push( i );
				}
			}
			while ( j-- ) {
				results.splice( duplicates[ j ], 1 );
			}
		}
	
		// Clear input after sorting to release objects
		// See https://github.com/jquery/sizzle/pull/225
		sortInput = null;
	
		return results;
	};
	
	/**
	 * Utility function for retrieving the text value of an array of DOM nodes
	 * @param {Array|Element} elem
	 */
	getText = Sizzle.getText = function( elem ) {
		var node,
			ret = "",
			i = 0,
			nodeType = elem.nodeType;
	
		if ( !nodeType ) {
			// If no nodeType, this is expected to be an array
			while ( (node = elem[i++]) ) {
				// Do not traverse comment nodes
				ret += getText( node );
			}
		} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
			// Use textContent for elements
			// innerText usage removed for consistency of new lines (jQuery #11153)
			if ( typeof elem.textContent === "string" ) {
				return elem.textContent;
			} else {
				// Traverse its children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					ret += getText( elem );
				}
			}
		} else if ( nodeType === 3 || nodeType === 4 ) {
			return elem.nodeValue;
		}
		// Do not include comment or processing instruction nodes
	
		return ret;
	};
	
	Expr = Sizzle.selectors = {
	
		// Can be adjusted by the user
		cacheLength: 50,
	
		createPseudo: markFunction,
	
		match: matchExpr,
	
		attrHandle: {},
	
		find: {},
	
		relative: {
			">": { dir: "parentNode", first: true },
			" ": { dir: "parentNode" },
			"+": { dir: "previousSibling", first: true },
			"~": { dir: "previousSibling" }
		},
	
		preFilter: {
			"ATTR": function( match ) {
				match[1] = match[1].replace( runescape, funescape );
	
				// Move the given value to match[3] whether quoted or unquoted
				match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );
	
				if ( match[2] === "~=" ) {
					match[3] = " " + match[3] + " ";
				}
	
				return match.slice( 0, 4 );
			},
	
			"CHILD": function( match ) {
				/* matches from matchExpr["CHILD"]
					1 type (only|nth|...)
					2 what (child|of-type)
					3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
					4 xn-component of xn+y argument ([+-]?\d*n|)
					5 sign of xn-component
					6 x of xn-component
					7 sign of y-component
					8 y of y-component
				*/
				match[1] = match[1].toLowerCase();
	
				if ( match[1].slice( 0, 3 ) === "nth" ) {
					// nth-* requires argument
					if ( !match[3] ) {
						Sizzle.error( match[0] );
					}
	
					// numeric x and y parameters for Expr.filter.CHILD
					// remember that false/true cast respectively to 0/1
					match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
					match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );
	
				// other types prohibit arguments
				} else if ( match[3] ) {
					Sizzle.error( match[0] );
				}
	
				return match;
			},
	
			"PSEUDO": function( match ) {
				var excess,
					unquoted = !match[6] && match[2];
	
				if ( matchExpr["CHILD"].test( match[0] ) ) {
					return null;
				}
	
				// Accept quoted arguments as-is
				if ( match[3] ) {
					match[2] = match[4] || match[5] || "";
	
				// Strip excess characters from unquoted arguments
				} else if ( unquoted && rpseudo.test( unquoted ) &&
					// Get excess from tokenize (recursively)
					(excess = tokenize( unquoted, true )) &&
					// advance to the next closing parenthesis
					(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {
	
					// excess is a negative index
					match[0] = match[0].slice( 0, excess );
					match[2] = unquoted.slice( 0, excess );
				}
	
				// Return only captures needed by the pseudo filter method (type and argument)
				return match.slice( 0, 3 );
			}
		},
	
		filter: {
	
			"TAG": function( nodeNameSelector ) {
				var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
				return nodeNameSelector === "*" ?
					function() { return true; } :
					function( elem ) {
						return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
					};
			},
	
			"CLASS": function( className ) {
				var pattern = classCache[ className + " " ];
	
				return pattern ||
					(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
					classCache( className, function( elem ) {
						return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
					});
			},
	
			"ATTR": function( name, operator, check ) {
				return function( elem ) {
					var result = Sizzle.attr( elem, name );
	
					if ( result == null ) {
						return operator === "!=";
					}
					if ( !operator ) {
						return true;
					}
	
					result += "";
	
					return operator === "=" ? result === check :
						operator === "!=" ? result !== check :
						operator === "^=" ? check && result.indexOf( check ) === 0 :
						operator === "*=" ? check && result.indexOf( check ) > -1 :
						operator === "$=" ? check && result.slice( -check.length ) === check :
						operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
						operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
						false;
				};
			},
	
			"CHILD": function( type, what, argument, first, last ) {
				var simple = type.slice( 0, 3 ) !== "nth",
					forward = type.slice( -4 ) !== "last",
					ofType = what === "of-type";
	
				return first === 1 && last === 0 ?
	
					// Shortcut for :nth-*(n)
					function( elem ) {
						return !!elem.parentNode;
					} :
	
					function( elem, context, xml ) {
						var cache, uniqueCache, outerCache, node, nodeIndex, start,
							dir = simple !== forward ? "nextSibling" : "previousSibling",
							parent = elem.parentNode,
							name = ofType && elem.nodeName.toLowerCase(),
							useCache = !xml && !ofType,
							diff = false;
	
						if ( parent ) {
	
							// :(first|last|only)-(child|of-type)
							if ( simple ) {
								while ( dir ) {
									node = elem;
									while ( (node = node[ dir ]) ) {
										if ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) {
	
											return false;
										}
									}
									// Reverse direction for :only-* (if we haven't yet done so)
									start = dir = type === "only" && !start && "nextSibling";
								}
								return true;
							}
	
							start = [ forward ? parent.firstChild : parent.lastChild ];
	
							// non-xml :nth-child(...) stores cache data on `parent`
							if ( forward && useCache ) {
	
								// Seek `elem` from a previously-cached index
	
								// ...in a gzip-friendly way
								node = parent;
								outerCache = node[ expando ] || (node[ expando ] = {});
	
								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});
	
								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex && cache[ 2 ];
								node = nodeIndex && parent.childNodes[ nodeIndex ];
	
								while ( (node = ++nodeIndex && node && node[ dir ] ||
	
									// Fallback to seeking `elem` from the start
									(diff = nodeIndex = 0) || start.pop()) ) {
	
									// When found, cache indexes on `parent` and break
									if ( node.nodeType === 1 && ++diff && node === elem ) {
										uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
										break;
									}
								}
	
							} else {
								// Use previously-cached element index if available
								if ( useCache ) {
									// ...in a gzip-friendly way
									node = elem;
									outerCache = node[ expando ] || (node[ expando ] = {});
	
									// Support: IE <9 only
									// Defend against cloned attroperties (jQuery gh-1709)
									uniqueCache = outerCache[ node.uniqueID ] ||
										(outerCache[ node.uniqueID ] = {});
	
									cache = uniqueCache[ type ] || [];
									nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
									diff = nodeIndex;
								}
	
								// xml :nth-child(...)
								// or :nth-last-child(...) or :nth(-last)?-of-type(...)
								if ( diff === false ) {
									// Use the same loop as above to seek `elem` from the start
									while ( (node = ++nodeIndex && node && node[ dir ] ||
										(diff = nodeIndex = 0) || start.pop()) ) {
	
										if ( ( ofType ?
											node.nodeName.toLowerCase() === name :
											node.nodeType === 1 ) &&
											++diff ) {
	
											// Cache the index of each encountered element
											if ( useCache ) {
												outerCache = node[ expando ] || (node[ expando ] = {});
	
												// Support: IE <9 only
												// Defend against cloned attroperties (jQuery gh-1709)
												uniqueCache = outerCache[ node.uniqueID ] ||
													(outerCache[ node.uniqueID ] = {});
	
												uniqueCache[ type ] = [ dirruns, diff ];
											}
	
											if ( node === elem ) {
												break;
											}
										}
									}
								}
							}
	
							// Incorporate the offset, then check against cycle size
							diff -= last;
							return diff === first || ( diff % first === 0 && diff / first >= 0 );
						}
					};
			},
	
			"PSEUDO": function( pseudo, argument ) {
				// pseudo-class names are case-insensitive
				// http://www.w3.org/TR/selectors/#pseudo-classes
				// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
				// Remember that setFilters inherits from pseudos
				var args,
					fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
						Sizzle.error( "unsupported pseudo: " + pseudo );
	
				// The user may use createPseudo to indicate that
				// arguments are needed to create the filter function
				// just as Sizzle does
				if ( fn[ expando ] ) {
					return fn( argument );
				}
	
				// But maintain support for old signatures
				if ( fn.length > 1 ) {
					args = [ pseudo, pseudo, "", argument ];
					return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
						markFunction(function( seed, matches ) {
							var idx,
								matched = fn( seed, argument ),
								i = matched.length;
							while ( i-- ) {
								idx = indexOf( seed, matched[i] );
								seed[ idx ] = !( matches[ idx ] = matched[i] );
							}
						}) :
						function( elem ) {
							return fn( elem, 0, args );
						};
				}
	
				return fn;
			}
		},
	
		pseudos: {
			// Potentially complex pseudos
			"not": markFunction(function( selector ) {
				// Trim the selector passed to compile
				// to avoid treating leading and trailing
				// spaces as combinators
				var input = [],
					results = [],
					matcher = compile( selector.replace( rtrim, "$1" ) );
	
				return matcher[ expando ] ?
					markFunction(function( seed, matches, context, xml ) {
						var elem,
							unmatched = matcher( seed, null, xml, [] ),
							i = seed.length;
	
						// Match elements unmatched by `matcher`
						while ( i-- ) {
							if ( (elem = unmatched[i]) ) {
								seed[i] = !(matches[i] = elem);
							}
						}
					}) :
					function( elem, context, xml ) {
						input[0] = elem;
						matcher( input, null, xml, results );
						// Don't keep the element (issue #299)
						input[0] = null;
						return !results.pop();
					};
			}),
	
			"has": markFunction(function( selector ) {
				return function( elem ) {
					return Sizzle( selector, elem ).length > 0;
				};
			}),
	
			"contains": markFunction(function( text ) {
				text = text.replace( runescape, funescape );
				return function( elem ) {
					return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
				};
			}),
	
			// "Whether an element is represented by a :lang() selector
			// is based solely on the element's language value
			// being equal to the identifier C,
			// or beginning with the identifier C immediately followed by "-".
			// The matching of C against the element's language value is performed case-insensitively.
			// The identifier C does not have to be a valid language name."
			// http://www.w3.org/TR/selectors/#lang-pseudo
			"lang": markFunction( function( lang ) {
				// lang value must be a valid identifier
				if ( !ridentifier.test(lang || "") ) {
					Sizzle.error( "unsupported lang: " + lang );
				}
				lang = lang.replace( runescape, funescape ).toLowerCase();
				return function( elem ) {
					var elemLang;
					do {
						if ( (elemLang = documentIsHTML ?
							elem.lang :
							elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {
	
							elemLang = elemLang.toLowerCase();
							return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
						}
					} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
					return false;
				};
			}),
	
			// Miscellaneous
			"target": function( elem ) {
				var hash = window.location && window.location.hash;
				return hash && hash.slice( 1 ) === elem.id;
			},
	
			"root": function( elem ) {
				return elem === docElem;
			},
	
			"focus": function( elem ) {
				return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
			},
	
			// Boolean properties
			"enabled": createDisabledPseudo( false ),
			"disabled": createDisabledPseudo( true ),
	
			"checked": function( elem ) {
				// In CSS3, :checked should return both checked and selected elements
				// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
				var nodeName = elem.nodeName.toLowerCase();
				return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
			},
	
			"selected": function( elem ) {
				// Accessing this property makes selected-by-default
				// options in Safari work properly
				if ( elem.parentNode ) {
					elem.parentNode.selectedIndex;
				}
	
				return elem.selected === true;
			},
	
			// Contents
			"empty": function( elem ) {
				// http://www.w3.org/TR/selectors/#empty-pseudo
				// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
				//   but not by others (comment: 8; processing instruction: 7; etc.)
				// nodeType < 6 works because attributes (2) do not appear as children
				for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
					if ( elem.nodeType < 6 ) {
						return false;
					}
				}
				return true;
			},
	
			"parent": function( elem ) {
				return !Expr.pseudos["empty"]( elem );
			},
	
			// Element/input types
			"header": function( elem ) {
				return rheader.test( elem.nodeName );
			},
	
			"input": function( elem ) {
				return rinputs.test( elem.nodeName );
			},
	
			"button": function( elem ) {
				var name = elem.nodeName.toLowerCase();
				return name === "input" && elem.type === "button" || name === "button";
			},
	
			"text": function( elem ) {
				var attr;
				return elem.nodeName.toLowerCase() === "input" &&
					elem.type === "text" &&
	
					// Support: IE<8
					// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
					( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
			},
	
			// Position-in-collection
			"first": createPositionalPseudo(function() {
				return [ 0 ];
			}),
	
			"last": createPositionalPseudo(function( matchIndexes, length ) {
				return [ length - 1 ];
			}),
	
			"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
				return [ argument < 0 ? argument + length : argument ];
			}),
	
			"even": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 0;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"odd": createPositionalPseudo(function( matchIndexes, length ) {
				var i = 1;
				for ( ; i < length; i += 2 ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; --i >= 0; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			}),
	
			"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
				var i = argument < 0 ? argument + length : argument;
				for ( ; ++i < length; ) {
					matchIndexes.push( i );
				}
				return matchIndexes;
			})
		}
	};
	
	Expr.pseudos["nth"] = Expr.pseudos["eq"];
	
	// Add button/input type pseudos
	for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
		Expr.pseudos[ i ] = createInputPseudo( i );
	}
	for ( i in { submit: true, reset: true } ) {
		Expr.pseudos[ i ] = createButtonPseudo( i );
	}
	
	// Easy API for creating new setFilters
	function setFilters() {}
	setFilters.prototype = Expr.filters = Expr.pseudos;
	Expr.setFilters = new setFilters();
	
	tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
		var matched, match, tokens, type,
			soFar, groups, preFilters,
			cached = tokenCache[ selector + " " ];
	
		if ( cached ) {
			return parseOnly ? 0 : cached.slice( 0 );
		}
	
		soFar = selector;
		groups = [];
		preFilters = Expr.preFilter;
	
		while ( soFar ) {
	
			// Comma and first run
			if ( !matched || (match = rcomma.exec( soFar )) ) {
				if ( match ) {
					// Don't consume trailing commas as valid
					soFar = soFar.slice( match[0].length ) || soFar;
				}
				groups.push( (tokens = []) );
			}
	
			matched = false;
	
			// Combinators
			if ( (match = rcombinators.exec( soFar )) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					// Cast descendant combinators to space
					type: match[0].replace( rtrim, " " )
				});
				soFar = soFar.slice( matched.length );
			}
	
			// Filters
			for ( type in Expr.filter ) {
				if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
					(match = preFilters[ type ]( match ))) ) {
					matched = match.shift();
					tokens.push({
						value: matched,
						type: type,
						matches: match
					});
					soFar = soFar.slice( matched.length );
				}
			}
	
			if ( !matched ) {
				break;
			}
		}
	
		// Return the length of the invalid excess
		// if we're just parsing
		// Otherwise, throw an error or return tokens
		return parseOnly ?
			soFar.length :
			soFar ?
				Sizzle.error( selector ) :
				// Cache the tokens
				tokenCache( selector, groups ).slice( 0 );
	};
	
	function toSelector( tokens ) {
		var i = 0,
			len = tokens.length,
			selector = "";
		for ( ; i < len; i++ ) {
			selector += tokens[i].value;
		}
		return selector;
	}
	
	function addCombinator( matcher, combinator, base ) {
		var dir = combinator.dir,
			skip = combinator.next,
			key = skip || dir,
			checkNonElements = base && key === "parentNode",
			doneName = done++;
	
		return combinator.first ?
			// Check against closest ancestor/preceding element
			function( elem, context, xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						return matcher( elem, context, xml );
					}
				}
				return false;
			} :
	
			// Check against all ancestor/preceding elements
			function( elem, context, xml ) {
				var oldCache, uniqueCache, outerCache,
					newCache = [ dirruns, doneName ];
	
				// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
				if ( xml ) {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							if ( matcher( elem, context, xml ) ) {
								return true;
							}
						}
					}
				} else {
					while ( (elem = elem[ dir ]) ) {
						if ( elem.nodeType === 1 || checkNonElements ) {
							outerCache = elem[ expando ] || (elem[ expando ] = {});
	
							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});
	
							if ( skip && skip === elem.nodeName.toLowerCase() ) {
								elem = elem[ dir ] || elem;
							} else if ( (oldCache = uniqueCache[ key ]) &&
								oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {
	
								// Assign to newCache so results back-propagate to previous elements
								return (newCache[ 2 ] = oldCache[ 2 ]);
							} else {
								// Reuse newcache so results back-propagate to previous elements
								uniqueCache[ key ] = newCache;
	
								// A match means we're done; a fail means we have to keep checking
								if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
									return true;
								}
							}
						}
					}
				}
				return false;
			};
	}
	
	function elementMatcher( matchers ) {
		return matchers.length > 1 ?
			function( elem, context, xml ) {
				var i = matchers.length;
				while ( i-- ) {
					if ( !matchers[i]( elem, context, xml ) ) {
						return false;
					}
				}
				return true;
			} :
			matchers[0];
	}
	
	function multipleContexts( selector, contexts, results ) {
		var i = 0,
			len = contexts.length;
		for ( ; i < len; i++ ) {
			Sizzle( selector, contexts[i], results );
		}
		return results;
	}
	
	function condense( unmatched, map, filter, context, xml ) {
		var elem,
			newUnmatched = [],
			i = 0,
			len = unmatched.length,
			mapped = map != null;
	
		for ( ; i < len; i++ ) {
			if ( (elem = unmatched[i]) ) {
				if ( !filter || filter( elem, context, xml ) ) {
					newUnmatched.push( elem );
					if ( mapped ) {
						map.push( i );
					}
				}
			}
		}
	
		return newUnmatched;
	}
	
	function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
		if ( postFilter && !postFilter[ expando ] ) {
			postFilter = setMatcher( postFilter );
		}
		if ( postFinder && !postFinder[ expando ] ) {
			postFinder = setMatcher( postFinder, postSelector );
		}
		return markFunction(function( seed, results, context, xml ) {
			var temp, i, elem,
				preMap = [],
				postMap = [],
				preexisting = results.length,
	
				// Get initial elements from seed or context
				elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),
	
				// Prefilter to get matcher input, preserving a map for seed-results synchronization
				matcherIn = preFilter && ( seed || !selector ) ?
					condense( elems, preMap, preFilter, context, xml ) :
					elems,
	
				matcherOut = matcher ?
					// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
					postFinder || ( seed ? preFilter : preexisting || postFilter ) ?
	
						// ...intermediate processing is necessary
						[] :
	
						// ...otherwise use results directly
						results :
					matcherIn;
	
			// Find primary matches
			if ( matcher ) {
				matcher( matcherIn, matcherOut, context, xml );
			}
	
			// Apply postFilter
			if ( postFilter ) {
				temp = condense( matcherOut, postMap );
				postFilter( temp, [], context, xml );
	
				// Un-match failing elements by moving them back to matcherIn
				i = temp.length;
				while ( i-- ) {
					if ( (elem = temp[i]) ) {
						matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
					}
				}
			}
	
			if ( seed ) {
				if ( postFinder || preFilter ) {
					if ( postFinder ) {
						// Get the final matcherOut by condensing this intermediate into postFinder contexts
						temp = [];
						i = matcherOut.length;
						while ( i-- ) {
							if ( (elem = matcherOut[i]) ) {
								// Restore matcherIn since elem is not yet a final match
								temp.push( (matcherIn[i] = elem) );
							}
						}
						postFinder( null, (matcherOut = []), temp, xml );
					}
	
					// Move matched elements from seed to results to keep them synchronized
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) &&
							(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {
	
							seed[temp] = !(results[temp] = elem);
						}
					}
				}
	
			// Add elements to results, through postFinder if defined
			} else {
				matcherOut = condense(
					matcherOut === results ?
						matcherOut.splice( preexisting, matcherOut.length ) :
						matcherOut
				);
				if ( postFinder ) {
					postFinder( null, results, matcherOut, xml );
				} else {
					push.apply( results, matcherOut );
				}
			}
		});
	}
	
	function matcherFromTokens( tokens ) {
		var checkContext, matcher, j,
			len = tokens.length,
			leadingRelative = Expr.relative[ tokens[0].type ],
			implicitRelative = leadingRelative || Expr.relative[" "],
			i = leadingRelative ? 1 : 0,
	
			// The foundational matcher ensures that elements are reachable from top-level context(s)
			matchContext = addCombinator( function( elem ) {
				return elem === checkContext;
			}, implicitRelative, true ),
			matchAnyContext = addCombinator( function( elem ) {
				return indexOf( checkContext, elem ) > -1;
			}, implicitRelative, true ),
			matchers = [ function( elem, context, xml ) {
				var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
					(checkContext = context).nodeType ?
						matchContext( elem, context, xml ) :
						matchAnyContext( elem, context, xml ) );
				// Avoid hanging onto element (issue #299)
				checkContext = null;
				return ret;
			} ];
	
		for ( ; i < len; i++ ) {
			if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
				matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
			} else {
				matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );
	
				// Return special upon seeing a positional matcher
				if ( matcher[ expando ] ) {
					// Find the next relative operator (if any) for proper handling
					j = ++i;
					for ( ; j < len; j++ ) {
						if ( Expr.relative[ tokens[j].type ] ) {
							break;
						}
					}
					return setMatcher(
						i > 1 && elementMatcher( matchers ),
						i > 1 && toSelector(
							// If the preceding token was a descendant combinator, insert an implicit any-element `*`
							tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
						).replace( rtrim, "$1" ),
						matcher,
						i < j && matcherFromTokens( tokens.slice( i, j ) ),
						j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
						j < len && toSelector( tokens )
					);
				}
				matchers.push( matcher );
			}
		}
	
		return elementMatcher( matchers );
	}
	
	function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
		var bySet = setMatchers.length > 0,
			byElement = elementMatchers.length > 0,
			superMatcher = function( seed, context, xml, results, outermost ) {
				var elem, j, matcher,
					matchedCount = 0,
					i = "0",
					unmatched = seed && [],
					setMatched = [],
					contextBackup = outermostContext,
					// We must always have either seed elements or outermost context
					elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
					// Use integer dirruns iff this is the outermost matcher
					dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
					len = elems.length;
	
				if ( outermost ) {
					outermostContext = context === document || context || outermost;
				}
	
				// Add elements passing elementMatchers directly to results
				// Support: IE<9, Safari
				// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
				for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
					if ( byElement && elem ) {
						j = 0;
						if ( !context && elem.ownerDocument !== document ) {
							setDocument( elem );
							xml = !documentIsHTML;
						}
						while ( (matcher = elementMatchers[j++]) ) {
							if ( matcher( elem, context || document, xml) ) {
								results.push( elem );
								break;
							}
						}
						if ( outermost ) {
							dirruns = dirrunsUnique;
						}
					}
	
					// Track unmatched elements for set filters
					if ( bySet ) {
						// They will have gone through all possible matchers
						if ( (elem = !matcher && elem) ) {
							matchedCount--;
						}
	
						// Lengthen the array for every element, matched or not
						if ( seed ) {
							unmatched.push( elem );
						}
					}
				}
	
				// `i` is now the count of elements visited above, and adding it to `matchedCount`
				// makes the latter nonnegative.
				matchedCount += i;
	
				// Apply set filters to unmatched elements
				// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
				// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
				// no element matchers and no seed.
				// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
				// case, which will result in a "00" `matchedCount` that differs from `i` but is also
				// numerically zero.
				if ( bySet && i !== matchedCount ) {
					j = 0;
					while ( (matcher = setMatchers[j++]) ) {
						matcher( unmatched, setMatched, context, xml );
					}
	
					if ( seed ) {
						// Reintegrate element matches to eliminate the need for sorting
						if ( matchedCount > 0 ) {
							while ( i-- ) {
								if ( !(unmatched[i] || setMatched[i]) ) {
									setMatched[i] = pop.call( results );
								}
							}
						}
	
						// Discard index placeholder values to get only actual matches
						setMatched = condense( setMatched );
					}
	
					// Add matches to results
					push.apply( results, setMatched );
	
					// Seedless set matches succeeding multiple successful matchers stipulate sorting
					if ( outermost && !seed && setMatched.length > 0 &&
						( matchedCount + setMatchers.length ) > 1 ) {
	
						Sizzle.uniqueSort( results );
					}
				}
	
				// Override manipulation of globals by nested matchers
				if ( outermost ) {
					dirruns = dirrunsUnique;
					outermostContext = contextBackup;
				}
	
				return unmatched;
			};
	
		return bySet ?
			markFunction( superMatcher ) :
			superMatcher;
	}
	
	compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
		var i,
			setMatchers = [],
			elementMatchers = [],
			cached = compilerCache[ selector + " " ];
	
		if ( !cached ) {
			// Generate a function of recursive functions that can be used to check each element
			if ( !match ) {
				match = tokenize( selector );
			}
			i = match.length;
			while ( i-- ) {
				cached = matcherFromTokens( match[i] );
				if ( cached[ expando ] ) {
					setMatchers.push( cached );
				} else {
					elementMatchers.push( cached );
				}
			}
	
			// Cache the compiled function
			cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	
			// Save selector and tokenization
			cached.selector = selector;
		}
		return cached;
	};
	
	/**
	 * A low-level selection function that works with Sizzle's compiled
	 *  selector functions
	 * @param {String|Function} selector A selector or a pre-compiled
	 *  selector function built with Sizzle.compile
	 * @param {Element} context
	 * @param {Array} [results]
	 * @param {Array} [seed] A set of elements to match against
	 */
	select = Sizzle.select = function( selector, context, results, seed ) {
		var i, tokens, token, type, find,
			compiled = typeof selector === "function" && selector,
			match = !seed && tokenize( (selector = compiled.selector || selector) );
	
		results = results || [];
	
		// Try to minimize operations if there is only one selector in the list and no seed
		// (the latter of which guarantees us context)
		if ( match.length === 1 ) {
	
			// Reduce context if the leading compound selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {
	
				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
	
				// Precompiled matchers will still verify ancestry, so step up a level
				} else if ( compiled ) {
					context = context.parentNode;
				}
	
				selector = selector.slice( tokens.shift().value.length );
			}
	
			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];
	
				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
					)) ) {
	
						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}
	
						break;
					}
				}
			}
		}
	
		// Compile and execute a filtering function if one is not provided
		// Provide `match` to avoid retokenization if we modified the selector above
		( compiled || compile( selector, match ) )(
			seed,
			context,
			!documentIsHTML,
			results,
			!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
		);
		return results;
	};
	
	// One-time assignments
	
	// Sort stability
	support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;
	
	// Support: Chrome 14-35+
	// Always assume duplicates if they aren't passed to the comparison function
	support.detectDuplicates = !!hasDuplicate;
	
	// Initialize against the default document
	setDocument();
	
	// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
	// Detached nodes confoundingly follow *each other*
	support.sortDetached = assert(function( el ) {
		// Should return 1, but returns 4 (following)
		return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
	});
	
	// Support: IE<8
	// Prevent attribute/property "interpolation"
	// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
	if ( !assert(function( el ) {
		el.innerHTML = "<a href='#'></a>";
		return el.firstChild.getAttribute("href") === "#" ;
	}) ) {
		addHandle( "type|href|height|width", function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
			}
		});
	}
	
	// Support: IE<9
	// Use defaultValue in place of getAttribute("value")
	if ( !support.attributes || !assert(function( el ) {
		el.innerHTML = "<input/>";
		el.firstChild.setAttribute( "value", "" );
		return el.firstChild.getAttribute( "value" ) === "";
	}) ) {
		addHandle( "value", function( elem, name, isXML ) {
			if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
				return elem.defaultValue;
			}
		});
	}
	
	// Support: IE<9
	// Use getAttributeNode to fetch booleans when getAttribute lies
	if ( !assert(function( el ) {
		return el.getAttribute("disabled") == null;
	}) ) {
		addHandle( booleans, function( elem, name, isXML ) {
			var val;
			if ( !isXML ) {
				return elem[ name ] === true ? name.toLowerCase() :
						(val = elem.getAttributeNode( name )) && val.specified ?
						val.value :
					null;
			}
		});
	}
	
	return Sizzle;
	
	})( window );
	
	
	
	jQuery.find = Sizzle;
	jQuery.expr = Sizzle.selectors;
	
	// Deprecated
	jQuery.expr[ ":" ] = jQuery.expr.pseudos;
	jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
	jQuery.text = Sizzle.getText;
	jQuery.isXMLDoc = Sizzle.isXML;
	jQuery.contains = Sizzle.contains;
	jQuery.escapeSelector = Sizzle.escape;
	
	
	
	
	var dir = function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;
	
		while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	};
	
	
	var siblings = function( n, elem ) {
		var matched = [];
	
		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}
	
		return matched;
	};
	
	
	var rneedsContext = jQuery.expr.match.needsContext;
	
	var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );
	
	
	
	var risSimple = /^.[^:#\[\.,]*$/;
	
	// Implement the identical functionality for filter and not
	function winnow( elements, qualifier, not ) {
		if ( jQuery.isFunction( qualifier ) ) {
			return jQuery.grep( elements, function( elem, i ) {
				return !!qualifier.call( elem, i, elem ) !== not;
			} );
		}
	
		// Single element
		if ( qualifier.nodeType ) {
			return jQuery.grep( elements, function( elem ) {
				return ( elem === qualifier ) !== not;
			} );
		}
	
		// Arraylike of elements (jQuery, arguments, Array)
		if ( typeof qualifier !== "string" ) {
			return jQuery.grep( elements, function( elem ) {
				return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
			} );
		}
	
		// Simple selector that can be filtered directly, removing non-Elements
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}
	
		// Complex selector, compare the two sets, removing non-Elements
		qualifier = jQuery.filter( qualifier, elements );
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
		} );
	}
	
	jQuery.filter = function( expr, elems, not ) {
		var elem = elems[ 0 ];
	
		if ( not ) {
			expr = ":not(" + expr + ")";
		}
	
		if ( elems.length === 1 && elem.nodeType === 1 ) {
			return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
		}
	
		return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
	};
	
	jQuery.fn.extend( {
		find: function( selector ) {
			var i, ret,
				len = this.length,
				self = this;
	
			if ( typeof selector !== "string" ) {
				return this.pushStack( jQuery( selector ).filter( function() {
					for ( i = 0; i < len; i++ ) {
						if ( jQuery.contains( self[ i ], this ) ) {
							return true;
						}
					}
				} ) );
			}
	
			ret = this.pushStack( [] );
	
			for ( i = 0; i < len; i++ ) {
				jQuery.find( selector, self[ i ], ret );
			}
	
			return len > 1 ? jQuery.uniqueSort( ret ) : ret;
		},
		filter: function( selector ) {
			return this.pushStack( winnow( this, selector || [], false ) );
		},
		not: function( selector ) {
			return this.pushStack( winnow( this, selector || [], true ) );
		},
		is: function( selector ) {
			return !!winnow(
				this,
	
				// If this is a positional/relative selector, check membership in the returned set
				// so $("p:first").is("p:last") won't return true for a doc with two "p".
				typeof selector === "string" && rneedsContext.test( selector ) ?
					jQuery( selector ) :
					selector || [],
				false
			).length;
		}
	} );
	
	
	// Initialize a jQuery object
	
	
	// A central reference to the root jQuery(document)
	var rootjQuery,
	
		// A simple way to check for HTML strings
		// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
		// Strict HTML recognition (#11290: must start with <)
		// Shortcut simple #id case for speed
		rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
	
		init = jQuery.fn.init = function( selector, context, root ) {
			var match, elem;
	
			// HANDLE: $(""), $(null), $(undefined), $(false)
			if ( !selector ) {
				return this;
			}
	
			// Method init() accepts an alternate rootjQuery
			// so migrate can support jQuery.sub (gh-2101)
			root = root || rootjQuery;
	
			// Handle HTML strings
			if ( typeof selector === "string" ) {
				if ( selector[ 0 ] === "<" &&
					selector[ selector.length - 1 ] === ">" &&
					selector.length >= 3 ) {
	
					// Assume that strings that start and end with <> are HTML and skip the regex check
					match = [ null, selector, null ];
	
				} else {
					match = rquickExpr.exec( selector );
				}
	
				// Match html or make sure no context is specified for #id
				if ( match && ( match[ 1 ] || !context ) ) {
	
					// HANDLE: $(html) -> $(array)
					if ( match[ 1 ] ) {
						context = context instanceof jQuery ? context[ 0 ] : context;
	
						// Option to run scripts is true for back-compat
						// Intentionally let the error be thrown if parseHTML is not present
						jQuery.merge( this, jQuery.parseHTML(
							match[ 1 ],
							context && context.nodeType ? context.ownerDocument || context : document,
							true
						) );
	
						// HANDLE: $(html, props)
						if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
							for ( match in context ) {
	
								// Properties of context are called as methods if possible
								if ( jQuery.isFunction( this[ match ] ) ) {
									this[ match ]( context[ match ] );
	
								// ...and otherwise set as attributes
								} else {
									this.attr( match, context[ match ] );
								}
							}
						}
	
						return this;
	
					// HANDLE: $(#id)
					} else {
						elem = document.getElementById( match[ 2 ] );
	
						if ( elem ) {
	
							// Inject the element directly into the jQuery object
							this[ 0 ] = elem;
							this.length = 1;
						}
						return this;
					}
	
				// HANDLE: $(expr, $(...))
				} else if ( !context || context.jquery ) {
					return ( context || root ).find( selector );
	
				// HANDLE: $(expr, context)
				// (which is just equivalent to: $(context).find(expr)
				} else {
					return this.constructor( context ).find( selector );
				}
	
			// HANDLE: $(DOMElement)
			} else if ( selector.nodeType ) {
				this[ 0 ] = selector;
				this.length = 1;
				return this;
	
			// HANDLE: $(function)
			// Shortcut for document ready
			} else if ( jQuery.isFunction( selector ) ) {
				return root.ready !== undefined ?
					root.ready( selector ) :
	
					// Execute immediately if ready is not present
					selector( jQuery );
			}
	
			return jQuery.makeArray( selector, this );
		};
	
	// Give the init function the jQuery prototype for later instantiation
	init.prototype = jQuery.fn;
	
	// Initialize central reference
	rootjQuery = jQuery( document );
	
	
	var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	
		// Methods guaranteed to produce a unique set when starting from a unique set
		guaranteedUnique = {
			children: true,
			contents: true,
			next: true,
			prev: true
		};
	
	jQuery.fn.extend( {
		has: function( target ) {
			var targets = jQuery( target, this ),
				l = targets.length;
	
			return this.filter( function() {
				var i = 0;
				for ( ; i < l; i++ ) {
					if ( jQuery.contains( this, targets[ i ] ) ) {
						return true;
					}
				}
			} );
		},
	
		closest: function( selectors, context ) {
			var cur,
				i = 0,
				l = this.length,
				matched = [],
				targets = typeof selectors !== "string" && jQuery( selectors );
	
			// Positional selectors never match, since there's no _selection_ context
			if ( !rneedsContext.test( selectors ) ) {
				for ( ; i < l; i++ ) {
					for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {
	
						// Always skip document fragments
						if ( cur.nodeType < 11 && ( targets ?
							targets.index( cur ) > -1 :
	
							// Don't pass non-elements to Sizzle
							cur.nodeType === 1 &&
								jQuery.find.matchesSelector( cur, selectors ) ) ) {
	
							matched.push( cur );
							break;
						}
					}
				}
			}
	
			return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
		},
	
		// Determine the position of an element within the set
		index: function( elem ) {
	
			// No argument, return index in parent
			if ( !elem ) {
				return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
			}
	
			// Index in selector
			if ( typeof elem === "string" ) {
				return indexOf.call( jQuery( elem ), this[ 0 ] );
			}
	
			// Locate the position of the desired element
			return indexOf.call( this,
	
				// If it receives a jQuery object, the first element is used
				elem.jquery ? elem[ 0 ] : elem
			);
		},
	
		add: function( selector, context ) {
			return this.pushStack(
				jQuery.uniqueSort(
					jQuery.merge( this.get(), jQuery( selector, context ) )
				)
			);
		},
	
		addBack: function( selector ) {
			return this.add( selector == null ?
				this.prevObject : this.prevObject.filter( selector )
			);
		}
	} );
	
	function sibling( cur, dir ) {
		while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
		return cur;
	}
	
	jQuery.each( {
		parent: function( elem ) {
			var parent = elem.parentNode;
			return parent && parent.nodeType !== 11 ? parent : null;
		},
		parents: function( elem ) {
			return dir( elem, "parentNode" );
		},
		parentsUntil: function( elem, i, until ) {
			return dir( elem, "parentNode", until );
		},
		next: function( elem ) {
			return sibling( elem, "nextSibling" );
		},
		prev: function( elem ) {
			return sibling( elem, "previousSibling" );
		},
		nextAll: function( elem ) {
			return dir( elem, "nextSibling" );
		},
		prevAll: function( elem ) {
			return dir( elem, "previousSibling" );
		},
		nextUntil: function( elem, i, until ) {
			return dir( elem, "nextSibling", until );
		},
		prevUntil: function( elem, i, until ) {
			return dir( elem, "previousSibling", until );
		},
		siblings: function( elem ) {
			return siblings( ( elem.parentNode || {} ).firstChild, elem );
		},
		children: function( elem ) {
			return siblings( elem.firstChild );
		},
		contents: function( elem ) {
			return elem.contentDocument || jQuery.merge( [], elem.childNodes );
		}
	}, function( name, fn ) {
		jQuery.fn[ name ] = function( until, selector ) {
			var matched = jQuery.map( this, fn, until );
	
			if ( name.slice( -5 ) !== "Until" ) {
				selector = until;
			}
	
			if ( selector && typeof selector === "string" ) {
				matched = jQuery.filter( selector, matched );
			}
	
			if ( this.length > 1 ) {
	
				// Remove duplicates
				if ( !guaranteedUnique[ name ] ) {
					jQuery.uniqueSort( matched );
				}
	
				// Reverse order for parents* and prev-derivatives
				if ( rparentsprev.test( name ) ) {
					matched.reverse();
				}
			}
	
			return this.pushStack( matched );
		};
	} );
	var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );
	
	
	
	// Convert String-formatted options into Object-formatted ones
	function createOptions( options ) {
		var object = {};
		jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
			object[ flag ] = true;
		} );
		return object;
	}
	
	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	jQuery.Callbacks = function( options ) {
	
		// Convert options from String-formatted to Object-formatted if needed
		// (we check in cache first)
		options = typeof options === "string" ?
			createOptions( options ) :
			jQuery.extend( {}, options );
	
		var // Flag to know if list is currently firing
			firing,
	
			// Last fire value for non-forgettable lists
			memory,
	
			// Flag to know if list was already fired
			fired,
	
			// Flag to prevent firing
			locked,
	
			// Actual callback list
			list = [],
	
			// Queue of execution data for repeatable lists
			queue = [],
	
			// Index of currently firing callback (modified by add/remove as needed)
			firingIndex = -1,
	
			// Fire callbacks
			fire = function() {
	
				// Enforce single-firing
				locked = options.once;
	
				// Execute callbacks for all pending executions,
				// respecting firingIndex overrides and runtime changes
				fired = firing = true;
				for ( ; queue.length; firingIndex = -1 ) {
					memory = queue.shift();
					while ( ++firingIndex < list.length ) {
	
						// Run callback and check for early termination
						if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
							options.stopOnFalse ) {
	
							// Jump to end and forget the data so .add doesn't re-fire
							firingIndex = list.length;
							memory = false;
						}
					}
				}
	
				// Forget the data if we're done with it
				if ( !options.memory ) {
					memory = false;
				}
	
				firing = false;
	
				// Clean up if we're done firing for good
				if ( locked ) {
	
					// Keep an empty list if we have data for future add calls
					if ( memory ) {
						list = [];
	
					// Otherwise, this object is spent
					} else {
						list = "";
					}
				}
			},
	
			// Actual Callbacks object
			self = {
	
				// Add a callback or a collection of callbacks to the list
				add: function() {
					if ( list ) {
	
						// If we have memory from a past run, we should fire after adding
						if ( memory && !firing ) {
							firingIndex = list.length - 1;
							queue.push( memory );
						}
	
						( function add( args ) {
							jQuery.each( args, function( _, arg ) {
								if ( jQuery.isFunction( arg ) ) {
									if ( !options.unique || !self.has( arg ) ) {
										list.push( arg );
									}
								} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {
	
									// Inspect recursively
									add( arg );
								}
							} );
						} )( arguments );
	
						if ( memory && !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Remove a callback from the list
				remove: function() {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
	
							// Handle firing indexes
							if ( index <= firingIndex ) {
								firingIndex--;
							}
						}
					} );
					return this;
				},
	
				// Check if a given callback is in the list.
				// If no argument is given, return whether or not list has callbacks attached.
				has: function( fn ) {
					return fn ?
						jQuery.inArray( fn, list ) > -1 :
						list.length > 0;
				},
	
				// Remove all callbacks from the list
				empty: function() {
					if ( list ) {
						list = [];
					}
					return this;
				},
	
				// Disable .fire and .add
				// Abort any current/pending executions
				// Clear all callbacks and values
				disable: function() {
					locked = queue = [];
					list = memory = "";
					return this;
				},
				disabled: function() {
					return !list;
				},
	
				// Disable .fire
				// Also disable .add unless we have memory (since it would have no effect)
				// Abort any pending executions
				lock: function() {
					locked = queue = [];
					if ( !memory && !firing ) {
						list = memory = "";
					}
					return this;
				},
				locked: function() {
					return !!locked;
				},
	
				// Call all callbacks with the given context and arguments
				fireWith: function( context, args ) {
					if ( !locked ) {
						args = args || [];
						args = [ context, args.slice ? args.slice() : args ];
						queue.push( args );
						if ( !firing ) {
							fire();
						}
					}
					return this;
				},
	
				// Call all the callbacks with the given arguments
				fire: function() {
					self.fireWith( this, arguments );
					return this;
				},
	
				// To know if the callbacks have already been called at least once
				fired: function() {
					return !!fired;
				}
			};
	
		return self;
	};
	
	
	function Identity( v ) {
		return v;
	}
	function Thrower( ex ) {
		throw ex;
	}
	
	function adoptValue( value, resolve, reject ) {
		var method;
	
		try {
	
			// Check for promise aspect first to privilege synchronous behavior
			if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
				method.call( value ).done( resolve ).fail( reject );
	
			// Other thenables
			} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
				method.call( value, resolve, reject );
	
			// Other non-thenables
			} else {
	
				// Support: Android 4.0 only
				// Strict mode functions invoked without .call/.apply get global-object context
				resolve.call( undefined, value );
			}
	
		// For Promises/A+, convert exceptions into rejections
		// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
		// Deferred#then to conditionally suppress rejection.
		} catch ( value ) {
	
			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			reject.call( undefined, value );
		}
	}
	
	jQuery.extend( {
	
		Deferred: function( func ) {
			var tuples = [
	
					// action, add listener, callbacks,
					// ... .then handlers, argument index, [final state]
					[ "notify", "progress", jQuery.Callbacks( "memory" ),
						jQuery.Callbacks( "memory" ), 2 ],
					[ "resolve", "done", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 0, "resolved" ],
					[ "reject", "fail", jQuery.Callbacks( "once memory" ),
						jQuery.Callbacks( "once memory" ), 1, "rejected" ]
				],
				state = "pending",
				promise = {
					state: function() {
						return state;
					},
					always: function() {
						deferred.done( arguments ).fail( arguments );
						return this;
					},
					"catch": function( fn ) {
						return promise.then( null, fn );
					},
	
					// Keep pipe for back-compat
					pipe: function( /* fnDone, fnFail, fnProgress */ ) {
						var fns = arguments;
	
						return jQuery.Deferred( function( newDefer ) {
							jQuery.each( tuples, function( i, tuple ) {
	
								// Map tuples (progress, done, fail) to arguments (done, fail, progress)
								var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];
	
								// deferred.progress(function() { bind to newDefer or newDefer.notify })
								// deferred.done(function() { bind to newDefer or newDefer.resolve })
								// deferred.fail(function() { bind to newDefer or newDefer.reject })
								deferred[ tuple[ 1 ] ]( function() {
									var returned = fn && fn.apply( this, arguments );
									if ( returned && jQuery.isFunction( returned.promise ) ) {
										returned.promise()
											.progress( newDefer.notify )
											.done( newDefer.resolve )
											.fail( newDefer.reject );
									} else {
										newDefer[ tuple[ 0 ] + "With" ](
											this,
											fn ? [ returned ] : arguments
										);
									}
								} );
							} );
							fns = null;
						} ).promise();
					},
					then: function( onFulfilled, onRejected, onProgress ) {
						var maxDepth = 0;
						function resolve( depth, deferred, handler, special ) {
							return function() {
								var that = this,
									args = arguments,
									mightThrow = function() {
										var returned, then;
	
										// Support: Promises/A+ section 2.3.3.3.3
										// https://promisesaplus.com/#point-59
										// Ignore double-resolution attempts
										if ( depth < maxDepth ) {
											return;
										}
	
										returned = handler.apply( that, args );
	
										// Support: Promises/A+ section 2.3.1
										// https://promisesaplus.com/#point-48
										if ( returned === deferred.promise() ) {
											throw new TypeError( "Thenable self-resolution" );
										}
	
										// Support: Promises/A+ sections 2.3.3.1, 3.5
										// https://promisesaplus.com/#point-54
										// https://promisesaplus.com/#point-75
										// Retrieve `then` only once
										then = returned &&
	
											// Support: Promises/A+ section 2.3.4
											// https://promisesaplus.com/#point-64
											// Only check objects and functions for thenability
											( typeof returned === "object" ||
												typeof returned === "function" ) &&
											returned.then;
	
										// Handle a returned thenable
										if ( jQuery.isFunction( then ) ) {
	
											// Special processors (notify) just wait for resolution
											if ( special ) {
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special )
												);
	
											// Normal processors (resolve) also hook into progress
											} else {
	
												// ...and disregard older resolution values
												maxDepth++;
	
												then.call(
													returned,
													resolve( maxDepth, deferred, Identity, special ),
													resolve( maxDepth, deferred, Thrower, special ),
													resolve( maxDepth, deferred, Identity,
														deferred.notifyWith )
												);
											}
	
										// Handle all other returned values
										} else {
	
											// Only substitute handlers pass on context
											// and multiple values (non-spec behavior)
											if ( handler !== Identity ) {
												that = undefined;
												args = [ returned ];
											}
	
											// Process the value(s)
											// Default process is resolve
											( special || deferred.resolveWith )( that, args );
										}
									},
	
									// Only normal processors (resolve) catch and reject exceptions
									process = special ?
										mightThrow :
										function() {
											try {
												mightThrow();
											} catch ( e ) {
	
												if ( jQuery.Deferred.exceptionHook ) {
													jQuery.Deferred.exceptionHook( e,
														process.stackTrace );
												}
	
												// Support: Promises/A+ section 2.3.3.3.4.1
												// https://promisesaplus.com/#point-61
												// Ignore post-resolution exceptions
												if ( depth + 1 >= maxDepth ) {
	
													// Only substitute handlers pass on context
													// and multiple values (non-spec behavior)
													if ( handler !== Thrower ) {
														that = undefined;
														args = [ e ];
													}
	
													deferred.rejectWith( that, args );
												}
											}
										};
	
								// Support: Promises/A+ section 2.3.3.3.1
								// https://promisesaplus.com/#point-57
								// Re-resolve promises immediately to dodge false rejection from
								// subsequent errors
								if ( depth ) {
									process();
								} else {
	
									// Call an optional hook to record the stack, in case of exception
									// since it's otherwise lost when execution goes async
									if ( jQuery.Deferred.getStackHook ) {
										process.stackTrace = jQuery.Deferred.getStackHook();
									}
									window.setTimeout( process );
								}
							};
						}
	
						return jQuery.Deferred( function( newDefer ) {
	
							// progress_handlers.add( ... )
							tuples[ 0 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onProgress ) ?
										onProgress :
										Identity,
									newDefer.notifyWith
								)
							);
	
							// fulfilled_handlers.add( ... )
							tuples[ 1 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onFulfilled ) ?
										onFulfilled :
										Identity
								)
							);
	
							// rejected_handlers.add( ... )
							tuples[ 2 ][ 3 ].add(
								resolve(
									0,
									newDefer,
									jQuery.isFunction( onRejected ) ?
										onRejected :
										Thrower
								)
							);
						} ).promise();
					},
	
					// Get a promise for this deferred
					// If obj is provided, the promise aspect is added to the object
					promise: function( obj ) {
						return obj != null ? jQuery.extend( obj, promise ) : promise;
					}
				},
				deferred = {};
	
			// Add list-specific methods
			jQuery.each( tuples, function( i, tuple ) {
				var list = tuple[ 2 ],
					stateString = tuple[ 5 ];
	
				// promise.progress = list.add
				// promise.done = list.add
				// promise.fail = list.add
				promise[ tuple[ 1 ] ] = list.add;
	
				// Handle state
				if ( stateString ) {
					list.add(
						function() {
	
							// state = "resolved" (i.e., fulfilled)
							// state = "rejected"
							state = stateString;
						},
	
						// rejected_callbacks.disable
						// fulfilled_callbacks.disable
						tuples[ 3 - i ][ 2 ].disable,
	
						// progress_callbacks.lock
						tuples[ 0 ][ 2 ].lock
					);
				}
	
				// progress_handlers.fire
				// fulfilled_handlers.fire
				// rejected_handlers.fire
				list.add( tuple[ 3 ].fire );
	
				// deferred.notify = function() { deferred.notifyWith(...) }
				// deferred.resolve = function() { deferred.resolveWith(...) }
				// deferred.reject = function() { deferred.rejectWith(...) }
				deferred[ tuple[ 0 ] ] = function() {
					deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
					return this;
				};
	
				// deferred.notifyWith = list.fireWith
				// deferred.resolveWith = list.fireWith
				// deferred.rejectWith = list.fireWith
				deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
			} );
	
			// Make the deferred a promise
			promise.promise( deferred );
	
			// Call given func if any
			if ( func ) {
				func.call( deferred, deferred );
			}
	
			// All done!
			return deferred;
		},
	
		// Deferred helper
		when: function( singleValue ) {
			var
	
				// count of uncompleted subordinates
				remaining = arguments.length,
	
				// count of unprocessed arguments
				i = remaining,
	
				// subordinate fulfillment data
				resolveContexts = Array( i ),
				resolveValues = slice.call( arguments ),
	
				// the master Deferred
				master = jQuery.Deferred(),
	
				// subordinate callback factory
				updateFunc = function( i ) {
					return function( value ) {
						resolveContexts[ i ] = this;
						resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
						if ( !( --remaining ) ) {
							master.resolveWith( resolveContexts, resolveValues );
						}
					};
				};
	
			// Single- and empty arguments are adopted like Promise.resolve
			if ( remaining <= 1 ) {
				adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );
	
				// Use .then() to unwrap secondary thenables (cf. gh-3000)
				if ( master.state() === "pending" ||
					jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {
	
					return master.then();
				}
			}
	
			// Multiple arguments are aggregated like Promise.all array elements
			while ( i-- ) {
				adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
			}
	
			return master.promise();
		}
	} );
	
	
	// These usually indicate a programmer mistake during development,
	// warn about them ASAP rather than swallowing them by default.
	var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
	
	jQuery.Deferred.exceptionHook = function( error, stack ) {
	
		// Support: IE 8 - 9 only
		// Console exists when dev tools are open, which can happen at any time
		if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
			window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
		}
	};
	
	
	
	
	jQuery.readyException = function( error ) {
		window.setTimeout( function() {
			throw error;
		} );
	};
	
	
	
	
	// The deferred used on DOM ready
	var readyList = jQuery.Deferred();
	
	jQuery.fn.ready = function( fn ) {
	
		readyList
			.then( fn )
	
			// Wrap jQuery.readyException in a function so that the lookup
			// happens at the time of error handling instead of callback
			// registration.
			.catch( function( error ) {
				jQuery.readyException( error );
			} );
	
		return this;
	};
	
	jQuery.extend( {
	
		// Is the DOM ready to be used? Set to true once it occurs.
		isReady: false,
	
		// A counter to track how many items to wait for before
		// the ready event fires. See #6781
		readyWait: 1,
	
		// Hold (or release) the ready event
		holdReady: function( hold ) {
			if ( hold ) {
				jQuery.readyWait++;
			} else {
				jQuery.ready( true );
			}
		},
	
		// Handle when the DOM is ready
		ready: function( wait ) {
	
			// Abort if there are pending holds or we're already ready
			if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
				return;
			}
	
			// Remember that the DOM is ready
			jQuery.isReady = true;
	
			// If a normal DOM Ready event fired, decrement, and wait if need be
			if ( wait !== true && --jQuery.readyWait > 0 ) {
				return;
			}
	
			// If there are functions bound, to execute
			readyList.resolveWith( document, [ jQuery ] );
		}
	} );
	
	jQuery.ready.then = readyList.then;
	
	// The ready event handler and self cleanup method
	function completed() {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );
		jQuery.ready();
	}
	
	// Catch cases where $(document).ready() is called
	// after the browser event has already occurred.
	// Support: IE <=9 - 10 only
	// Older IE sometimes signals "interactive" too soon
	if ( document.readyState === "complete" ||
		( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {
	
		// Handle it asynchronously to allow scripts the opportunity to delay ready
		window.setTimeout( jQuery.ready );
	
	} else {
	
		// Use the handy event callback
		document.addEventListener( "DOMContentLoaded", completed );
	
		// A fallback to window.onload, that will always work
		window.addEventListener( "load", completed );
	}
	
	
	
	
	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			len = elems.length,
			bulk = key == null;
	
		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				access( elems, fn, i, key[ i ], true, emptyGet, raw );
			}
	
		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;
	
			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}
	
			if ( bulk ) {
	
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;
	
				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}
	
			if ( fn ) {
				for ( ; i < len; i++ ) {
					fn(
						elems[ i ], key, raw ?
						value :
						value.call( elems[ i ], i, fn( elems[ i ], key ) )
					);
				}
			}
		}
	
		if ( chainable ) {
			return elems;
		}
	
		// Gets
		if ( bulk ) {
			return fn.call( elems );
		}
	
		return len ? fn( elems[ 0 ], key ) : emptyGet;
	};
	var acceptData = function( owner ) {
	
		// Accepts only:
		//  - Node
		//    - Node.ELEMENT_NODE
		//    - Node.DOCUMENT_NODE
		//  - Object
		//    - Any
		return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
	};
	
	
	
	
	function Data() {
		this.expando = jQuery.expando + Data.uid++;
	}
	
	Data.uid = 1;
	
	Data.prototype = {
	
		cache: function( owner ) {
	
			// Check if the owner object already has a cache
			var value = owner[ this.expando ];
	
			// If not, create one
			if ( !value ) {
				value = {};
	
				// We can accept data for non-element nodes in modern browsers,
				// but we should not, see #8335.
				// Always return an empty object.
				if ( acceptData( owner ) ) {
	
					// If it is a node unlikely to be stringify-ed or looped over
					// use plain assignment
					if ( owner.nodeType ) {
						owner[ this.expando ] = value;
	
					// Otherwise secure it in a non-enumerable property
					// configurable must be true to allow the property to be
					// deleted when data is removed
					} else {
						Object.defineProperty( owner, this.expando, {
							value: value,
							configurable: true
						} );
					}
				}
			}
	
			return value;
		},
		set: function( owner, data, value ) {
			var prop,
				cache = this.cache( owner );
	
			// Handle: [ owner, key, value ] args
			// Always use camelCase key (gh-2257)
			if ( typeof data === "string" ) {
				cache[ jQuery.camelCase( data ) ] = value;
	
			// Handle: [ owner, { properties } ] args
			} else {
	
				// Copy the properties one-by-one to the cache object
				for ( prop in data ) {
					cache[ jQuery.camelCase( prop ) ] = data[ prop ];
				}
			}
			return cache;
		},
		get: function( owner, key ) {
			return key === undefined ?
				this.cache( owner ) :
	
				// Always use camelCase key (gh-2257)
				owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
		},
		access: function( owner, key, value ) {
	
			// In cases where either:
			//
			//   1. No key was specified
			//   2. A string key was specified, but no value provided
			//
			// Take the "read" path and allow the get method to determine
			// which value to return, respectively either:
			//
			//   1. The entire cache object
			//   2. The data stored at the key
			//
			if ( key === undefined ||
					( ( key && typeof key === "string" ) && value === undefined ) ) {
	
				return this.get( owner, key );
			}
	
			// When the key is not a string, or both a key and value
			// are specified, set or extend (existing objects) with either:
			//
			//   1. An object of properties
			//   2. A key and value
			//
			this.set( owner, key, value );
	
			// Since the "set" path can have two possible entry points
			// return the expected data based on which path was taken[*]
			return value !== undefined ? value : key;
		},
		remove: function( owner, key ) {
			var i,
				cache = owner[ this.expando ];
	
			if ( cache === undefined ) {
				return;
			}
	
			if ( key !== undefined ) {
	
				// Support array or space separated string of keys
				if ( jQuery.isArray( key ) ) {
	
					// If key is an array of keys...
					// We always set camelCase keys, so remove that.
					key = key.map( jQuery.camelCase );
				} else {
					key = jQuery.camelCase( key );
	
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					key = key in cache ?
						[ key ] :
						( key.match( rnothtmlwhite ) || [] );
				}
	
				i = key.length;
	
				while ( i-- ) {
					delete cache[ key[ i ] ];
				}
			}
	
			// Remove the expando if there's no more data
			if ( key === undefined || jQuery.isEmptyObject( cache ) ) {
	
				// Support: Chrome <=35 - 45
				// Webkit & Blink performance suffers when deleting properties
				// from DOM nodes, so set to undefined instead
				// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
				if ( owner.nodeType ) {
					owner[ this.expando ] = undefined;
				} else {
					delete owner[ this.expando ];
				}
			}
		},
		hasData: function( owner ) {
			var cache = owner[ this.expando ];
			return cache !== undefined && !jQuery.isEmptyObject( cache );
		}
	};
	var dataPriv = new Data();
	
	var dataUser = new Data();
	
	
	
	//	Implementation Summary
	//
	//	1. Enforce API surface and semantic compatibility with 1.9.x branch
	//	2. Improve the module's maintainability by reducing the storage
	//		paths to a single mechanism.
	//	3. Use the same single mechanism to support "private" and "user" data.
	//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
	//	5. Avoid exposing implementation details on user objects (eg. expando properties)
	//	6. Provide a clear path for implementation upgrade to WeakMap in 2014
	
	var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
		rmultiDash = /[A-Z]/g;
	
	function getData( data ) {
		if ( data === "true" ) {
			return true;
		}
	
		if ( data === "false" ) {
			return false;
		}
	
		if ( data === "null" ) {
			return null;
		}
	
		// Only convert to a number if it doesn't change the string
		if ( data === +data + "" ) {
			return +data;
		}
	
		if ( rbrace.test( data ) ) {
			return JSON.parse( data );
		}
	
		return data;
	}
	
	function dataAttr( elem, key, data ) {
		var name;
	
		// If nothing was found internally, try to fetch any
		// data from the HTML5 data-* attribute
		if ( data === undefined && elem.nodeType === 1 ) {
			name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
			data = elem.getAttribute( name );
	
			if ( typeof data === "string" ) {
				try {
					data = getData( data );
				} catch ( e ) {}
	
				// Make sure we set the data so it isn't changed later
				dataUser.set( elem, key, data );
			} else {
				data = undefined;
			}
		}
		return data;
	}
	
	jQuery.extend( {
		hasData: function( elem ) {
			return dataUser.hasData( elem ) || dataPriv.hasData( elem );
		},
	
		data: function( elem, name, data ) {
			return dataUser.access( elem, name, data );
		},
	
		removeData: function( elem, name ) {
			dataUser.remove( elem, name );
		},
	
		// TODO: Now that all calls to _data and _removeData have been replaced
		// with direct calls to dataPriv methods, these can be deprecated.
		_data: function( elem, name, data ) {
			return dataPriv.access( elem, name, data );
		},
	
		_removeData: function( elem, name ) {
			dataPriv.remove( elem, name );
		}
	} );
	
	jQuery.fn.extend( {
		data: function( key, value ) {
			var i, name, data,
				elem = this[ 0 ],
				attrs = elem && elem.attributes;
	
			// Gets all values
			if ( key === undefined ) {
				if ( this.length ) {
					data = dataUser.get( elem );
	
					if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
						i = attrs.length;
						while ( i-- ) {
	
							// Support: IE 11 only
							// The attrs elements can be null (#14894)
							if ( attrs[ i ] ) {
								name = attrs[ i ].name;
								if ( name.indexOf( "data-" ) === 0 ) {
									name = jQuery.camelCase( name.slice( 5 ) );
									dataAttr( elem, name, data[ name ] );
								}
							}
						}
						dataPriv.set( elem, "hasDataAttrs", true );
					}
				}
	
				return data;
			}
	
			// Sets multiple values
			if ( typeof key === "object" ) {
				return this.each( function() {
					dataUser.set( this, key );
				} );
			}
	
			return access( this, function( value ) {
				var data;
	
				// The calling jQuery object (element matches) is not empty
				// (and therefore has an element appears at this[ 0 ]) and the
				// `value` parameter was not undefined. An empty jQuery object
				// will result in `undefined` for elem = this[ 0 ] which will
				// throw an exception if an attempt to read a data cache is made.
				if ( elem && value === undefined ) {
	
					// Attempt to get data from the cache
					// The key will always be camelCased in Data
					data = dataUser.get( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// Attempt to "discover" the data in
					// HTML5 custom data-* attrs
					data = dataAttr( elem, key );
					if ( data !== undefined ) {
						return data;
					}
	
					// We tried really hard, but the data doesn't exist.
					return;
				}
	
				// Set the data...
				this.each( function() {
	
					// We always store the camelCased key
					dataUser.set( this, key, value );
				} );
			}, null, value, arguments.length > 1, null, true );
		},
	
		removeData: function( key ) {
			return this.each( function() {
				dataUser.remove( this, key );
			} );
		}
	} );
	
	
	jQuery.extend( {
		queue: function( elem, type, data ) {
			var queue;
	
			if ( elem ) {
				type = ( type || "fx" ) + "queue";
				queue = dataPriv.get( elem, type );
	
				// Speed up dequeue by getting out quickly if this is just a lookup
				if ( data ) {
					if ( !queue || jQuery.isArray( data ) ) {
						queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
					} else {
						queue.push( data );
					}
				}
				return queue || [];
			}
		},
	
		dequeue: function( elem, type ) {
			type = type || "fx";
	
			var queue = jQuery.queue( elem, type ),
				startLength = queue.length,
				fn = queue.shift(),
				hooks = jQuery._queueHooks( elem, type ),
				next = function() {
					jQuery.dequeue( elem, type );
				};
	
			// If the fx queue is dequeued, always remove the progress sentinel
			if ( fn === "inprogress" ) {
				fn = queue.shift();
				startLength--;
			}
	
			if ( fn ) {
	
				// Add a progress sentinel to prevent the fx queue from being
				// automatically dequeued
				if ( type === "fx" ) {
					queue.unshift( "inprogress" );
				}
	
				// Clear up the last queue stop function
				delete hooks.stop;
				fn.call( elem, next, hooks );
			}
	
			if ( !startLength && hooks ) {
				hooks.empty.fire();
			}
		},
	
		// Not public - generate a queueHooks object, or return the current one
		_queueHooks: function( elem, type ) {
			var key = type + "queueHooks";
			return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
				empty: jQuery.Callbacks( "once memory" ).add( function() {
					dataPriv.remove( elem, [ type + "queue", key ] );
				} )
			} );
		}
	} );
	
	jQuery.fn.extend( {
		queue: function( type, data ) {
			var setter = 2;
	
			if ( typeof type !== "string" ) {
				data = type;
				type = "fx";
				setter--;
			}
	
			if ( arguments.length < setter ) {
				return jQuery.queue( this[ 0 ], type );
			}
	
			return data === undefined ?
				this :
				this.each( function() {
					var queue = jQuery.queue( this, type, data );
	
					// Ensure a hooks for this queue
					jQuery._queueHooks( this, type );
	
					if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
						jQuery.dequeue( this, type );
					}
				} );
		},
		dequeue: function( type ) {
			return this.each( function() {
				jQuery.dequeue( this, type );
			} );
		},
		clearQueue: function( type ) {
			return this.queue( type || "fx", [] );
		},
	
		// Get a promise resolved when queues of a certain type
		// are emptied (fx is the type by default)
		promise: function( type, obj ) {
			var tmp,
				count = 1,
				defer = jQuery.Deferred(),
				elements = this,
				i = this.length,
				resolve = function() {
					if ( !( --count ) ) {
						defer.resolveWith( elements, [ elements ] );
					}
				};
	
			if ( typeof type !== "string" ) {
				obj = type;
				type = undefined;
			}
			type = type || "fx";
	
			while ( i-- ) {
				tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
				if ( tmp && tmp.empty ) {
					count++;
					tmp.empty.add( resolve );
				}
			}
			resolve();
			return defer.promise( obj );
		}
	} );
	var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;
	
	var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );
	
	
	var cssExpand = [ "Top", "Right", "Bottom", "Left" ];
	
	var isHiddenWithinTree = function( elem, el ) {
	
			// isHiddenWithinTree might be called from jQuery#filter function;
			// in that case, element will be second argument
			elem = el || elem;
	
			// Inline style trumps all
			return elem.style.display === "none" ||
				elem.style.display === "" &&
	
				// Otherwise, check computed style
				// Support: Firefox <=43 - 45
				// Disconnected elements can have computed display: none, so first confirm that elem is
				// in the document.
				jQuery.contains( elem.ownerDocument, elem ) &&
	
				jQuery.css( elem, "display" ) === "none";
		};
	
	var swap = function( elem, options, callback, args ) {
		var ret, name,
			old = {};
	
		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}
	
		ret = callback.apply( elem, args || [] );
	
		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}
	
		return ret;
	};
	
	
	
	
	function adjustCSS( elem, prop, valueParts, tween ) {
		var adjusted,
			scale = 1,
			maxIterations = 20,
			currentValue = tween ?
				function() {
					return tween.cur();
				} :
				function() {
					return jQuery.css( elem, prop, "" );
				},
			initial = currentValue(),
			unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),
	
			// Starting value computation is required for potential unit mismatches
			initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
				rcssNum.exec( jQuery.css( elem, prop ) );
	
		if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {
	
			// Trust units reported by jQuery.css
			unit = unit || initialInUnit[ 3 ];
	
			// Make sure we update the tween properties later on
			valueParts = valueParts || [];
	
			// Iteratively approximate from a nonzero starting point
			initialInUnit = +initial || 1;
	
			do {
	
				// If previous iteration zeroed out, double until we get *something*.
				// Use string for doubling so we don't accidentally see scale as unchanged below
				scale = scale || ".5";
	
				// Adjust and apply
				initialInUnit = initialInUnit / scale;
				jQuery.style( elem, prop, initialInUnit + unit );
	
			// Update scale, tolerating zero or NaN from tween.cur()
			// Break the loop if scale is unchanged or perfect, or if we've just had enough.
			} while (
				scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
			);
		}
	
		if ( valueParts ) {
			initialInUnit = +initialInUnit || +initial || 0;
	
			// Apply relative offset (+=/-=) if specified
			adjusted = valueParts[ 1 ] ?
				initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
				+valueParts[ 2 ];
			if ( tween ) {
				tween.unit = unit;
				tween.start = initialInUnit;
				tween.end = adjusted;
			}
		}
		return adjusted;
	}
	
	
	var defaultDisplayMap = {};
	
	function getDefaultDisplay( elem ) {
		var temp,
			doc = elem.ownerDocument,
			nodeName = elem.nodeName,
			display = defaultDisplayMap[ nodeName ];
	
		if ( display ) {
			return display;
		}
	
		temp = doc.body.appendChild( doc.createElement( nodeName ) );
		display = jQuery.css( temp, "display" );
	
		temp.parentNode.removeChild( temp );
	
		if ( display === "none" ) {
			display = "block";
		}
		defaultDisplayMap[ nodeName ] = display;
	
		return display;
	}
	
	function showHide( elements, show ) {
		var display, elem,
			values = [],
			index = 0,
			length = elements.length;
	
		// Determine new display value for elements that need to change
		for ( ; index < length; index++ ) {
			elem = elements[ index ];
			if ( !elem.style ) {
				continue;
			}
	
			display = elem.style.display;
			if ( show ) {
	
				// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
				// check is required in this first loop unless we have a nonempty display value (either
				// inline or about-to-be-restored)
				if ( display === "none" ) {
					values[ index ] = dataPriv.get( elem, "display" ) || null;
					if ( !values[ index ] ) {
						elem.style.display = "";
					}
				}
				if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
					values[ index ] = getDefaultDisplay( elem );
				}
			} else {
				if ( display !== "none" ) {
					values[ index ] = "none";
	
					// Remember what we're overwriting
					dataPriv.set( elem, "display", display );
				}
			}
		}
	
		// Set the display of the elements in a second loop to avoid constant reflow
		for ( index = 0; index < length; index++ ) {
			if ( values[ index ] != null ) {
				elements[ index ].style.display = values[ index ];
			}
		}
	
		return elements;
	}
	
	jQuery.fn.extend( {
		show: function() {
			return showHide( this, true );
		},
		hide: function() {
			return showHide( this );
		},
		toggle: function( state ) {
			if ( typeof state === "boolean" ) {
				return state ? this.show() : this.hide();
			}
	
			return this.each( function() {
				if ( isHiddenWithinTree( this ) ) {
					jQuery( this ).show();
				} else {
					jQuery( this ).hide();
				}
			} );
		}
	} );
	var rcheckableType = ( /^(?:checkbox|radio)$/i );
	
	var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );
	
	var rscriptType = ( /^$|\/(?:java|ecma)script/i );
	
	
	
	// We have to close these tags to support XHTML (#13200)
	var wrapMap = {
	
		// Support: IE <=9 only
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
	
		// XHTML parsers do not magically insert elements in the
		// same way that tag soup parsers do. So we cannot shorten
		// this by omitting <tbody> or other required elements.
		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
	
		_default: [ 0, "", "" ]
	};
	
	// Support: IE <=9 only
	wrapMap.optgroup = wrapMap.option;
	
	wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
	wrapMap.th = wrapMap.td;
	
	
	function getAll( context, tag ) {
	
		// Support: IE <=9 - 11 only
		// Use typeof to avoid zero-argument method invocation on host objects (#15151)
		var ret;
	
		if ( typeof context.getElementsByTagName !== "undefined" ) {
			ret = context.getElementsByTagName( tag || "*" );
	
		} else if ( typeof context.querySelectorAll !== "undefined" ) {
			ret = context.querySelectorAll( tag || "*" );
	
		} else {
			ret = [];
		}
	
		if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
			return jQuery.merge( [ context ], ret );
		}
	
		return ret;
	}
	
	
	// Mark scripts as having already been evaluated
	function setGlobalEval( elems, refElements ) {
		var i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			dataPriv.set(
				elems[ i ],
				"globalEval",
				!refElements || dataPriv.get( refElements[ i ], "globalEval" )
			);
		}
	}
	
	
	var rhtml = /<|&#?\w+;/;
	
	function buildFragment( elems, context, scripts, selection, ignored ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;
	
		for ( ; i < l; i++ ) {
			elem = elems[ i ];
	
			if ( elem || elem === 0 ) {
	
				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );
	
				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );
	
				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement( "div" ) );
	
					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];
	
					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}
	
					// Support: Android <=4.0 only, PhantomJS 1 only
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );
	
					// Remember the top-level container
					tmp = fragment.firstChild;
	
					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}
	
		// Remove wrapper from fragment
		fragment.textContent = "";
	
		i = 0;
		while ( ( elem = nodes[ i++ ] ) ) {
	
			// Skip elements already in the context collection (trac-4087)
			if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
				if ( ignored ) {
					ignored.push( elem );
				}
				continue;
			}
	
			contains = jQuery.contains( elem.ownerDocument, elem );
	
			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );
	
			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}
	
			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( ( elem = tmp[ j++ ] ) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}
	
		return fragment;
	}
	
	
	( function() {
		var fragment = document.createDocumentFragment(),
			div = fragment.appendChild( document.createElement( "div" ) ),
			input = document.createElement( "input" );
	
		// Support: Android 4.0 - 4.3 only
		// Check state lost if the name is set (#11217)
		// Support: Windows Web Apps (WWA)
		// `name` and `type` must use .setAttribute for WWA (#14901)
		input.setAttribute( "type", "radio" );
		input.setAttribute( "checked", "checked" );
		input.setAttribute( "name", "t" );
	
		div.appendChild( input );
	
		// Support: Android <=4.1 only
		// Older WebKit doesn't clone checked state correctly in fragments
		support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;
	
		// Support: IE <=11 only
		// Make sure textarea (and checkbox) defaultValue is properly cloned
		div.innerHTML = "<textarea>x</textarea>";
		support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
	} )();
	var documentElement = document.documentElement;
	
	
	
	var
		rkeyEvent = /^key/,
		rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
		rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
	
	function returnTrue() {
		return true;
	}
	
	function returnFalse() {
		return false;
	}
	
	// Support: IE <=9 only
	// See #13393 for more info
	function safeActiveElement() {
		try {
			return document.activeElement;
		} catch ( err ) { }
	}
	
	function on( elem, types, selector, data, fn, one ) {
		var origFn, type;
	
		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
	
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
	
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				on( elem, type, selector, data, types[ type ], one );
			}
			return elem;
		}
	
		if ( data == null && fn == null ) {
	
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
	
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
	
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return elem;
		}
	
		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
	
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
	
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return elem.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		} );
	}
	
	/*
	 * Helper functions for managing events -- not part of the public interface.
	 * Props to Dean Edwards' addEvent library for many of the ideas.
	 */
	jQuery.event = {
	
		global: {},
	
		add: function( elem, types, handler, data, selector ) {
	
			var handleObjIn, eventHandle, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.get( elem );
	
			// Don't attach events to noData or text/comment nodes (but allow plain objects)
			if ( !elemData ) {
				return;
			}
	
			// Caller can pass in an object of custom data in lieu of the handler
			if ( handler.handler ) {
				handleObjIn = handler;
				handler = handleObjIn.handler;
				selector = handleObjIn.selector;
			}
	
			// Ensure that invalid selectors throw exceptions at attach time
			// Evaluate against documentElement in case elem is a non-element node (e.g., document)
			if ( selector ) {
				jQuery.find.matchesSelector( documentElement, selector );
			}
	
			// Make sure that the handler has a unique ID, used to find/remove it later
			if ( !handler.guid ) {
				handler.guid = jQuery.guid++;
			}
	
			// Init the element's event structure and main handler, if this is the first
			if ( !( events = elemData.events ) ) {
				events = elemData.events = {};
			}
			if ( !( eventHandle = elemData.handle ) ) {
				eventHandle = elemData.handle = function( e ) {
	
					// Discard the second event of a jQuery.event.trigger() and
					// when an event is called after a page has unloaded
					return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
						jQuery.event.dispatch.apply( elem, arguments ) : undefined;
				};
			}
	
			// Handle multiple events separated by a space
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// There *must* be a type, no attaching namespace-only handlers
				if ( !type ) {
					continue;
				}
	
				// If event changes its type, use the special event handlers for the changed type
				special = jQuery.event.special[ type ] || {};
	
				// If selector defined, determine special event api type, otherwise given type
				type = ( selector ? special.delegateType : special.bindType ) || type;
	
				// Update special based on newly reset type
				special = jQuery.event.special[ type ] || {};
	
				// handleObj is passed to all event handlers
				handleObj = jQuery.extend( {
					type: type,
					origType: origType,
					data: data,
					handler: handler,
					guid: handler.guid,
					selector: selector,
					needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
					namespace: namespaces.join( "." )
				}, handleObjIn );
	
				// Init the event handler queue if we're the first
				if ( !( handlers = events[ type ] ) ) {
					handlers = events[ type ] = [];
					handlers.delegateCount = 0;
	
					// Only use addEventListener if the special events handler returns false
					if ( !special.setup ||
						special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
	
						if ( elem.addEventListener ) {
							elem.addEventListener( type, eventHandle );
						}
					}
				}
	
				if ( special.add ) {
					special.add.call( elem, handleObj );
	
					if ( !handleObj.handler.guid ) {
						handleObj.handler.guid = handler.guid;
					}
				}
	
				// Add to the element's handler list, delegates in front
				if ( selector ) {
					handlers.splice( handlers.delegateCount++, 0, handleObj );
				} else {
					handlers.push( handleObj );
				}
	
				// Keep track of which events have ever been used, for event optimization
				jQuery.event.global[ type ] = true;
			}
	
		},
	
		// Detach an event or set of events from an element
		remove: function( elem, types, handler, selector, mappedTypes ) {
	
			var j, origCount, tmp,
				events, t, handleObj,
				special, handlers, type, namespaces, origType,
				elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );
	
			if ( !elemData || !( events = elemData.events ) ) {
				return;
			}
	
			// Once for each type.namespace in types; type may be omitted
			types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
			t = types.length;
			while ( t-- ) {
				tmp = rtypenamespace.exec( types[ t ] ) || [];
				type = origType = tmp[ 1 ];
				namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();
	
				// Unbind all events (on this namespace, if provided) for the element
				if ( !type ) {
					for ( type in events ) {
						jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
					}
					continue;
				}
	
				special = jQuery.event.special[ type ] || {};
				type = ( selector ? special.delegateType : special.bindType ) || type;
				handlers = events[ type ] || [];
				tmp = tmp[ 2 ] &&
					new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );
	
				// Remove matching events
				origCount = j = handlers.length;
				while ( j-- ) {
					handleObj = handlers[ j ];
	
					if ( ( mappedTypes || origType === handleObj.origType ) &&
						( !handler || handler.guid === handleObj.guid ) &&
						( !tmp || tmp.test( handleObj.namespace ) ) &&
						( !selector || selector === handleObj.selector ||
							selector === "**" && handleObj.selector ) ) {
						handlers.splice( j, 1 );
	
						if ( handleObj.selector ) {
							handlers.delegateCount--;
						}
						if ( special.remove ) {
							special.remove.call( elem, handleObj );
						}
					}
				}
	
				// Remove generic event handler if we removed something and no more handlers exist
				// (avoids potential for endless recursion during removal of special event handlers)
				if ( origCount && !handlers.length ) {
					if ( !special.teardown ||
						special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
	
						jQuery.removeEvent( elem, type, elemData.handle );
					}
	
					delete events[ type ];
				}
			}
	
			// Remove data and the expando if it's no longer used
			if ( jQuery.isEmptyObject( events ) ) {
				dataPriv.remove( elem, "handle events" );
			}
		},
	
		dispatch: function( nativeEvent ) {
	
			// Make a writable jQuery.Event from the native event object
			var event = jQuery.event.fix( nativeEvent );
	
			var i, j, ret, matched, handleObj, handlerQueue,
				args = new Array( arguments.length ),
				handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
				special = jQuery.event.special[ event.type ] || {};
	
			// Use the fix-ed jQuery.Event rather than the (read-only) native event
			args[ 0 ] = event;
	
			for ( i = 1; i < arguments.length; i++ ) {
				args[ i ] = arguments[ i ];
			}
	
			event.delegateTarget = this;
	
			// Call the preDispatch hook for the mapped type, and let it bail if desired
			if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
				return;
			}
	
			// Determine handlers
			handlerQueue = jQuery.event.handlers.call( this, event, handlers );
	
			// Run delegates first; they may want to stop propagation beneath us
			i = 0;
			while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
				event.currentTarget = matched.elem;
	
				j = 0;
				while ( ( handleObj = matched.handlers[ j++ ] ) &&
					!event.isImmediatePropagationStopped() ) {
	
					// Triggered event must either 1) have no namespace, or 2) have namespace(s)
					// a subset or equal to those in the bound event (both can have no namespace).
					if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {
	
						event.handleObj = handleObj;
						event.data = handleObj.data;
	
						ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
							handleObj.handler ).apply( matched.elem, args );
	
						if ( ret !== undefined ) {
							if ( ( event.result = ret ) === false ) {
								event.preventDefault();
								event.stopPropagation();
							}
						}
					}
				}
			}
	
			// Call the postDispatch hook for the mapped type
			if ( special.postDispatch ) {
				special.postDispatch.call( this, event );
			}
	
			return event.result;
		},
	
		handlers: function( event, handlers ) {
			var i, handleObj, sel, matchedHandlers, matchedSelectors,
				handlerQueue = [],
				delegateCount = handlers.delegateCount,
				cur = event.target;
	
			// Find delegate handlers
			if ( delegateCount &&
	
				// Support: IE <=9
				// Black-hole SVG <use> instance trees (trac-13180)
				cur.nodeType &&
	
				// Support: Firefox <=42
				// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
				// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
				// Support: IE 11 only
				// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
				!( event.type === "click" && event.button >= 1 ) ) {
	
				for ( ; cur !== this; cur = cur.parentNode || this ) {
	
					// Don't check non-elements (#13208)
					// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
					if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
						matchedHandlers = [];
						matchedSelectors = {};
						for ( i = 0; i < delegateCount; i++ ) {
							handleObj = handlers[ i ];
	
							// Don't conflict with Object.prototype properties (#13203)
							sel = handleObj.selector + " ";
	
							if ( matchedSelectors[ sel ] === undefined ) {
								matchedSelectors[ sel ] = handleObj.needsContext ?
									jQuery( sel, this ).index( cur ) > -1 :
									jQuery.find( sel, this, null, [ cur ] ).length;
							}
							if ( matchedSelectors[ sel ] ) {
								matchedHandlers.push( handleObj );
							}
						}
						if ( matchedHandlers.length ) {
							handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
						}
					}
				}
			}
	
			// Add the remaining (directly-bound) handlers
			cur = this;
			if ( delegateCount < handlers.length ) {
				handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
			}
	
			return handlerQueue;
		},
	
		addProp: function( name, hook ) {
			Object.defineProperty( jQuery.Event.prototype, name, {
				enumerable: true,
				configurable: true,
	
				get: jQuery.isFunction( hook ) ?
					function() {
						if ( this.originalEvent ) {
								return hook( this.originalEvent );
						}
					} :
					function() {
						if ( this.originalEvent ) {
								return this.originalEvent[ name ];
						}
					},
	
				set: function( value ) {
					Object.defineProperty( this, name, {
						enumerable: true,
						configurable: true,
						writable: true,
						value: value
					} );
				}
			} );
		},
	
		fix: function( originalEvent ) {
			return originalEvent[ jQuery.expando ] ?
				originalEvent :
				new jQuery.Event( originalEvent );
		},
	
		special: {
			load: {
	
				// Prevent triggered image.load events from bubbling to window.load
				noBubble: true
			},
			focus: {
	
				// Fire native event if possible so blur/focus sequence is correct
				trigger: function() {
					if ( this !== safeActiveElement() && this.focus ) {
						this.focus();
						return false;
					}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function() {
					if ( this === safeActiveElement() && this.blur ) {
						this.blur();
						return false;
					}
				},
				delegateType: "focusout"
			},
			click: {
	
				// For checkbox, fire native event so checked state will be right
				trigger: function() {
					if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
						this.click();
						return false;
					}
				},
	
				// For cross-browser consistency, don't fire native .click() on links
				_default: function( event ) {
					return jQuery.nodeName( event.target, "a" );
				}
			},
	
			beforeunload: {
				postDispatch: function( event ) {
	
					// Support: Firefox 20+
					// Firefox doesn't alert if the returnValue field is not set.
					if ( event.result !== undefined && event.originalEvent ) {
						event.originalEvent.returnValue = event.result;
					}
				}
			}
		}
	};
	
	jQuery.removeEvent = function( elem, type, handle ) {
	
		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	};
	
	jQuery.Event = function( src, props ) {
	
		// Allow instantiation without the 'new' keyword
		if ( !( this instanceof jQuery.Event ) ) {
			return new jQuery.Event( src, props );
		}
	
		// Event object
		if ( src && src.type ) {
			this.originalEvent = src;
			this.type = src.type;
	
			// Events bubbling up the document may have been marked as prevented
			// by a handler lower down the tree; reflect the correct value.
			this.isDefaultPrevented = src.defaultPrevented ||
					src.defaultPrevented === undefined &&
	
					// Support: Android <=2.3 only
					src.returnValue === false ?
				returnTrue :
				returnFalse;
	
			// Create target properties
			// Support: Safari <=6 - 7 only
			// Target should not be a text node (#504, #13143)
			this.target = ( src.target && src.target.nodeType === 3 ) ?
				src.target.parentNode :
				src.target;
	
			this.currentTarget = src.currentTarget;
			this.relatedTarget = src.relatedTarget;
	
		// Event type
		} else {
			this.type = src;
		}
	
		// Put explicitly provided properties onto the event object
		if ( props ) {
			jQuery.extend( this, props );
		}
	
		// Create a timestamp if incoming event doesn't have one
		this.timeStamp = src && src.timeStamp || jQuery.now();
	
		// Mark it as fixed
		this[ jQuery.expando ] = true;
	};
	
	// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
	// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
	jQuery.Event.prototype = {
		constructor: jQuery.Event,
		isDefaultPrevented: returnFalse,
		isPropagationStopped: returnFalse,
		isImmediatePropagationStopped: returnFalse,
		isSimulated: false,
	
		preventDefault: function() {
			var e = this.originalEvent;
	
			this.isDefaultPrevented = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.preventDefault();
			}
		},
		stopPropagation: function() {
			var e = this.originalEvent;
	
			this.isPropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopPropagation();
			}
		},
		stopImmediatePropagation: function() {
			var e = this.originalEvent;
	
			this.isImmediatePropagationStopped = returnTrue;
	
			if ( e && !this.isSimulated ) {
				e.stopImmediatePropagation();
			}
	
			this.stopPropagation();
		}
	};
	
	// Includes all common event props including KeyEvent and MouseEvent specific props
	jQuery.each( {
		altKey: true,
		bubbles: true,
		cancelable: true,
		changedTouches: true,
		ctrlKey: true,
		detail: true,
		eventPhase: true,
		metaKey: true,
		pageX: true,
		pageY: true,
		shiftKey: true,
		view: true,
		"char": true,
		charCode: true,
		key: true,
		keyCode: true,
		button: true,
		buttons: true,
		clientX: true,
		clientY: true,
		offsetX: true,
		offsetY: true,
		pointerId: true,
		pointerType: true,
		screenX: true,
		screenY: true,
		targetTouches: true,
		toElement: true,
		touches: true,
	
		which: function( event ) {
			var button = event.button;
	
			// Add which for key events
			if ( event.which == null && rkeyEvent.test( event.type ) ) {
				return event.charCode != null ? event.charCode : event.keyCode;
			}
	
			// Add which for click: 1 === left; 2 === middle; 3 === right
			if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
				if ( button & 1 ) {
					return 1;
				}
	
				if ( button & 2 ) {
					return 3;
				}
	
				if ( button & 4 ) {
					return 2;
				}
	
				return 0;
			}
	
			return event.which;
		}
	}, jQuery.event.addProp );
	
	// Create mouseenter/leave events using mouseover/out and event-time checks
	// so that event delegation works in jQuery.
	// Do the same for pointerenter/pointerleave and pointerover/pointerout
	//
	// Support: Safari 7 only
	// Safari sends mouseenter too often; see:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
	// for the description of the bug (it existed in older Chrome versions as well).
	jQuery.each( {
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function( orig, fix ) {
		jQuery.event.special[ orig ] = {
			delegateType: fix,
			bindType: fix,
	
			handle: function( event ) {
				var ret,
					target = this,
					related = event.relatedTarget,
					handleObj = event.handleObj;
	
				// For mouseenter/leave call the handler if related is outside the target.
				// NB: No relatedTarget if the mouse left/entered the browser window
				if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
					event.type = handleObj.origType;
					ret = handleObj.handler.apply( this, arguments );
					event.type = fix;
				}
				return ret;
			}
		};
	} );
	
	jQuery.fn.extend( {
	
		on: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn );
		},
		one: function( types, selector, data, fn ) {
			return on( this, types, selector, data, fn, 1 );
		},
		off: function( types, selector, fn ) {
			var handleObj, type;
			if ( types && types.preventDefault && types.handleObj ) {
	
				// ( event )  dispatched jQuery.Event
				handleObj = types.handleObj;
				jQuery( types.delegateTarget ).off(
					handleObj.namespace ?
						handleObj.origType + "." + handleObj.namespace :
						handleObj.origType,
					handleObj.selector,
					handleObj.handler
				);
				return this;
			}
			if ( typeof types === "object" ) {
	
				// ( types-object [, selector] )
				for ( type in types ) {
					this.off( type, selector, types[ type ] );
				}
				return this;
			}
			if ( selector === false || typeof selector === "function" ) {
	
				// ( types [, fn] )
				fn = selector;
				selector = undefined;
			}
			if ( fn === false ) {
				fn = returnFalse;
			}
			return this.each( function() {
				jQuery.event.remove( this, types, fn, selector );
			} );
		}
	} );
	
	
	var
	
		/* eslint-disable max-len */
	
		// See https://github.com/eslint/eslint/issues/3229
		rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
	
		/* eslint-enable */
	
		// Support: IE <=10 - 11, Edge 12 - 13
		// In IE/Edge using regex groups here causes severe slowdowns.
		// See https://connect.microsoft.com/IE/feedback/details/1736512/
		rnoInnerhtml = /<script|<style|<link/i,
	
		// checked="checked" or checked
		rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
		rscriptTypeMasked = /^true\/(.*)/,
		rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
	
	function manipulationTarget( elem, content ) {
		if ( jQuery.nodeName( elem, "table" ) &&
			jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {
	
			return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
		}
	
		return elem;
	}
	
	// Replace/restore the type attribute of script elements for safe DOM manipulation
	function disableScript( elem ) {
		elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
		return elem;
	}
	function restoreScript( elem ) {
		var match = rscriptTypeMasked.exec( elem.type );
	
		if ( match ) {
			elem.type = match[ 1 ];
		} else {
			elem.removeAttribute( "type" );
		}
	
		return elem;
	}
	
	function cloneCopyEvent( src, dest ) {
		var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;
	
		if ( dest.nodeType !== 1 ) {
			return;
		}
	
		// 1. Copy private data: events, handlers, etc.
		if ( dataPriv.hasData( src ) ) {
			pdataOld = dataPriv.access( src );
			pdataCur = dataPriv.set( dest, pdataOld );
			events = pdataOld.events;
	
			if ( events ) {
				delete pdataCur.handle;
				pdataCur.events = {};
	
				for ( type in events ) {
					for ( i = 0, l = events[ type ].length; i < l; i++ ) {
						jQuery.event.add( dest, type, events[ type ][ i ] );
					}
				}
			}
		}
	
		// 2. Copy user data
		if ( dataUser.hasData( src ) ) {
			udataOld = dataUser.access( src );
			udataCur = jQuery.extend( {}, udataOld );
	
			dataUser.set( dest, udataCur );
		}
	}
	
	// Fix IE bugs, see support tests
	function fixInput( src, dest ) {
		var nodeName = dest.nodeName.toLowerCase();
	
		// Fails to persist the checked state of a cloned checkbox or radio button.
		if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
			dest.checked = src.checked;
	
		// Fails to return the selected option to the default selected state when cloning options
		} else if ( nodeName === "input" || nodeName === "textarea" ) {
			dest.defaultValue = src.defaultValue;
		}
	}
	
	function domManip( collection, args, callback, ignored ) {
	
		// Flatten any nested arrays
		args = concat.apply( [], args );
	
		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = collection.length,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );
	
		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return collection.each( function( index ) {
				var self = collection.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				domManip( self, args, callback, ignored );
			} );
		}
	
		if ( l ) {
			fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
			first = fragment.firstChild;
	
			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}
	
			// Require either new content or an interest in ignored elements to invoke the callback
			if ( first || ignored ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;
	
				// Use the original fragment for the last item
				// instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;
	
					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );
	
						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
	
							// Support: Android <=4.0 only, PhantomJS 1 only
							// push.apply(_, arraylike) throws on ancient WebKit
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}
	
					callback.call( collection[ i ], node, i );
				}
	
				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;
	
					// Reenable scripts
					jQuery.map( scripts, restoreScript );
	
					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!dataPriv.access( node, "globalEval" ) &&
							jQuery.contains( doc, node ) ) {
	
							if ( node.src ) {
	
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
							}
						}
					}
				}
			}
		}
	
		return collection;
	}
	
	function remove( elem, selector, keepData ) {
		var node,
			nodes = selector ? jQuery.filter( selector, elem ) : elem,
			i = 0;
	
		for ( ; ( node = nodes[ i ] ) != null; i++ ) {
			if ( !keepData && node.nodeType === 1 ) {
				jQuery.cleanData( getAll( node ) );
			}
	
			if ( node.parentNode ) {
				if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
					setGlobalEval( getAll( node, "script" ) );
				}
				node.parentNode.removeChild( node );
			}
		}
	
		return elem;
	}
	
	jQuery.extend( {
		htmlPrefilter: function( html ) {
			return html.replace( rxhtmlTag, "<$1></$2>" );
		},
	
		clone: function( elem, dataAndEvents, deepDataAndEvents ) {
			var i, l, srcElements, destElements,
				clone = elem.cloneNode( true ),
				inPage = jQuery.contains( elem.ownerDocument, elem );
	
			// Fix IE cloning issues
			if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
					!jQuery.isXMLDoc( elem ) ) {
	
				// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
				destElements = getAll( clone );
				srcElements = getAll( elem );
	
				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					fixInput( srcElements[ i ], destElements[ i ] );
				}
			}
	
			// Copy the events from the original to the clone
			if ( dataAndEvents ) {
				if ( deepDataAndEvents ) {
					srcElements = srcElements || getAll( elem );
					destElements = destElements || getAll( clone );
	
					for ( i = 0, l = srcElements.length; i < l; i++ ) {
						cloneCopyEvent( srcElements[ i ], destElements[ i ] );
					}
				} else {
					cloneCopyEvent( elem, clone );
				}
			}
	
			// Preserve script evaluation history
			destElements = getAll( clone, "script" );
			if ( destElements.length > 0 ) {
				setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
			}
	
			// Return the cloned set
			return clone;
		},
	
		cleanData: function( elems ) {
			var data, elem, type,
				special = jQuery.event.special,
				i = 0;
	
			for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
				if ( acceptData( elem ) ) {
					if ( ( data = elem[ dataPriv.expando ] ) ) {
						if ( data.events ) {
							for ( type in data.events ) {
								if ( special[ type ] ) {
									jQuery.event.remove( elem, type );
	
								// This is a shortcut to avoid jQuery.event.remove's overhead
								} else {
									jQuery.removeEvent( elem, type, data.handle );
								}
							}
						}
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataPriv.expando ] = undefined;
					}
					if ( elem[ dataUser.expando ] ) {
	
						// Support: Chrome <=35 - 45+
						// Assign undefined instead of using delete, see Data#remove
						elem[ dataUser.expando ] = undefined;
					}
				}
			}
		}
	} );
	
	jQuery.fn.extend( {
		detach: function( selector ) {
			return remove( this, selector, true );
		},
	
		remove: function( selector ) {
			return remove( this, selector );
		},
	
		text: function( value ) {
			return access( this, function( value ) {
				return value === undefined ?
					jQuery.text( this ) :
					this.empty().each( function() {
						if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
							this.textContent = value;
						}
					} );
			}, null, value, arguments.length );
		},
	
		append: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.appendChild( elem );
				}
			} );
		},
	
		prepend: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
					var target = manipulationTarget( this, elem );
					target.insertBefore( elem, target.firstChild );
				}
			} );
		},
	
		before: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this );
				}
			} );
		},
	
		after: function() {
			return domManip( this, arguments, function( elem ) {
				if ( this.parentNode ) {
					this.parentNode.insertBefore( elem, this.nextSibling );
				}
			} );
		},
	
		empty: function() {
			var elem,
				i = 0;
	
			for ( ; ( elem = this[ i ] ) != null; i++ ) {
				if ( elem.nodeType === 1 ) {
	
					// Prevent memory leaks
					jQuery.cleanData( getAll( elem, false ) );
	
					// Remove any remaining nodes
					elem.textContent = "";
				}
			}
	
			return this;
		},
	
		clone: function( dataAndEvents, deepDataAndEvents ) {
			dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
			deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
	
			return this.map( function() {
				return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
			} );
		},
	
		html: function( value ) {
			return access( this, function( value ) {
				var elem = this[ 0 ] || {},
					i = 0,
					l = this.length;
	
				if ( value === undefined && elem.nodeType === 1 ) {
					return elem.innerHTML;
				}
	
				// See if we can take a shortcut and just use innerHTML
				if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
					!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {
	
					value = jQuery.htmlPrefilter( value );
	
					try {
						for ( ; i < l; i++ ) {
							elem = this[ i ] || {};
	
							// Remove element nodes and prevent memory leaks
							if ( elem.nodeType === 1 ) {
								jQuery.cleanData( getAll( elem, false ) );
								elem.innerHTML = value;
							}
						}
	
						elem = 0;
	
					// If using innerHTML throws an exception, use the fallback method
					} catch ( e ) {}
				}
	
				if ( elem ) {
					this.empty().append( value );
				}
			}, null, value, arguments.length );
		},
	
		replaceWith: function() {
			var ignored = [];
	
			// Make the changes, replacing each non-ignored context element with the new content
			return domManip( this, arguments, function( elem ) {
				var parent = this.parentNode;
	
				if ( jQuery.inArray( this, ignored ) < 0 ) {
					jQuery.cleanData( getAll( this ) );
					if ( parent ) {
						parent.replaceChild( elem, this );
					}
				}
	
			// Force callback invocation
			}, ignored );
		}
	} );
	
	jQuery.each( {
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function( name, original ) {
		jQuery.fn[ name ] = function( selector ) {
			var elems,
				ret = [],
				insert = jQuery( selector ),
				last = insert.length - 1,
				i = 0;
	
			for ( ; i <= last; i++ ) {
				elems = i === last ? this : this.clone( true );
				jQuery( insert[ i ] )[ original ]( elems );
	
				// Support: Android <=4.0 only, PhantomJS 1 only
				// .get() because push.apply(_, arraylike) throws on ancient WebKit
				push.apply( ret, elems.get() );
			}
	
			return this.pushStack( ret );
		};
	} );
	var rmargin = ( /^margin/ );
	
	var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );
	
	var getStyles = function( elem ) {
	
			// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
			// IE throws on elements created in popups
			// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
			var view = elem.ownerDocument.defaultView;
	
			if ( !view || !view.opener ) {
				view = window;
			}
	
			return view.getComputedStyle( elem );
		};
	
	
	
	( function() {
	
		// Executing both pixelPosition & boxSizingReliable tests require only one layout
		// so they're executed at the same time to save the second computation.
		function computeStyleTests() {
	
			// This is a singleton, we need to execute it only once
			if ( !div ) {
				return;
			}
	
			div.style.cssText =
				"box-sizing:border-box;" +
				"position:relative;display:block;" +
				"margin:auto;border:1px;padding:1px;" +
				"top:1%;width:50%";
			div.innerHTML = "";
			documentElement.appendChild( container );
	
			var divStyle = window.getComputedStyle( div );
			pixelPositionVal = divStyle.top !== "1%";
	
			// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
			reliableMarginLeftVal = divStyle.marginLeft === "2px";
			boxSizingReliableVal = divStyle.width === "4px";
	
			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = divStyle.marginRight === "4px";
	
			documentElement.removeChild( container );
	
			// Nullify the div so it wouldn't be stored in the memory and
			// it will also be a sign that checks already performed
			div = null;
		}
	
		var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
			container = document.createElement( "div" ),
			div = document.createElement( "div" );
	
		// Finish early in limited (non-browser) environments
		if ( !div.style ) {
			return;
		}
	
		// Support: IE <=9 - 11 only
		// Style of cloned element affects source element cloned (#8908)
		div.style.backgroundClip = "content-box";
		div.cloneNode( true ).style.backgroundClip = "";
		support.clearCloneStyle = div.style.backgroundClip === "content-box";
	
		container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
			"padding:0;margin-top:1px;position:absolute";
		container.appendChild( div );
	
		jQuery.extend( support, {
			pixelPosition: function() {
				computeStyleTests();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				computeStyleTests();
				return boxSizingReliableVal;
			},
			pixelMarginRight: function() {
				computeStyleTests();
				return pixelMarginRightVal;
			},
			reliableMarginLeft: function() {
				computeStyleTests();
				return reliableMarginLeftVal;
			}
		} );
	} )();
	
	
	function curCSS( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;
	
		computed = computed || getStyles( elem );
	
		// Support: IE <=9 only
		// getPropertyValue is only needed for .css('filter') (#12537)
		if ( computed ) {
			ret = computed.getPropertyValue( name ) || computed[ name ];
	
			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}
	
			// A tribute to the "awesome hack by Dean Edwards"
			// Android Browser returns percentage for some values,
			// but width seems to be reliably pixels.
			// This is against the CSSOM draft spec:
			// https://drafts.csswg.org/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {
	
				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;
	
				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;
	
				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}
	
		return ret !== undefined ?
	
			// Support: IE <=9 - 11 only
			// IE returns zIndex value as an integer.
			ret + "" :
			ret;
	}
	
	
	function addGetHookIf( conditionFn, hookFn ) {
	
		// Define the hook, we'll check on the first run if it's really needed.
		return {
			get: function() {
				if ( conditionFn() ) {
	
					// Hook not needed (or it's not possible to use it due
					// to missing dependency), remove it.
					delete this.get;
					return;
				}
	
				// Hook needed; redefine it so that the support test is not executed again.
				return ( this.get = hookFn ).apply( this, arguments );
			}
		};
	}
	
	
	var
	
		// Swappable if display is none or starts with table
		// except "table", "table-cell", or "table-caption"
		// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
		rdisplayswap = /^(none|table(?!-c[ea]).+)/,
		cssShow = { position: "absolute", visibility: "hidden", display: "block" },
		cssNormalTransform = {
			letterSpacing: "0",
			fontWeight: "400"
		},
	
		cssPrefixes = [ "Webkit", "Moz", "ms" ],
		emptyStyle = document.createElement( "div" ).style;
	
	// Return a css property mapped to a potentially vendor prefixed property
	function vendorPropName( name ) {
	
		// Shortcut for names that are not vendor prefixed
		if ( name in emptyStyle ) {
			return name;
		}
	
		// Check for vendor prefixed names
		var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
			i = cssPrefixes.length;
	
		while ( i-- ) {
			name = cssPrefixes[ i ] + capName;
			if ( name in emptyStyle ) {
				return name;
			}
		}
	}
	
	function setPositiveNumber( elem, value, subtract ) {
	
		// Any relative (+/-) values have already been
		// normalized at this point
		var matches = rcssNum.exec( value );
		return matches ?
	
			// Guard against undefined "subtract", e.g., when used as in cssHooks
			Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
			value;
	}
	
	function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
		var i,
			val = 0;
	
		// If we already have the right measurement, avoid augmentation
		if ( extra === ( isBorderBox ? "border" : "content" ) ) {
			i = 4;
	
		// Otherwise initialize for horizontal or vertical properties
		} else {
			i = name === "width" ? 1 : 0;
		}
	
		for ( ; i < 4; i += 2 ) {
	
			// Both box models exclude margin, so add it if we want it
			if ( extra === "margin" ) {
				val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
			}
	
			if ( isBorderBox ) {
	
				// border-box includes padding, so remove it if we want content
				if ( extra === "content" ) {
					val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
				}
	
				// At this point, extra isn't border nor margin, so remove border
				if ( extra !== "margin" ) {
					val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			} else {
	
				// At this point, extra isn't content, so add padding
				val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
	
				// At this point, extra isn't content nor padding, so add border
				if ( extra !== "padding" ) {
					val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
				}
			}
		}
	
		return val;
	}
	
	function getWidthOrHeight( elem, name, extra ) {
	
		// Start with offset property, which is equivalent to the border-box value
		var val,
			valueIsBorderBox = true,
			styles = getStyles( elem ),
			isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";
	
		// Support: IE <=11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = elem.getBoundingClientRect()[ name ];
		}
	
		// Some non-html elements return undefined for offsetWidth, so check for null/undefined
		// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
		// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
		if ( val <= 0 || val == null ) {
	
			// Fall back to computed then uncomputed css if necessary
			val = curCSS( elem, name, styles );
			if ( val < 0 || val == null ) {
				val = elem.style[ name ];
			}
	
			// Computed unit is not pixels. Stop here and return.
			if ( rnumnonpx.test( val ) ) {
				return val;
			}
	
			// Check for style in case a browser which returns unreliable values
			// for getComputedStyle silently falls back to the reliable elem.style
			valueIsBorderBox = isBorderBox &&
				( support.boxSizingReliable() || val === elem.style[ name ] );
	
			// Normalize "", auto, and prepare for extra
			val = parseFloat( val ) || 0;
		}
	
		// Use the active box-sizing model to add/subtract irrelevant styles
		return ( val +
			augmentWidthOrHeight(
				elem,
				name,
				extra || ( isBorderBox ? "border" : "content" ),
				valueIsBorderBox,
				styles
			)
		) + "px";
	}
	
	jQuery.extend( {
	
		// Add in style property hooks for overriding the default
		// behavior of getting and setting a style property
		cssHooks: {
			opacity: {
				get: function( elem, computed ) {
					if ( computed ) {
	
						// We should always get a number back from opacity
						var ret = curCSS( elem, "opacity" );
						return ret === "" ? "1" : ret;
					}
				}
			}
		},
	
		// Don't automatically add "px" to these possibly-unitless properties
		cssNumber: {
			"animationIterationCount": true,
			"columnCount": true,
			"fillOpacity": true,
			"flexGrow": true,
			"flexShrink": true,
			"fontWeight": true,
			"lineHeight": true,
			"opacity": true,
			"order": true,
			"orphans": true,
			"widows": true,
			"zIndex": true,
			"zoom": true
		},
	
		// Add in properties whose names you wish to fix before
		// setting or getting the value
		cssProps: {
			"float": "cssFloat"
		},
	
		// Get and set the style property on a DOM Node
		style: function( elem, name, value, extra ) {
	
			// Don't set styles on text and comment nodes
			if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
				return;
			}
	
			// Make sure that we're working with the right name
			var ret, type, hooks,
				origName = jQuery.camelCase( name ),
				style = elem.style;
	
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Gets hook for the prefixed version, then unprefixed version
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// Check if we're setting a value
			if ( value !== undefined ) {
				type = typeof value;
	
				// Convert "+=" or "-=" to relative numbers (#7345)
				if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
					value = adjustCSS( elem, name, ret );
	
					// Fixes bug #9237
					type = "number";
				}
	
				// Make sure that null and NaN values aren't set (#7116)
				if ( value == null || value !== value ) {
					return;
				}
	
				// If a number was passed in, add the unit (except for certain CSS properties)
				if ( type === "number" ) {
					value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
				}
	
				// background-* props affect original clone's values
				if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
					style[ name ] = "inherit";
				}
	
				// If a hook was provided, use that value, otherwise just set the specified value
				if ( !hooks || !( "set" in hooks ) ||
					( value = hooks.set( elem, value, extra ) ) !== undefined ) {
	
					style[ name ] = value;
				}
	
			} else {
	
				// If a hook was provided get the non-computed value from there
				if ( hooks && "get" in hooks &&
					( ret = hooks.get( elem, false, extra ) ) !== undefined ) {
	
					return ret;
				}
	
				// Otherwise just get the value from the style object
				return style[ name ];
			}
		},
	
		css: function( elem, name, extra, styles ) {
			var val, num, hooks,
				origName = jQuery.camelCase( name );
	
			// Make sure that we're working with the right name
			name = jQuery.cssProps[ origName ] ||
				( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );
	
			// Try prefixed name followed by the unprefixed name
			hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];
	
			// If a hook was provided get the computed value from there
			if ( hooks && "get" in hooks ) {
				val = hooks.get( elem, true, extra );
			}
	
			// Otherwise, if a way to get the computed value exists, use that
			if ( val === undefined ) {
				val = curCSS( elem, name, styles );
			}
	
			// Convert "normal" to computed value
			if ( val === "normal" && name in cssNormalTransform ) {
				val = cssNormalTransform[ name ];
			}
	
			// Make numeric if forced or a qualifier was provided and val looks numeric
			if ( extra === "" || extra ) {
				num = parseFloat( val );
				return extra === true || isFinite( num ) ? num || 0 : val;
			}
			return val;
		}
	} );
	
	jQuery.each( [ "height", "width" ], function( i, name ) {
		jQuery.cssHooks[ name ] = {
			get: function( elem, computed, extra ) {
				if ( computed ) {
	
					// Certain elements can have dimension info if we invisibly show them
					// but it must have a current display style that would benefit
					return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
	
						// Support: Safari 8+
						// Table columns in Safari have non-zero offsetWidth & zero
						// getBoundingClientRect().width unless display is changed.
						// Support: IE <=11 only
						// Running getBoundingClientRect on a disconnected node
						// in IE throws an error.
						( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
							swap( elem, cssShow, function() {
								return getWidthOrHeight( elem, name, extra );
							} ) :
							getWidthOrHeight( elem, name, extra );
				}
			},
	
			set: function( elem, value, extra ) {
				var matches,
					styles = extra && getStyles( elem ),
					subtract = extra && augmentWidthOrHeight(
						elem,
						name,
						extra,
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
						styles
					);
	
				// Convert to pixels if value adjustment is needed
				if ( subtract && ( matches = rcssNum.exec( value ) ) &&
					( matches[ 3 ] || "px" ) !== "px" ) {
	
					elem.style[ name ] = value;
					value = jQuery.css( elem, name );
				}
	
				return setPositiveNumber( elem, value, subtract );
			}
		};
	} );
	
	jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
		function( elem, computed ) {
			if ( computed ) {
				return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} )
					) + "px";
			}
		}
	);
	
	// These hooks are used by animate to expand properties
	jQuery.each( {
		margin: "",
		padding: "",
		border: "Width"
	}, function( prefix, suffix ) {
		jQuery.cssHooks[ prefix + suffix ] = {
			expand: function( value ) {
				var i = 0,
					expanded = {},
	
					// Assumes a single number if not a string
					parts = typeof value === "string" ? value.split( " " ) : [ value ];
	
				for ( ; i < 4; i++ ) {
					expanded[ prefix + cssExpand[ i ] + suffix ] =
						parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
				}
	
				return expanded;
			}
		};
	
		if ( !rmargin.test( prefix ) ) {
			jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
		}
	} );
	
	jQuery.fn.extend( {
		css: function( name, value ) {
			return access( this, function( elem, name, value ) {
				var styles, len,
					map = {},
					i = 0;
	
				if ( jQuery.isArray( name ) ) {
					styles = getStyles( elem );
					len = name.length;
	
					for ( ; i < len; i++ ) {
						map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
					}
	
					return map;
				}
	
				return value !== undefined ?
					jQuery.style( elem, name, value ) :
					jQuery.css( elem, name );
			}, name, value, arguments.length > 1 );
		}
	} );
	
	
	function Tween( elem, options, prop, end, easing ) {
		return new Tween.prototype.init( elem, options, prop, end, easing );
	}
	jQuery.Tween = Tween;
	
	Tween.prototype = {
		constructor: Tween,
		init: function( elem, options, prop, end, easing, unit ) {
			this.elem = elem;
			this.prop = prop;
			this.easing = easing || jQuery.easing._default;
			this.options = options;
			this.start = this.now = this.cur();
			this.end = end;
			this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
		},
		cur: function() {
			var hooks = Tween.propHooks[ this.prop ];
	
			return hooks && hooks.get ?
				hooks.get( this ) :
				Tween.propHooks._default.get( this );
		},
		run: function( percent ) {
			var eased,
				hooks = Tween.propHooks[ this.prop ];
	
			if ( this.options.duration ) {
				this.pos = eased = jQuery.easing[ this.easing ](
					percent, this.options.duration * percent, 0, 1, this.options.duration
				);
			} else {
				this.pos = eased = percent;
			}
			this.now = ( this.end - this.start ) * eased + this.start;
	
			if ( this.options.step ) {
				this.options.step.call( this.elem, this.now, this );
			}
	
			if ( hooks && hooks.set ) {
				hooks.set( this );
			} else {
				Tween.propHooks._default.set( this );
			}
			return this;
		}
	};
	
	Tween.prototype.init.prototype = Tween.prototype;
	
	Tween.propHooks = {
		_default: {
			get: function( tween ) {
				var result;
	
				// Use a property on the element directly when it is not a DOM element,
				// or when there is no matching style property that exists.
				if ( tween.elem.nodeType !== 1 ||
					tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
					return tween.elem[ tween.prop ];
				}
	
				// Passing an empty string as a 3rd parameter to .css will automatically
				// attempt a parseFloat and fallback to a string if the parse fails.
				// Simple values such as "10px" are parsed to Float;
				// complex values such as "rotate(1rad)" are returned as-is.
				result = jQuery.css( tween.elem, tween.prop, "" );
	
				// Empty strings, null, undefined and "auto" are converted to 0.
				return !result || result === "auto" ? 0 : result;
			},
			set: function( tween ) {
	
				// Use step hook for back compat.
				// Use cssHook if its there.
				// Use .style if available and use plain properties where available.
				if ( jQuery.fx.step[ tween.prop ] ) {
					jQuery.fx.step[ tween.prop ]( tween );
				} else if ( tween.elem.nodeType === 1 &&
					( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
						jQuery.cssHooks[ tween.prop ] ) ) {
					jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
				} else {
					tween.elem[ tween.prop ] = tween.now;
				}
			}
		}
	};
	
	// Support: IE <=9 only
	// Panic based approach to setting things on disconnected nodes
	Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
		set: function( tween ) {
			if ( tween.elem.nodeType && tween.elem.parentNode ) {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	};
	
	jQuery.easing = {
		linear: function( p ) {
			return p;
		},
		swing: function( p ) {
			return 0.5 - Math.cos( p * Math.PI ) / 2;
		},
		_default: "swing"
	};
	
	jQuery.fx = Tween.prototype.init;
	
	// Back compat <1.8 extension point
	jQuery.fx.step = {};
	
	
	
	
	var
		fxNow, timerId,
		rfxtypes = /^(?:toggle|show|hide)$/,
		rrun = /queueHooks$/;
	
	function raf() {
		if ( timerId ) {
			window.requestAnimationFrame( raf );
			jQuery.fx.tick();
		}
	}
	
	// Animations created synchronously will run synchronously
	function createFxNow() {
		window.setTimeout( function() {
			fxNow = undefined;
		} );
		return ( fxNow = jQuery.now() );
	}
	
	// Generate parameters to create a standard animation
	function genFx( type, includeWidth ) {
		var which,
			i = 0,
			attrs = { height: type };
	
		// If we include width, step value is 1 to do all cssExpand values,
		// otherwise step value is 2 to skip over Left and Right
		includeWidth = includeWidth ? 1 : 0;
		for ( ; i < 4; i += 2 - includeWidth ) {
			which = cssExpand[ i ];
			attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
		}
	
		if ( includeWidth ) {
			attrs.opacity = attrs.width = type;
		}
	
		return attrs;
	}
	
	function createTween( value, prop, animation ) {
		var tween,
			collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
			index = 0,
			length = collection.length;
		for ( ; index < length; index++ ) {
			if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {
	
				// We're done with this property
				return tween;
			}
		}
	}
	
	function defaultPrefilter( elem, props, opts ) {
		var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
			isBox = "width" in props || "height" in props,
			anim = this,
			orig = {},
			style = elem.style,
			hidden = elem.nodeType && isHiddenWithinTree( elem ),
			dataShow = dataPriv.get( elem, "fxshow" );
	
		// Queue-skipping animations hijack the fx hooks
		if ( !opts.queue ) {
			hooks = jQuery._queueHooks( elem, "fx" );
			if ( hooks.unqueued == null ) {
				hooks.unqueued = 0;
				oldfire = hooks.empty.fire;
				hooks.empty.fire = function() {
					if ( !hooks.unqueued ) {
						oldfire();
					}
				};
			}
			hooks.unqueued++;
	
			anim.always( function() {
	
				// Ensure the complete handler is called before this completes
				anim.always( function() {
					hooks.unqueued--;
					if ( !jQuery.queue( elem, "fx" ).length ) {
						hooks.empty.fire();
					}
				} );
			} );
		}
	
		// Detect show/hide animations
		for ( prop in props ) {
			value = props[ prop ];
			if ( rfxtypes.test( value ) ) {
				delete props[ prop ];
				toggle = toggle || value === "toggle";
				if ( value === ( hidden ? "hide" : "show" ) ) {
	
					// Pretend to be hidden if this is a "show" and
					// there is still data from a stopped show/hide
					if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
						hidden = true;
	
					// Ignore all other no-op show/hide data
					} else {
						continue;
					}
				}
				orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
			}
		}
	
		// Bail out if this is a no-op like .hide().hide()
		propTween = !jQuery.isEmptyObject( props );
		if ( !propTween && jQuery.isEmptyObject( orig ) ) {
			return;
		}
	
		// Restrict "overflow" and "display" styles during box animations
		if ( isBox && elem.nodeType === 1 ) {
	
			// Support: IE <=9 - 11, Edge 12 - 13
			// Record all 3 overflow attributes because IE does not infer the shorthand
			// from identically-valued overflowX and overflowY
			opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];
	
			// Identify a display type, preferring old show/hide data over the CSS cascade
			restoreDisplay = dataShow && dataShow.display;
			if ( restoreDisplay == null ) {
				restoreDisplay = dataPriv.get( elem, "display" );
			}
			display = jQuery.css( elem, "display" );
			if ( display === "none" ) {
				if ( restoreDisplay ) {
					display = restoreDisplay;
				} else {
	
					// Get nonempty value(s) by temporarily forcing visibility
					showHide( [ elem ], true );
					restoreDisplay = elem.style.display || restoreDisplay;
					display = jQuery.css( elem, "display" );
					showHide( [ elem ] );
				}
			}
	
			// Animate inline elements as inline-block
			if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
				if ( jQuery.css( elem, "float" ) === "none" ) {
	
					// Restore the original display value at the end of pure show/hide animations
					if ( !propTween ) {
						anim.done( function() {
							style.display = restoreDisplay;
						} );
						if ( restoreDisplay == null ) {
							display = style.display;
							restoreDisplay = display === "none" ? "" : display;
						}
					}
					style.display = "inline-block";
				}
			}
		}
	
		if ( opts.overflow ) {
			style.overflow = "hidden";
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	
		// Implement show/hide animations
		propTween = false;
		for ( prop in orig ) {
	
			// General show/hide setup for this element animation
			if ( !propTween ) {
				if ( dataShow ) {
					if ( "hidden" in dataShow ) {
						hidden = dataShow.hidden;
					}
				} else {
					dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
				}
	
				// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
				if ( toggle ) {
					dataShow.hidden = !hidden;
				}
	
				// Show elements before animating them
				if ( hidden ) {
					showHide( [ elem ], true );
				}
	
				/* eslint-disable no-loop-func */
	
				anim.done( function() {
	
				/* eslint-enable no-loop-func */
	
					// The final step of a "hide" animation is actually hiding the element
					if ( !hidden ) {
						showHide( [ elem ] );
					}
					dataPriv.remove( elem, "fxshow" );
					for ( prop in orig ) {
						jQuery.style( elem, prop, orig[ prop ] );
					}
				} );
			}
	
			// Per-property setup
			propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = propTween.start;
				if ( hidden ) {
					propTween.end = propTween.start;
					propTween.start = 0;
				}
			}
		}
	}
	
	function propFilter( props, specialEasing ) {
		var index, name, easing, value, hooks;
	
		// camelCase, specialEasing and expand cssHook pass
		for ( index in props ) {
			name = jQuery.camelCase( index );
			easing = specialEasing[ name ];
			value = props[ index ];
			if ( jQuery.isArray( value ) ) {
				easing = value[ 1 ];
				value = props[ index ] = value[ 0 ];
			}
	
			if ( index !== name ) {
				props[ name ] = value;
				delete props[ index ];
			}
	
			hooks = jQuery.cssHooks[ name ];
			if ( hooks && "expand" in hooks ) {
				value = hooks.expand( value );
				delete props[ name ];
	
				// Not quite $.extend, this won't overwrite existing keys.
				// Reusing 'index' because we have the correct "name"
				for ( index in value ) {
					if ( !( index in props ) ) {
						props[ index ] = value[ index ];
						specialEasing[ index ] = easing;
					}
				}
			} else {
				specialEasing[ name ] = easing;
			}
		}
	}
	
	function Animation( elem, properties, options ) {
		var result,
			stopped,
			index = 0,
			length = Animation.prefilters.length,
			deferred = jQuery.Deferred().always( function() {
	
				// Don't match elem in the :animated selector
				delete tick.elem;
			} ),
			tick = function() {
				if ( stopped ) {
					return false;
				}
				var currentTime = fxNow || createFxNow(),
					remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
	
					// Support: Android 2.3 only
					// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
					temp = remaining / animation.duration || 0,
					percent = 1 - temp,
					index = 0,
					length = animation.tweens.length;
	
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( percent );
				}
	
				deferred.notifyWith( elem, [ animation, percent, remaining ] );
	
				if ( percent < 1 && length ) {
					return remaining;
				} else {
					deferred.resolveWith( elem, [ animation ] );
					return false;
				}
			},
			animation = deferred.promise( {
				elem: elem,
				props: jQuery.extend( {}, properties ),
				opts: jQuery.extend( true, {
					specialEasing: {},
					easing: jQuery.easing._default
				}, options ),
				originalProperties: properties,
				originalOptions: options,
				startTime: fxNow || createFxNow(),
				duration: options.duration,
				tweens: [],
				createTween: function( prop, end ) {
					var tween = jQuery.Tween( elem, animation.opts, prop, end,
							animation.opts.specialEasing[ prop ] || animation.opts.easing );
					animation.tweens.push( tween );
					return tween;
				},
				stop: function( gotoEnd ) {
					var index = 0,
	
						// If we are going to the end, we want to run all the tweens
						// otherwise we skip this part
						length = gotoEnd ? animation.tweens.length : 0;
					if ( stopped ) {
						return this;
					}
					stopped = true;
					for ( ; index < length; index++ ) {
						animation.tweens[ index ].run( 1 );
					}
	
					// Resolve when we played the last frame; otherwise, reject
					if ( gotoEnd ) {
						deferred.notifyWith( elem, [ animation, 1, 0 ] );
						deferred.resolveWith( elem, [ animation, gotoEnd ] );
					} else {
						deferred.rejectWith( elem, [ animation, gotoEnd ] );
					}
					return this;
				}
			} ),
			props = animation.props;
	
		propFilter( props, animation.opts.specialEasing );
	
		for ( ; index < length; index++ ) {
			result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
			if ( result ) {
				if ( jQuery.isFunction( result.stop ) ) {
					jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
						jQuery.proxy( result.stop, result );
				}
				return result;
			}
		}
	
		jQuery.map( props, createTween, animation );
	
		if ( jQuery.isFunction( animation.opts.start ) ) {
			animation.opts.start.call( elem, animation );
		}
	
		jQuery.fx.timer(
			jQuery.extend( tick, {
				elem: elem,
				anim: animation,
				queue: animation.opts.queue
			} )
		);
	
		// attach callbacks from options
		return animation.progress( animation.opts.progress )
			.done( animation.opts.done, animation.opts.complete )
			.fail( animation.opts.fail )
			.always( animation.opts.always );
	}
	
	jQuery.Animation = jQuery.extend( Animation, {
	
		tweeners: {
			"*": [ function( prop, value ) {
				var tween = this.createTween( prop, value );
				adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
				return tween;
			} ]
		},
	
		tweener: function( props, callback ) {
			if ( jQuery.isFunction( props ) ) {
				callback = props;
				props = [ "*" ];
			} else {
				props = props.match( rnothtmlwhite );
			}
	
			var prop,
				index = 0,
				length = props.length;
	
			for ( ; index < length; index++ ) {
				prop = props[ index ];
				Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
				Animation.tweeners[ prop ].unshift( callback );
			}
		},
	
		prefilters: [ defaultPrefilter ],
	
		prefilter: function( callback, prepend ) {
			if ( prepend ) {
				Animation.prefilters.unshift( callback );
			} else {
				Animation.prefilters.push( callback );
			}
		}
	} );
	
	jQuery.speed = function( speed, easing, fn ) {
		var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
			complete: fn || !fn && easing ||
				jQuery.isFunction( speed ) && speed,
			duration: speed,
			easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
		};
	
		// Go to the end state if fx are off or if document is hidden
		if ( jQuery.fx.off || document.hidden ) {
			opt.duration = 0;
	
		} else {
			if ( typeof opt.duration !== "number" ) {
				if ( opt.duration in jQuery.fx.speeds ) {
					opt.duration = jQuery.fx.speeds[ opt.duration ];
	
				} else {
					opt.duration = jQuery.fx.speeds._default;
				}
			}
		}
	
		// Normalize opt.queue - true/undefined/null -> "fx"
		if ( opt.queue == null || opt.queue === true ) {
			opt.queue = "fx";
		}
	
		// Queueing
		opt.old = opt.complete;
	
		opt.complete = function() {
			if ( jQuery.isFunction( opt.old ) ) {
				opt.old.call( this );
			}
	
			if ( opt.queue ) {
				jQuery.dequeue( this, opt.queue );
			}
		};
	
		return opt;
	};
	
	jQuery.fn.extend( {
		fadeTo: function( speed, to, easing, callback ) {
	
			// Show any hidden elements after setting opacity to 0
			return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()
	
				// Animate to the value specified
				.end().animate( { opacity: to }, speed, easing, callback );
		},
		animate: function( prop, speed, easing, callback ) {
			var empty = jQuery.isEmptyObject( prop ),
				optall = jQuery.speed( speed, easing, callback ),
				doAnimation = function() {
	
					// Operate on a copy of prop so per-property easing won't be lost
					var anim = Animation( this, jQuery.extend( {}, prop ), optall );
	
					// Empty animations, or finishing resolves immediately
					if ( empty || dataPriv.get( this, "finish" ) ) {
						anim.stop( true );
					}
				};
				doAnimation.finish = doAnimation;
	
			return empty || optall.queue === false ?
				this.each( doAnimation ) :
				this.queue( optall.queue, doAnimation );
		},
		stop: function( type, clearQueue, gotoEnd ) {
			var stopQueue = function( hooks ) {
				var stop = hooks.stop;
				delete hooks.stop;
				stop( gotoEnd );
			};
	
			if ( typeof type !== "string" ) {
				gotoEnd = clearQueue;
				clearQueue = type;
				type = undefined;
			}
			if ( clearQueue && type !== false ) {
				this.queue( type || "fx", [] );
			}
	
			return this.each( function() {
				var dequeue = true,
					index = type != null && type + "queueHooks",
					timers = jQuery.timers,
					data = dataPriv.get( this );
	
				if ( index ) {
					if ( data[ index ] && data[ index ].stop ) {
						stopQueue( data[ index ] );
					}
				} else {
					for ( index in data ) {
						if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
							stopQueue( data[ index ] );
						}
					}
				}
	
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this &&
						( type == null || timers[ index ].queue === type ) ) {
	
						timers[ index ].anim.stop( gotoEnd );
						dequeue = false;
						timers.splice( index, 1 );
					}
				}
	
				// Start the next in the queue if the last step wasn't forced.
				// Timers currently will call their complete callbacks, which
				// will dequeue but only if they were gotoEnd.
				if ( dequeue || !gotoEnd ) {
					jQuery.dequeue( this, type );
				}
			} );
		},
		finish: function( type ) {
			if ( type !== false ) {
				type = type || "fx";
			}
			return this.each( function() {
				var index,
					data = dataPriv.get( this ),
					queue = data[ type + "queue" ],
					hooks = data[ type + "queueHooks" ],
					timers = jQuery.timers,
					length = queue ? queue.length : 0;
	
				// Enable finishing flag on private data
				data.finish = true;
	
				// Empty the queue first
				jQuery.queue( this, type, [] );
	
				if ( hooks && hooks.stop ) {
					hooks.stop.call( this, true );
				}
	
				// Look for any active animations, and finish them
				for ( index = timers.length; index--; ) {
					if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
						timers[ index ].anim.stop( true );
						timers.splice( index, 1 );
					}
				}
	
				// Look for any animations in the old queue and finish them
				for ( index = 0; index < length; index++ ) {
					if ( queue[ index ] && queue[ index ].finish ) {
						queue[ index ].finish.call( this );
					}
				}
	
				// Turn off finishing flag
				delete data.finish;
			} );
		}
	} );
	
	jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
		var cssFn = jQuery.fn[ name ];
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return speed == null || typeof speed === "boolean" ?
				cssFn.apply( this, arguments ) :
				this.animate( genFx( name, true ), speed, easing, callback );
		};
	} );
	
	// Generate shortcuts for custom animations
	jQuery.each( {
		slideDown: genFx( "show" ),
		slideUp: genFx( "hide" ),
		slideToggle: genFx( "toggle" ),
		fadeIn: { opacity: "show" },
		fadeOut: { opacity: "hide" },
		fadeToggle: { opacity: "toggle" }
	}, function( name, props ) {
		jQuery.fn[ name ] = function( speed, easing, callback ) {
			return this.animate( props, speed, easing, callback );
		};
	} );
	
	jQuery.timers = [];
	jQuery.fx.tick = function() {
		var timer,
			i = 0,
			timers = jQuery.timers;
	
		fxNow = jQuery.now();
	
		for ( ; i < timers.length; i++ ) {
			timer = timers[ i ];
	
			// Checks the timer has not already been removed
			if ( !timer() && timers[ i ] === timer ) {
				timers.splice( i--, 1 );
			}
		}
	
		if ( !timers.length ) {
			jQuery.fx.stop();
		}
		fxNow = undefined;
	};
	
	jQuery.fx.timer = function( timer ) {
		jQuery.timers.push( timer );
		if ( timer() ) {
			jQuery.fx.start();
		} else {
			jQuery.timers.pop();
		}
	};
	
	jQuery.fx.interval = 13;
	jQuery.fx.start = function() {
		if ( !timerId ) {
			timerId = window.requestAnimationFrame ?
				window.requestAnimationFrame( raf ) :
				window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
		}
	};
	
	jQuery.fx.stop = function() {
		if ( window.cancelAnimationFrame ) {
			window.cancelAnimationFrame( timerId );
		} else {
			window.clearInterval( timerId );
		}
	
		timerId = null;
	};
	
	jQuery.fx.speeds = {
		slow: 600,
		fast: 200,
	
		// Default speed
		_default: 400
	};
	
	
	// Based off of the plugin by Clint Helfers, with permission.
	// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
	jQuery.fn.delay = function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";
	
		return this.queue( type, function( next, hooks ) {
			var timeout = window.setTimeout( next, time );
			hooks.stop = function() {
				window.clearTimeout( timeout );
			};
		} );
	};
	
	
	( function() {
		var input = document.createElement( "input" ),
			select = document.createElement( "select" ),
			opt = select.appendChild( document.createElement( "option" ) );
	
		input.type = "checkbox";
	
		// Support: Android <=4.3 only
		// Default value for a checkbox should be "on"
		support.checkOn = input.value !== "";
	
		// Support: IE <=11 only
		// Must access selectedIndex to make default options select
		support.optSelected = opt.selected;
	
		// Support: IE <=11 only
		// An input loses its value after becoming a radio
		input = document.createElement( "input" );
		input.value = "t";
		input.type = "radio";
		support.radioValue = input.value === "t";
	} )();
	
	
	var boolHook,
		attrHandle = jQuery.expr.attrHandle;
	
	jQuery.fn.extend( {
		attr: function( name, value ) {
			return access( this, jQuery.attr, name, value, arguments.length > 1 );
		},
	
		removeAttr: function( name ) {
			return this.each( function() {
				jQuery.removeAttr( this, name );
			} );
		}
	} );
	
	jQuery.extend( {
		attr: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set attributes on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			// Fallback to prop when attributes are not supported
			if ( typeof elem.getAttribute === "undefined" ) {
				return jQuery.prop( elem, name, value );
			}
	
			// Attribute hooks are determined by the lowercase version
			// Grab necessary hook if one is defined
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
				hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
					( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
			}
	
			if ( value !== undefined ) {
				if ( value === null ) {
					jQuery.removeAttr( elem, name );
					return;
				}
	
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				elem.setAttribute( name, value + "" );
				return value;
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			ret = jQuery.find.attr( elem, name );
	
			// Non-existent attributes return null, we normalize to undefined
			return ret == null ? undefined : ret;
		},
	
		attrHooks: {
			type: {
				set: function( elem, value ) {
					if ( !support.radioValue && value === "radio" &&
						jQuery.nodeName( elem, "input" ) ) {
						var val = elem.value;
						elem.setAttribute( "type", value );
						if ( val ) {
							elem.value = val;
						}
						return value;
					}
				}
			}
		},
	
		removeAttr: function( elem, value ) {
			var name,
				i = 0,
	
				// Attribute names can contain non-HTML whitespace characters
				// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
				attrNames = value && value.match( rnothtmlwhite );
	
			if ( attrNames && elem.nodeType === 1 ) {
				while ( ( name = attrNames[ i++ ] ) ) {
					elem.removeAttribute( name );
				}
			}
		}
	} );
	
	// Hooks for boolean attributes
	boolHook = {
		set: function( elem, value, name ) {
			if ( value === false ) {
	
				// Remove boolean attributes when set to false
				jQuery.removeAttr( elem, name );
			} else {
				elem.setAttribute( name, name );
			}
			return name;
		}
	};
	
	jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
		var getter = attrHandle[ name ] || jQuery.find.attr;
	
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle,
				lowercaseName = name.toLowerCase();
	
			if ( !isXML ) {
	
				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ lowercaseName ];
				attrHandle[ lowercaseName ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					lowercaseName :
					null;
				attrHandle[ lowercaseName ] = handle;
			}
			return ret;
		};
	} );
	
	
	
	
	var rfocusable = /^(?:input|select|textarea|button)$/i,
		rclickable = /^(?:a|area)$/i;
	
	jQuery.fn.extend( {
		prop: function( name, value ) {
			return access( this, jQuery.prop, name, value, arguments.length > 1 );
		},
	
		removeProp: function( name ) {
			return this.each( function() {
				delete this[ jQuery.propFix[ name ] || name ];
			} );
		}
	} );
	
	jQuery.extend( {
		prop: function( elem, name, value ) {
			var ret, hooks,
				nType = elem.nodeType;
	
			// Don't get/set properties on text, comment and attribute nodes
			if ( nType === 3 || nType === 8 || nType === 2 ) {
				return;
			}
	
			if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
	
				// Fix name and attach hooks
				name = jQuery.propFix[ name ] || name;
				hooks = jQuery.propHooks[ name ];
			}
	
			if ( value !== undefined ) {
				if ( hooks && "set" in hooks &&
					( ret = hooks.set( elem, value, name ) ) !== undefined ) {
					return ret;
				}
	
				return ( elem[ name ] = value );
			}
	
			if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
				return ret;
			}
	
			return elem[ name ];
		},
	
		propHooks: {
			tabIndex: {
				get: function( elem ) {
	
					// Support: IE <=9 - 11 only
					// elem.tabIndex doesn't always return the
					// correct value when it hasn't been explicitly set
					// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
					// Use proper attribute retrieval(#12072)
					var tabindex = jQuery.find.attr( elem, "tabindex" );
	
					if ( tabindex ) {
						return parseInt( tabindex, 10 );
					}
	
					if (
						rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) &&
						elem.href
					) {
						return 0;
					}
	
					return -1;
				}
			}
		},
	
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	} );
	
	// Support: IE <=11 only
	// Accessing the selectedIndex property
	// forces the browser to respect setting selected
	// on the option
	// The getter ensures a default option is selected
	// when in an optgroup
	// eslint rule "no-unused-expressions" is disabled for this code
	// since it considers such accessions noop
	if ( !support.optSelected ) {
		jQuery.propHooks.selected = {
			get: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent && parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
				return null;
			},
			set: function( elem ) {
	
				/* eslint no-unused-expressions: "off" */
	
				var parent = elem.parentNode;
				if ( parent ) {
					parent.selectedIndex;
	
					if ( parent.parentNode ) {
						parent.parentNode.selectedIndex;
					}
				}
			}
		};
	}
	
	jQuery.each( [
		"tabIndex",
		"readOnly",
		"maxLength",
		"cellSpacing",
		"cellPadding",
		"rowSpan",
		"colSpan",
		"useMap",
		"frameBorder",
		"contentEditable"
	], function() {
		jQuery.propFix[ this.toLowerCase() ] = this;
	} );
	
	
	
	
		// Strip and collapse whitespace according to HTML spec
		// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
		function stripAndCollapse( value ) {
			var tokens = value.match( rnothtmlwhite ) || [];
			return tokens.join( " " );
		}
	
	
	function getClass( elem ) {
		return elem.getAttribute && elem.getAttribute( "class" ) || "";
	}
	
	jQuery.fn.extend( {
		addClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
							if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
								cur += clazz + " ";
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		removeClass: function( value ) {
			var classes, elem, cur, curValue, clazz, j, finalValue,
				i = 0;
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( j ) {
					jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
				} );
			}
	
			if ( !arguments.length ) {
				return this.attr( "class", "" );
			}
	
			if ( typeof value === "string" && value ) {
				classes = value.match( rnothtmlwhite ) || [];
	
				while ( ( elem = this[ i++ ] ) ) {
					curValue = getClass( elem );
	
					// This expression is here for better compressibility (see addClass)
					cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );
	
					if ( cur ) {
						j = 0;
						while ( ( clazz = classes[ j++ ] ) ) {
	
							// Remove *all* instances
							while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
								cur = cur.replace( " " + clazz + " ", " " );
							}
						}
	
						// Only assign if different to avoid unneeded rendering.
						finalValue = stripAndCollapse( cur );
						if ( curValue !== finalValue ) {
							elem.setAttribute( "class", finalValue );
						}
					}
				}
			}
	
			return this;
		},
	
		toggleClass: function( value, stateVal ) {
			var type = typeof value;
	
			if ( typeof stateVal === "boolean" && type === "string" ) {
				return stateVal ? this.addClass( value ) : this.removeClass( value );
			}
	
			if ( jQuery.isFunction( value ) ) {
				return this.each( function( i ) {
					jQuery( this ).toggleClass(
						value.call( this, i, getClass( this ), stateVal ),
						stateVal
					);
				} );
			}
	
			return this.each( function() {
				var className, i, self, classNames;
	
				if ( type === "string" ) {
	
					// Toggle individual class names
					i = 0;
					self = jQuery( this );
					classNames = value.match( rnothtmlwhite ) || [];
	
					while ( ( className = classNames[ i++ ] ) ) {
	
						// Check each className given, space separated list
						if ( self.hasClass( className ) ) {
							self.removeClass( className );
						} else {
							self.addClass( className );
						}
					}
	
				// Toggle whole class name
				} else if ( value === undefined || type === "boolean" ) {
					className = getClass( this );
					if ( className ) {
	
						// Store className if set
						dataPriv.set( this, "__className__", className );
					}
	
					// If the element has a class name or if we're passed `false`,
					// then remove the whole classname (if there was one, the above saved it).
					// Otherwise bring back whatever was previously saved (if anything),
					// falling back to the empty string if nothing was stored.
					if ( this.setAttribute ) {
						this.setAttribute( "class",
							className || value === false ?
							"" :
							dataPriv.get( this, "__className__" ) || ""
						);
					}
				}
			} );
		},
	
		hasClass: function( selector ) {
			var className, elem,
				i = 0;
	
			className = " " + selector + " ";
			while ( ( elem = this[ i++ ] ) ) {
				if ( elem.nodeType === 1 &&
					( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
						return true;
				}
			}
	
			return false;
		}
	} );
	
	
	
	
	var rreturn = /\r/g;
	
	jQuery.fn.extend( {
		val: function( value ) {
			var hooks, ret, isFunction,
				elem = this[ 0 ];
	
			if ( !arguments.length ) {
				if ( elem ) {
					hooks = jQuery.valHooks[ elem.type ] ||
						jQuery.valHooks[ elem.nodeName.toLowerCase() ];
	
					if ( hooks &&
						"get" in hooks &&
						( ret = hooks.get( elem, "value" ) ) !== undefined
					) {
						return ret;
					}
	
					ret = elem.value;
	
					// Handle most common string cases
					if ( typeof ret === "string" ) {
						return ret.replace( rreturn, "" );
					}
	
					// Handle cases where value is null/undef or number
					return ret == null ? "" : ret;
				}
	
				return;
			}
	
			isFunction = jQuery.isFunction( value );
	
			return this.each( function( i ) {
				var val;
	
				if ( this.nodeType !== 1 ) {
					return;
				}
	
				if ( isFunction ) {
					val = value.call( this, i, jQuery( this ).val() );
				} else {
					val = value;
				}
	
				// Treat null/undefined as ""; convert numbers to string
				if ( val == null ) {
					val = "";
	
				} else if ( typeof val === "number" ) {
					val += "";
	
				} else if ( jQuery.isArray( val ) ) {
					val = jQuery.map( val, function( value ) {
						return value == null ? "" : value + "";
					} );
				}
	
				hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];
	
				// If set returns undefined, fall back to normal setting
				if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
					this.value = val;
				}
			} );
		}
	} );
	
	jQuery.extend( {
		valHooks: {
			option: {
				get: function( elem ) {
	
					var val = jQuery.find.attr( elem, "value" );
					return val != null ?
						val :
	
						// Support: IE <=10 - 11 only
						// option.text throws exceptions (#14686, #14858)
						// Strip and collapse whitespace
						// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
						stripAndCollapse( jQuery.text( elem ) );
				}
			},
			select: {
				get: function( elem ) {
					var value, option, i,
						options = elem.options,
						index = elem.selectedIndex,
						one = elem.type === "select-one",
						values = one ? null : [],
						max = one ? index + 1 : options.length;
	
					if ( index < 0 ) {
						i = max;
	
					} else {
						i = one ? index : 0;
					}
	
					// Loop through all the selected options
					for ( ; i < max; i++ ) {
						option = options[ i ];
	
						// Support: IE <=9 only
						// IE8-9 doesn't update selected after form reset (#2551)
						if ( ( option.selected || i === index ) &&
	
								// Don't return options that are disabled or in a disabled optgroup
								!option.disabled &&
								( !option.parentNode.disabled ||
									!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {
	
							// Get the specific value for the option
							value = jQuery( option ).val();
	
							// We don't need an array for one selects
							if ( one ) {
								return value;
							}
	
							// Multi-Selects return an array
							values.push( value );
						}
					}
	
					return values;
				},
	
				set: function( elem, value ) {
					var optionSet, option,
						options = elem.options,
						values = jQuery.makeArray( value ),
						i = options.length;
	
					while ( i-- ) {
						option = options[ i ];
	
						/* eslint-disable no-cond-assign */
	
						if ( option.selected =
							jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
						) {
							optionSet = true;
						}
	
						/* eslint-enable no-cond-assign */
					}
	
					// Force browsers to behave consistently when non-matching value is set
					if ( !optionSet ) {
						elem.selectedIndex = -1;
					}
					return values;
				}
			}
		}
	} );
	
	// Radios and checkboxes getter/setter
	jQuery.each( [ "radio", "checkbox" ], function() {
		jQuery.valHooks[ this ] = {
			set: function( elem, value ) {
				if ( jQuery.isArray( value ) ) {
					return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
				}
			}
		};
		if ( !support.checkOn ) {
			jQuery.valHooks[ this ].get = function( elem ) {
				return elem.getAttribute( "value" ) === null ? "on" : elem.value;
			};
		}
	} );
	
	
	
	
	// Return jQuery for attributes-only inclusion
	
	
	var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;
	
	jQuery.extend( jQuery.event, {
	
		trigger: function( event, data, elem, onlyHandlers ) {
	
			var i, cur, tmp, bubbleType, ontype, handle, special,
				eventPath = [ elem || document ],
				type = hasOwn.call( event, "type" ) ? event.type : event,
				namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];
	
			cur = tmp = elem = elem || document;
	
			// Don't do events on text and comment nodes
			if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
				return;
			}
	
			// focus/blur morphs to focusin/out; ensure we're not firing them right now
			if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
				return;
			}
	
			if ( type.indexOf( "." ) > -1 ) {
	
				// Namespaced trigger; create a regexp to match event type in handle()
				namespaces = type.split( "." );
				type = namespaces.shift();
				namespaces.sort();
			}
			ontype = type.indexOf( ":" ) < 0 && "on" + type;
	
			// Caller can pass in a jQuery.Event object, Object, or just an event type string
			event = event[ jQuery.expando ] ?
				event :
				new jQuery.Event( type, typeof event === "object" && event );
	
			// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
			event.isTrigger = onlyHandlers ? 2 : 3;
			event.namespace = namespaces.join( "." );
			event.rnamespace = event.namespace ?
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
				null;
	
			// Clean up the event in case it is being reused
			event.result = undefined;
			if ( !event.target ) {
				event.target = elem;
			}
	
			// Clone any incoming data and prepend the event, creating the handler arg list
			data = data == null ?
				[ event ] :
				jQuery.makeArray( data, [ event ] );
	
			// Allow special events to draw outside the lines
			special = jQuery.event.special[ type ] || {};
			if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
				return;
			}
	
			// Determine event propagation path in advance, per W3C events spec (#9951)
			// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
			if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {
	
				bubbleType = special.delegateType || type;
				if ( !rfocusMorph.test( bubbleType + type ) ) {
					cur = cur.parentNode;
				}
				for ( ; cur; cur = cur.parentNode ) {
					eventPath.push( cur );
					tmp = cur;
				}
	
				// Only add window if we got to document (e.g., not plain obj or detached DOM)
				if ( tmp === ( elem.ownerDocument || document ) ) {
					eventPath.push( tmp.defaultView || tmp.parentWindow || window );
				}
			}
	
			// Fire handlers on the event path
			i = 0;
			while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
	
				event.type = i > 1 ?
					bubbleType :
					special.bindType || type;
	
				// jQuery handler
				handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
					dataPriv.get( cur, "handle" );
				if ( handle ) {
					handle.apply( cur, data );
				}
	
				// Native handler
				handle = ontype && cur[ ontype ];
				if ( handle && handle.apply && acceptData( cur ) ) {
					event.result = handle.apply( cur, data );
					if ( event.result === false ) {
						event.preventDefault();
					}
				}
			}
			event.type = type;
	
			// If nobody prevented the default action, do it now
			if ( !onlyHandlers && !event.isDefaultPrevented() ) {
	
				if ( ( !special._default ||
					special._default.apply( eventPath.pop(), data ) === false ) &&
					acceptData( elem ) ) {
	
					// Call a native DOM method on the target with the same name as the event.
					// Don't do default actions on window, that's where global variables be (#6170)
					if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {
	
						// Don't re-trigger an onFOO event when we call its FOO() method
						tmp = elem[ ontype ];
	
						if ( tmp ) {
							elem[ ontype ] = null;
						}
	
						// Prevent re-triggering of the same event, since we already bubbled it above
						jQuery.event.triggered = type;
						elem[ type ]();
						jQuery.event.triggered = undefined;
	
						if ( tmp ) {
							elem[ ontype ] = tmp;
						}
					}
				}
			}
	
			return event.result;
		},
	
		// Piggyback on a donor event to simulate a different one
		// Used only for `focus(in | out)` events
		simulate: function( type, elem, event ) {
			var e = jQuery.extend(
				new jQuery.Event(),
				event,
				{
					type: type,
					isSimulated: true
				}
			);
	
			jQuery.event.trigger( e, null, elem );
		}
	
	} );
	
	jQuery.fn.extend( {
	
		trigger: function( type, data ) {
			return this.each( function() {
				jQuery.event.trigger( type, data, this );
			} );
		},
		triggerHandler: function( type, data ) {
			var elem = this[ 0 ];
			if ( elem ) {
				return jQuery.event.trigger( type, data, elem, true );
			}
		}
	} );
	
	
	jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
		"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
		"change select submit keydown keypress keyup contextmenu" ).split( " " ),
		function( i, name ) {
	
		// Handle event binding
		jQuery.fn[ name ] = function( data, fn ) {
			return arguments.length > 0 ?
				this.on( name, null, data, fn ) :
				this.trigger( name );
		};
	} );
	
	jQuery.fn.extend( {
		hover: function( fnOver, fnOut ) {
			return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
		}
	} );
	
	
	
	
	support.focusin = "onfocusin" in window;
	
	
	// Support: Firefox <=44
	// Firefox doesn't have focus(in | out) events
	// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
	//
	// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
	// focus(in | out) events fire after focus & blur events,
	// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
	// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
	if ( !support.focusin ) {
		jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {
	
			// Attach a single capturing handler on the document while someone wants focusin/focusout
			var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
			};
	
			jQuery.event.special[ fix ] = {
				setup: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix );
	
					if ( !attaches ) {
						doc.addEventListener( orig, handler, true );
					}
					dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
				},
				teardown: function() {
					var doc = this.ownerDocument || this,
						attaches = dataPriv.access( doc, fix ) - 1;
	
					if ( !attaches ) {
						doc.removeEventListener( orig, handler, true );
						dataPriv.remove( doc, fix );
	
					} else {
						dataPriv.access( doc, fix, attaches );
					}
				}
			};
		} );
	}
	var location = window.location;
	
	var nonce = jQuery.now();
	
	var rquery = ( /\?/ );
	
	
	
	// Cross-browser xml parsing
	jQuery.parseXML = function( data ) {
		var xml;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
	
		// Support: IE 9 - 11 only
		// IE throws on parseFromString with invalid input.
		try {
			xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
		} catch ( e ) {
			xml = undefined;
		}
	
		if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	};
	
	
	var
		rbracket = /\[\]$/,
		rCRLF = /\r?\n/g,
		rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
		rsubmittable = /^(?:input|select|textarea|keygen)/i;
	
	function buildParams( prefix, obj, traditional, add ) {
		var name;
	
		if ( jQuery.isArray( obj ) ) {
	
			// Serialize array item.
			jQuery.each( obj, function( i, v ) {
				if ( traditional || rbracket.test( prefix ) ) {
	
					// Treat each array item as a scalar.
					add( prefix, v );
	
				} else {
	
					// Item is non-scalar (array or object), encode its numeric index.
					buildParams(
						prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
						v,
						traditional,
						add
					);
				}
			} );
	
		} else if ( !traditional && jQuery.type( obj ) === "object" ) {
	
			// Serialize object item.
			for ( name in obj ) {
				buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
			}
	
		} else {
	
			// Serialize scalar item.
			add( prefix, obj );
		}
	}
	
	// Serialize an array of form elements or a set of
	// key/values into a query string
	jQuery.param = function( a, traditional ) {
		var prefix,
			s = [],
			add = function( key, valueOrFunction ) {
	
				// If value is a function, invoke it and use its return value
				var value = jQuery.isFunction( valueOrFunction ) ?
					valueOrFunction() :
					valueOrFunction;
	
				s[ s.length ] = encodeURIComponent( key ) + "=" +
					encodeURIComponent( value == null ? "" : value );
			};
	
		// If an array was passed in, assume that it is an array of form elements.
		if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
	
			// Serialize the form elements
			jQuery.each( a, function() {
				add( this.name, this.value );
			} );
	
		} else {
	
			// If traditional, encode the "old" way (the way 1.3.2 or older
			// did it), otherwise encode params recursively.
			for ( prefix in a ) {
				buildParams( prefix, a[ prefix ], traditional, add );
			}
		}
	
		// Return the resulting serialization
		return s.join( "&" );
	};
	
	jQuery.fn.extend( {
		serialize: function() {
			return jQuery.param( this.serializeArray() );
		},
		serializeArray: function() {
			return this.map( function() {
	
				// Can add propHook for "elements" to filter or add form elements
				var elements = jQuery.prop( this, "elements" );
				return elements ? jQuery.makeArray( elements ) : this;
			} )
			.filter( function() {
				var type = this.type;
	
				// Use .is( ":disabled" ) so that fieldset[disabled] works
				return this.name && !jQuery( this ).is( ":disabled" ) &&
					rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
					( this.checked || !rcheckableType.test( type ) );
			} )
			.map( function( i, elem ) {
				var val = jQuery( this ).val();
	
				if ( val == null ) {
					return null;
				}
	
				if ( jQuery.isArray( val ) ) {
					return jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} );
				}
	
				return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
			} ).get();
		}
	} );
	
	
	var
		r20 = /%20/g,
		rhash = /#.*$/,
		rantiCache = /([?&])_=[^&]*/,
		rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	
		// #7653, #8125, #8152: local protocol detection
		rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
		rnoContent = /^(?:GET|HEAD)$/,
		rprotocol = /^\/\//,
	
		/* Prefilters
		 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
		 * 2) These are called:
		 *    - BEFORE asking for a transport
		 *    - AFTER param serialization (s.data is a string if s.processData is true)
		 * 3) key is the dataType
		 * 4) the catchall symbol "*" can be used
		 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
		 */
		prefilters = {},
	
		/* Transports bindings
		 * 1) key is the dataType
		 * 2) the catchall symbol "*" can be used
		 * 3) selection will start with transport dataType and THEN go to "*" if needed
		 */
		transports = {},
	
		// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
		allTypes = "*/".concat( "*" ),
	
		// Anchor tag for parsing the document origin
		originAnchor = document.createElement( "a" );
		originAnchor.href = location.href;
	
	// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
	function addToPrefiltersOrTransports( structure ) {
	
		// dataTypeExpression is optional and defaults to "*"
		return function( dataTypeExpression, func ) {
	
			if ( typeof dataTypeExpression !== "string" ) {
				func = dataTypeExpression;
				dataTypeExpression = "*";
			}
	
			var dataType,
				i = 0,
				dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];
	
			if ( jQuery.isFunction( func ) ) {
	
				// For each dataType in the dataTypeExpression
				while ( ( dataType = dataTypes[ i++ ] ) ) {
	
					// Prepend if requested
					if ( dataType[ 0 ] === "+" ) {
						dataType = dataType.slice( 1 ) || "*";
						( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );
	
					// Otherwise append
					} else {
						( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
					}
				}
			}
		};
	}
	
	// Base inspection function for prefilters and transports
	function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {
	
		var inspected = {},
			seekingTransport = ( structure === transports );
	
		function inspect( dataType ) {
			var selected;
			inspected[ dataType ] = true;
			jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
				var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
				if ( typeof dataTypeOrTransport === "string" &&
					!seekingTransport && !inspected[ dataTypeOrTransport ] ) {
	
					options.dataTypes.unshift( dataTypeOrTransport );
					inspect( dataTypeOrTransport );
					return false;
				} else if ( seekingTransport ) {
					return !( selected = dataTypeOrTransport );
				}
			} );
			return selected;
		}
	
		return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
	}
	
	// A special extend for ajax options
	// that takes "flat" options (not to be deep extended)
	// Fixes #9887
	function ajaxExtend( target, src ) {
		var key, deep,
			flatOptions = jQuery.ajaxSettings.flatOptions || {};
	
		for ( key in src ) {
			if ( src[ key ] !== undefined ) {
				( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
			}
		}
		if ( deep ) {
			jQuery.extend( true, target, deep );
		}
	
		return target;
	}
	
	/* Handles responses to an ajax request:
	 * - finds the right dataType (mediates between content-type and expected dataType)
	 * - returns the corresponding response
	 */
	function ajaxHandleResponses( s, jqXHR, responses ) {
	
		var ct, type, finalDataType, firstDataType,
			contents = s.contents,
			dataTypes = s.dataTypes;
	
		// Remove auto dataType and get content-type in the process
		while ( dataTypes[ 0 ] === "*" ) {
			dataTypes.shift();
			if ( ct === undefined ) {
				ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
			}
		}
	
		// Check if we're dealing with a known content-type
		if ( ct ) {
			for ( type in contents ) {
				if ( contents[ type ] && contents[ type ].test( ct ) ) {
					dataTypes.unshift( type );
					break;
				}
			}
		}
	
		// Check to see if we have a response for the expected dataType
		if ( dataTypes[ 0 ] in responses ) {
			finalDataType = dataTypes[ 0 ];
		} else {
	
			// Try convertible dataTypes
			for ( type in responses ) {
				if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
					finalDataType = type;
					break;
				}
				if ( !firstDataType ) {
					firstDataType = type;
				}
			}
	
			// Or just use first one
			finalDataType = finalDataType || firstDataType;
		}
	
		// If we found a dataType
		// We add the dataType to the list if needed
		// and return the corresponding response
		if ( finalDataType ) {
			if ( finalDataType !== dataTypes[ 0 ] ) {
				dataTypes.unshift( finalDataType );
			}
			return responses[ finalDataType ];
		}
	}
	
	/* Chain conversions given the request and the original response
	 * Also sets the responseXXX fields on the jqXHR instance
	 */
	function ajaxConvert( s, response, jqXHR, isSuccess ) {
		var conv2, current, conv, tmp, prev,
			converters = {},
	
			// Work with a copy of dataTypes in case we need to modify it for conversion
			dataTypes = s.dataTypes.slice();
	
		// Create converters map with lowercased keys
		if ( dataTypes[ 1 ] ) {
			for ( conv in s.converters ) {
				converters[ conv.toLowerCase() ] = s.converters[ conv ];
			}
		}
	
		current = dataTypes.shift();
	
		// Convert to each sequential dataType
		while ( current ) {
	
			if ( s.responseFields[ current ] ) {
				jqXHR[ s.responseFields[ current ] ] = response;
			}
	
			// Apply the dataFilter if provided
			if ( !prev && isSuccess && s.dataFilter ) {
				response = s.dataFilter( response, s.dataType );
			}
	
			prev = current;
			current = dataTypes.shift();
	
			if ( current ) {
	
				// There's only work to do if current dataType is non-auto
				if ( current === "*" ) {
	
					current = prev;
	
				// Convert response if prev dataType is non-auto and differs from current
				} else if ( prev !== "*" && prev !== current ) {
	
					// Seek a direct converter
					conv = converters[ prev + " " + current ] || converters[ "* " + current ];
	
					// If none found, seek a pair
					if ( !conv ) {
						for ( conv2 in converters ) {
	
							// If conv2 outputs current
							tmp = conv2.split( " " );
							if ( tmp[ 1 ] === current ) {
	
								// If prev can be converted to accepted input
								conv = converters[ prev + " " + tmp[ 0 ] ] ||
									converters[ "* " + tmp[ 0 ] ];
								if ( conv ) {
	
									// Condense equivalence converters
									if ( conv === true ) {
										conv = converters[ conv2 ];
	
									// Otherwise, insert the intermediate dataType
									} else if ( converters[ conv2 ] !== true ) {
										current = tmp[ 0 ];
										dataTypes.unshift( tmp[ 1 ] );
									}
									break;
								}
							}
						}
					}
	
					// Apply converter (if not an equivalence)
					if ( conv !== true ) {
	
						// Unless errors are allowed to bubble, catch and return them
						if ( conv && s.throws ) {
							response = conv( response );
						} else {
							try {
								response = conv( response );
							} catch ( e ) {
								return {
									state: "parsererror",
									error: conv ? e : "No conversion from " + prev + " to " + current
								};
							}
						}
					}
				}
			}
		}
	
		return { state: "success", data: response };
	}
	
	jQuery.extend( {
	
		// Counter for holding the number of active queries
		active: 0,
	
		// Last-Modified header cache for next request
		lastModified: {},
		etag: {},
	
		ajaxSettings: {
			url: location.href,
			type: "GET",
			isLocal: rlocalProtocol.test( location.protocol ),
			global: true,
			processData: true,
			async: true,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
	
			/*
			timeout: 0,
			data: null,
			dataType: null,
			username: null,
			password: null,
			cache: null,
			throws: false,
			traditional: false,
			headers: {},
			*/
	
			accepts: {
				"*": allTypes,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
	
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
	
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
	
			// Data converters
			// Keys separate source (or catchall "*") and destination types with a single space
			converters: {
	
				// Convert anything to text
				"* text": String,
	
				// Text to html (true = no transformation)
				"text html": true,
	
				// Evaluate text as a json expression
				"text json": JSON.parse,
	
				// Parse text as xml
				"text xml": jQuery.parseXML
			},
	
			// For options that shouldn't be deep extended:
			// you can add your own custom options here if
			// and when you create one that shouldn't be
			// deep extended (see ajaxExtend)
			flatOptions: {
				url: true,
				context: true
			}
		},
	
		// Creates a full fledged settings object into target
		// with both ajaxSettings and settings fields.
		// If target is omitted, writes into ajaxSettings.
		ajaxSetup: function( target, settings ) {
			return settings ?
	
				// Building a settings object
				ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :
	
				// Extending ajaxSettings
				ajaxExtend( jQuery.ajaxSettings, target );
		},
	
		ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
		ajaxTransport: addToPrefiltersOrTransports( transports ),
	
		// Main method
		ajax: function( url, options ) {
	
			// If url is an object, simulate pre-1.5 signature
			if ( typeof url === "object" ) {
				options = url;
				url = undefined;
			}
	
			// Force options to be an object
			options = options || {};
	
			var transport,
	
				// URL without anti-cache param
				cacheURL,
	
				// Response headers
				responseHeadersString,
				responseHeaders,
	
				// timeout handle
				timeoutTimer,
	
				// Url cleanup var
				urlAnchor,
	
				// Request state (becomes false upon send and true upon completion)
				completed,
	
				// To know if global events are to be dispatched
				fireGlobals,
	
				// Loop variable
				i,
	
				// uncached part of the url
				uncached,
	
				// Create the final options object
				s = jQuery.ajaxSetup( {}, options ),
	
				// Callbacks context
				callbackContext = s.context || s,
	
				// Context for global events is callbackContext if it is a DOM node or jQuery collection
				globalEventContext = s.context &&
					( callbackContext.nodeType || callbackContext.jquery ) ?
						jQuery( callbackContext ) :
						jQuery.event,
	
				// Deferreds
				deferred = jQuery.Deferred(),
				completeDeferred = jQuery.Callbacks( "once memory" ),
	
				// Status-dependent callbacks
				statusCode = s.statusCode || {},
	
				// Headers (they are sent all at once)
				requestHeaders = {},
				requestHeadersNames = {},
	
				// Default abort message
				strAbort = "canceled",
	
				// Fake xhr
				jqXHR = {
					readyState: 0,
	
					// Builds headers hashtable if needed
					getResponseHeader: function( key ) {
						var match;
						if ( completed ) {
							if ( !responseHeaders ) {
								responseHeaders = {};
								while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
									responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
								}
							}
							match = responseHeaders[ key.toLowerCase() ];
						}
						return match == null ? null : match;
					},
	
					// Raw string
					getAllResponseHeaders: function() {
						return completed ? responseHeadersString : null;
					},
	
					// Caches the header
					setRequestHeader: function( name, value ) {
						if ( completed == null ) {
							name = requestHeadersNames[ name.toLowerCase() ] =
								requestHeadersNames[ name.toLowerCase() ] || name;
							requestHeaders[ name ] = value;
						}
						return this;
					},
	
					// Overrides response content-type header
					overrideMimeType: function( type ) {
						if ( completed == null ) {
							s.mimeType = type;
						}
						return this;
					},
	
					// Status-dependent callbacks
					statusCode: function( map ) {
						var code;
						if ( map ) {
							if ( completed ) {
	
								// Execute the appropriate callbacks
								jqXHR.always( map[ jqXHR.status ] );
							} else {
	
								// Lazy-add the new callbacks in a way that preserves old ones
								for ( code in map ) {
									statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
								}
							}
						}
						return this;
					},
	
					// Cancel the request
					abort: function( statusText ) {
						var finalText = statusText || strAbort;
						if ( transport ) {
							transport.abort( finalText );
						}
						done( 0, finalText );
						return this;
					}
				};
	
			// Attach deferreds
			deferred.promise( jqXHR );
	
			// Add protocol if not provided (prefilters might expect it)
			// Handle falsy url in the settings object (#10093: consistency with old signature)
			// We also use the url parameter if available
			s.url = ( ( url || s.url || location.href ) + "" )
				.replace( rprotocol, location.protocol + "//" );
	
			// Alias method option to type as per ticket #12004
			s.type = options.method || options.type || s.method || s.type;
	
			// Extract dataTypes list
			s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];
	
			// A cross-domain request is in order when the origin doesn't match the current origin.
			if ( s.crossDomain == null ) {
				urlAnchor = document.createElement( "a" );
	
				// Support: IE <=8 - 11, Edge 12 - 13
				// IE throws exception on accessing the href property if url is malformed,
				// e.g. http://example.com:80x/
				try {
					urlAnchor.href = s.url;
	
					// Support: IE <=8 - 11 only
					// Anchor's host property isn't correctly set when s.url is relative
					urlAnchor.href = urlAnchor.href;
					s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
						urlAnchor.protocol + "//" + urlAnchor.host;
				} catch ( e ) {
	
					// If there is an error parsing the URL, assume it is crossDomain,
					// it can be rejected by the transport if it is invalid
					s.crossDomain = true;
				}
			}
	
			// Convert data if not already a string
			if ( s.data && s.processData && typeof s.data !== "string" ) {
				s.data = jQuery.param( s.data, s.traditional );
			}
	
			// Apply prefilters
			inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );
	
			// If request was aborted inside a prefilter, stop there
			if ( completed ) {
				return jqXHR;
			}
	
			// We can fire global events as of now if asked to
			// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
			fireGlobals = jQuery.event && s.global;
	
			// Watch for a new set of requests
			if ( fireGlobals && jQuery.active++ === 0 ) {
				jQuery.event.trigger( "ajaxStart" );
			}
	
			// Uppercase the type
			s.type = s.type.toUpperCase();
	
			// Determine if request has content
			s.hasContent = !rnoContent.test( s.type );
	
			// Save the URL in case we're toying with the If-Modified-Since
			// and/or If-None-Match header later on
			// Remove hash to simplify url manipulation
			cacheURL = s.url.replace( rhash, "" );
	
			// More options handling for requests with no content
			if ( !s.hasContent ) {
	
				// Remember the hash so we can put it back
				uncached = s.url.slice( cacheURL.length );
	
				// If data is available, append data to url
				if ( s.data ) {
					cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;
	
					// #9682: remove data so that it's not used in an eventual retry
					delete s.data;
				}
	
				// Add or update anti-cache param if needed
				if ( s.cache === false ) {
					cacheURL = cacheURL.replace( rantiCache, "$1" );
					uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
				}
	
				// Put hash and anti-cache on the URL that will be requested (gh-1732)
				s.url = cacheURL + uncached;
	
			// Change '%20' to '+' if this is encoded form body content (gh-2658)
			} else if ( s.data && s.processData &&
				( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
				s.data = s.data.replace( r20, "+" );
			}
	
			// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
			if ( s.ifModified ) {
				if ( jQuery.lastModified[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
				}
				if ( jQuery.etag[ cacheURL ] ) {
					jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
				}
			}
	
			// Set the correct header, if data is being sent
			if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
				jqXHR.setRequestHeader( "Content-Type", s.contentType );
			}
	
			// Set the Accepts header for the server, depending on the dataType
			jqXHR.setRequestHeader(
				"Accept",
				s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
					s.accepts[ s.dataTypes[ 0 ] ] +
						( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
					s.accepts[ "*" ]
			);
	
			// Check for headers option
			for ( i in s.headers ) {
				jqXHR.setRequestHeader( i, s.headers[ i ] );
			}
	
			// Allow custom headers/mimetypes and early abort
			if ( s.beforeSend &&
				( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {
	
				// Abort if not done already and return
				return jqXHR.abort();
			}
	
			// Aborting is no longer a cancellation
			strAbort = "abort";
	
			// Install callbacks on deferreds
			completeDeferred.add( s.complete );
			jqXHR.done( s.success );
			jqXHR.fail( s.error );
	
			// Get transport
			transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );
	
			// If no transport, we auto-abort
			if ( !transport ) {
				done( -1, "No Transport" );
			} else {
				jqXHR.readyState = 1;
	
				// Send global event
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
				}
	
				// If request was aborted inside ajaxSend, stop there
				if ( completed ) {
					return jqXHR;
				}
	
				// Timeout
				if ( s.async && s.timeout > 0 ) {
					timeoutTimer = window.setTimeout( function() {
						jqXHR.abort( "timeout" );
					}, s.timeout );
				}
	
				try {
					completed = false;
					transport.send( requestHeaders, done );
				} catch ( e ) {
	
					// Rethrow post-completion exceptions
					if ( completed ) {
						throw e;
					}
	
					// Propagate others as results
					done( -1, e );
				}
			}
	
			// Callback for when everything is done
			function done( status, nativeStatusText, responses, headers ) {
				var isSuccess, success, error, response, modified,
					statusText = nativeStatusText;
	
				// Ignore repeat invocations
				if ( completed ) {
					return;
				}
	
				completed = true;
	
				// Clear timeout if it exists
				if ( timeoutTimer ) {
					window.clearTimeout( timeoutTimer );
				}
	
				// Dereference transport for early garbage collection
				// (no matter how long the jqXHR object will be used)
				transport = undefined;
	
				// Cache response headers
				responseHeadersString = headers || "";
	
				// Set readyState
				jqXHR.readyState = status > 0 ? 4 : 0;
	
				// Determine if successful
				isSuccess = status >= 200 && status < 300 || status === 304;
	
				// Get response data
				if ( responses ) {
					response = ajaxHandleResponses( s, jqXHR, responses );
				}
	
				// Convert no matter what (that way responseXXX fields are always set)
				response = ajaxConvert( s, response, jqXHR, isSuccess );
	
				// If successful, handle type chaining
				if ( isSuccess ) {
	
					// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
					if ( s.ifModified ) {
						modified = jqXHR.getResponseHeader( "Last-Modified" );
						if ( modified ) {
							jQuery.lastModified[ cacheURL ] = modified;
						}
						modified = jqXHR.getResponseHeader( "etag" );
						if ( modified ) {
							jQuery.etag[ cacheURL ] = modified;
						}
					}
	
					// if no content
					if ( status === 204 || s.type === "HEAD" ) {
						statusText = "nocontent";
	
					// if not modified
					} else if ( status === 304 ) {
						statusText = "notmodified";
	
					// If we have data, let's convert it
					} else {
						statusText = response.state;
						success = response.data;
						error = response.error;
						isSuccess = !error;
					}
				} else {
	
					// Extract error from statusText and normalize for non-aborts
					error = statusText;
					if ( status || !statusText ) {
						statusText = "error";
						if ( status < 0 ) {
							status = 0;
						}
					}
				}
	
				// Set data for the fake xhr object
				jqXHR.status = status;
				jqXHR.statusText = ( nativeStatusText || statusText ) + "";
	
				// Success/Error
				if ( isSuccess ) {
					deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
				} else {
					deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
				}
	
				// Status-dependent callbacks
				jqXHR.statusCode( statusCode );
				statusCode = undefined;
	
				if ( fireGlobals ) {
					globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
						[ jqXHR, s, isSuccess ? success : error ] );
				}
	
				// Complete
				completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );
	
				if ( fireGlobals ) {
					globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
	
					// Handle the global AJAX counter
					if ( !( --jQuery.active ) ) {
						jQuery.event.trigger( "ajaxStop" );
					}
				}
			}
	
			return jqXHR;
		},
	
		getJSON: function( url, data, callback ) {
			return jQuery.get( url, data, callback, "json" );
		},
	
		getScript: function( url, callback ) {
			return jQuery.get( url, undefined, callback, "script" );
		}
	} );
	
	jQuery.each( [ "get", "post" ], function( i, method ) {
		jQuery[ method ] = function( url, data, callback, type ) {
	
			// Shift arguments if data argument was omitted
			if ( jQuery.isFunction( data ) ) {
				type = type || callback;
				callback = data;
				data = undefined;
			}
	
			// The url can be an options object (which then must have .url)
			return jQuery.ajax( jQuery.extend( {
				url: url,
				type: method,
				dataType: type,
				data: data,
				success: callback
			}, jQuery.isPlainObject( url ) && url ) );
		};
	} );
	
	
	jQuery._evalUrl = function( url ) {
		return jQuery.ajax( {
			url: url,
	
			// Make this explicit, since user can override this through ajaxSetup (#11264)
			type: "GET",
			dataType: "script",
			cache: true,
			async: false,
			global: false,
			"throws": true
		} );
	};
	
	
	jQuery.fn.extend( {
		wrapAll: function( html ) {
			var wrap;
	
			if ( this[ 0 ] ) {
				if ( jQuery.isFunction( html ) ) {
					html = html.call( this[ 0 ] );
				}
	
				// The elements to wrap the target around
				wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );
	
				if ( this[ 0 ].parentNode ) {
					wrap.insertBefore( this[ 0 ] );
				}
	
				wrap.map( function() {
					var elem = this;
	
					while ( elem.firstElementChild ) {
						elem = elem.firstElementChild;
					}
	
					return elem;
				} ).append( this );
			}
	
			return this;
		},
	
		wrapInner: function( html ) {
			if ( jQuery.isFunction( html ) ) {
				return this.each( function( i ) {
					jQuery( this ).wrapInner( html.call( this, i ) );
				} );
			}
	
			return this.each( function() {
				var self = jQuery( this ),
					contents = self.contents();
	
				if ( contents.length ) {
					contents.wrapAll( html );
	
				} else {
					self.append( html );
				}
			} );
		},
	
		wrap: function( html ) {
			var isFunction = jQuery.isFunction( html );
	
			return this.each( function( i ) {
				jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
			} );
		},
	
		unwrap: function( selector ) {
			this.parent( selector ).not( "body" ).each( function() {
				jQuery( this ).replaceWith( this.childNodes );
			} );
			return this;
		}
	} );
	
	
	jQuery.expr.pseudos.hidden = function( elem ) {
		return !jQuery.expr.pseudos.visible( elem );
	};
	jQuery.expr.pseudos.visible = function( elem ) {
		return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
	};
	
	
	
	
	jQuery.ajaxSettings.xhr = function() {
		try {
			return new window.XMLHttpRequest();
		} catch ( e ) {}
	};
	
	var xhrSuccessStatus = {
	
			// File protocol always yields status code 0, assume 200
			0: 200,
	
			// Support: IE <=9 only
			// #1450: sometimes IE returns 1223 when it should be 204
			1223: 204
		},
		xhrSupported = jQuery.ajaxSettings.xhr();
	
	support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
	support.ajax = xhrSupported = !!xhrSupported;
	
	jQuery.ajaxTransport( function( options ) {
		var callback, errorCallback;
	
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( support.cors || xhrSupported && !options.crossDomain ) {
			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr();
	
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);
	
					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}
	
					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}
	
					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}
	
					// Set headers
					for ( i in headers ) {
						xhr.setRequestHeader( i, headers[ i ] );
					}
	
					// Callback
					callback = function( type ) {
						return function() {
							if ( callback ) {
								callback = errorCallback = xhr.onload =
									xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;
	
								if ( type === "abort" ) {
									xhr.abort();
								} else if ( type === "error" ) {
	
									// Support: IE <=9 only
									// On a manual native abort, IE9 throws
									// errors on any property access that is not readyState
									if ( typeof xhr.status !== "number" ) {
										complete( 0, "error" );
									} else {
										complete(
	
											// File: protocol always yields status 0; see #8605, #14207
											xhr.status,
											xhr.statusText
										);
									}
								} else {
									complete(
										xhrSuccessStatus[ xhr.status ] || xhr.status,
										xhr.statusText,
	
										// Support: IE <=9 only
										// IE9 has no XHR2 but throws on binary (trac-11426)
										// For XHR2 non-text, let the caller handle it (gh-2498)
										( xhr.responseType || "text" ) !== "text"  ||
										typeof xhr.responseText !== "string" ?
											{ binary: xhr.response } :
											{ text: xhr.responseText },
										xhr.getAllResponseHeaders()
									);
								}
							}
						};
					};
	
					// Listen to events
					xhr.onload = callback();
					errorCallback = xhr.onerror = callback( "error" );
	
					// Support: IE 9 only
					// Use onreadystatechange to replace onabort
					// to handle uncaught aborts
					if ( xhr.onabort !== undefined ) {
						xhr.onabort = errorCallback;
					} else {
						xhr.onreadystatechange = function() {
	
							// Check readyState before timeout as it changes
							if ( xhr.readyState === 4 ) {
	
								// Allow onerror to be called first,
								// but that will not handle a native abort
								// Also, save errorCallback to a variable
								// as xhr.onerror cannot be accessed
								window.setTimeout( function() {
									if ( callback ) {
										errorCallback();
									}
								} );
							}
						};
					}
	
					// Create the abort callback
					callback = callback( "abort" );
	
					try {
	
						// Do send the request (this may raise an exception)
						xhr.send( options.hasContent && options.data || null );
					} catch ( e ) {
	
						// #14683: Only rethrow if this hasn't been notified as an error yet
						if ( callback ) {
							throw e;
						}
					}
				},
	
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
	jQuery.ajaxPrefilter( function( s ) {
		if ( s.crossDomain ) {
			s.contents.script = false;
		}
	} );
	
	// Install script dataType
	jQuery.ajaxSetup( {
		accepts: {
			script: "text/javascript, application/javascript, " +
				"application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function( text ) {
				jQuery.globalEval( text );
				return text;
			}
		}
	} );
	
	// Handle cache's special case and crossDomain
	jQuery.ajaxPrefilter( "script", function( s ) {
		if ( s.cache === undefined ) {
			s.cache = false;
		}
		if ( s.crossDomain ) {
			s.type = "GET";
		}
	} );
	
	// Bind script tag hack transport
	jQuery.ajaxTransport( "script", function( s ) {
	
		// This transport only deals with cross domain requests
		if ( s.crossDomain ) {
			var script, callback;
			return {
				send: function( _, complete ) {
					script = jQuery( "<script>" ).prop( {
						charset: s.scriptCharset,
						src: s.url
					} ).on(
						"load error",
						callback = function( evt ) {
							script.remove();
							callback = null;
							if ( evt ) {
								complete( evt.type === "error" ? 404 : 200, evt.type );
							}
						}
					);
	
					// Use native DOM manipulation to avoid our domManip AJAX trickery
					document.head.appendChild( script[ 0 ] );
				},
				abort: function() {
					if ( callback ) {
						callback();
					}
				}
			};
		}
	} );
	
	
	
	
	var oldCallbacks = [],
		rjsonp = /(=)\?(?=&|$)|\?\?/;
	
	// Default jsonp settings
	jQuery.ajaxSetup( {
		jsonp: "callback",
		jsonpCallback: function() {
			var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
			this[ callback ] = true;
			return callback;
		}
	} );
	
	// Detect, normalize options and install callbacks for jsonp requests
	jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {
	
		var callbackName, overwritten, responseContainer,
			jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
				"url" :
				typeof s.data === "string" &&
					( s.contentType || "" )
						.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
					rjsonp.test( s.data ) && "data"
			);
	
		// Handle iff the expected data type is "jsonp" or we have a parameter to set
		if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {
	
			// Get callback name, remembering preexisting value associated with it
			callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
				s.jsonpCallback() :
				s.jsonpCallback;
	
			// Insert callback into url or form data
			if ( jsonProp ) {
				s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
			} else if ( s.jsonp !== false ) {
				s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
			}
	
			// Use data converter to retrieve json after script execution
			s.converters[ "script json" ] = function() {
				if ( !responseContainer ) {
					jQuery.error( callbackName + " was not called" );
				}
				return responseContainer[ 0 ];
			};
	
			// Force json dataType
			s.dataTypes[ 0 ] = "json";
	
			// Install callback
			overwritten = window[ callbackName ];
			window[ callbackName ] = function() {
				responseContainer = arguments;
			};
	
			// Clean-up function (fires after converters)
			jqXHR.always( function() {
	
				// If previous value didn't exist - remove it
				if ( overwritten === undefined ) {
					jQuery( window ).removeProp( callbackName );
	
				// Otherwise restore preexisting value
				} else {
					window[ callbackName ] = overwritten;
				}
	
				// Save back as free
				if ( s[ callbackName ] ) {
	
					// Make sure that re-using the options doesn't screw things around
					s.jsonpCallback = originalSettings.jsonpCallback;
	
					// Save the callback name for future use
					oldCallbacks.push( callbackName );
				}
	
				// Call if it was a function and we have a response
				if ( responseContainer && jQuery.isFunction( overwritten ) ) {
					overwritten( responseContainer[ 0 ] );
				}
	
				responseContainer = overwritten = undefined;
			} );
	
			// Delegate to script
			return "script";
		}
	} );
	
	
	
	
	// Support: Safari 8 only
	// In Safari 8 documents created via document.implementation.createHTMLDocument
	// collapse sibling forms: the second one becomes a child of the first one.
	// Because of that, this security measure has to be disabled in Safari 8.
	// https://bugs.webkit.org/show_bug.cgi?id=137337
	support.createHTMLDocument = ( function() {
		var body = document.implementation.createHTMLDocument( "" ).body;
		body.innerHTML = "<form></form><form></form>";
		return body.childNodes.length === 2;
	} )();
	
	
	// Argument "data" should be string of html
	// context (optional): If specified, the fragment will be created in this context,
	// defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	jQuery.parseHTML = function( data, context, keepScripts ) {
		if ( typeof data !== "string" ) {
			return [];
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
	
		var base, parsed, scripts;
	
		if ( !context ) {
	
			// Stop scripts or inline event handlers from being executed immediately
			// by using document.implementation
			if ( support.createHTMLDocument ) {
				context = document.implementation.createHTMLDocument( "" );
	
				// Set the base href for the created document
				// so any parsed elements with URLs
				// are based on the document's URL (gh-2965)
				base = context.createElement( "base" );
				base.href = document.location.href;
				context.head.appendChild( base );
			} else {
				context = document;
			}
		}
	
		parsed = rsingleTag.exec( data );
		scripts = !keepScripts && [];
	
		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[ 1 ] ) ];
		}
	
		parsed = buildFragment( [ data ], context, scripts );
	
		if ( scripts && scripts.length ) {
			jQuery( scripts ).remove();
		}
	
		return jQuery.merge( [], parsed.childNodes );
	};
	
	
	/**
	 * Load a url into a page
	 */
	jQuery.fn.load = function( url, params, callback ) {
		var selector, type, response,
			self = this,
			off = url.indexOf( " " );
	
		if ( off > -1 ) {
			selector = stripAndCollapse( url.slice( off ) );
			url = url.slice( 0, off );
		}
	
		// If it's a function
		if ( jQuery.isFunction( params ) ) {
	
			// We assume that it's the callback
			callback = params;
			params = undefined;
	
		// Otherwise, build a param string
		} else if ( params && typeof params === "object" ) {
			type = "POST";
		}
	
		// If we have elements to modify, make the request
		if ( self.length > 0 ) {
			jQuery.ajax( {
				url: url,
	
				// If "type" variable is undefined, then "GET" method will be used.
				// Make value of this field explicit since
				// user can override it through ajaxSetup method
				type: type || "GET",
				dataType: "html",
				data: params
			} ).done( function( responseText ) {
	
				// Save response for use in complete callback
				response = arguments;
	
				self.html( selector ?
	
					// If a selector was specified, locate the right elements in a dummy div
					// Exclude scripts to avoid IE 'Permission Denied' errors
					jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :
	
					// Otherwise use the full result
					responseText );
	
			// If the request succeeds, this function gets "data", "status", "jqXHR"
			// but they are ignored because response was set above.
			// If it fails, this function gets "jqXHR", "status", "error"
			} ).always( callback && function( jqXHR, status ) {
				self.each( function() {
					callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
				} );
			} );
		}
	
		return this;
	};
	
	
	
	
	// Attach a bunch of functions for handling common AJAX events
	jQuery.each( [
		"ajaxStart",
		"ajaxStop",
		"ajaxComplete",
		"ajaxError",
		"ajaxSuccess",
		"ajaxSend"
	], function( i, type ) {
		jQuery.fn[ type ] = function( fn ) {
			return this.on( type, fn );
		};
	} );
	
	
	
	
	jQuery.expr.pseudos.animated = function( elem ) {
		return jQuery.grep( jQuery.timers, function( fn ) {
			return elem === fn.elem;
		} ).length;
	};
	
	
	
	
	/**
	 * Gets a window from an element
	 */
	function getWindow( elem ) {
		return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
	}
	
	jQuery.offset = {
		setOffset: function( elem, options, i ) {
			var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
				position = jQuery.css( elem, "position" ),
				curElem = jQuery( elem ),
				props = {};
	
			// Set position first, in-case top/left are set even on static elem
			if ( position === "static" ) {
				elem.style.position = "relative";
			}
	
			curOffset = curElem.offset();
			curCSSTop = jQuery.css( elem, "top" );
			curCSSLeft = jQuery.css( elem, "left" );
			calculatePosition = ( position === "absolute" || position === "fixed" ) &&
				( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;
	
			// Need to be able to calculate position if either
			// top or left is auto and position is either absolute or fixed
			if ( calculatePosition ) {
				curPosition = curElem.position();
				curTop = curPosition.top;
				curLeft = curPosition.left;
	
			} else {
				curTop = parseFloat( curCSSTop ) || 0;
				curLeft = parseFloat( curCSSLeft ) || 0;
			}
	
			if ( jQuery.isFunction( options ) ) {
	
				// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
				options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
			}
	
			if ( options.top != null ) {
				props.top = ( options.top - curOffset.top ) + curTop;
			}
			if ( options.left != null ) {
				props.left = ( options.left - curOffset.left ) + curLeft;
			}
	
			if ( "using" in options ) {
				options.using.call( elem, props );
	
			} else {
				curElem.css( props );
			}
		}
	};
	
	jQuery.fn.extend( {
		offset: function( options ) {
	
			// Preserve chaining for setter
			if ( arguments.length ) {
				return options === undefined ?
					this :
					this.each( function( i ) {
						jQuery.offset.setOffset( this, options, i );
					} );
			}
	
			var docElem, win, rect, doc,
				elem = this[ 0 ];
	
			if ( !elem ) {
				return;
			}
	
			// Support: IE <=11 only
			// Running getBoundingClientRect on a
			// disconnected node in IE throws an error
			if ( !elem.getClientRects().length ) {
				return { top: 0, left: 0 };
			}
	
			rect = elem.getBoundingClientRect();
	
			// Make sure element is not hidden (display: none)
			if ( rect.width || rect.height ) {
				doc = elem.ownerDocument;
				win = getWindow( doc );
				docElem = doc.documentElement;
	
				return {
					top: rect.top + win.pageYOffset - docElem.clientTop,
					left: rect.left + win.pageXOffset - docElem.clientLeft
				};
			}
	
			// Return zeros for disconnected and hidden elements (gh-2310)
			return rect;
		},
	
		position: function() {
			if ( !this[ 0 ] ) {
				return;
			}
	
			var offsetParent, offset,
				elem = this[ 0 ],
				parentOffset = { top: 0, left: 0 };
	
			// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
			// because it is its only offset parent
			if ( jQuery.css( elem, "position" ) === "fixed" ) {
	
				// Assume getBoundingClientRect is there when computed position is fixed
				offset = elem.getBoundingClientRect();
	
			} else {
	
				// Get *real* offsetParent
				offsetParent = this.offsetParent();
	
				// Get correct offsets
				offset = this.offset();
				if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
					parentOffset = offsetParent.offset();
				}
	
				// Add offsetParent borders
				parentOffset = {
					top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
					left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
				};
			}
	
			// Subtract parent offsets and element margins
			return {
				top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
				left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
			};
		},
	
		// This method will return documentElement in the following cases:
		// 1) For the element inside the iframe without offsetParent, this method will return
		//    documentElement of the parent window
		// 2) For the hidden or detached element
		// 3) For body or html element, i.e. in case of the html node - it will return itself
		//
		// but those exceptions were never presented as a real life use-cases
		// and might be considered as more preferable results.
		//
		// This logic, however, is not guaranteed and can change at any point in the future
		offsetParent: function() {
			return this.map( function() {
				var offsetParent = this.offsetParent;
	
				while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
					offsetParent = offsetParent.offsetParent;
				}
	
				return offsetParent || documentElement;
			} );
		}
	} );
	
	// Create scrollLeft and scrollTop methods
	jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
		var top = "pageYOffset" === prop;
	
		jQuery.fn[ method ] = function( val ) {
			return access( this, function( elem, method, val ) {
				var win = getWindow( elem );
	
				if ( val === undefined ) {
					return win ? win[ prop ] : elem[ method ];
				}
	
				if ( win ) {
					win.scrollTo(
						!top ? val : win.pageXOffset,
						top ? val : win.pageYOffset
					);
	
				} else {
					elem[ method ] = val;
				}
			}, method, val, arguments.length );
		};
	} );
	
	// Support: Safari <=7 - 9.1, Chrome <=37 - 49
	// Add the top/left cssHooks using jQuery.fn.position
	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
	// getComputedStyle returns percent when specified for top/left/bottom/right;
	// rather than make the css module depend on the offset module, just check for it here
	jQuery.each( [ "top", "left" ], function( i, prop ) {
		jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
			function( elem, computed ) {
				if ( computed ) {
					computed = curCSS( elem, prop );
	
					// If curCSS returns percentage, fallback to offset
					return rnumnonpx.test( computed ) ?
						jQuery( elem ).position()[ prop ] + "px" :
						computed;
				}
			}
		);
	} );
	
	
	// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
	jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
		jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
			function( defaultExtra, funcName ) {
	
			// Margin is only for outerHeight, outerWidth
			jQuery.fn[ funcName ] = function( margin, value ) {
				var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
					extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );
	
				return access( this, function( elem, type, value ) {
					var doc;
	
					if ( jQuery.isWindow( elem ) ) {
	
						// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
						return funcName.indexOf( "outer" ) === 0 ?
							elem[ "inner" + name ] :
							elem.document.documentElement[ "client" + name ];
					}
	
					// Get document width or height
					if ( elem.nodeType === 9 ) {
						doc = elem.documentElement;
	
						// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
						// whichever is greatest
						return Math.max(
							elem.body[ "scroll" + name ], doc[ "scroll" + name ],
							elem.body[ "offset" + name ], doc[ "offset" + name ],
							doc[ "client" + name ]
						);
					}
	
					return value === undefined ?
	
						// Get width or height on the element, requesting but not forcing parseFloat
						jQuery.css( elem, type, extra ) :
	
						// Set width or height on the element
						jQuery.style( elem, type, value, extra );
				}, type, chainable ? margin : undefined, chainable );
			};
		} );
	} );
	
	
	jQuery.fn.extend( {
	
		bind: function( types, data, fn ) {
			return this.on( types, null, data, fn );
		},
		unbind: function( types, fn ) {
			return this.off( types, null, fn );
		},
	
		delegate: function( selector, types, data, fn ) {
			return this.on( types, selector, data, fn );
		},
		undelegate: function( selector, types, fn ) {
	
			// ( namespace ) or ( selector, types [, fn] )
			return arguments.length === 1 ?
				this.off( selector, "**" ) :
				this.off( types, selector || "**", fn );
		}
	} );
	
	jQuery.parseJSON = JSON.parse;
	
	
	
	
	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	
	// Note that for maximum portability, libraries that are not jQuery should
	// declare themselves as anonymous modules, and avoid setting a global if an
	// AMD loader is present. jQuery is a special case. For more information, see
	// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon
	
	if ( true ) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
			return jQuery;
		}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	}
	
	
	
	
	var
	
		// Map over jQuery in case of overwrite
		_jQuery = window.jQuery,
	
		// Map over the $ in case of overwrite
		_$ = window.$;
	
	jQuery.noConflict = function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}
	
		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}
	
		return jQuery;
	};
	
	// Expose jQuery and $ identifiers, even in AMD
	// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
	// and CommonJS for browser emulators (#13566)
	if ( !noGlobal ) {
		window.jQuery = window.$ = jQuery;
	}
	
	
	
	
	
	return jQuery;
	} );


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = [];
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}
	
			return classes.join(' ');
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Section_1 = __webpack_require__(5);
	var Contact = (function (_super) {
	    __extends(Contact, _super);
	    function Contact() {
	        _super.apply(this, arguments);
	    }
	    Contact.prototype.render = function () {
	        return React.createElement(Section_1.Section, {id: "contact", preHeading: "Communication is Key", heading: "Contact"}, 
	            React.createElement("div", {className: "row"}, 
	                React.createElement("div", {className: "col-md-6 text-md-right"}, 
	                    React.createElement("img", {src: __webpack_require__(11), alt: "qr con datos de contacto"})
	                ), 
	                React.createElement("div", {className: "col-md-6"}, 
	                    React.createElement("h5", null, "Load this MECard with my contact info to your smartphone."), 
	                    React.createElement("p", null, "Or you can:"), 
	                    React.createElement("ul", {className: "list-unstyled"}, 
	                        React.createElement("li", null, 
	                            React.createElement("a", {href: "mailto:mail@cesarvarela.com"}, "mail@cesarvarela.com")
	                        ), 
	                        React.createElement("li", null, 
	                            React.createElement("a", {href: "tel:+598%2094%20085%20280"}, "+598 94 085 280")
	                        ))))
	        );
	    };
	    return Contact;
	}(React.Component));
	exports.Contact = Contact;


/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = "data:image/gif;base64,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"

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var SkillItem_1 = __webpack_require__(13);
	var Section_1 = __webpack_require__(5);
	var languages = [
	    {
	        name: "Javascript"
	    },
	    {
	        name: "Typescript"
	    },
	    {
	        name: "Swift"
	    },
	    {
	        name: "C#"
	    },
	    {
	        name: "ActionScript 3"
	    },
	    {
	        name: "PHP"
	    },
	    {
	        name: "GO"
	    },
	];
	var frameworks = [
	    {
	        name: "React"
	    },
	    {
	        name: "Angular"
	    },
	    {
	        name: "Express"
	    },
	];
	var platforms = [
	    {
	        name: "Node.js"
	    },
	    {
	        name: "iOS"
	    },
	    {
	        name: ".NET"
	    },
	    {
	        name: "Unity 3D"
	    },
	    {
	        name: "LAMP"
	    }
	];
	var software = [
	    {
	        name: "Visual Studio/ VSCode"
	    },
	    {
	        name: "Xcode"
	    },
	    {
	        name: "Photoshop"
	    },
	    {
	        name: "Unity 3D"
	    },
	    {
	        name: "Sketch"
	    },
	    {
	        name: "Chrome DEV tools"
	    }
	];
	var About = (function (_super) {
	    __extends(About, _super);
	    function About() {
	        _super.apply(this, arguments);
	    }
	    About.prototype.render = function () {
	        return React.createElement(Section_1.Section, {id: "about", heading: "About", preHeading: "'cause everybody has a past", postHeading: "Something to say about me! (seems like one of those self-help questions)"}, 
	            React.createElement("div", {className: "skills"}, 
	                React.createElement("h3", null, "Skills"), 
	                React.createElement("p", null, "Analysis, design and software development."), 
	                React.createElement("h3", null, "Technologies"), 
	                React.createElement("p", null, "Over the years I've worked on lots of different projects with different requirements and challenges, here is some of the tools that helped me get thorugh them."), 
	                React.createElement("div", {className: "row"}, 
	                    React.createElement("div", {className: "col-md-3"}, 
	                        React.createElement("h4", null, "Languages"), 
	                        React.createElement("ul", null, languages.map(function (item) {
	                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
	                        }))), 
	                    React.createElement("div", {className: "col-md-3"}, 
	                        React.createElement("h4", null, "Frameworks/Libraries"), 
	                        React.createElement("ul", null, frameworks.map(function (item) {
	                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
	                        }))), 
	                    React.createElement("div", {className: "col-md-3"}, 
	                        React.createElement("h4", null, "Stacks/Platforms"), 
	                        React.createElement("ul", null, platforms.map(function (item) {
	                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
	                        }))), 
	                    React.createElement("div", {className: "col-md-3"}, 
	                        React.createElement("h4", null, "Software"), 
	                        React.createElement("ul", null, software.map(function (item) {
	                            return React.createElement(SkillItem_1.SkillItem, {name: item.name});
	                        })))))
	        );
	    };
	    return About;
	}(React.Component));
	exports.About = About;


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var SkillItem = (function (_super) {
	    __extends(SkillItem, _super);
	    function SkillItem() {
	        _super.apply(this, arguments);
	    }
	    SkillItem.prototype.render = function () {
	        return React.createElement("li", null, 
	            " ", 
	            this.props.name, 
	            " ");
	    };
	    return SkillItem;
	}(React.Component));
	exports.SkillItem = SkillItem;


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Footer = (function (_super) {
	    __extends(Footer, _super);
	    function Footer() {
	        _super.apply(this, arguments);
	    }
	    Footer.prototype.render = function () {
	        return React.createElement("footer", null, 
	            React.createElement("p", null, 
	                "Built using TypeScript, REACT, Webpack, SASS, etc. and the beautiful VSCode", 
	                React.createElement("br", null), 
	                "You can check the source ", 
	                React.createElement("a", {href: "https://github.com/cesarvarela/cesarvarela.github.io/tree/src", target: "_blank"}, "here")), 
	            React.createElement("p", {className: "text-muted"}, "© 2016 Cesar Varela"));
	    };
	    return Footer;
	}(React.Component));
	exports.Footer = Footer;


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var classnames = __webpack_require__(9);
	var Section_1 = __webpack_require__(5);
	var Social = (function (_super) {
	    __extends(Social, _super);
	    function Social() {
	        _super.apply(this, arguments);
	    }
	    Social.prototype.render = function () {
	        return React.createElement(Section_1.Section, {id: "social", heading: "socialize with me"}, 
	            React.createElement("ul", {className: "list-inline"}, this.props.items.map(function (item, index) {
	                return React.createElement("li", {key: index, className: "list-inline-item"}, 
	                    React.createElement("a", {href: item.link, target: "_blank"}, 
	                        React.createElement("i", {className: classnames('fa fa-' + item.key), "aria-hidden": "true"})
	                    )
	                );
	            }))
	        );
	    };
	    return Social;
	}(React.Component));
	exports.Social = Social;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var React = __webpack_require__(1);
	var Section_1 = __webpack_require__(5);
	var context = __webpack_require__(17);
	var Projects = (function (_super) {
	    __extends(Projects, _super);
	    function Projects() {
	        _super.apply(this, arguments);
	    }
	    Projects.prototype.render = function () {
	        return React.createElement(Section_1.Section, {id: "projects", heading: "Projects I'm part of"}, 
	            React.createElement("div", {className: "row"}, this.props.items.map(function (item, index) {
	                return React.createElement("div", {key: index, className: "col-md-6"}, 
	                    React.createElement("div", {className: "image"}, 
	                        React.createElement("a", {href: item.link, target: "_blank"}, 
	                            React.createElement("img", {src: context(item.img)})
	                        )
	                    ), 
	                    React.createElement("h3", null, item.title), 
	                    React.createElement("p", null, item.description));
	            }))
	        );
	    };
	    return Projects;
	}(React.Component));
	exports.Projects = Projects;


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./poatm.png": 18,
		"./tbm.png": 19
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 17;


/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,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"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(21);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(21, function() {
				var newContent = __webpack_require__(21);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	
	
	// module
	exports.push([module.id, "@charset \"UTF-8\";\n/*!\n *  Font Awesome 4.7.0 by @davegandy - http://fontawesome.io - @fontawesome\n *  License - http://fontawesome.io/license (Font: SIL OFL 1.1, CSS: MIT License)\n */\n/* FONT PATH\n * -------------------------- */\n@font-face {\n  font-family: 'FontAwesome';\n  src: url(" + __webpack_require__(23) + ");\n  src: url(" + __webpack_require__(24) + "?#iefix&v=4.7.0) format(\"embedded-opentype\"), url(" + __webpack_require__(25) + ") format(\"woff2\"), url(" + __webpack_require__(26) + ") format(\"woff\"), url(" + __webpack_require__(27) + ") format(\"truetype\"), url(" + __webpack_require__(28) + "#fontawesomeregular) format(\"svg\");\n  font-weight: normal;\n  font-style: normal; }\n\n.fa {\n  display: inline-block;\n  font: normal normal normal 14px/1 FontAwesome;\n  font-size: inherit;\n  text-rendering: auto;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale; }\n\n/* makes the font 33% larger relative to the icon container */\n.fa-lg {\n  font-size: 1.33333em;\n  line-height: 0.75em;\n  vertical-align: -15%; }\n\n.fa-2x {\n  font-size: 2em; }\n\n.fa-3x {\n  font-size: 3em; }\n\n.fa-4x {\n  font-size: 4em; }\n\n.fa-5x {\n  font-size: 5em; }\n\n.fa-fw {\n  width: 1.28571em;\n  text-align: center; }\n\n.fa-ul {\n  padding-left: 0;\n  margin-left: 2.14286em;\n  list-style-type: none; }\n  .fa-ul > li {\n    position: relative; }\n\n.fa-li {\n  position: absolute;\n  left: -2.14286em;\n  width: 2.14286em;\n  top: 0.14286em;\n  text-align: center; }\n  .fa-li.fa-lg {\n    left: -1.85714em; }\n\n.fa-border {\n  padding: .2em .25em .15em;\n  border: solid 0.08em #eee;\n  border-radius: .1em; }\n\n.fa-pull-left {\n  float: left; }\n\n.fa-pull-right {\n  float: right; }\n\n.fa.fa-pull-left {\n  margin-right: .3em; }\n\n.fa.fa-pull-right {\n  margin-left: .3em; }\n\n/* Deprecated as of 4.4.0 */\n.pull-right {\n  float: right; }\n\n.pull-left {\n  float: left; }\n\n.fa.pull-left {\n  margin-right: .3em; }\n\n.fa.pull-right {\n  margin-left: .3em; }\n\n.fa-spin {\n  -webkit-animation: fa-spin 2s infinite linear;\n  animation: fa-spin 2s infinite linear; }\n\n.fa-pulse {\n  -webkit-animation: fa-spin 1s infinite steps(8);\n  animation: fa-spin 1s infinite steps(8); }\n\n@-webkit-keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n@keyframes fa-spin {\n  0% {\n    -webkit-transform: rotate(0deg);\n    transform: rotate(0deg); }\n  100% {\n    -webkit-transform: rotate(359deg);\n    transform: rotate(359deg); } }\n\n.fa-rotate-90 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=1)\";\n  -webkit-transform: rotate(90deg);\n  -ms-transform: rotate(90deg);\n  transform: rotate(90deg); }\n\n.fa-rotate-180 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2)\";\n  -webkit-transform: rotate(180deg);\n  -ms-transform: rotate(180deg);\n  transform: rotate(180deg); }\n\n.fa-rotate-270 {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=3)\";\n  -webkit-transform: rotate(270deg);\n  -ms-transform: rotate(270deg);\n  transform: rotate(270deg); }\n\n.fa-flip-horizontal {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1)\";\n  -webkit-transform: scale(-1, 1);\n  -ms-transform: scale(-1, 1);\n  transform: scale(-1, 1); }\n\n.fa-flip-vertical {\n  -ms-filter: \"progid:DXImageTransform.Microsoft.BasicImage(rotation=2, mirror=1)\";\n  -webkit-transform: scale(1, -1);\n  -ms-transform: scale(1, -1);\n  transform: scale(1, -1); }\n\n:root .fa-rotate-90,\n:root .fa-rotate-180,\n:root .fa-rotate-270,\n:root .fa-flip-horizontal,\n:root .fa-flip-vertical {\n  filter: none; }\n\n.fa-stack {\n  position: relative;\n  display: inline-block;\n  width: 2em;\n  height: 2em;\n  line-height: 2em;\n  vertical-align: middle; }\n\n.fa-stack-1x, .fa-stack-2x {\n  position: absolute;\n  left: 0;\n  width: 100%;\n  text-align: center; }\n\n.fa-stack-1x {\n  line-height: inherit; }\n\n.fa-stack-2x {\n  font-size: 2em; }\n\n.fa-inverse {\n  color: #fff; }\n\n/* Font Awesome uses the Unicode Private Use Area (PUA) to ensure screen\n   readers do not read off random characters that represent icons */\n.fa-glass:before {\n  content: \"\\F000\"; }\n\n.fa-music:before {\n  content: \"\\F001\"; }\n\n.fa-search:before {\n  content: \"\\F002\"; }\n\n.fa-envelope-o:before {\n  content: \"\\F003\"; }\n\n.fa-heart:before {\n  content: \"\\F004\"; }\n\n.fa-star:before {\n  content: \"\\F005\"; }\n\n.fa-star-o:before {\n  content: \"\\F006\"; }\n\n.fa-user:before {\n  content: \"\\F007\"; }\n\n.fa-film:before {\n  content: \"\\F008\"; }\n\n.fa-th-large:before {\n  content: \"\\F009\"; }\n\n.fa-th:before {\n  content: \"\\F00A\"; }\n\n.fa-th-list:before {\n  content: \"\\F00B\"; }\n\n.fa-check:before {\n  content: \"\\F00C\"; }\n\n.fa-remove:before,\n.fa-close:before,\n.fa-times:before {\n  content: \"\\F00D\"; }\n\n.fa-search-plus:before {\n  content: \"\\F00E\"; }\n\n.fa-search-minus:before {\n  content: \"\\F010\"; }\n\n.fa-power-off:before {\n  content: \"\\F011\"; }\n\n.fa-signal:before {\n  content: \"\\F012\"; }\n\n.fa-gear:before,\n.fa-cog:before {\n  content: \"\\F013\"; }\n\n.fa-trash-o:before {\n  content: \"\\F014\"; }\n\n.fa-home:before {\n  content: \"\\F015\"; }\n\n.fa-file-o:before {\n  content: \"\\F016\"; }\n\n.fa-clock-o:before {\n  content: \"\\F017\"; }\n\n.fa-road:before {\n  content: \"\\F018\"; }\n\n.fa-download:before {\n  content: \"\\F019\"; }\n\n.fa-arrow-circle-o-down:before {\n  content: \"\\F01A\"; }\n\n.fa-arrow-circle-o-up:before {\n  content: \"\\F01B\"; }\n\n.fa-inbox:before {\n  content: \"\\F01C\"; }\n\n.fa-play-circle-o:before {\n  content: \"\\F01D\"; }\n\n.fa-rotate-right:before,\n.fa-repeat:before {\n  content: \"\\F01E\"; }\n\n.fa-refresh:before {\n  content: \"\\F021\"; }\n\n.fa-list-alt:before {\n  content: \"\\F022\"; }\n\n.fa-lock:before {\n  content: \"\\F023\"; }\n\n.fa-flag:before {\n  content: \"\\F024\"; }\n\n.fa-headphones:before {\n  content: \"\\F025\"; }\n\n.fa-volume-off:before {\n  content: \"\\F026\"; }\n\n.fa-volume-down:before {\n  content: \"\\F027\"; }\n\n.fa-volume-up:before {\n  content: \"\\F028\"; }\n\n.fa-qrcode:before {\n  content: \"\\F029\"; }\n\n.fa-barcode:before {\n  content: \"\\F02A\"; }\n\n.fa-tag:before {\n  content: \"\\F02B\"; }\n\n.fa-tags:before {\n  content: \"\\F02C\"; }\n\n.fa-book:before {\n  content: \"\\F02D\"; }\n\n.fa-bookmark:before {\n  content: \"\\F02E\"; }\n\n.fa-print:before {\n  content: \"\\F02F\"; }\n\n.fa-camera:before {\n  content: \"\\F030\"; }\n\n.fa-font:before {\n  content: \"\\F031\"; }\n\n.fa-bold:before {\n  content: \"\\F032\"; }\n\n.fa-italic:before {\n  content: \"\\F033\"; }\n\n.fa-text-height:before {\n  content: \"\\F034\"; }\n\n.fa-text-width:before {\n  content: \"\\F035\"; }\n\n.fa-align-left:before {\n  content: \"\\F036\"; }\n\n.fa-align-center:before {\n  content: \"\\F037\"; }\n\n.fa-align-right:before {\n  content: \"\\F038\"; }\n\n.fa-align-justify:before {\n  content: \"\\F039\"; }\n\n.fa-list:before {\n  content: \"\\F03A\"; }\n\n.fa-dedent:before,\n.fa-outdent:before {\n  content: \"\\F03B\"; }\n\n.fa-indent:before {\n  content: \"\\F03C\"; }\n\n.fa-video-camera:before {\n  content: \"\\F03D\"; }\n\n.fa-photo:before,\n.fa-image:before,\n.fa-picture-o:before {\n  content: \"\\F03E\"; }\n\n.fa-pencil:before {\n  content: \"\\F040\"; }\n\n.fa-map-marker:before {\n  content: \"\\F041\"; }\n\n.fa-adjust:before {\n  content: \"\\F042\"; }\n\n.fa-tint:before {\n  content: \"\\F043\"; }\n\n.fa-edit:before,\n.fa-pencil-square-o:before {\n  content: \"\\F044\"; }\n\n.fa-share-square-o:before {\n  content: \"\\F045\"; }\n\n.fa-check-square-o:before {\n  content: \"\\F046\"; }\n\n.fa-arrows:before {\n  content: \"\\F047\"; }\n\n.fa-step-backward:before {\n  content: \"\\F048\"; }\n\n.fa-fast-backward:before {\n  content: \"\\F049\"; }\n\n.fa-backward:before {\n  content: \"\\F04A\"; }\n\n.fa-play:before {\n  content: \"\\F04B\"; }\n\n.fa-pause:before {\n  content: \"\\F04C\"; }\n\n.fa-stop:before {\n  content: \"\\F04D\"; }\n\n.fa-forward:before {\n  content: \"\\F04E\"; }\n\n.fa-fast-forward:before {\n  content: \"\\F050\"; }\n\n.fa-step-forward:before {\n  content: \"\\F051\"; }\n\n.fa-eject:before {\n  content: \"\\F052\"; }\n\n.fa-chevron-left:before {\n  content: \"\\F053\"; }\n\n.fa-chevron-right:before {\n  content: \"\\F054\"; }\n\n.fa-plus-circle:before {\n  content: \"\\F055\"; }\n\n.fa-minus-circle:before {\n  content: \"\\F056\"; }\n\n.fa-times-circle:before {\n  content: \"\\F057\"; }\n\n.fa-check-circle:before {\n  content: \"\\F058\"; }\n\n.fa-question-circle:before {\n  content: \"\\F059\"; }\n\n.fa-info-circle:before {\n  content: \"\\F05A\"; }\n\n.fa-crosshairs:before {\n  content: \"\\F05B\"; }\n\n.fa-times-circle-o:before {\n  content: \"\\F05C\"; }\n\n.fa-check-circle-o:before {\n  content: \"\\F05D\"; }\n\n.fa-ban:before {\n  content: \"\\F05E\"; }\n\n.fa-arrow-left:before {\n  content: \"\\F060\"; }\n\n.fa-arrow-right:before {\n  content: \"\\F061\"; }\n\n.fa-arrow-up:before {\n  content: \"\\F062\"; }\n\n.fa-arrow-down:before {\n  content: \"\\F063\"; }\n\n.fa-mail-forward:before,\n.fa-share:before {\n  content: \"\\F064\"; }\n\n.fa-expand:before {\n  content: \"\\F065\"; }\n\n.fa-compress:before {\n  content: \"\\F066\"; }\n\n.fa-plus:before {\n  content: \"\\F067\"; }\n\n.fa-minus:before {\n  content: \"\\F068\"; }\n\n.fa-asterisk:before {\n  content: \"\\F069\"; }\n\n.fa-exclamation-circle:before {\n  content: \"\\F06A\"; }\n\n.fa-gift:before {\n  content: \"\\F06B\"; }\n\n.fa-leaf:before {\n  content: \"\\F06C\"; }\n\n.fa-fire:before {\n  content: \"\\F06D\"; }\n\n.fa-eye:before {\n  content: \"\\F06E\"; }\n\n.fa-eye-slash:before {\n  content: \"\\F070\"; }\n\n.fa-warning:before,\n.fa-exclamation-triangle:before {\n  content: \"\\F071\"; }\n\n.fa-plane:before {\n  content: \"\\F072\"; }\n\n.fa-calendar:before {\n  content: \"\\F073\"; }\n\n.fa-random:before {\n  content: \"\\F074\"; }\n\n.fa-comment:before {\n  content: \"\\F075\"; }\n\n.fa-magnet:before {\n  content: \"\\F076\"; }\n\n.fa-chevron-up:before {\n  content: \"\\F077\"; }\n\n.fa-chevron-down:before {\n  content: \"\\F078\"; }\n\n.fa-retweet:before {\n  content: \"\\F079\"; }\n\n.fa-shopping-cart:before {\n  content: \"\\F07A\"; }\n\n.fa-folder:before {\n  content: \"\\F07B\"; }\n\n.fa-folder-open:before {\n  content: \"\\F07C\"; }\n\n.fa-arrows-v:before {\n  content: \"\\F07D\"; }\n\n.fa-arrows-h:before {\n  content: \"\\F07E\"; }\n\n.fa-bar-chart-o:before,\n.fa-bar-chart:before {\n  content: \"\\F080\"; }\n\n.fa-twitter-square:before {\n  content: \"\\F081\"; }\n\n.fa-facebook-square:before {\n  content: \"\\F082\"; }\n\n.fa-camera-retro:before {\n  content: \"\\F083\"; }\n\n.fa-key:before {\n  content: \"\\F084\"; }\n\n.fa-gears:before,\n.fa-cogs:before {\n  content: \"\\F085\"; }\n\n.fa-comments:before {\n  content: \"\\F086\"; }\n\n.fa-thumbs-o-up:before {\n  content: \"\\F087\"; }\n\n.fa-thumbs-o-down:before {\n  content: \"\\F088\"; }\n\n.fa-star-half:before {\n  content: \"\\F089\"; }\n\n.fa-heart-o:before {\n  content: \"\\F08A\"; }\n\n.fa-sign-out:before {\n  content: \"\\F08B\"; }\n\n.fa-linkedin-square:before {\n  content: \"\\F08C\"; }\n\n.fa-thumb-tack:before {\n  content: \"\\F08D\"; }\n\n.fa-external-link:before {\n  content: \"\\F08E\"; }\n\n.fa-sign-in:before {\n  content: \"\\F090\"; }\n\n.fa-trophy:before {\n  content: \"\\F091\"; }\n\n.fa-github-square:before {\n  content: \"\\F092\"; }\n\n.fa-upload:before {\n  content: \"\\F093\"; }\n\n.fa-lemon-o:before {\n  content: \"\\F094\"; }\n\n.fa-phone:before {\n  content: \"\\F095\"; }\n\n.fa-square-o:before {\n  content: \"\\F096\"; }\n\n.fa-bookmark-o:before {\n  content: \"\\F097\"; }\n\n.fa-phone-square:before {\n  content: \"\\F098\"; }\n\n.fa-twitter:before {\n  content: \"\\F099\"; }\n\n.fa-facebook-f:before,\n.fa-facebook:before {\n  content: \"\\F09A\"; }\n\n.fa-github:before {\n  content: \"\\F09B\"; }\n\n.fa-unlock:before {\n  content: \"\\F09C\"; }\n\n.fa-credit-card:before {\n  content: \"\\F09D\"; }\n\n.fa-feed:before,\n.fa-rss:before {\n  content: \"\\F09E\"; }\n\n.fa-hdd-o:before {\n  content: \"\\F0A0\"; }\n\n.fa-bullhorn:before {\n  content: \"\\F0A1\"; }\n\n.fa-bell:before {\n  content: \"\\F0F3\"; }\n\n.fa-certificate:before {\n  content: \"\\F0A3\"; }\n\n.fa-hand-o-right:before {\n  content: \"\\F0A4\"; }\n\n.fa-hand-o-left:before {\n  content: \"\\F0A5\"; }\n\n.fa-hand-o-up:before {\n  content: \"\\F0A6\"; }\n\n.fa-hand-o-down:before {\n  content: \"\\F0A7\"; }\n\n.fa-arrow-circle-left:before {\n  content: \"\\F0A8\"; }\n\n.fa-arrow-circle-right:before {\n  content: \"\\F0A9\"; }\n\n.fa-arrow-circle-up:before {\n  content: \"\\F0AA\"; }\n\n.fa-arrow-circle-down:before {\n  content: \"\\F0AB\"; }\n\n.fa-globe:before {\n  content: \"\\F0AC\"; }\n\n.fa-wrench:before {\n  content: \"\\F0AD\"; }\n\n.fa-tasks:before {\n  content: \"\\F0AE\"; }\n\n.fa-filter:before {\n  content: \"\\F0B0\"; }\n\n.fa-briefcase:before {\n  content: \"\\F0B1\"; }\n\n.fa-arrows-alt:before {\n  content: \"\\F0B2\"; }\n\n.fa-group:before,\n.fa-users:before {\n  content: \"\\F0C0\"; }\n\n.fa-chain:before,\n.fa-link:before {\n  content: \"\\F0C1\"; }\n\n.fa-cloud:before {\n  content: \"\\F0C2\"; }\n\n.fa-flask:before {\n  content: \"\\F0C3\"; }\n\n.fa-cut:before,\n.fa-scissors:before {\n  content: \"\\F0C4\"; }\n\n.fa-copy:before,\n.fa-files-o:before {\n  content: \"\\F0C5\"; }\n\n.fa-paperclip:before {\n  content: \"\\F0C6\"; }\n\n.fa-save:before,\n.fa-floppy-o:before {\n  content: \"\\F0C7\"; }\n\n.fa-square:before {\n  content: \"\\F0C8\"; }\n\n.fa-navicon:before,\n.fa-reorder:before,\n.fa-bars:before {\n  content: \"\\F0C9\"; }\n\n.fa-list-ul:before {\n  content: \"\\F0CA\"; }\n\n.fa-list-ol:before {\n  content: \"\\F0CB\"; }\n\n.fa-strikethrough:before {\n  content: \"\\F0CC\"; }\n\n.fa-underline:before {\n  content: \"\\F0CD\"; }\n\n.fa-table:before {\n  content: \"\\F0CE\"; }\n\n.fa-magic:before {\n  content: \"\\F0D0\"; }\n\n.fa-truck:before {\n  content: \"\\F0D1\"; }\n\n.fa-pinterest:before {\n  content: \"\\F0D2\"; }\n\n.fa-pinterest-square:before {\n  content: \"\\F0D3\"; }\n\n.fa-google-plus-square:before {\n  content: \"\\F0D4\"; }\n\n.fa-google-plus:before {\n  content: \"\\F0D5\"; }\n\n.fa-money:before {\n  content: \"\\F0D6\"; }\n\n.fa-caret-down:before {\n  content: \"\\F0D7\"; }\n\n.fa-caret-up:before {\n  content: \"\\F0D8\"; }\n\n.fa-caret-left:before {\n  content: \"\\F0D9\"; }\n\n.fa-caret-right:before {\n  content: \"\\F0DA\"; }\n\n.fa-columns:before {\n  content: \"\\F0DB\"; }\n\n.fa-unsorted:before,\n.fa-sort:before {\n  content: \"\\F0DC\"; }\n\n.fa-sort-down:before,\n.fa-sort-desc:before {\n  content: \"\\F0DD\"; }\n\n.fa-sort-up:before,\n.fa-sort-asc:before {\n  content: \"\\F0DE\"; }\n\n.fa-envelope:before {\n  content: \"\\F0E0\"; }\n\n.fa-linkedin:before {\n  content: \"\\F0E1\"; }\n\n.fa-rotate-left:before,\n.fa-undo:before {\n  content: \"\\F0E2\"; }\n\n.fa-legal:before,\n.fa-gavel:before {\n  content: \"\\F0E3\"; }\n\n.fa-dashboard:before,\n.fa-tachometer:before {\n  content: \"\\F0E4\"; }\n\n.fa-comment-o:before {\n  content: \"\\F0E5\"; }\n\n.fa-comments-o:before {\n  content: \"\\F0E6\"; }\n\n.fa-flash:before,\n.fa-bolt:before {\n  content: \"\\F0E7\"; }\n\n.fa-sitemap:before {\n  content: \"\\F0E8\"; }\n\n.fa-umbrella:before {\n  content: \"\\F0E9\"; }\n\n.fa-paste:before,\n.fa-clipboard:before {\n  content: \"\\F0EA\"; }\n\n.fa-lightbulb-o:before {\n  content: \"\\F0EB\"; }\n\n.fa-exchange:before {\n  content: \"\\F0EC\"; }\n\n.fa-cloud-download:before {\n  content: \"\\F0ED\"; }\n\n.fa-cloud-upload:before {\n  content: \"\\F0EE\"; }\n\n.fa-user-md:before {\n  content: \"\\F0F0\"; }\n\n.fa-stethoscope:before {\n  content: \"\\F0F1\"; }\n\n.fa-suitcase:before {\n  content: \"\\F0F2\"; }\n\n.fa-bell-o:before {\n  content: \"\\F0A2\"; }\n\n.fa-coffee:before {\n  content: \"\\F0F4\"; }\n\n.fa-cutlery:before {\n  content: \"\\F0F5\"; }\n\n.fa-file-text-o:before {\n  content: \"\\F0F6\"; }\n\n.fa-building-o:before {\n  content: \"\\F0F7\"; }\n\n.fa-hospital-o:before {\n  content: \"\\F0F8\"; }\n\n.fa-ambulance:before {\n  content: \"\\F0F9\"; }\n\n.fa-medkit:before {\n  content: \"\\F0FA\"; }\n\n.fa-fighter-jet:before {\n  content: \"\\F0FB\"; }\n\n.fa-beer:before {\n  content: \"\\F0FC\"; }\n\n.fa-h-square:before {\n  content: \"\\F0FD\"; }\n\n.fa-plus-square:before {\n  content: \"\\F0FE\"; }\n\n.fa-angle-double-left:before {\n  content: \"\\F100\"; }\n\n.fa-angle-double-right:before {\n  content: \"\\F101\"; }\n\n.fa-angle-double-up:before {\n  content: \"\\F102\"; }\n\n.fa-angle-double-down:before {\n  content: \"\\F103\"; }\n\n.fa-angle-left:before {\n  content: \"\\F104\"; }\n\n.fa-angle-right:before {\n  content: \"\\F105\"; }\n\n.fa-angle-up:before {\n  content: \"\\F106\"; }\n\n.fa-angle-down:before {\n  content: \"\\F107\"; }\n\n.fa-desktop:before {\n  content: \"\\F108\"; }\n\n.fa-laptop:before {\n  content: \"\\F109\"; }\n\n.fa-tablet:before {\n  content: \"\\F10A\"; }\n\n.fa-mobile-phone:before,\n.fa-mobile:before {\n  content: \"\\F10B\"; }\n\n.fa-circle-o:before {\n  content: \"\\F10C\"; }\n\n.fa-quote-left:before {\n  content: \"\\F10D\"; }\n\n.fa-quote-right:before {\n  content: \"\\F10E\"; }\n\n.fa-spinner:before {\n  content: \"\\F110\"; }\n\n.fa-circle:before {\n  content: \"\\F111\"; }\n\n.fa-mail-reply:before,\n.fa-reply:before {\n  content: \"\\F112\"; }\n\n.fa-github-alt:before {\n  content: \"\\F113\"; }\n\n.fa-folder-o:before {\n  content: \"\\F114\"; }\n\n.fa-folder-open-o:before {\n  content: \"\\F115\"; }\n\n.fa-smile-o:before {\n  content: \"\\F118\"; }\n\n.fa-frown-o:before {\n  content: \"\\F119\"; }\n\n.fa-meh-o:before {\n  content: \"\\F11A\"; }\n\n.fa-gamepad:before {\n  content: \"\\F11B\"; }\n\n.fa-keyboard-o:before {\n  content: \"\\F11C\"; }\n\n.fa-flag-o:before {\n  content: \"\\F11D\"; }\n\n.fa-flag-checkered:before {\n  content: \"\\F11E\"; }\n\n.fa-terminal:before {\n  content: \"\\F120\"; }\n\n.fa-code:before {\n  content: \"\\F121\"; }\n\n.fa-mail-reply-all:before,\n.fa-reply-all:before {\n  content: \"\\F122\"; }\n\n.fa-star-half-empty:before,\n.fa-star-half-full:before,\n.fa-star-half-o:before {\n  content: \"\\F123\"; }\n\n.fa-location-arrow:before {\n  content: \"\\F124\"; }\n\n.fa-crop:before {\n  content: \"\\F125\"; }\n\n.fa-code-fork:before {\n  content: \"\\F126\"; }\n\n.fa-unlink:before,\n.fa-chain-broken:before {\n  content: \"\\F127\"; }\n\n.fa-question:before {\n  content: \"\\F128\"; }\n\n.fa-info:before {\n  content: \"\\F129\"; }\n\n.fa-exclamation:before {\n  content: \"\\F12A\"; }\n\n.fa-superscript:before {\n  content: \"\\F12B\"; }\n\n.fa-subscript:before {\n  content: \"\\F12C\"; }\n\n.fa-eraser:before {\n  content: \"\\F12D\"; }\n\n.fa-puzzle-piece:before {\n  content: \"\\F12E\"; }\n\n.fa-microphone:before {\n  content: \"\\F130\"; }\n\n.fa-microphone-slash:before {\n  content: \"\\F131\"; }\n\n.fa-shield:before {\n  content: \"\\F132\"; }\n\n.fa-calendar-o:before {\n  content: \"\\F133\"; }\n\n.fa-fire-extinguisher:before {\n  content: \"\\F134\"; }\n\n.fa-rocket:before {\n  content: \"\\F135\"; }\n\n.fa-maxcdn:before {\n  content: \"\\F136\"; }\n\n.fa-chevron-circle-left:before {\n  content: \"\\F137\"; }\n\n.fa-chevron-circle-right:before {\n  content: \"\\F138\"; }\n\n.fa-chevron-circle-up:before {\n  content: \"\\F139\"; }\n\n.fa-chevron-circle-down:before {\n  content: \"\\F13A\"; }\n\n.fa-html5:before {\n  content: \"\\F13B\"; }\n\n.fa-css3:before {\n  content: \"\\F13C\"; }\n\n.fa-anchor:before {\n  content: \"\\F13D\"; }\n\n.fa-unlock-alt:before {\n  content: \"\\F13E\"; }\n\n.fa-bullseye:before {\n  content: \"\\F140\"; }\n\n.fa-ellipsis-h:before {\n  content: \"\\F141\"; }\n\n.fa-ellipsis-v:before {\n  content: \"\\F142\"; }\n\n.fa-rss-square:before {\n  content: \"\\F143\"; }\n\n.fa-play-circle:before {\n  content: \"\\F144\"; }\n\n.fa-ticket:before {\n  content: \"\\F145\"; }\n\n.fa-minus-square:before {\n  content: \"\\F146\"; }\n\n.fa-minus-square-o:before {\n  content: \"\\F147\"; }\n\n.fa-level-up:before {\n  content: \"\\F148\"; }\n\n.fa-level-down:before {\n  content: \"\\F149\"; }\n\n.fa-check-square:before {\n  content: \"\\F14A\"; }\n\n.fa-pencil-square:before {\n  content: \"\\F14B\"; }\n\n.fa-external-link-square:before {\n  content: \"\\F14C\"; }\n\n.fa-share-square:before {\n  content: \"\\F14D\"; }\n\n.fa-compass:before {\n  content: \"\\F14E\"; }\n\n.fa-toggle-down:before,\n.fa-caret-square-o-down:before {\n  content: \"\\F150\"; }\n\n.fa-toggle-up:before,\n.fa-caret-square-o-up:before {\n  content: \"\\F151\"; }\n\n.fa-toggle-right:before,\n.fa-caret-square-o-right:before {\n  content: \"\\F152\"; }\n\n.fa-euro:before,\n.fa-eur:before {\n  content: \"\\F153\"; }\n\n.fa-gbp:before {\n  content: \"\\F154\"; }\n\n.fa-dollar:before,\n.fa-usd:before {\n  content: \"\\F155\"; }\n\n.fa-rupee:before,\n.fa-inr:before {\n  content: \"\\F156\"; }\n\n.fa-cny:before,\n.fa-rmb:before,\n.fa-yen:before,\n.fa-jpy:before {\n  content: \"\\F157\"; }\n\n.fa-ruble:before,\n.fa-rouble:before,\n.fa-rub:before {\n  content: \"\\F158\"; }\n\n.fa-won:before,\n.fa-krw:before {\n  content: \"\\F159\"; }\n\n.fa-bitcoin:before,\n.fa-btc:before {\n  content: \"\\F15A\"; }\n\n.fa-file:before {\n  content: \"\\F15B\"; }\n\n.fa-file-text:before {\n  content: \"\\F15C\"; }\n\n.fa-sort-alpha-asc:before {\n  content: \"\\F15D\"; }\n\n.fa-sort-alpha-desc:before {\n  content: \"\\F15E\"; }\n\n.fa-sort-amount-asc:before {\n  content: \"\\F160\"; }\n\n.fa-sort-amount-desc:before {\n  content: \"\\F161\"; }\n\n.fa-sort-numeric-asc:before {\n  content: \"\\F162\"; }\n\n.fa-sort-numeric-desc:before {\n  content: \"\\F163\"; }\n\n.fa-thumbs-up:before {\n  content: \"\\F164\"; }\n\n.fa-thumbs-down:before {\n  content: \"\\F165\"; }\n\n.fa-youtube-square:before {\n  content: \"\\F166\"; }\n\n.fa-youtube:before {\n  content: \"\\F167\"; }\n\n.fa-xing:before {\n  content: \"\\F168\"; }\n\n.fa-xing-square:before {\n  content: \"\\F169\"; }\n\n.fa-youtube-play:before {\n  content: \"\\F16A\"; }\n\n.fa-dropbox:before {\n  content: \"\\F16B\"; }\n\n.fa-stack-overflow:before {\n  content: \"\\F16C\"; }\n\n.fa-instagram:before {\n  content: \"\\F16D\"; }\n\n.fa-flickr:before {\n  content: \"\\F16E\"; }\n\n.fa-adn:before {\n  content: \"\\F170\"; }\n\n.fa-bitbucket:before {\n  content: \"\\F171\"; }\n\n.fa-bitbucket-square:before {\n  content: \"\\F172\"; }\n\n.fa-tumblr:before {\n  content: \"\\F173\"; }\n\n.fa-tumblr-square:before {\n  content: \"\\F174\"; }\n\n.fa-long-arrow-down:before {\n  content: \"\\F175\"; }\n\n.fa-long-arrow-up:before {\n  content: \"\\F176\"; }\n\n.fa-long-arrow-left:before {\n  content: \"\\F177\"; }\n\n.fa-long-arrow-right:before {\n  content: \"\\F178\"; }\n\n.fa-apple:before {\n  content: \"\\F179\"; }\n\n.fa-windows:before {\n  content: \"\\F17A\"; }\n\n.fa-android:before {\n  content: \"\\F17B\"; }\n\n.fa-linux:before {\n  content: \"\\F17C\"; }\n\n.fa-dribbble:before {\n  content: \"\\F17D\"; }\n\n.fa-skype:before {\n  content: \"\\F17E\"; }\n\n.fa-foursquare:before {\n  content: \"\\F180\"; }\n\n.fa-trello:before {\n  content: \"\\F181\"; }\n\n.fa-female:before {\n  content: \"\\F182\"; }\n\n.fa-male:before {\n  content: \"\\F183\"; }\n\n.fa-gittip:before,\n.fa-gratipay:before {\n  content: \"\\F184\"; }\n\n.fa-sun-o:before {\n  content: \"\\F185\"; }\n\n.fa-moon-o:before {\n  content: \"\\F186\"; }\n\n.fa-archive:before {\n  content: \"\\F187\"; }\n\n.fa-bug:before {\n  content: \"\\F188\"; }\n\n.fa-vk:before {\n  content: \"\\F189\"; }\n\n.fa-weibo:before {\n  content: \"\\F18A\"; }\n\n.fa-renren:before {\n  content: \"\\F18B\"; }\n\n.fa-pagelines:before {\n  content: \"\\F18C\"; }\n\n.fa-stack-exchange:before {\n  content: \"\\F18D\"; }\n\n.fa-arrow-circle-o-right:before {\n  content: \"\\F18E\"; }\n\n.fa-arrow-circle-o-left:before {\n  content: \"\\F190\"; }\n\n.fa-toggle-left:before,\n.fa-caret-square-o-left:before {\n  content: \"\\F191\"; }\n\n.fa-dot-circle-o:before {\n  content: \"\\F192\"; }\n\n.fa-wheelchair:before {\n  content: \"\\F193\"; }\n\n.fa-vimeo-square:before {\n  content: \"\\F194\"; }\n\n.fa-turkish-lira:before,\n.fa-try:before {\n  content: \"\\F195\"; }\n\n.fa-plus-square-o:before {\n  content: \"\\F196\"; }\n\n.fa-space-shuttle:before {\n  content: \"\\F197\"; }\n\n.fa-slack:before {\n  content: \"\\F198\"; }\n\n.fa-envelope-square:before {\n  content: \"\\F199\"; }\n\n.fa-wordpress:before {\n  content: \"\\F19A\"; }\n\n.fa-openid:before {\n  content: \"\\F19B\"; }\n\n.fa-institution:before,\n.fa-bank:before,\n.fa-university:before {\n  content: \"\\F19C\"; }\n\n.fa-mortar-board:before,\n.fa-graduation-cap:before {\n  content: \"\\F19D\"; }\n\n.fa-yahoo:before {\n  content: \"\\F19E\"; }\n\n.fa-google:before {\n  content: \"\\F1A0\"; }\n\n.fa-reddit:before {\n  content: \"\\F1A1\"; }\n\n.fa-reddit-square:before {\n  content: \"\\F1A2\"; }\n\n.fa-stumbleupon-circle:before {\n  content: \"\\F1A3\"; }\n\n.fa-stumbleupon:before {\n  content: \"\\F1A4\"; }\n\n.fa-delicious:before {\n  content: \"\\F1A5\"; }\n\n.fa-digg:before {\n  content: \"\\F1A6\"; }\n\n.fa-pied-piper-pp:before {\n  content: \"\\F1A7\"; }\n\n.fa-pied-piper-alt:before {\n  content: \"\\F1A8\"; }\n\n.fa-drupal:before {\n  content: \"\\F1A9\"; }\n\n.fa-joomla:before {\n  content: \"\\F1AA\"; }\n\n.fa-language:before {\n  content: \"\\F1AB\"; }\n\n.fa-fax:before {\n  content: \"\\F1AC\"; }\n\n.fa-building:before {\n  content: \"\\F1AD\"; }\n\n.fa-child:before {\n  content: \"\\F1AE\"; }\n\n.fa-paw:before {\n  content: \"\\F1B0\"; }\n\n.fa-spoon:before {\n  content: \"\\F1B1\"; }\n\n.fa-cube:before {\n  content: \"\\F1B2\"; }\n\n.fa-cubes:before {\n  content: \"\\F1B3\"; }\n\n.fa-behance:before {\n  content: \"\\F1B4\"; }\n\n.fa-behance-square:before {\n  content: \"\\F1B5\"; }\n\n.fa-steam:before {\n  content: \"\\F1B6\"; }\n\n.fa-steam-square:before {\n  content: \"\\F1B7\"; }\n\n.fa-recycle:before {\n  content: \"\\F1B8\"; }\n\n.fa-automobile:before,\n.fa-car:before {\n  content: \"\\F1B9\"; }\n\n.fa-cab:before,\n.fa-taxi:before {\n  content: \"\\F1BA\"; }\n\n.fa-tree:before {\n  content: \"\\F1BB\"; }\n\n.fa-spotify:before {\n  content: \"\\F1BC\"; }\n\n.fa-deviantart:before {\n  content: \"\\F1BD\"; }\n\n.fa-soundcloud:before {\n  content: \"\\F1BE\"; }\n\n.fa-database:before {\n  content: \"\\F1C0\"; }\n\n.fa-file-pdf-o:before {\n  content: \"\\F1C1\"; }\n\n.fa-file-word-o:before {\n  content: \"\\F1C2\"; }\n\n.fa-file-excel-o:before {\n  content: \"\\F1C3\"; }\n\n.fa-file-powerpoint-o:before {\n  content: \"\\F1C4\"; }\n\n.fa-file-photo-o:before,\n.fa-file-picture-o:before,\n.fa-file-image-o:before {\n  content: \"\\F1C5\"; }\n\n.fa-file-zip-o:before,\n.fa-file-archive-o:before {\n  content: \"\\F1C6\"; }\n\n.fa-file-sound-o:before,\n.fa-file-audio-o:before {\n  content: \"\\F1C7\"; }\n\n.fa-file-movie-o:before,\n.fa-file-video-o:before {\n  content: \"\\F1C8\"; }\n\n.fa-file-code-o:before {\n  content: \"\\F1C9\"; }\n\n.fa-vine:before {\n  content: \"\\F1CA\"; }\n\n.fa-codepen:before {\n  content: \"\\F1CB\"; }\n\n.fa-jsfiddle:before {\n  content: \"\\F1CC\"; }\n\n.fa-life-bouy:before,\n.fa-life-buoy:before,\n.fa-life-saver:before,\n.fa-support:before,\n.fa-life-ring:before {\n  content: \"\\F1CD\"; }\n\n.fa-circle-o-notch:before {\n  content: \"\\F1CE\"; }\n\n.fa-ra:before,\n.fa-resistance:before,\n.fa-rebel:before {\n  content: \"\\F1D0\"; }\n\n.fa-ge:before,\n.fa-empire:before {\n  content: \"\\F1D1\"; }\n\n.fa-git-square:before {\n  content: \"\\F1D2\"; }\n\n.fa-git:before {\n  content: \"\\F1D3\"; }\n\n.fa-y-combinator-square:before,\n.fa-yc-square:before,\n.fa-hacker-news:before {\n  content: \"\\F1D4\"; }\n\n.fa-tencent-weibo:before {\n  content: \"\\F1D5\"; }\n\n.fa-qq:before {\n  content: \"\\F1D6\"; }\n\n.fa-wechat:before,\n.fa-weixin:before {\n  content: \"\\F1D7\"; }\n\n.fa-send:before,\n.fa-paper-plane:before {\n  content: \"\\F1D8\"; }\n\n.fa-send-o:before,\n.fa-paper-plane-o:before {\n  content: \"\\F1D9\"; }\n\n.fa-history:before {\n  content: \"\\F1DA\"; }\n\n.fa-circle-thin:before {\n  content: \"\\F1DB\"; }\n\n.fa-header:before {\n  content: \"\\F1DC\"; }\n\n.fa-paragraph:before {\n  content: \"\\F1DD\"; }\n\n.fa-sliders:before {\n  content: \"\\F1DE\"; }\n\n.fa-share-alt:before {\n  content: \"\\F1E0\"; }\n\n.fa-share-alt-square:before {\n  content: \"\\F1E1\"; }\n\n.fa-bomb:before {\n  content: \"\\F1E2\"; }\n\n.fa-soccer-ball-o:before,\n.fa-futbol-o:before {\n  content: \"\\F1E3\"; }\n\n.fa-tty:before {\n  content: \"\\F1E4\"; }\n\n.fa-binoculars:before {\n  content: \"\\F1E5\"; }\n\n.fa-plug:before {\n  content: \"\\F1E6\"; }\n\n.fa-slideshare:before {\n  content: \"\\F1E7\"; }\n\n.fa-twitch:before {\n  content: \"\\F1E8\"; }\n\n.fa-yelp:before {\n  content: \"\\F1E9\"; }\n\n.fa-newspaper-o:before {\n  content: \"\\F1EA\"; }\n\n.fa-wifi:before {\n  content: \"\\F1EB\"; }\n\n.fa-calculator:before {\n  content: \"\\F1EC\"; }\n\n.fa-paypal:before {\n  content: \"\\F1ED\"; }\n\n.fa-google-wallet:before {\n  content: \"\\F1EE\"; }\n\n.fa-cc-visa:before {\n  content: \"\\F1F0\"; }\n\n.fa-cc-mastercard:before {\n  content: \"\\F1F1\"; }\n\n.fa-cc-discover:before {\n  content: \"\\F1F2\"; }\n\n.fa-cc-amex:before {\n  content: \"\\F1F3\"; }\n\n.fa-cc-paypal:before {\n  content: \"\\F1F4\"; }\n\n.fa-cc-stripe:before {\n  content: \"\\F1F5\"; }\n\n.fa-bell-slash:before {\n  content: \"\\F1F6\"; }\n\n.fa-bell-slash-o:before {\n  content: \"\\F1F7\"; }\n\n.fa-trash:before {\n  content: \"\\F1F8\"; }\n\n.fa-copyright:before {\n  content: \"\\F1F9\"; }\n\n.fa-at:before {\n  content: \"\\F1FA\"; }\n\n.fa-eyedropper:before {\n  content: \"\\F1FB\"; }\n\n.fa-paint-brush:before {\n  content: \"\\F1FC\"; }\n\n.fa-birthday-cake:before {\n  content: \"\\F1FD\"; }\n\n.fa-area-chart:before {\n  content: \"\\F1FE\"; }\n\n.fa-pie-chart:before {\n  content: \"\\F200\"; }\n\n.fa-line-chart:before {\n  content: \"\\F201\"; }\n\n.fa-lastfm:before {\n  content: \"\\F202\"; }\n\n.fa-lastfm-square:before {\n  content: \"\\F203\"; }\n\n.fa-toggle-off:before {\n  content: \"\\F204\"; }\n\n.fa-toggle-on:before {\n  content: \"\\F205\"; }\n\n.fa-bicycle:before {\n  content: \"\\F206\"; }\n\n.fa-bus:before {\n  content: \"\\F207\"; }\n\n.fa-ioxhost:before {\n  content: \"\\F208\"; }\n\n.fa-angellist:before {\n  content: \"\\F209\"; }\n\n.fa-cc:before {\n  content: \"\\F20A\"; }\n\n.fa-shekel:before,\n.fa-sheqel:before,\n.fa-ils:before {\n  content: \"\\F20B\"; }\n\n.fa-meanpath:before {\n  content: \"\\F20C\"; }\n\n.fa-buysellads:before {\n  content: \"\\F20D\"; }\n\n.fa-connectdevelop:before {\n  content: \"\\F20E\"; }\n\n.fa-dashcube:before {\n  content: \"\\F210\"; }\n\n.fa-forumbee:before {\n  content: \"\\F211\"; }\n\n.fa-leanpub:before {\n  content: \"\\F212\"; }\n\n.fa-sellsy:before {\n  content: \"\\F213\"; }\n\n.fa-shirtsinbulk:before {\n  content: \"\\F214\"; }\n\n.fa-simplybuilt:before {\n  content: \"\\F215\"; }\n\n.fa-skyatlas:before {\n  content: \"\\F216\"; }\n\n.fa-cart-plus:before {\n  content: \"\\F217\"; }\n\n.fa-cart-arrow-down:before {\n  content: \"\\F218\"; }\n\n.fa-diamond:before {\n  content: \"\\F219\"; }\n\n.fa-ship:before {\n  content: \"\\F21A\"; }\n\n.fa-user-secret:before {\n  content: \"\\F21B\"; }\n\n.fa-motorcycle:before {\n  content: \"\\F21C\"; }\n\n.fa-street-view:before {\n  content: \"\\F21D\"; }\n\n.fa-heartbeat:before {\n  content: \"\\F21E\"; }\n\n.fa-venus:before {\n  content: \"\\F221\"; }\n\n.fa-mars:before {\n  content: \"\\F222\"; }\n\n.fa-mercury:before {\n  content: \"\\F223\"; }\n\n.fa-intersex:before,\n.fa-transgender:before {\n  content: \"\\F224\"; }\n\n.fa-transgender-alt:before {\n  content: \"\\F225\"; }\n\n.fa-venus-double:before {\n  content: \"\\F226\"; }\n\n.fa-mars-double:before {\n  content: \"\\F227\"; }\n\n.fa-venus-mars:before {\n  content: \"\\F228\"; }\n\n.fa-mars-stroke:before {\n  content: \"\\F229\"; }\n\n.fa-mars-stroke-v:before {\n  content: \"\\F22A\"; }\n\n.fa-mars-stroke-h:before {\n  content: \"\\F22B\"; }\n\n.fa-neuter:before {\n  content: \"\\F22C\"; }\n\n.fa-genderless:before {\n  content: \"\\F22D\"; }\n\n.fa-facebook-official:before {\n  content: \"\\F230\"; }\n\n.fa-pinterest-p:before {\n  content: \"\\F231\"; }\n\n.fa-whatsapp:before {\n  content: \"\\F232\"; }\n\n.fa-server:before {\n  content: \"\\F233\"; }\n\n.fa-user-plus:before {\n  content: \"\\F234\"; }\n\n.fa-user-times:before {\n  content: \"\\F235\"; }\n\n.fa-hotel:before,\n.fa-bed:before {\n  content: \"\\F236\"; }\n\n.fa-viacoin:before {\n  content: \"\\F237\"; }\n\n.fa-train:before {\n  content: \"\\F238\"; }\n\n.fa-subway:before {\n  content: \"\\F239\"; }\n\n.fa-medium:before {\n  content: \"\\F23A\"; }\n\n.fa-yc:before,\n.fa-y-combinator:before {\n  content: \"\\F23B\"; }\n\n.fa-optin-monster:before {\n  content: \"\\F23C\"; }\n\n.fa-opencart:before {\n  content: \"\\F23D\"; }\n\n.fa-expeditedssl:before {\n  content: \"\\F23E\"; }\n\n.fa-battery-4:before,\n.fa-battery:before,\n.fa-battery-full:before {\n  content: \"\\F240\"; }\n\n.fa-battery-3:before,\n.fa-battery-three-quarters:before {\n  content: \"\\F241\"; }\n\n.fa-battery-2:before,\n.fa-battery-half:before {\n  content: \"\\F242\"; }\n\n.fa-battery-1:before,\n.fa-battery-quarter:before {\n  content: \"\\F243\"; }\n\n.fa-battery-0:before,\n.fa-battery-empty:before {\n  content: \"\\F244\"; }\n\n.fa-mouse-pointer:before {\n  content: \"\\F245\"; }\n\n.fa-i-cursor:before {\n  content: \"\\F246\"; }\n\n.fa-object-group:before {\n  content: \"\\F247\"; }\n\n.fa-object-ungroup:before {\n  content: \"\\F248\"; }\n\n.fa-sticky-note:before {\n  content: \"\\F249\"; }\n\n.fa-sticky-note-o:before {\n  content: \"\\F24A\"; }\n\n.fa-cc-jcb:before {\n  content: \"\\F24B\"; }\n\n.fa-cc-diners-club:before {\n  content: \"\\F24C\"; }\n\n.fa-clone:before {\n  content: \"\\F24D\"; }\n\n.fa-balance-scale:before {\n  content: \"\\F24E\"; }\n\n.fa-hourglass-o:before {\n  content: \"\\F250\"; }\n\n.fa-hourglass-1:before,\n.fa-hourglass-start:before {\n  content: \"\\F251\"; }\n\n.fa-hourglass-2:before,\n.fa-hourglass-half:before {\n  content: \"\\F252\"; }\n\n.fa-hourglass-3:before,\n.fa-hourglass-end:before {\n  content: \"\\F253\"; }\n\n.fa-hourglass:before {\n  content: \"\\F254\"; }\n\n.fa-hand-grab-o:before,\n.fa-hand-rock-o:before {\n  content: \"\\F255\"; }\n\n.fa-hand-stop-o:before,\n.fa-hand-paper-o:before {\n  content: \"\\F256\"; }\n\n.fa-hand-scissors-o:before {\n  content: \"\\F257\"; }\n\n.fa-hand-lizard-o:before {\n  content: \"\\F258\"; }\n\n.fa-hand-spock-o:before {\n  content: \"\\F259\"; }\n\n.fa-hand-pointer-o:before {\n  content: \"\\F25A\"; }\n\n.fa-hand-peace-o:before {\n  content: \"\\F25B\"; }\n\n.fa-trademark:before {\n  content: \"\\F25C\"; }\n\n.fa-registered:before {\n  content: \"\\F25D\"; }\n\n.fa-creative-commons:before {\n  content: \"\\F25E\"; }\n\n.fa-gg:before {\n  content: \"\\F260\"; }\n\n.fa-gg-circle:before {\n  content: \"\\F261\"; }\n\n.fa-tripadvisor:before {\n  content: \"\\F262\"; }\n\n.fa-odnoklassniki:before {\n  content: \"\\F263\"; }\n\n.fa-odnoklassniki-square:before {\n  content: \"\\F264\"; }\n\n.fa-get-pocket:before {\n  content: \"\\F265\"; }\n\n.fa-wikipedia-w:before {\n  content: \"\\F266\"; }\n\n.fa-safari:before {\n  content: \"\\F267\"; }\n\n.fa-chrome:before {\n  content: \"\\F268\"; }\n\n.fa-firefox:before {\n  content: \"\\F269\"; }\n\n.fa-opera:before {\n  content: \"\\F26A\"; }\n\n.fa-internet-explorer:before {\n  content: \"\\F26B\"; }\n\n.fa-tv:before,\n.fa-television:before {\n  content: \"\\F26C\"; }\n\n.fa-contao:before {\n  content: \"\\F26D\"; }\n\n.fa-500px:before {\n  content: \"\\F26E\"; }\n\n.fa-amazon:before {\n  content: \"\\F270\"; }\n\n.fa-calendar-plus-o:before {\n  content: \"\\F271\"; }\n\n.fa-calendar-minus-o:before {\n  content: \"\\F272\"; }\n\n.fa-calendar-times-o:before {\n  content: \"\\F273\"; }\n\n.fa-calendar-check-o:before {\n  content: \"\\F274\"; }\n\n.fa-industry:before {\n  content: \"\\F275\"; }\n\n.fa-map-pin:before {\n  content: \"\\F276\"; }\n\n.fa-map-signs:before {\n  content: \"\\F277\"; }\n\n.fa-map-o:before {\n  content: \"\\F278\"; }\n\n.fa-map:before {\n  content: \"\\F279\"; }\n\n.fa-commenting:before {\n  content: \"\\F27A\"; }\n\n.fa-commenting-o:before {\n  content: \"\\F27B\"; }\n\n.fa-houzz:before {\n  content: \"\\F27C\"; }\n\n.fa-vimeo:before {\n  content: \"\\F27D\"; }\n\n.fa-black-tie:before {\n  content: \"\\F27E\"; }\n\n.fa-fonticons:before {\n  content: \"\\F280\"; }\n\n.fa-reddit-alien:before {\n  content: \"\\F281\"; }\n\n.fa-edge:before {\n  content: \"\\F282\"; }\n\n.fa-credit-card-alt:before {\n  content: \"\\F283\"; }\n\n.fa-codiepie:before {\n  content: \"\\F284\"; }\n\n.fa-modx:before {\n  content: \"\\F285\"; }\n\n.fa-fort-awesome:before {\n  content: \"\\F286\"; }\n\n.fa-usb:before {\n  content: \"\\F287\"; }\n\n.fa-product-hunt:before {\n  content: \"\\F288\"; }\n\n.fa-mixcloud:before {\n  content: \"\\F289\"; }\n\n.fa-scribd:before {\n  content: \"\\F28A\"; }\n\n.fa-pause-circle:before {\n  content: \"\\F28B\"; }\n\n.fa-pause-circle-o:before {\n  content: \"\\F28C\"; }\n\n.fa-stop-circle:before {\n  content: \"\\F28D\"; }\n\n.fa-stop-circle-o:before {\n  content: \"\\F28E\"; }\n\n.fa-shopping-bag:before {\n  content: \"\\F290\"; }\n\n.fa-shopping-basket:before {\n  content: \"\\F291\"; }\n\n.fa-hashtag:before {\n  content: \"\\F292\"; }\n\n.fa-bluetooth:before {\n  content: \"\\F293\"; }\n\n.fa-bluetooth-b:before {\n  content: \"\\F294\"; }\n\n.fa-percent:before {\n  content: \"\\F295\"; }\n\n.fa-gitlab:before {\n  content: \"\\F296\"; }\n\n.fa-wpbeginner:before {\n  content: \"\\F297\"; }\n\n.fa-wpforms:before {\n  content: \"\\F298\"; }\n\n.fa-envira:before {\n  content: \"\\F299\"; }\n\n.fa-universal-access:before {\n  content: \"\\F29A\"; }\n\n.fa-wheelchair-alt:before {\n  content: \"\\F29B\"; }\n\n.fa-question-circle-o:before {\n  content: \"\\F29C\"; }\n\n.fa-blind:before {\n  content: \"\\F29D\"; }\n\n.fa-audio-description:before {\n  content: \"\\F29E\"; }\n\n.fa-volume-control-phone:before {\n  content: \"\\F2A0\"; }\n\n.fa-braille:before {\n  content: \"\\F2A1\"; }\n\n.fa-assistive-listening-systems:before {\n  content: \"\\F2A2\"; }\n\n.fa-asl-interpreting:before,\n.fa-american-sign-language-interpreting:before {\n  content: \"\\F2A3\"; }\n\n.fa-deafness:before,\n.fa-hard-of-hearing:before,\n.fa-deaf:before {\n  content: \"\\F2A4\"; }\n\n.fa-glide:before {\n  content: \"\\F2A5\"; }\n\n.fa-glide-g:before {\n  content: \"\\F2A6\"; }\n\n.fa-signing:before,\n.fa-sign-language:before {\n  content: \"\\F2A7\"; }\n\n.fa-low-vision:before {\n  content: \"\\F2A8\"; }\n\n.fa-viadeo:before {\n  content: \"\\F2A9\"; }\n\n.fa-viadeo-square:before {\n  content: \"\\F2AA\"; }\n\n.fa-snapchat:before {\n  content: \"\\F2AB\"; }\n\n.fa-snapchat-ghost:before {\n  content: \"\\F2AC\"; }\n\n.fa-snapchat-square:before {\n  content: \"\\F2AD\"; }\n\n.fa-pied-piper:before {\n  content: \"\\F2AE\"; }\n\n.fa-first-order:before {\n  content: \"\\F2B0\"; }\n\n.fa-yoast:before {\n  content: \"\\F2B1\"; }\n\n.fa-themeisle:before {\n  content: \"\\F2B2\"; }\n\n.fa-google-plus-circle:before,\n.fa-google-plus-official:before {\n  content: \"\\F2B3\"; }\n\n.fa-fa:before,\n.fa-font-awesome:before {\n  content: \"\\F2B4\"; }\n\n.fa-handshake-o:before {\n  content: \"\\F2B5\"; }\n\n.fa-envelope-open:before {\n  content: \"\\F2B6\"; }\n\n.fa-envelope-open-o:before {\n  content: \"\\F2B7\"; }\n\n.fa-linode:before {\n  content: \"\\F2B8\"; }\n\n.fa-address-book:before {\n  content: \"\\F2B9\"; }\n\n.fa-address-book-o:before {\n  content: \"\\F2BA\"; }\n\n.fa-vcard:before,\n.fa-address-card:before {\n  content: \"\\F2BB\"; }\n\n.fa-vcard-o:before,\n.fa-address-card-o:before {\n  content: \"\\F2BC\"; }\n\n.fa-user-circle:before {\n  content: \"\\F2BD\"; }\n\n.fa-user-circle-o:before {\n  content: \"\\F2BE\"; }\n\n.fa-user-o:before {\n  content: \"\\F2C0\"; }\n\n.fa-id-badge:before {\n  content: \"\\F2C1\"; }\n\n.fa-drivers-license:before,\n.fa-id-card:before {\n  content: \"\\F2C2\"; }\n\n.fa-drivers-license-o:before,\n.fa-id-card-o:before {\n  content: \"\\F2C3\"; }\n\n.fa-quora:before {\n  content: \"\\F2C4\"; }\n\n.fa-free-code-camp:before {\n  content: \"\\F2C5\"; }\n\n.fa-telegram:before {\n  content: \"\\F2C6\"; }\n\n.fa-thermometer-4:before,\n.fa-thermometer:before,\n.fa-thermometer-full:before {\n  content: \"\\F2C7\"; }\n\n.fa-thermometer-3:before,\n.fa-thermometer-three-quarters:before {\n  content: \"\\F2C8\"; }\n\n.fa-thermometer-2:before,\n.fa-thermometer-half:before {\n  content: \"\\F2C9\"; }\n\n.fa-thermometer-1:before,\n.fa-thermometer-quarter:before {\n  content: \"\\F2CA\"; }\n\n.fa-thermometer-0:before,\n.fa-thermometer-empty:before {\n  content: \"\\F2CB\"; }\n\n.fa-shower:before {\n  content: \"\\F2CC\"; }\n\n.fa-bathtub:before,\n.fa-s15:before,\n.fa-bath:before {\n  content: \"\\F2CD\"; }\n\n.fa-podcast:before {\n  content: \"\\F2CE\"; }\n\n.fa-window-maximize:before {\n  content: \"\\F2D0\"; }\n\n.fa-window-minimize:before {\n  content: \"\\F2D1\"; }\n\n.fa-window-restore:before {\n  content: \"\\F2D2\"; }\n\n.fa-times-rectangle:before,\n.fa-window-close:before {\n  content: \"\\F2D3\"; }\n\n.fa-times-rectangle-o:before,\n.fa-window-close-o:before {\n  content: \"\\F2D4\"; }\n\n.fa-bandcamp:before {\n  content: \"\\F2D5\"; }\n\n.fa-grav:before {\n  content: \"\\F2D6\"; }\n\n.fa-etsy:before {\n  content: \"\\F2D7\"; }\n\n.fa-imdb:before {\n  content: \"\\F2D8\"; }\n\n.fa-ravelry:before {\n  content: \"\\F2D9\"; }\n\n.fa-eercast:before {\n  content: \"\\F2DA\"; }\n\n.fa-microchip:before {\n  content: \"\\F2DB\"; }\n\n.fa-snowflake-o:before {\n  content: \"\\F2DC\"; }\n\n.fa-superpowers:before {\n  content: \"\\F2DD\"; }\n\n.fa-wpexplorer:before {\n  content: \"\\F2DE\"; }\n\n.fa-meetup:before {\n  content: \"\\F2E0\"; }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n", ""]);
	
	// exports


/***/ },
/* 22 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "674f50d287a8c48dc19ba404d20fe713.eot";

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "674f50d287a8c48dc19ba404d20fe713.eot";

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "af7ae505a9eed503f8b8e6982036873e.woff2";

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "fee66e712a8a08eef5805a46892932ad.woff";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "b06871f281fee6b241d60582ae9369b9.ttf";

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "912ec66d7572ff821749319396470bde.svg";

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(31);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(29)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(true) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept(31, function() {
				var newContent = __webpack_require__(31);
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(22)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * Bootstrap v4.0.0-alpha.5 (https://getbootstrap.com)\n * Copyright 2011-2016 The Bootstrap Authors\n * Copyright 2011-2016 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v4.2.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\nprogress {\n  vertical-align: baseline; }\n\ntemplate,\n[hidden] {\n  display: none; }\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects; }\n\na:active,\na:hover {\n  outline-width: 0; }\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted; }\n\nb,\nstrong {\n  font-weight: inherit; }\n\nb,\nstrong {\n  font-weight: bolder; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background-color: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\nimg {\n  border-style: none; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0;\n  overflow: visible; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit;\n  margin: 0; }\n\noptgroup {\n  font-weight: bold; }\n\nbutton,\ninput {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; }\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal; }\n\ntextarea {\n  overflow: auto; }\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px; }\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54; }\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit; }\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  *::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    box-shadow: none !important; }\n  a,\n  a:visited {\n    text-decoration: underline; }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\"; }\n  pre {\n    white-space: pre-wrap !important; }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid; }\n  thead {\n    display: table-header-group; }\n  tr,\n  img {\n    page-break-inside: avoid; }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3; }\n  h2,\n  h3 {\n    page-break-after: avoid; }\n  .navbar {\n    display: none; }\n  .btn > .caret,\n  .dropup > .btn > .caret {\n    border-top-color: #000 !important; }\n  .tag {\n    border: 1px solid #000; }\n  .table {\n    border-collapse: collapse !important; }\n    .table td,\n    .table th {\n      background-color: #fff !important; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important; } }\n\nhtml {\n  box-sizing: border-box; }\n\n*,\n*::before,\n*::after {\n  box-sizing: inherit; }\n\n@-ms-viewport {\n  width: device-width; }\n\nhtml {\n  font-size: 16px;\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent; }\n\nbody {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  line-height: 1.5;\n  color: #373a3c;\n  background-color: #fff; }\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important; }\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem; }\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n  border-bottom: 1px dotted #818a91; }\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit; }\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem; }\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0; }\n\ndt {\n  font-weight: bold; }\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0; }\n\nblockquote {\n  margin: 0 0 1rem; }\n\na {\n  color: #CC1100;\n  text-decoration: none; }\n  a:focus, a:hover {\n    color: #800b00;\n    text-decoration: none; }\n  a:focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none; }\n  a:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n    color: inherit;\n    text-decoration: none; }\n  a:not([href]):not([tabindex]):focus {\n    outline: none; }\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto; }\n\nfigure {\n  margin: 0 0 1rem; }\n\nimg {\n  vertical-align: middle; }\n\n[role=\"button\"] {\n  cursor: pointer; }\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  touch-action: manipulation; }\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent; }\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #818a91;\n  text-align: left;\n  caption-side: bottom; }\n\nth {\n  text-align: left; }\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem; }\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color; }\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit; }\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed; }\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox; }\n\ntextarea {\n  resize: vertical; }\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0; }\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: none; }\n\noutput {\n  display: inline-block; }\n\n[hidden] {\n  display: none !important; }\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit; }\n\nh1, .h1 {\n  font-size: 2.5rem; }\n\nh2, .h2 {\n  font-size: 2rem; }\n\nh3, .h3 {\n  font-size: 1.75rem; }\n\nh4, .h4 {\n  font-size: 1.5rem; }\n\nh5, .h5 {\n  font-size: 1.25rem; }\n\nh6, .h6 {\n  font-size: 1rem; }\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300; }\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300; }\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300; }\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300; }\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300; }\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1); }\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal; }\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3; }\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline {\n  padding-left: 0;\n  list-style: none; }\n\n.list-inline-item {\n  display: inline-block; }\n  .list-inline-item:not(:last-child) {\n    margin-right: 5px; }\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase; }\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef; }\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #818a91; }\n  .blockquote-footer::before {\n    content: \"\\2014   \\A0\"; }\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0; }\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\"; }\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\"; }\n\ndl.row > dd + dt {\n  clear: left; }\n\n.img-fluid, .carousel-inner > .carousel-item > img,\n.carousel-inner > .carousel-item > a > img {\n  max-width: 100%;\n  height: auto; }\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  transition: all .2s ease-in-out;\n  max-width: 100%;\n  height: auto; }\n\n.figure {\n  display: inline-block; }\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1; }\n\n.figure-caption {\n  font-size: 90%;\n  color: #818a91; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; }\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem; }\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #333;\n  border-radius: 0.2rem; }\n  kbd kbd {\n    padding: 0;\n    font-size: 100%;\n    font-weight: bold; }\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #373a3c; }\n  pre code {\n    padding: 0;\n    font-size: inherit;\n    color: inherit;\n    background-color: transparent;\n    border-radius: 0; }\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll; }\n\n.container {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 576px) {\n    .container {\n      width: 540px;\n      max-width: 100%; } }\n  @media (min-width: 768px) {\n    .container {\n      width: 720px;\n      max-width: 100%; } }\n  @media (min-width: 992px) {\n    .container {\n      width: 960px;\n      max-width: 100%; } }\n  @media (min-width: 1200px) {\n    .container {\n      width: 1140px;\n      max-width: 100%; } }\n\n.container-fluid {\n  margin-left: auto;\n  margin-right: auto;\n  padding-left: 15px;\n  padding-right: 15px; }\n  .container-fluid::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.row {\n  margin-right: -15px;\n  margin-left: -15px; }\n  .row::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 576px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 768px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 992px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n  @media (min-width: 1200px) {\n    .row {\n      margin-right: -15px;\n      margin-left: -15px; } }\n\n.col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n  position: relative;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px; }\n  @media (min-width: 576px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 768px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 992px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n  @media (min-width: 1200px) {\n    .col-xs, .col-xs-1, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9, .col-xs-10, .col-xs-11, .col-xs-12, .col-sm, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-md, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-lg, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-xl, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12 {\n      padding-right: 15px;\n      padding-left: 15px; } }\n\n.col-xs-1 {\n  float: left;\n  width: 8.33333%; }\n\n.col-xs-2 {\n  float: left;\n  width: 16.66667%; }\n\n.col-xs-3 {\n  float: left;\n  width: 25%; }\n\n.col-xs-4 {\n  float: left;\n  width: 33.33333%; }\n\n.col-xs-5 {\n  float: left;\n  width: 41.66667%; }\n\n.col-xs-6 {\n  float: left;\n  width: 50%; }\n\n.col-xs-7 {\n  float: left;\n  width: 58.33333%; }\n\n.col-xs-8 {\n  float: left;\n  width: 66.66667%; }\n\n.col-xs-9 {\n  float: left;\n  width: 75%; }\n\n.col-xs-10 {\n  float: left;\n  width: 83.33333%; }\n\n.col-xs-11 {\n  float: left;\n  width: 91.66667%; }\n\n.col-xs-12 {\n  float: left;\n  width: 100%; }\n\n.pull-xs-0 {\n  right: auto; }\n\n.pull-xs-1 {\n  right: 8.33333%; }\n\n.pull-xs-2 {\n  right: 16.66667%; }\n\n.pull-xs-3 {\n  right: 25%; }\n\n.pull-xs-4 {\n  right: 33.33333%; }\n\n.pull-xs-5 {\n  right: 41.66667%; }\n\n.pull-xs-6 {\n  right: 50%; }\n\n.pull-xs-7 {\n  right: 58.33333%; }\n\n.pull-xs-8 {\n  right: 66.66667%; }\n\n.pull-xs-9 {\n  right: 75%; }\n\n.pull-xs-10 {\n  right: 83.33333%; }\n\n.pull-xs-11 {\n  right: 91.66667%; }\n\n.pull-xs-12 {\n  right: 100%; }\n\n.push-xs-0 {\n  left: auto; }\n\n.push-xs-1 {\n  left: 8.33333%; }\n\n.push-xs-2 {\n  left: 16.66667%; }\n\n.push-xs-3 {\n  left: 25%; }\n\n.push-xs-4 {\n  left: 33.33333%; }\n\n.push-xs-5 {\n  left: 41.66667%; }\n\n.push-xs-6 {\n  left: 50%; }\n\n.push-xs-7 {\n  left: 58.33333%; }\n\n.push-xs-8 {\n  left: 66.66667%; }\n\n.push-xs-9 {\n  left: 75%; }\n\n.push-xs-10 {\n  left: 83.33333%; }\n\n.push-xs-11 {\n  left: 91.66667%; }\n\n.push-xs-12 {\n  left: 100%; }\n\n.offset-xs-1 {\n  margin-left: 8.33333%; }\n\n.offset-xs-2 {\n  margin-left: 16.66667%; }\n\n.offset-xs-3 {\n  margin-left: 25%; }\n\n.offset-xs-4 {\n  margin-left: 33.33333%; }\n\n.offset-xs-5 {\n  margin-left: 41.66667%; }\n\n.offset-xs-6 {\n  margin-left: 50%; }\n\n.offset-xs-7 {\n  margin-left: 58.33333%; }\n\n.offset-xs-8 {\n  margin-left: 66.66667%; }\n\n.offset-xs-9 {\n  margin-left: 75%; }\n\n.offset-xs-10 {\n  margin-left: 83.33333%; }\n\n.offset-xs-11 {\n  margin-left: 91.66667%; }\n\n@media (min-width: 576px) {\n  .col-sm-1 {\n    float: left;\n    width: 8.33333%; }\n  .col-sm-2 {\n    float: left;\n    width: 16.66667%; }\n  .col-sm-3 {\n    float: left;\n    width: 25%; }\n  .col-sm-4 {\n    float: left;\n    width: 33.33333%; }\n  .col-sm-5 {\n    float: left;\n    width: 41.66667%; }\n  .col-sm-6 {\n    float: left;\n    width: 50%; }\n  .col-sm-7 {\n    float: left;\n    width: 58.33333%; }\n  .col-sm-8 {\n    float: left;\n    width: 66.66667%; }\n  .col-sm-9 {\n    float: left;\n    width: 75%; }\n  .col-sm-10 {\n    float: left;\n    width: 83.33333%; }\n  .col-sm-11 {\n    float: left;\n    width: 91.66667%; }\n  .col-sm-12 {\n    float: left;\n    width: 100%; }\n  .pull-sm-0 {\n    right: auto; }\n  .pull-sm-1 {\n    right: 8.33333%; }\n  .pull-sm-2 {\n    right: 16.66667%; }\n  .pull-sm-3 {\n    right: 25%; }\n  .pull-sm-4 {\n    right: 33.33333%; }\n  .pull-sm-5 {\n    right: 41.66667%; }\n  .pull-sm-6 {\n    right: 50%; }\n  .pull-sm-7 {\n    right: 58.33333%; }\n  .pull-sm-8 {\n    right: 66.66667%; }\n  .pull-sm-9 {\n    right: 75%; }\n  .pull-sm-10 {\n    right: 83.33333%; }\n  .pull-sm-11 {\n    right: 91.66667%; }\n  .pull-sm-12 {\n    right: 100%; }\n  .push-sm-0 {\n    left: auto; }\n  .push-sm-1 {\n    left: 8.33333%; }\n  .push-sm-2 {\n    left: 16.66667%; }\n  .push-sm-3 {\n    left: 25%; }\n  .push-sm-4 {\n    left: 33.33333%; }\n  .push-sm-5 {\n    left: 41.66667%; }\n  .push-sm-6 {\n    left: 50%; }\n  .push-sm-7 {\n    left: 58.33333%; }\n  .push-sm-8 {\n    left: 66.66667%; }\n  .push-sm-9 {\n    left: 75%; }\n  .push-sm-10 {\n    left: 83.33333%; }\n  .push-sm-11 {\n    left: 91.66667%; }\n  .push-sm-12 {\n    left: 100%; }\n  .offset-sm-0 {\n    margin-left: 0%; }\n  .offset-sm-1 {\n    margin-left: 8.33333%; }\n  .offset-sm-2 {\n    margin-left: 16.66667%; }\n  .offset-sm-3 {\n    margin-left: 25%; }\n  .offset-sm-4 {\n    margin-left: 33.33333%; }\n  .offset-sm-5 {\n    margin-left: 41.66667%; }\n  .offset-sm-6 {\n    margin-left: 50%; }\n  .offset-sm-7 {\n    margin-left: 58.33333%; }\n  .offset-sm-8 {\n    margin-left: 66.66667%; }\n  .offset-sm-9 {\n    margin-left: 75%; }\n  .offset-sm-10 {\n    margin-left: 83.33333%; }\n  .offset-sm-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 768px) {\n  .col-md-1 {\n    float: left;\n    width: 8.33333%; }\n  .col-md-2 {\n    float: left;\n    width: 16.66667%; }\n  .col-md-3 {\n    float: left;\n    width: 25%; }\n  .col-md-4 {\n    float: left;\n    width: 33.33333%; }\n  .col-md-5 {\n    float: left;\n    width: 41.66667%; }\n  .col-md-6 {\n    float: left;\n    width: 50%; }\n  .col-md-7 {\n    float: left;\n    width: 58.33333%; }\n  .col-md-8 {\n    float: left;\n    width: 66.66667%; }\n  .col-md-9 {\n    float: left;\n    width: 75%; }\n  .col-md-10 {\n    float: left;\n    width: 83.33333%; }\n  .col-md-11 {\n    float: left;\n    width: 91.66667%; }\n  .col-md-12 {\n    float: left;\n    width: 100%; }\n  .pull-md-0 {\n    right: auto; }\n  .pull-md-1 {\n    right: 8.33333%; }\n  .pull-md-2 {\n    right: 16.66667%; }\n  .pull-md-3 {\n    right: 25%; }\n  .pull-md-4 {\n    right: 33.33333%; }\n  .pull-md-5 {\n    right: 41.66667%; }\n  .pull-md-6 {\n    right: 50%; }\n  .pull-md-7 {\n    right: 58.33333%; }\n  .pull-md-8 {\n    right: 66.66667%; }\n  .pull-md-9 {\n    right: 75%; }\n  .pull-md-10 {\n    right: 83.33333%; }\n  .pull-md-11 {\n    right: 91.66667%; }\n  .pull-md-12 {\n    right: 100%; }\n  .push-md-0 {\n    left: auto; }\n  .push-md-1 {\n    left: 8.33333%; }\n  .push-md-2 {\n    left: 16.66667%; }\n  .push-md-3 {\n    left: 25%; }\n  .push-md-4 {\n    left: 33.33333%; }\n  .push-md-5 {\n    left: 41.66667%; }\n  .push-md-6 {\n    left: 50%; }\n  .push-md-7 {\n    left: 58.33333%; }\n  .push-md-8 {\n    left: 66.66667%; }\n  .push-md-9 {\n    left: 75%; }\n  .push-md-10 {\n    left: 83.33333%; }\n  .push-md-11 {\n    left: 91.66667%; }\n  .push-md-12 {\n    left: 100%; }\n  .offset-md-0 {\n    margin-left: 0%; }\n  .offset-md-1 {\n    margin-left: 8.33333%; }\n  .offset-md-2 {\n    margin-left: 16.66667%; }\n  .offset-md-3 {\n    margin-left: 25%; }\n  .offset-md-4 {\n    margin-left: 33.33333%; }\n  .offset-md-5 {\n    margin-left: 41.66667%; }\n  .offset-md-6 {\n    margin-left: 50%; }\n  .offset-md-7 {\n    margin-left: 58.33333%; }\n  .offset-md-8 {\n    margin-left: 66.66667%; }\n  .offset-md-9 {\n    margin-left: 75%; }\n  .offset-md-10 {\n    margin-left: 83.33333%; }\n  .offset-md-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 992px) {\n  .col-lg-1 {\n    float: left;\n    width: 8.33333%; }\n  .col-lg-2 {\n    float: left;\n    width: 16.66667%; }\n  .col-lg-3 {\n    float: left;\n    width: 25%; }\n  .col-lg-4 {\n    float: left;\n    width: 33.33333%; }\n  .col-lg-5 {\n    float: left;\n    width: 41.66667%; }\n  .col-lg-6 {\n    float: left;\n    width: 50%; }\n  .col-lg-7 {\n    float: left;\n    width: 58.33333%; }\n  .col-lg-8 {\n    float: left;\n    width: 66.66667%; }\n  .col-lg-9 {\n    float: left;\n    width: 75%; }\n  .col-lg-10 {\n    float: left;\n    width: 83.33333%; }\n  .col-lg-11 {\n    float: left;\n    width: 91.66667%; }\n  .col-lg-12 {\n    float: left;\n    width: 100%; }\n  .pull-lg-0 {\n    right: auto; }\n  .pull-lg-1 {\n    right: 8.33333%; }\n  .pull-lg-2 {\n    right: 16.66667%; }\n  .pull-lg-3 {\n    right: 25%; }\n  .pull-lg-4 {\n    right: 33.33333%; }\n  .pull-lg-5 {\n    right: 41.66667%; }\n  .pull-lg-6 {\n    right: 50%; }\n  .pull-lg-7 {\n    right: 58.33333%; }\n  .pull-lg-8 {\n    right: 66.66667%; }\n  .pull-lg-9 {\n    right: 75%; }\n  .pull-lg-10 {\n    right: 83.33333%; }\n  .pull-lg-11 {\n    right: 91.66667%; }\n  .pull-lg-12 {\n    right: 100%; }\n  .push-lg-0 {\n    left: auto; }\n  .push-lg-1 {\n    left: 8.33333%; }\n  .push-lg-2 {\n    left: 16.66667%; }\n  .push-lg-3 {\n    left: 25%; }\n  .push-lg-4 {\n    left: 33.33333%; }\n  .push-lg-5 {\n    left: 41.66667%; }\n  .push-lg-6 {\n    left: 50%; }\n  .push-lg-7 {\n    left: 58.33333%; }\n  .push-lg-8 {\n    left: 66.66667%; }\n  .push-lg-9 {\n    left: 75%; }\n  .push-lg-10 {\n    left: 83.33333%; }\n  .push-lg-11 {\n    left: 91.66667%; }\n  .push-lg-12 {\n    left: 100%; }\n  .offset-lg-0 {\n    margin-left: 0%; }\n  .offset-lg-1 {\n    margin-left: 8.33333%; }\n  .offset-lg-2 {\n    margin-left: 16.66667%; }\n  .offset-lg-3 {\n    margin-left: 25%; }\n  .offset-lg-4 {\n    margin-left: 33.33333%; }\n  .offset-lg-5 {\n    margin-left: 41.66667%; }\n  .offset-lg-6 {\n    margin-left: 50%; }\n  .offset-lg-7 {\n    margin-left: 58.33333%; }\n  .offset-lg-8 {\n    margin-left: 66.66667%; }\n  .offset-lg-9 {\n    margin-left: 75%; }\n  .offset-lg-10 {\n    margin-left: 83.33333%; }\n  .offset-lg-11 {\n    margin-left: 91.66667%; } }\n\n@media (min-width: 1200px) {\n  .col-xl-1 {\n    float: left;\n    width: 8.33333%; }\n  .col-xl-2 {\n    float: left;\n    width: 16.66667%; }\n  .col-xl-3 {\n    float: left;\n    width: 25%; }\n  .col-xl-4 {\n    float: left;\n    width: 33.33333%; }\n  .col-xl-5 {\n    float: left;\n    width: 41.66667%; }\n  .col-xl-6 {\n    float: left;\n    width: 50%; }\n  .col-xl-7 {\n    float: left;\n    width: 58.33333%; }\n  .col-xl-8 {\n    float: left;\n    width: 66.66667%; }\n  .col-xl-9 {\n    float: left;\n    width: 75%; }\n  .col-xl-10 {\n    float: left;\n    width: 83.33333%; }\n  .col-xl-11 {\n    float: left;\n    width: 91.66667%; }\n  .col-xl-12 {\n    float: left;\n    width: 100%; }\n  .pull-xl-0 {\n    right: auto; }\n  .pull-xl-1 {\n    right: 8.33333%; }\n  .pull-xl-2 {\n    right: 16.66667%; }\n  .pull-xl-3 {\n    right: 25%; }\n  .pull-xl-4 {\n    right: 33.33333%; }\n  .pull-xl-5 {\n    right: 41.66667%; }\n  .pull-xl-6 {\n    right: 50%; }\n  .pull-xl-7 {\n    right: 58.33333%; }\n  .pull-xl-8 {\n    right: 66.66667%; }\n  .pull-xl-9 {\n    right: 75%; }\n  .pull-xl-10 {\n    right: 83.33333%; }\n  .pull-xl-11 {\n    right: 91.66667%; }\n  .pull-xl-12 {\n    right: 100%; }\n  .push-xl-0 {\n    left: auto; }\n  .push-xl-1 {\n    left: 8.33333%; }\n  .push-xl-2 {\n    left: 16.66667%; }\n  .push-xl-3 {\n    left: 25%; }\n  .push-xl-4 {\n    left: 33.33333%; }\n  .push-xl-5 {\n    left: 41.66667%; }\n  .push-xl-6 {\n    left: 50%; }\n  .push-xl-7 {\n    left: 58.33333%; }\n  .push-xl-8 {\n    left: 66.66667%; }\n  .push-xl-9 {\n    left: 75%; }\n  .push-xl-10 {\n    left: 83.33333%; }\n  .push-xl-11 {\n    left: 91.66667%; }\n  .push-xl-12 {\n    left: 100%; }\n  .offset-xl-0 {\n    margin-left: 0%; }\n  .offset-xl-1 {\n    margin-left: 8.33333%; }\n  .offset-xl-2 {\n    margin-left: 16.66667%; }\n  .offset-xl-3 {\n    margin-left: 25%; }\n  .offset-xl-4 {\n    margin-left: 33.33333%; }\n  .offset-xl-5 {\n    margin-left: 41.66667%; }\n  .offset-xl-6 {\n    margin-left: 50%; }\n  .offset-xl-7 {\n    margin-left: 58.33333%; }\n  .offset-xl-8 {\n    margin-left: 66.66667%; }\n  .offset-xl-9 {\n    margin-left: 75%; }\n  .offset-xl-10 {\n    margin-left: 83.33333%; }\n  .offset-xl-11 {\n    margin-left: 91.66667%; } }\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem; }\n  .table th,\n  .table td {\n    padding: 0.75rem;\n    vertical-align: top;\n    border-top: 1px solid #eceeef; }\n  .table thead th {\n    vertical-align: bottom;\n    border-bottom: 2px solid #eceeef; }\n  .table tbody + tbody {\n    border-top: 2px solid #eceeef; }\n  .table .table {\n    background-color: #fff; }\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem; }\n\n.table-bordered {\n  border: 1px solid #eceeef; }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #eceeef; }\n  .table-bordered thead th,\n  .table-bordered thead td {\n    border-bottom-width: 2px; }\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05); }\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075); }\n  .table-hover .table-active:hover > td,\n  .table-hover .table-active:hover > th {\n    background-color: rgba(0, 0, 0, 0.075); }\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8; }\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6; }\n  .table-hover .table-success:hover > td,\n  .table-hover .table-success:hover > th {\n    background-color: #d0e9c6; }\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7; }\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3; }\n  .table-hover .table-info:hover > td,\n  .table-hover .table-info:hover > th {\n    background-color: #c4e3f3; }\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3; }\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc; }\n  .table-hover .table-warning:hover > td,\n  .table-hover .table-warning:hover > th {\n    background-color: #faf2cc; }\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede; }\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc; }\n  .table-hover .table-danger:hover > td,\n  .table-hover .table-danger:hover > th {\n    background-color: #ebcccc; }\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #373a3c; }\n\n.thead-default th {\n  color: #55595c;\n  background-color: #eceeef; }\n\n.table-inverse {\n  color: #eceeef;\n  background-color: #373a3c; }\n  .table-inverse th,\n  .table-inverse td,\n  .table-inverse thead th {\n    border-color: #55595c; }\n  .table-inverse.table-bordered {\n    border: 0; }\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  min-height: 0%;\n  overflow-x: auto; }\n\n.table-reflow thead {\n  float: left; }\n\n.table-reflow tbody {\n  display: block;\n  white-space: nowrap; }\n\n.table-reflow th,\n.table-reflow td {\n  border-top: 1px solid #eceeef;\n  border-left: 1px solid #eceeef; }\n  .table-reflow th:last-child,\n  .table-reflow td:last-child {\n    border-right: 1px solid #eceeef; }\n\n.table-reflow thead:last-child tr:last-child th,\n.table-reflow thead:last-child tr:last-child td,\n.table-reflow tbody:last-child tr:last-child th,\n.table-reflow tbody:last-child tr:last-child td,\n.table-reflow tfoot:last-child tr:last-child th,\n.table-reflow tfoot:last-child tr:last-child td {\n  border-bottom: 1px solid #eceeef; }\n\n.table-reflow tr {\n  float: left; }\n  .table-reflow tr th,\n  .table-reflow tr td {\n    display: block !important;\n    border: 1px solid #eceeef; }\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #55595c;\n  background-color: #fff;\n  background-image: none;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .form-control::-ms-expand {\n    background-color: transparent;\n    border: 0; }\n  .form-control:focus {\n    color: #55595c;\n    background-color: #fff;\n    border-color: #66afe9;\n    outline: none; }\n  .form-control::placeholder {\n    color: #999;\n    opacity: 1; }\n  .form-control:disabled, .form-control[readonly] {\n    background-color: #eceeef;\n    opacity: 1; }\n  .form-control:disabled {\n    cursor: not-allowed; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.5rem - 2px); }\n\nselect.form-control:focus::-ms-value {\n  color: #55595c;\n  background-color: #fff; }\n\n.form-control-file,\n.form-control-range {\n  display: block; }\n\n.col-form-label {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0; }\n\n.col-form-label-lg {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  font-size: 1.25rem; }\n\n.col-form-label-sm {\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  font-size: 0.875rem; }\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem; }\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0; }\n  .form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n  .input-group-sm > .form-control-static.input-group-addon,\n  .input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n  .input-group-lg > .form-control-static.input-group-addon,\n  .input-group-lg > .input-group-btn > .form-control-static.btn {\n    padding-right: 0;\n    padding-left: 0; }\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem; }\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.16667rem; }\n\n.form-group {\n  margin-bottom: 1rem; }\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem; }\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem; }\n  .form-check + .form-check {\n    margin-top: -.25rem; }\n  .form-check.disabled .form-check-label {\n    color: #818a91;\n    cursor: not-allowed; }\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer; }\n\n.form-check-input {\n  position: absolute;\n  margin-top: .25rem;\n  margin-left: -1.25rem; }\n  .form-check-input:only-child {\n    position: static; }\n\n.form-check-inline {\n  position: relative;\n  display: inline-block;\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  vertical-align: middle;\n  cursor: pointer; }\n  .form-check-inline + .form-check-inline {\n    margin-left: .75rem; }\n  .form-check-inline.disabled {\n    color: #818a91;\n    cursor: not-allowed; }\n\n.form-control-feedback {\n  margin-top: 0.25rem; }\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.625rem;\n  background-size: 1.25rem 1.25rem; }\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .form-check-label,\n.has-success .form-check-inline,\n.has-success .custom-control {\n  color: #5cb85c; }\n\n.has-success .form-control {\n  border-color: #5cb85c; }\n  .has-success .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #a3d7a3; }\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea; }\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#5cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\"); }\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .form-check-label,\n.has-warning .form-check-inline,\n.has-warning .custom-control {\n  color: #f0ad4e; }\n\n.has-warning .form-control {\n  border-color: #f0ad4e; }\n  .has-warning .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #f8d9ac; }\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white; }\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\"); }\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .form-check-label,\n.has-danger .form-check-inline,\n.has-danger .custom-control {\n  color: #d9534f; }\n\n.has-danger .form-control {\n  border-color: #d9534f; }\n  .has-danger .form-control:focus {\n    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 6px #eba5a3; }\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7; }\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='#d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\"); }\n\n@media (min-width: 576px) {\n  .form-inline .form-group {\n    display: inline-block;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle; }\n  .form-inline .form-control-static {\n    display: inline-block; }\n  .form-inline .input-group {\n    display: inline-table;\n    width: auto;\n    vertical-align: middle; }\n    .form-inline .input-group .input-group-addon,\n    .form-inline .input-group .input-group-btn,\n    .form-inline .input-group .form-control {\n      width: auto; }\n  .form-inline .input-group > .form-control {\n    width: 100%; }\n  .form-inline .form-control-label {\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-check {\n    display: inline-block;\n    margin-top: 0;\n    margin-bottom: 0;\n    vertical-align: middle; }\n  .form-inline .form-check-label {\n    padding-left: 0; }\n  .form-inline .form-check-input {\n    position: relative;\n    margin-left: 0; }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0; } }\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  cursor: pointer;\n  user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem; }\n  .btn:focus, .btn.focus, .btn:active:focus, .btn:active.focus, .btn.active:focus, .btn.active.focus {\n    outline: 5px auto -webkit-focus-ring-color;\n    outline-offset: -2px; }\n  .btn:focus, .btn:hover {\n    text-decoration: none; }\n  .btn.focus {\n    text-decoration: none; }\n  .btn:active, .btn.active {\n    background-image: none;\n    outline: 0; }\n  .btn.disabled, .btn:disabled {\n    cursor: not-allowed;\n    opacity: .65; }\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none; }\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .btn-primary:hover {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:focus, .btn-primary.focus {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b; }\n  .btn-primary:active, .btn-primary.active,\n  .open > .btn-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #025aa5;\n    border-color: #01549b;\n    background-image: none; }\n    .btn-primary:active:hover, .btn-primary:active:focus, .btn-primary:active.focus, .btn-primary.active:hover, .btn-primary.active:focus, .btn-primary.active.focus,\n    .open > .btn-primary.dropdown-toggle:hover,\n    .open > .btn-primary.dropdown-toggle:focus,\n    .open > .btn-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #014682;\n      border-color: #01315a; }\n  .btn-primary.disabled:focus, .btn-primary.disabled.focus, .btn-primary:disabled:focus, .btn-primary:disabled.focus {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-primary.disabled:hover, .btn-primary:disabled:hover {\n    background-color: #0275d8;\n    border-color: #0275d8; }\n\n.btn-secondary {\n  color: #373a3c;\n  background-color: #fff;\n  border-color: #ccc; }\n  .btn-secondary:hover {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:focus, .btn-secondary.focus {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad; }\n  .btn-secondary:active, .btn-secondary.active,\n  .open > .btn-secondary.dropdown-toggle {\n    color: #373a3c;\n    background-color: #e6e6e6;\n    border-color: #adadad;\n    background-image: none; }\n    .btn-secondary:active:hover, .btn-secondary:active:focus, .btn-secondary:active.focus, .btn-secondary.active:hover, .btn-secondary.active:focus, .btn-secondary.active.focus,\n    .open > .btn-secondary.dropdown-toggle:hover,\n    .open > .btn-secondary.dropdown-toggle:focus,\n    .open > .btn-secondary.dropdown-toggle.focus {\n      color: #373a3c;\n      background-color: #d4d4d4;\n      border-color: #8c8c8c; }\n  .btn-secondary.disabled:focus, .btn-secondary.disabled.focus, .btn-secondary:disabled:focus, .btn-secondary:disabled.focus {\n    background-color: #fff;\n    border-color: #ccc; }\n  .btn-secondary.disabled:hover, .btn-secondary:disabled:hover {\n    background-color: #fff;\n    border-color: #ccc; }\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .btn-info:hover {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:focus, .btn-info.focus {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2; }\n  .btn-info:active, .btn-info.active,\n  .open > .btn-info.dropdown-toggle {\n    color: #fff;\n    background-color: #31b0d5;\n    border-color: #2aabd2;\n    background-image: none; }\n    .btn-info:active:hover, .btn-info:active:focus, .btn-info:active.focus, .btn-info.active:hover, .btn-info.active:focus, .btn-info.active.focus,\n    .open > .btn-info.dropdown-toggle:hover,\n    .open > .btn-info.dropdown-toggle:focus,\n    .open > .btn-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1f7e9a; }\n  .btn-info.disabled:focus, .btn-info.disabled.focus, .btn-info:disabled:focus, .btn-info:disabled.focus {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-info.disabled:hover, .btn-info:disabled:hover {\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .btn-success:hover {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:focus, .btn-success.focus {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641; }\n  .btn-success:active, .btn-success.active,\n  .open > .btn-success.dropdown-toggle {\n    color: #fff;\n    background-color: #449d44;\n    border-color: #419641;\n    background-image: none; }\n    .btn-success:active:hover, .btn-success:active:focus, .btn-success:active.focus, .btn-success.active:hover, .btn-success.active:focus, .btn-success.active.focus,\n    .open > .btn-success.dropdown-toggle:hover,\n    .open > .btn-success.dropdown-toggle:focus,\n    .open > .btn-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #2d672d; }\n  .btn-success.disabled:focus, .btn-success.disabled.focus, .btn-success:disabled:focus, .btn-success:disabled.focus {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-success.disabled:hover, .btn-success:disabled:hover {\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .btn-warning:hover {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:focus, .btn-warning.focus {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316; }\n  .btn-warning:active, .btn-warning.active,\n  .open > .btn-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #ec971f;\n    border-color: #eb9316;\n    background-image: none; }\n    .btn-warning:active:hover, .btn-warning:active:focus, .btn-warning:active.focus, .btn-warning.active:hover, .btn-warning.active:focus, .btn-warning.active.focus,\n    .open > .btn-warning.dropdown-toggle:hover,\n    .open > .btn-warning.dropdown-toggle:focus,\n    .open > .btn-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #b06d0f; }\n  .btn-warning.disabled:focus, .btn-warning.disabled.focus, .btn-warning:disabled:focus, .btn-warning:disabled.focus {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-warning.disabled:hover, .btn-warning:disabled:hover {\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .btn-danger:hover {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:focus, .btn-danger.focus {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a; }\n  .btn-danger:active, .btn-danger.active,\n  .open > .btn-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #c9302c;\n    border-color: #c12e2a;\n    background-image: none; }\n    .btn-danger:active:hover, .btn-danger:active:focus, .btn-danger:active.focus, .btn-danger.active:hover, .btn-danger.active:focus, .btn-danger.active.focus,\n    .open > .btn-danger.dropdown-toggle:hover,\n    .open > .btn-danger.dropdown-toggle:focus,\n    .open > .btn-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #8b211e; }\n  .btn-danger.disabled:focus, .btn-danger.disabled.focus, .btn-danger:disabled:focus, .btn-danger:disabled.focus {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-danger.disabled:hover, .btn-danger:disabled:hover {\n    background-color: #d9534f;\n    border-color: #d9534f; }\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8; }\n  .btn-outline-primary:hover {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:focus, .btn-outline-primary.focus {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .btn-outline-primary:active, .btn-outline-primary.active,\n  .open > .btn-outline-primary.dropdown-toggle {\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .btn-outline-primary:active:hover, .btn-outline-primary:active:focus, .btn-outline-primary:active.focus, .btn-outline-primary.active:hover, .btn-outline-primary.active:focus, .btn-outline-primary.active.focus,\n    .open > .btn-outline-primary.dropdown-toggle:hover,\n    .open > .btn-outline-primary.dropdown-toggle:focus,\n    .open > .btn-outline-primary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #014682;\n      border-color: #01315a; }\n  .btn-outline-primary.disabled:focus, .btn-outline-primary.disabled.focus, .btn-outline-primary:disabled:focus, .btn-outline-primary:disabled.focus {\n    border-color: #43a7fd; }\n  .btn-outline-primary.disabled:hover, .btn-outline-primary:disabled:hover {\n    border-color: #43a7fd; }\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc; }\n  .btn-outline-secondary:hover {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:focus, .btn-outline-secondary.focus {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n  .btn-outline-secondary:active, .btn-outline-secondary.active,\n  .open > .btn-outline-secondary.dropdown-toggle {\n    color: #fff;\n    background-color: #ccc;\n    border-color: #ccc; }\n    .btn-outline-secondary:active:hover, .btn-outline-secondary:active:focus, .btn-outline-secondary:active.focus, .btn-outline-secondary.active:hover, .btn-outline-secondary.active:focus, .btn-outline-secondary.active.focus,\n    .open > .btn-outline-secondary.dropdown-toggle:hover,\n    .open > .btn-outline-secondary.dropdown-toggle:focus,\n    .open > .btn-outline-secondary.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #a1a1a1;\n      border-color: #8c8c8c; }\n  .btn-outline-secondary.disabled:focus, .btn-outline-secondary.disabled.focus, .btn-outline-secondary:disabled:focus, .btn-outline-secondary:disabled.focus {\n    border-color: white; }\n  .btn-outline-secondary.disabled:hover, .btn-outline-secondary:disabled:hover {\n    border-color: white; }\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de; }\n  .btn-outline-info:hover {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:focus, .btn-outline-info.focus {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n  .btn-outline-info:active, .btn-outline-info.active,\n  .open > .btn-outline-info.dropdown-toggle {\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de; }\n    .btn-outline-info:active:hover, .btn-outline-info:active:focus, .btn-outline-info:active.focus, .btn-outline-info.active:hover, .btn-outline-info.active:focus, .btn-outline-info.active.focus,\n    .open > .btn-outline-info.dropdown-toggle:hover,\n    .open > .btn-outline-info.dropdown-toggle:focus,\n    .open > .btn-outline-info.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #269abc;\n      border-color: #1f7e9a; }\n  .btn-outline-info.disabled:focus, .btn-outline-info.disabled.focus, .btn-outline-info:disabled:focus, .btn-outline-info:disabled.focus {\n    border-color: #b0e1ef; }\n  .btn-outline-info.disabled:hover, .btn-outline-info:disabled:hover {\n    border-color: #b0e1ef; }\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c; }\n  .btn-outline-success:hover {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:focus, .btn-outline-success.focus {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n  .btn-outline-success:active, .btn-outline-success.active,\n  .open > .btn-outline-success.dropdown-toggle {\n    color: #fff;\n    background-color: #5cb85c;\n    border-color: #5cb85c; }\n    .btn-outline-success:active:hover, .btn-outline-success:active:focus, .btn-outline-success:active.focus, .btn-outline-success.active:hover, .btn-outline-success.active:focus, .btn-outline-success.active.focus,\n    .open > .btn-outline-success.dropdown-toggle:hover,\n    .open > .btn-outline-success.dropdown-toggle:focus,\n    .open > .btn-outline-success.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #398439;\n      border-color: #2d672d; }\n  .btn-outline-success.disabled:focus, .btn-outline-success.disabled.focus, .btn-outline-success:disabled:focus, .btn-outline-success:disabled.focus {\n    border-color: #a3d7a3; }\n  .btn-outline-success.disabled:hover, .btn-outline-success:disabled:hover {\n    border-color: #a3d7a3; }\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e; }\n  .btn-outline-warning:hover {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:focus, .btn-outline-warning.focus {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n  .btn-outline-warning:active, .btn-outline-warning.active,\n  .open > .btn-outline-warning.dropdown-toggle {\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e; }\n    .btn-outline-warning:active:hover, .btn-outline-warning:active:focus, .btn-outline-warning:active.focus, .btn-outline-warning.active:hover, .btn-outline-warning.active:focus, .btn-outline-warning.active.focus,\n    .open > .btn-outline-warning.dropdown-toggle:hover,\n    .open > .btn-outline-warning.dropdown-toggle:focus,\n    .open > .btn-outline-warning.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #d58512;\n      border-color: #b06d0f; }\n  .btn-outline-warning.disabled:focus, .btn-outline-warning.disabled.focus, .btn-outline-warning:disabled:focus, .btn-outline-warning:disabled.focus {\n    border-color: #f8d9ac; }\n  .btn-outline-warning.disabled:hover, .btn-outline-warning:disabled:hover {\n    border-color: #f8d9ac; }\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f; }\n  .btn-outline-danger:hover {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:focus, .btn-outline-danger.focus {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n  .btn-outline-danger:active, .btn-outline-danger.active,\n  .open > .btn-outline-danger.dropdown-toggle {\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f; }\n    .btn-outline-danger:active:hover, .btn-outline-danger:active:focus, .btn-outline-danger:active.focus, .btn-outline-danger.active:hover, .btn-outline-danger.active:focus, .btn-outline-danger.active.focus,\n    .open > .btn-outline-danger.dropdown-toggle:hover,\n    .open > .btn-outline-danger.dropdown-toggle:focus,\n    .open > .btn-outline-danger.dropdown-toggle.focus {\n      color: #fff;\n      background-color: #ac2925;\n      border-color: #8b211e; }\n  .btn-outline-danger.disabled:focus, .btn-outline-danger.disabled.focus, .btn-outline-danger:disabled:focus, .btn-outline-danger:disabled.focus {\n    border-color: #eba5a3; }\n  .btn-outline-danger.disabled:hover, .btn-outline-danger:disabled:hover {\n    border-color: #eba5a3; }\n\n.btn-link {\n  font-weight: normal;\n  color: #CC1100;\n  border-radius: 0; }\n  .btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n    background-color: transparent; }\n  .btn-link, .btn-link:focus, .btn-link:active {\n    border-color: transparent; }\n  .btn-link:hover {\n    border-color: transparent; }\n  .btn-link:focus, .btn-link:hover {\n    color: #800b00;\n    text-decoration: none;\n    background-color: transparent; }\n  .btn-link:disabled:focus, .btn-link:disabled:hover {\n    color: #818a91;\n    text-decoration: none; }\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem; }\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem; }\n\n.btn-block {\n  display: block;\n  width: 100%; }\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem; }\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%; }\n\n.fade {\n  opacity: 0;\n  transition: opacity .15s linear; }\n  .fade.in {\n    opacity: 1; }\n\n.collapse {\n  display: none; }\n  .collapse.in {\n    display: block; }\n\ntr.collapse.in {\n  display: table-row; }\n\ntbody.collapse.in {\n  display: table-row-group; }\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  transition-timing-function: ease;\n  transition-duration: .35s;\n  transition-property: height; }\n\n.dropup,\n.dropdown {\n  position: relative; }\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent; }\n\n.dropdown-toggle:focus {\n  outline: 0; }\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #373a3c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #e5e5e5; }\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #373a3c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0; }\n  .dropdown-item:focus, .dropdown-item:hover {\n    color: #2b2d2f;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n  .dropdown-item.active, .dropdown-item.active:focus, .dropdown-item.active:hover {\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8;\n    outline: 0; }\n  .dropdown-item.disabled, .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    color: #818a91; }\n  .dropdown-item.disabled:focus, .dropdown-item.disabled:hover {\n    text-decoration: none;\n    cursor: not-allowed;\n    background-color: transparent;\n    background-image: none;\n    filter: \"progid:DXImageTransform.Microsoft.gradient(enabled = false)\"; }\n\n.open > .dropdown-menu {\n  display: block; }\n\n.open > a {\n  outline: 0; }\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto; }\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0; }\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #818a91;\n  white-space: nowrap; }\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990; }\n\n.dropup .caret,\n.navbar-fixed-bottom .dropdown .caret {\n  content: \"\";\n  border-top: 0;\n  border-bottom: 0.3em solid; }\n\n.dropup .dropdown-menu,\n.navbar-fixed-bottom .dropdown .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem; }\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: inline-block;\n  vertical-align: middle; }\n  .btn-group > .btn,\n  .btn-group-vertical > .btn {\n    position: relative;\n    float: left;\n    margin-bottom: 0; }\n    .btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n    .btn-group-vertical > .btn:focus,\n    .btn-group-vertical > .btn:active,\n    .btn-group-vertical > .btn.active {\n      z-index: 2; }\n    .btn-group > .btn:hover,\n    .btn-group-vertical > .btn:hover {\n      z-index: 2; }\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group {\n  margin-left: -1px; }\n\n.btn-toolbar {\n  margin-left: -0.5rem; }\n  .btn-toolbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .btn-toolbar .btn-group,\n  .btn-toolbar .input-group {\n    float: left; }\n  .btn-toolbar > .btn,\n  .btn-toolbar > .btn-group,\n  .btn-toolbar > .input-group {\n    margin-left: 0.5rem; }\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0; }\n\n.btn-group > .btn:first-child {\n  margin-left: 0; }\n  .btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0; }\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group > .btn-group {\n  float: left; }\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0; }\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem; }\n  .btn + .dropdown-toggle-split::after {\n    margin-left: 0; }\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem; }\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem; }\n\n.btn .caret {\n  margin-left: 0; }\n\n.btn-lg .caret, .btn-group-lg > .btn .caret {\n  border-width: 0.3em 0.3em 0;\n  border-bottom-width: 0; }\n\n.dropup .btn-lg .caret, .dropup .btn-group-lg > .btn .caret {\n  border-width: 0 0.3em 0.3em; }\n\n.btn-group-vertical > .btn,\n.btn-group-vertical > .btn-group,\n.btn-group-vertical > .btn-group > .btn {\n  display: block;\n  float: none;\n  width: 100%;\n  max-width: 100%; }\n\n.btn-group-vertical > .btn-group::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.btn-group-vertical > .btn-group > .btn {\n  float: none; }\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0; }\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0; }\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0; }\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0; }\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none; }\n\n.input-group {\n  position: relative;\n  width: 100%;\n  display: table;\n  border-collapse: separate; }\n  .input-group .form-control {\n    position: relative;\n    z-index: 2;\n    float: left;\n    width: 100%;\n    margin-bottom: 0; }\n    .input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n      z-index: 3; }\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: table-cell; }\n  .input-group-addon:not(:first-child):not(:last-child),\n  .input-group-btn:not(:first-child):not(:last-child),\n  .input-group .form-control:not(:first-child):not(:last-child) {\n    border-radius: 0; }\n\n.input-group-addon,\n.input-group-btn {\n  width: 1%;\n  white-space: nowrap;\n  vertical-align: middle; }\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #55595c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem; }\n  .input-group-addon.form-control-sm,\n  .input-group-sm > .input-group-addon,\n  .input-group-sm > .input-group-btn > .input-group-addon.btn {\n    padding: 0.25rem 0.5rem;\n    font-size: 0.875rem;\n    border-radius: 0.2rem; }\n  .input-group-addon.form-control-lg,\n  .input-group-lg > .input-group-addon,\n  .input-group-lg > .input-group-btn > .input-group-addon.btn {\n    padding: 0.75rem 1.5rem;\n    font-size: 1.25rem;\n    border-radius: 0.3rem; }\n  .input-group-addon input[type=\"radio\"],\n  .input-group-addon input[type=\"checkbox\"] {\n    margin-top: 0; }\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0; }\n\n.input-group-addon:not(:last-child) {\n  border-right: 0; }\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0; }\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0; }\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap; }\n  .input-group-btn > .btn {\n    position: relative; }\n    .input-group-btn > .btn + .btn {\n      margin-left: -1px; }\n    .input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n      z-index: 3; }\n  .input-group-btn:not(:last-child) > .btn,\n  .input-group-btn:not(:last-child) > .btn-group {\n    margin-right: -1px; }\n  .input-group-btn:not(:first-child) > .btn,\n  .input-group-btn:not(:first-child) > .btn-group {\n    z-index: 2;\n    margin-left: -1px; }\n    .input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n    .input-group-btn:not(:first-child) > .btn-group:focus,\n    .input-group-btn:not(:first-child) > .btn-group:active,\n    .input-group-btn:not(:first-child) > .btn-group:hover {\n      z-index: 3; }\n\n.custom-control {\n  position: relative;\n  display: inline-block;\n  padding-left: 1.5rem;\n  cursor: pointer; }\n  .custom-control + .custom-control {\n    margin-left: 1rem; }\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0; }\n  .custom-control-input:checked ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #0074d9; }\n  .custom-control-input:focus ~ .custom-control-indicator {\n    box-shadow: 0 0 0 0.075rem #fff, 0 0 0 0.2rem #0074d9; }\n  .custom-control-input:active ~ .custom-control-indicator {\n    color: #fff;\n    background-color: #84c6ff; }\n  .custom-control-input:disabled ~ .custom-control-indicator {\n    cursor: not-allowed;\n    background-color: #eee; }\n  .custom-control-input:disabled ~ .custom-control-description {\n    color: #767676;\n    cursor: not-allowed; }\n\n.custom-control-indicator {\n  position: absolute;\n  top: .25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  background-size: 50% 50%; }\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem; }\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='#fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\"); }\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0074d9;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='#fff' d='M0 2h4'/%3E%3C/svg%3E\"); }\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%; }\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='#fff'/%3E%3C/svg%3E\"); }\n\n.custom-controls-stacked .custom-control {\n  float: left;\n  clear: left; }\n  .custom-controls-stacked .custom-control + .custom-control {\n    margin-left: 0; }\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.5rem - 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  padding-right: 0.75rem \\9;\n  color: #55595c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='#333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  background-image: none \\9;\n  background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none; }\n  .custom-select:focus {\n    border-color: #51a7e8;\n    outline: none; }\n    .custom-select:focus::-ms-value {\n      color: #55595c;\n      background-color: #fff; }\n  .custom-select:disabled {\n    color: #818a91;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n  .custom-select::-ms-expand {\n    opacity: 0; }\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%; }\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  cursor: pointer; }\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0; }\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #555;\n  user-select: none;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem; }\n  .custom-file-control:lang(en)::after {\n    content: \"Choose file...\"; }\n  .custom-file-control::before {\n    position: absolute;\n    top: -1px;\n    right: -1px;\n    bottom: -1px;\n    z-index: 6;\n    display: block;\n    height: 2.5rem;\n    padding: 0.5rem 1rem;\n    line-height: 1.5;\n    color: #555;\n    background-color: #eee;\n    border: 1px solid #ddd;\n    border-radius: 0 0.25rem 0.25rem 0; }\n  .custom-file-control:lang(en)::before {\n    content: \"Browse\"; }\n\n.nav {\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none; }\n\n.nav-link {\n  display: inline-block; }\n  .nav-link:focus, .nav-link:hover {\n    text-decoration: none; }\n  .nav-link.disabled {\n    color: #818a91; }\n    .nav-link.disabled, .nav-link.disabled:focus, .nav-link.disabled:hover {\n      color: #818a91;\n      cursor: not-allowed;\n      background-color: transparent; }\n\n.nav-inline .nav-item {\n  display: inline-block; }\n\n.nav-inline .nav-item + .nav-item,\n.nav-inline .nav-link + .nav-link {\n  margin-left: 1rem; }\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd; }\n  .nav-tabs::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .nav-tabs .nav-item {\n    float: left;\n    margin-bottom: -1px; }\n    .nav-tabs .nav-item + .nav-item {\n      margin-left: 0.2rem; }\n  .nav-tabs .nav-link {\n    display: block;\n    padding: 0.5em 1em;\n    border: 1px solid transparent;\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n    .nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n      border-color: #eceeef #eceeef #ddd; }\n    .nav-tabs .nav-link.disabled, .nav-tabs .nav-link.disabled:focus, .nav-tabs .nav-link.disabled:hover {\n      color: #818a91;\n      background-color: transparent;\n      border-color: transparent; }\n  .nav-tabs .nav-link.active, .nav-tabs .nav-link.active:focus, .nav-tabs .nav-link.active:hover,\n  .nav-tabs .nav-item.open .nav-link,\n  .nav-tabs .nav-item.open .nav-link:focus,\n  .nav-tabs .nav-item.open .nav-link:hover {\n    color: #55595c;\n    background-color: #fff;\n    border-color: #ddd #ddd transparent; }\n  .nav-tabs .dropdown-menu {\n    margin-top: -1px;\n    border-top-right-radius: 0;\n    border-top-left-radius: 0; }\n\n.nav-pills::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.nav-pills .nav-item {\n  float: left; }\n  .nav-pills .nav-item + .nav-item {\n    margin-left: 0.2rem; }\n\n.nav-pills .nav-link {\n  display: block;\n  padding: 0.5em 1em;\n  border-radius: 0.25rem; }\n\n.nav-pills .nav-link.active, .nav-pills .nav-link.active:focus, .nav-pills .nav-link.active:hover,\n.nav-pills .nav-item.open .nav-link,\n.nav-pills .nav-item.open .nav-link:focus,\n.nav-pills .nav-item.open .nav-link:hover {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8; }\n\n.nav-stacked .nav-item {\n  display: block;\n  float: none; }\n  .nav-stacked .nav-item + .nav-item {\n    margin-top: 0.2rem;\n    margin-left: 0; }\n\n.tab-content > .tab-pane {\n  display: none; }\n\n.tab-content > .active {\n  display: block; }\n\n.navbar {\n  position: relative;\n  padding: 0.5rem 1rem; }\n  .navbar::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  @media (min-width: 576px) {\n    .navbar {\n      border-radius: 0.25rem; } }\n\n.navbar-full {\n  z-index: 1000; }\n  @media (min-width: 576px) {\n    .navbar-full {\n      border-radius: 0; } }\n\n.navbar-fixed-top,\n.navbar-fixed-bottom {\n  position: fixed;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n  @media (min-width: 576px) {\n    .navbar-fixed-top,\n    .navbar-fixed-bottom {\n      border-radius: 0; } }\n\n.navbar-fixed-top {\n  top: 0; }\n\n.navbar-fixed-bottom {\n  bottom: 0; }\n\n.navbar-sticky-top {\n  position: sticky;\n  top: 0;\n  z-index: 1030;\n  width: 100%; }\n  @media (min-width: 576px) {\n    .navbar-sticky-top {\n      border-radius: 0; } }\n\n.navbar-brand {\n  float: left;\n  padding-top: 0.25rem;\n  padding-bottom: 0.25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit; }\n  .navbar-brand:focus, .navbar-brand:hover {\n    text-decoration: none; }\n\n.navbar-divider {\n  float: left;\n  width: 1px;\n  padding-top: 0.425rem;\n  padding-bottom: 0.425rem;\n  margin-right: 1rem;\n  margin-left: 1rem;\n  overflow: hidden; }\n  .navbar-divider::before {\n    content: \"\\A0\"; }\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n\n.navbar-toggler {\n  width: 2.5em;\n  height: 2em;\n  padding: 0.5rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent no-repeat center center;\n  background-size: 24px 24px;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n  .navbar-toggler:focus, .navbar-toggler:hover {\n    text-decoration: none; }\n\n.navbar-toggleable-xs::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable-xs .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-xs .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-xs .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable-xs {\n    display: block; } }\n\n.navbar-toggleable-sm::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-sm .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    display: block; } }\n\n.navbar-toggleable-md::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-md .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-md .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    display: block; } }\n\n.navbar-toggleable-lg::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-lg .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; } }\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    display: block; } }\n\n.navbar-toggleable-xl {\n  display: block; }\n  .navbar-toggleable-xl::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .navbar-toggleable-xl .navbar-brand {\n    display: block;\n    float: none;\n    margin-top: .5rem;\n    margin-right: 0; }\n  .navbar-toggleable-xl .navbar-nav {\n    margin-top: .5rem;\n    margin-bottom: .5rem; }\n    .navbar-toggleable-xl .navbar-nav .dropdown-menu {\n      position: static;\n      float: none; }\n\n.navbar-nav .nav-item {\n  float: left; }\n\n.navbar-nav .nav-link {\n  display: block;\n  padding-top: .425rem;\n  padding-bottom: .425rem; }\n  .navbar-nav .nav-link + .nav-link {\n    margin-left: 1rem; }\n\n.navbar-nav .nav-item + .nav-item {\n  margin-left: 1rem; }\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9); }\n  .navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n  .navbar-light .navbar-toggler:focus,\n  .navbar-light .navbar-toggler:hover {\n    color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5); }\n  .navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n    color: rgba(0, 0, 0, 0.7); }\n\n.navbar-light .navbar-nav .open > .nav-link, .navbar-light .navbar-nav .open > .nav-link:focus, .navbar-light .navbar-nav .open > .nav-link:hover,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link:focus,\n.navbar-light .navbar-nav .active > .nav-link:hover,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.open:focus,\n.navbar-light .navbar-nav .nav-link.open:hover,\n.navbar-light .navbar-nav .nav-link.active,\n.navbar-light .navbar-nav .nav-link.active:focus,\n.navbar-light .navbar-nav .nav-link.active:hover {\n  color: rgba(0, 0, 0, 0.9); }\n\n.navbar-light .navbar-toggler {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n  border-color: rgba(0, 0, 0, 0.1); }\n\n.navbar-light .navbar-divider {\n  background-color: rgba(0, 0, 0, 0.075); }\n\n.navbar-dark .navbar-brand,\n.navbar-dark .navbar-toggler {\n  color: white; }\n  .navbar-dark .navbar-brand:focus, .navbar-dark .navbar-brand:hover,\n  .navbar-dark .navbar-toggler:focus,\n  .navbar-dark .navbar-toggler:hover {\n    color: white; }\n\n.navbar-dark .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5); }\n  .navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover {\n    color: rgba(255, 255, 255, 0.75); }\n\n.navbar-dark .navbar-nav .open > .nav-link, .navbar-dark .navbar-nav .open > .nav-link:focus, .navbar-dark .navbar-nav .open > .nav-link:hover,\n.navbar-dark .navbar-nav .active > .nav-link,\n.navbar-dark .navbar-nav .active > .nav-link:focus,\n.navbar-dark .navbar-nav .active > .nav-link:hover,\n.navbar-dark .navbar-nav .nav-link.open,\n.navbar-dark .navbar-nav .nav-link.open:focus,\n.navbar-dark .navbar-nav .nav-link.open:hover,\n.navbar-dark .navbar-nav .nav-link.active,\n.navbar-dark .navbar-nav .nav-link.active:focus,\n.navbar-dark .navbar-nav .nav-link.active:hover {\n  color: white; }\n\n.navbar-dark .navbar-toggler {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n  border-color: rgba(255, 255, 255, 0.1); }\n\n.navbar-dark .navbar-divider {\n  background-color: rgba(255, 255, 255, 0.075); }\n\n.navbar-toggleable-xs::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 575px) {\n  .navbar-toggleable-xs .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 576px) {\n  .navbar-toggleable-xs {\n    display: block !important; } }\n\n.navbar-toggleable-sm::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    display: block !important; } }\n\n.navbar-toggleable-md::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .nav-item {\n    float: none;\n    margin-left: 0; } }\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    display: block !important; } }\n\n.card {\n  position: relative;\n  display: block;\n  margin-bottom: 0.75rem;\n  background-color: #fff;\n  border-radius: 0.25rem;\n  border: 1px solid rgba(0, 0, 0, 0.125); }\n\n.card-block {\n  padding: 1.25rem; }\n  .card-block::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.card-title {\n  margin-bottom: 0.75rem; }\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0; }\n\n.card-text:last-child {\n  margin-bottom: 0; }\n\n.card-link:hover {\n  text-decoration: none; }\n\n.card-link + .card-link {\n  margin-left: 1.25rem; }\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f5f5f5;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-header::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .card-header:first-child {\n    border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0; }\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f5f5f5;\n  border-top: 1px solid rgba(0, 0, 0, 0.125); }\n  .card-footer::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .card-footer:last-child {\n    border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px); }\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0; }\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem; }\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8; }\n  .card-primary .card-header,\n  .card-primary .card-footer {\n    background-color: transparent; }\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c; }\n  .card-success .card-header,\n  .card-success .card-footer {\n    background-color: transparent; }\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de; }\n  .card-info .card-header,\n  .card-info .card-footer {\n    background-color: transparent; }\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e; }\n  .card-warning .card-header,\n  .card-warning .card-footer {\n    background-color: transparent; }\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f; }\n  .card-danger .card-header,\n  .card-danger .card-footer {\n    background-color: transparent; }\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8; }\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc; }\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de; }\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c; }\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e; }\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f; }\n\n.card-inverse .card-header,\n.card-inverse .card-footer {\n  border-color: rgba(255, 255, 255, 0.2); }\n\n.card-inverse .card-header,\n.card-inverse .card-footer,\n.card-inverse .card-title,\n.card-inverse .card-blockquote {\n  color: #fff; }\n\n.card-inverse .card-link,\n.card-inverse .card-text,\n.card-inverse .card-subtitle,\n.card-inverse .card-blockquote .blockquote-footer {\n  color: rgba(255, 255, 255, 0.65); }\n\n.card-inverse .card-link:focus, .card-inverse .card-link:hover {\n  color: #fff; }\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0; }\n\n.card-img {\n  border-radius: calc(0.25rem - 1px); }\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem; }\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px); }\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px); }\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: table;\n    width: 100%;\n    margin-bottom: 0.75rem;\n    table-layout: fixed;\n    border-spacing: 1.25rem 0; }\n    .card-deck .card {\n      display: table-cell;\n      margin-bottom: 0;\n      vertical-align: top; }\n  .card-deck-wrapper {\n    margin-right: -1.25rem;\n    margin-left: -1.25rem; } }\n\n@media (min-width: 576px) {\n  .card-group {\n    display: table;\n    width: 100%;\n    table-layout: fixed; }\n    .card-group .card {\n      display: table-cell;\n      vertical-align: top; }\n      .card-group .card + .card {\n        margin-left: 0;\n        border-left: 0; }\n      .card-group .card:first-child {\n        border-bottom-right-radius: 0;\n        border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-top {\n          border-top-right-radius: 0; }\n        .card-group .card:first-child .card-img-bottom {\n          border-bottom-right-radius: 0; }\n      .card-group .card:last-child {\n        border-bottom-left-radius: 0;\n        border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-top {\n          border-top-left-radius: 0; }\n        .card-group .card:last-child .card-img-bottom {\n          border-bottom-left-radius: 0; }\n      .card-group .card:not(:first-child):not(:last-child) {\n        border-radius: 0; }\n        .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n        .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n          border-radius: 0; } }\n\n@media (min-width: 576px) {\n  .card-columns {\n    column-count: 3;\n    column-gap: 1.25rem; }\n    .card-columns .card {\n      display: inline-block;\n      width: 100%; } }\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem; }\n  .breadcrumb::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.breadcrumb-item {\n  float: left; }\n  .breadcrumb-item + .breadcrumb-item::before {\n    display: inline-block;\n    padding-right: 0.5rem;\n    padding-left: 0.5rem;\n    color: #818a91;\n    content: \"/\"; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: underline; }\n  .breadcrumb-item + .breadcrumb-item:hover::before {\n    text-decoration: none; }\n  .breadcrumb-item.active {\n    color: #818a91; }\n\n.pagination {\n  display: inline-block;\n  padding-left: 0;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border-radius: 0.25rem; }\n\n.page-item {\n  display: inline; }\n  .page-item:first-child .page-link {\n    margin-left: 0;\n    border-bottom-left-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .page-item:last-child .page-link {\n    border-bottom-right-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; }\n  .page-item.active .page-link, .page-item.active .page-link:focus, .page-item.active .page-link:hover {\n    z-index: 2;\n    color: #fff;\n    cursor: default;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n  .page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {\n    color: #818a91;\n    pointer-events: none;\n    cursor: not-allowed;\n    background-color: #fff;\n    border-color: #ddd; }\n\n.page-link {\n  position: relative;\n  float: left;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  color: #CC1100;\n  text-decoration: none;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .page-link:focus, .page-link:hover {\n    color: #800b00;\n    background-color: #eceeef;\n    border-color: #ddd; }\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem; }\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem; }\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem; }\n\n.pagination-sm .page-link {\n  padding: 0.275rem 0.75rem;\n  font-size: 0.875rem; }\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem; }\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem; }\n\n.tag {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem; }\n  .tag:empty {\n    display: none; }\n\n.btn .tag {\n  position: relative;\n  top: -1px; }\n\na.tag:focus, a.tag:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer; }\n\n.tag-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem; }\n\n.tag-default {\n  background-color: #818a91; }\n  .tag-default[href]:focus, .tag-default[href]:hover {\n    background-color: #687077; }\n\n.tag-primary {\n  background-color: #0275d8; }\n  .tag-primary[href]:focus, .tag-primary[href]:hover {\n    background-color: #025aa5; }\n\n.tag-success {\n  background-color: #5cb85c; }\n  .tag-success[href]:focus, .tag-success[href]:hover {\n    background-color: #449d44; }\n\n.tag-info {\n  background-color: #5bc0de; }\n  .tag-info[href]:focus, .tag-info[href]:hover {\n    background-color: #31b0d5; }\n\n.tag-warning {\n  background-color: #f0ad4e; }\n  .tag-warning[href]:focus, .tag-warning[href]:hover {\n    background-color: #ec971f; }\n\n.tag-danger {\n  background-color: #d9534f; }\n  .tag-danger[href]:focus, .tag-danger[href]:hover {\n    background-color: #c9302c; }\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem; }\n  @media (min-width: 576px) {\n    .jumbotron {\n      padding: 4rem 2rem; } }\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8; }\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0; }\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem; }\n\n.alert-heading {\n  color: inherit; }\n\n.alert-link {\n  font-weight: bold; }\n\n.alert-dismissible {\n  padding-right: 2.5rem; }\n  .alert-dismissible .close {\n    position: relative;\n    top: -.125rem;\n    right: -1.25rem;\n    color: inherit; }\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d; }\n  .alert-success hr {\n    border-top-color: #c1e2b3; }\n  .alert-success .alert-link {\n    color: #2b542c; }\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f; }\n  .alert-info hr {\n    border-top-color: #a6d5ec; }\n  .alert-info .alert-link {\n    color: #245269; }\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b; }\n  .alert-warning hr {\n    border-top-color: #f7ecb5; }\n  .alert-warning .alert-link {\n    color: #66512c; }\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442; }\n  .alert-danger hr {\n    border-top-color: #e4b9b9; }\n  .alert-danger .alert-link {\n    color: #843534; }\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0; }\n  to {\n    background-position: 0 0; } }\n\n.progress {\n  display: block;\n  width: 100%;\n  height: 1rem;\n  margin-bottom: 1rem; }\n\n.progress[value] {\n  background-color: #eee;\n  border: 0;\n  appearance: none;\n  border-radius: 0.25rem; }\n\n.progress[value]::-ms-fill {\n  background-color: #0074d9;\n  border: 0; }\n\n.progress[value]::-moz-progress-bar {\n  background-color: #0074d9;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.progress[value]::-webkit-progress-value {\n  background-color: #0074d9;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.progress[value=\"100\"]::-moz-progress-bar {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.progress[value=\"100\"]::-webkit-progress-value {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.progress[value]::-webkit-progress-bar {\n  background-color: #eee;\n  border-radius: 0.25rem; }\n\nbase::-moz-progress-bar,\n.progress[value] {\n  background-color: #eee;\n  border-radius: 0.25rem; }\n\n@media screen and (min-width: 0\\0) {\n  .progress {\n    background-color: #eee;\n    border-radius: 0.25rem; }\n  .progress-bar {\n    display: inline-block;\n    height: 1rem;\n    text-indent: -999rem;\n    background-color: #0074d9;\n    border-bottom-left-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .progress[width=\"100%\"] {\n    border-bottom-right-radius: 0.25rem;\n    border-top-right-radius: 0.25rem; } }\n\n.progress-striped[value]::-webkit-progress-value {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-striped[value]::-moz-progress-bar {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n.progress-striped[value]::-ms-fill {\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-size: 1rem 1rem; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-bar-striped {\n    background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n    background-size: 1rem 1rem; } }\n\n.progress-animated[value]::-webkit-progress-value {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n.progress-animated[value]::-moz-progress-bar {\n  animation: progress-bar-stripes 2s linear infinite; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-animated .progress-bar-striped {\n    animation: progress-bar-stripes 2s linear infinite; } }\n\n.progress-success[value]::-webkit-progress-value {\n  background-color: #5cb85c; }\n\n.progress-success[value]::-moz-progress-bar {\n  background-color: #5cb85c; }\n\n.progress-success[value]::-ms-fill {\n  background-color: #5cb85c; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-success .progress-bar {\n    background-color: #5cb85c; } }\n\n.progress-info[value]::-webkit-progress-value {\n  background-color: #5bc0de; }\n\n.progress-info[value]::-moz-progress-bar {\n  background-color: #5bc0de; }\n\n.progress-info[value]::-ms-fill {\n  background-color: #5bc0de; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-info .progress-bar {\n    background-color: #5bc0de; } }\n\n.progress-warning[value]::-webkit-progress-value {\n  background-color: #f0ad4e; }\n\n.progress-warning[value]::-moz-progress-bar {\n  background-color: #f0ad4e; }\n\n.progress-warning[value]::-ms-fill {\n  background-color: #f0ad4e; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-warning .progress-bar {\n    background-color: #f0ad4e; } }\n\n.progress-danger[value]::-webkit-progress-value {\n  background-color: #d9534f; }\n\n.progress-danger[value]::-moz-progress-bar {\n  background-color: #d9534f; }\n\n.progress-danger[value]::-ms-fill {\n  background-color: #d9534f; }\n\n@media screen and (min-width: 0\\0) {\n  .progress-danger .progress-bar {\n    background-color: #d9534f; } }\n\n.media,\n.media-body {\n  overflow: hidden; }\n\n.media-body {\n  width: 10000px; }\n\n.media-left,\n.media-right,\n.media-body {\n  display: table-cell;\n  vertical-align: top; }\n\n.media-middle {\n  vertical-align: middle; }\n\n.media-bottom {\n  vertical-align: bottom; }\n\n.media-object {\n  display: block; }\n  .media-object.img-thumbnail {\n    max-width: none; }\n\n.media-right {\n  padding-left: 10px; }\n\n.media-left {\n  padding-right: 10px; }\n\n.media-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.media-list {\n  padding-left: 0;\n  list-style: none; }\n\n.list-group {\n  padding-left: 0;\n  margin-bottom: 0; }\n\n.list-group-item {\n  position: relative;\n  display: block;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid #ddd; }\n  .list-group-item:first-child {\n    border-top-right-radius: 0.25rem;\n    border-top-left-radius: 0.25rem; }\n  .list-group-item:last-child {\n    margin-bottom: 0;\n    border-bottom-right-radius: 0.25rem;\n    border-bottom-left-radius: 0.25rem; }\n  .list-group-item.disabled, .list-group-item.disabled:focus, .list-group-item.disabled:hover {\n    color: #818a91;\n    cursor: not-allowed;\n    background-color: #eceeef; }\n    .list-group-item.disabled .list-group-item-heading, .list-group-item.disabled:focus .list-group-item-heading, .list-group-item.disabled:hover .list-group-item-heading {\n      color: inherit; }\n    .list-group-item.disabled .list-group-item-text, .list-group-item.disabled:focus .list-group-item-text, .list-group-item.disabled:hover .list-group-item-text {\n      color: #818a91; }\n  .list-group-item.active, .list-group-item.active:focus, .list-group-item.active:hover {\n    z-index: 2;\n    color: #fff;\n    text-decoration: none;\n    background-color: #0275d8;\n    border-color: #0275d8; }\n    .list-group-item.active .list-group-item-heading,\n    .list-group-item.active .list-group-item-heading > small,\n    .list-group-item.active .list-group-item-heading > .small, .list-group-item.active:focus .list-group-item-heading,\n    .list-group-item.active:focus .list-group-item-heading > small,\n    .list-group-item.active:focus .list-group-item-heading > .small, .list-group-item.active:hover .list-group-item-heading,\n    .list-group-item.active:hover .list-group-item-heading > small,\n    .list-group-item.active:hover .list-group-item-heading > .small {\n      color: inherit; }\n    .list-group-item.active .list-group-item-text, .list-group-item.active:focus .list-group-item-text, .list-group-item.active:hover .list-group-item-text {\n      color: #a8d6fe; }\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0; }\n\n.list-group-item-action {\n  width: 100%;\n  color: #555;\n  text-align: inherit; }\n  .list-group-item-action .list-group-item-heading {\n    color: #333; }\n  .list-group-item-action:focus, .list-group-item-action:hover {\n    color: #555;\n    text-decoration: none;\n    background-color: #f5f5f5; }\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8; }\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d; }\n  a.list-group-item-success .list-group-item-heading,\n  button.list-group-item-success .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-success:focus, a.list-group-item-success:hover,\n  button.list-group-item-success:focus,\n  button.list-group-item-success:hover {\n    color: #3c763d;\n    background-color: #d0e9c6; }\n  a.list-group-item-success.active, a.list-group-item-success.active:focus, a.list-group-item-success.active:hover,\n  button.list-group-item-success.active,\n  button.list-group-item-success.active:focus,\n  button.list-group-item-success.active:hover {\n    color: #fff;\n    background-color: #3c763d;\n    border-color: #3c763d; }\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7; }\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f; }\n  a.list-group-item-info .list-group-item-heading,\n  button.list-group-item-info .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-info:focus, a.list-group-item-info:hover,\n  button.list-group-item-info:focus,\n  button.list-group-item-info:hover {\n    color: #31708f;\n    background-color: #c4e3f3; }\n  a.list-group-item-info.active, a.list-group-item-info.active:focus, a.list-group-item-info.active:hover,\n  button.list-group-item-info.active,\n  button.list-group-item-info.active:focus,\n  button.list-group-item-info.active:hover {\n    color: #fff;\n    background-color: #31708f;\n    border-color: #31708f; }\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3; }\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b; }\n  a.list-group-item-warning .list-group-item-heading,\n  button.list-group-item-warning .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-warning:focus, a.list-group-item-warning:hover,\n  button.list-group-item-warning:focus,\n  button.list-group-item-warning:hover {\n    color: #8a6d3b;\n    background-color: #faf2cc; }\n  a.list-group-item-warning.active, a.list-group-item-warning.active:focus, a.list-group-item-warning.active:hover,\n  button.list-group-item-warning.active,\n  button.list-group-item-warning.active:focus,\n  button.list-group-item-warning.active:hover {\n    color: #fff;\n    background-color: #8a6d3b;\n    border-color: #8a6d3b; }\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede; }\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442; }\n  a.list-group-item-danger .list-group-item-heading,\n  button.list-group-item-danger .list-group-item-heading {\n    color: inherit; }\n  a.list-group-item-danger:focus, a.list-group-item-danger:hover,\n  button.list-group-item-danger:focus,\n  button.list-group-item-danger:hover {\n    color: #a94442;\n    background-color: #ebcccc; }\n  a.list-group-item-danger.active, a.list-group-item-danger.active:focus, a.list-group-item-danger.active:hover,\n  button.list-group-item-danger.active,\n  button.list-group-item-danger.active:focus,\n  button.list-group-item-danger.active:hover {\n    color: #fff;\n    background-color: #a94442;\n    border-color: #a94442; }\n\n.list-group-item-heading {\n  margin-top: 0;\n  margin-bottom: 5px; }\n\n.list-group-item-text {\n  margin-bottom: 0;\n  line-height: 1.3; }\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  height: 0;\n  padding: 0;\n  overflow: hidden; }\n  .embed-responsive .embed-responsive-item,\n  .embed-responsive iframe,\n  .embed-responsive embed,\n  .embed-responsive object,\n  .embed-responsive video {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0; }\n\n.embed-responsive-21by9 {\n  padding-bottom: 42.85714%; }\n\n.embed-responsive-16by9 {\n  padding-bottom: 56.25%; }\n\n.embed-responsive-4by3 {\n  padding-bottom: 75%; }\n\n.embed-responsive-1by1 {\n  padding-bottom: 100%; }\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .2; }\n  .close:focus, .close:hover {\n    color: #000;\n    text-decoration: none;\n    cursor: pointer;\n    opacity: .5; }\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none; }\n\n.modal-open {\n  overflow: hidden; }\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0; }\n  .modal.fade .modal-dialog {\n    transition: transform .3s ease-out;\n    transform: translate(0, -25%); }\n  .modal.in .modal-dialog {\n    transform: translate(0, 0); }\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px; }\n\n.modal-content {\n  position: relative;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0; }\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000; }\n  .modal-backdrop.fade {\n    opacity: 0; }\n  .modal-backdrop.in {\n    opacity: 0.5; }\n\n.modal-header {\n  padding: 15px;\n  border-bottom: 1px solid #e5e5e5; }\n  .modal-header::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.modal-header .close {\n  margin-top: -2px; }\n\n.modal-title {\n  margin: 0;\n  line-height: 1.5; }\n\n.modal-body {\n  position: relative;\n  padding: 15px; }\n\n.modal-footer {\n  padding: 15px;\n  text-align: right;\n  border-top: 1px solid #e5e5e5; }\n  .modal-footer::after {\n    content: \"\";\n    display: table;\n    clear: both; }\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll; }\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 600px;\n    margin: 30px auto; }\n  .modal-sm {\n    max-width: 300px; } }\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 900px; } }\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0; }\n  .tooltip.in {\n    opacity: 0.9; }\n  .tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n    padding: 5px 0;\n    margin-top: -3px; }\n    .tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n      bottom: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 5px 5px 0;\n      border-top-color: #000; }\n  .tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n    padding: 0 5px;\n    margin-left: 3px; }\n    .tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n      top: 50%;\n      left: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 5px 5px 0;\n      border-right-color: #000; }\n  .tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n    padding: 5px 0;\n    margin-top: 3px; }\n    .tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n      top: 0;\n      left: 50%;\n      margin-left: -5px;\n      content: \"\";\n      border-width: 0 5px 5px;\n      border-bottom-color: #000; }\n  .tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n    padding: 0 5px;\n    margin-left: -3px; }\n    .tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n      top: 50%;\n      right: 0;\n      margin-top: -5px;\n      content: \"\";\n      border-width: 5px 0 5px 5px;\n      border-left-color: #000; }\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem; }\n  .tooltip-inner::before {\n    position: absolute;\n    width: 0;\n    height: 0;\n    border-color: transparent;\n    border-style: solid; }\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem; }\n  .popover.popover-top, .popover.bs-tether-element-attached-bottom {\n    margin-top: -10px; }\n    .popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n      left: 50%;\n      border-bottom-width: 0; }\n    .popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n      bottom: -11px;\n      margin-left: -11px;\n      border-top-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n      bottom: -10px;\n      margin-left: -10px;\n      border-top-color: #fff; }\n  .popover.popover-right, .popover.bs-tether-element-attached-left {\n    margin-left: 10px; }\n    .popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n      top: 50%;\n      border-left-width: 0; }\n    .popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n      left: -11px;\n      margin-top: -11px;\n      border-right-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n      left: -10px;\n      margin-top: -10px;\n      border-right-color: #fff; }\n  .popover.popover-bottom, .popover.bs-tether-element-attached-top {\n    margin-top: 10px; }\n    .popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n      left: 50%;\n      border-top-width: 0; }\n    .popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n      top: -11px;\n      margin-left: -11px;\n      border-bottom-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n      top: -10px;\n      margin-left: -10px;\n      border-bottom-color: #f7f7f7; }\n    .popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n      position: absolute;\n      top: 0;\n      left: 50%;\n      display: block;\n      width: 20px;\n      margin-left: -10px;\n      content: \"\";\n      border-bottom: 1px solid #f7f7f7; }\n  .popover.popover-left, .popover.bs-tether-element-attached-right {\n    margin-left: -10px; }\n    .popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n      top: 50%;\n      border-right-width: 0; }\n    .popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n      right: -11px;\n      margin-top: -11px;\n      border-left-color: rgba(0, 0, 0, 0.25); }\n    .popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n      right: -10px;\n      margin-top: -10px;\n      border-left-color: #fff; }\n\n.popover-title {\n  padding: 8px 14px;\n  margin: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-radius: 0.2375rem 0.2375rem 0 0; }\n  .popover-title:empty {\n    display: none; }\n\n.popover-content {\n  padding: 9px 14px; }\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid; }\n\n.popover::before {\n  content: \"\";\n  border-width: 11px; }\n\n.popover::after {\n  content: \"\";\n  border-width: 10px; }\n\n.carousel {\n  position: relative; }\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden; }\n  .carousel-inner > .carousel-item {\n    position: relative;\n    display: none;\n    transition: .6s ease-in-out left; }\n    .carousel-inner > .carousel-item > img,\n    .carousel-inner > .carousel-item > a > img {\n      line-height: 1; }\n    @media all and (transform-3d), (-webkit-transform-3d) {\n      .carousel-inner > .carousel-item {\n        transition: transform .6s ease-in-out;\n        backface-visibility: hidden;\n        perspective: 1000px; }\n        .carousel-inner > .carousel-item.next, .carousel-inner > .carousel-item.active.right {\n          left: 0;\n          transform: translate3d(100%, 0, 0); }\n        .carousel-inner > .carousel-item.prev, .carousel-inner > .carousel-item.active.left {\n          left: 0;\n          transform: translate3d(-100%, 0, 0); }\n        .carousel-inner > .carousel-item.next.left, .carousel-inner > .carousel-item.prev.right, .carousel-inner > .carousel-item.active {\n          left: 0;\n          transform: translate3d(0, 0, 0); } }\n  .carousel-inner > .active,\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    display: block; }\n  .carousel-inner > .active {\n    left: 0; }\n  .carousel-inner > .next,\n  .carousel-inner > .prev {\n    position: absolute;\n    top: 0;\n    width: 100%; }\n  .carousel-inner > .next {\n    left: 100%; }\n  .carousel-inner > .prev {\n    left: -100%; }\n  .carousel-inner > .next.left,\n  .carousel-inner > .prev.right {\n    left: 0; }\n  .carousel-inner > .active.left {\n    left: -100%; }\n  .carousel-inner > .active.right {\n    left: 100%; }\n\n.carousel-control {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 15%;\n  font-size: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);\n  opacity: 0.5; }\n  .carousel-control.left {\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.0001) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#80000000', endColorstr='#00000000', GradientType=1); }\n  .carousel-control.right {\n    right: 0;\n    left: auto;\n    background-image: linear-gradient(to right, rgba(0, 0, 0, 0.0001) 0%, rgba(0, 0, 0, 0.5) 100%);\n    background-repeat: repeat-x;\n    filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#80000000', GradientType=1); }\n  .carousel-control:focus, .carousel-control:hover {\n    color: #fff;\n    text-decoration: none;\n    outline: 0;\n    opacity: .9; }\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    position: absolute;\n    top: 50%;\n    z-index: 5;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    margin-top: -10px;\n    font-family: serif;\n    line-height: 1; }\n  .carousel-control .icon-prev {\n    left: 50%;\n    margin-left: -10px; }\n  .carousel-control .icon-next {\n    right: 50%;\n    margin-right: -10px; }\n  .carousel-control .icon-prev::before {\n    content: \"\\2039\"; }\n  .carousel-control .icon-next::before {\n    content: \"\\203A\"; }\n\n.carousel-indicators {\n  position: absolute;\n  bottom: 10px;\n  left: 50%;\n  z-index: 15;\n  width: 60%;\n  padding-left: 0;\n  margin-left: -30%;\n  text-align: center;\n  list-style: none; }\n  .carousel-indicators li {\n    display: inline-block;\n    width: 10px;\n    height: 10px;\n    margin: 1px;\n    text-indent: -999px;\n    cursor: pointer;\n    background-color: transparent;\n    border: 1px solid #fff;\n    border-radius: 10px; }\n  .carousel-indicators .active {\n    width: 12px;\n    height: 12px;\n    margin: 0;\n    background-color: #fff; }\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6); }\n  .carousel-caption .btn {\n    text-shadow: none; }\n\n@media (min-width: 576px) {\n  .carousel-control .icon-prev,\n  .carousel-control .icon-next {\n    width: 30px;\n    height: 30px;\n    margin-top: -15px;\n    font-size: 30px; }\n  .carousel-control .icon-prev {\n    margin-left: -15px; }\n  .carousel-control .icon-next {\n    margin-right: -15px; }\n  .carousel-caption {\n    right: 20%;\n    left: 20%;\n    padding-bottom: 30px; }\n  .carousel-indicators {\n    bottom: 20px; } }\n\n.align-baseline {\n  vertical-align: baseline !important; }\n\n.align-top {\n  vertical-align: top !important; }\n\n.align-middle {\n  vertical-align: middle !important; }\n\n.align-bottom {\n  vertical-align: bottom !important; }\n\n.align-text-bottom {\n  vertical-align: text-bottom !important; }\n\n.align-text-top {\n  vertical-align: text-top !important; }\n\n.bg-faded {\n  background-color: #f7f7f9; }\n\n.bg-primary {\n  background-color: #0275d8 !important; }\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important; }\n\n.bg-success {\n  background-color: #5cb85c !important; }\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important; }\n\n.bg-info {\n  background-color: #5bc0de !important; }\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important; }\n\n.bg-warning {\n  background-color: #f0ad4e !important; }\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important; }\n\n.bg-danger {\n  background-color: #d9534f !important; }\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important; }\n\n.bg-inverse {\n  background-color: #373a3c !important; }\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #1f2021 !important; }\n\n.rounded {\n  border-radius: 0.25rem; }\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem; }\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem; }\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem; }\n\n.rounded-circle {\n  border-radius: 50%; }\n\n.clearfix::after {\n  content: \"\";\n  display: table;\n  clear: both; }\n\n.d-block {\n  display: block !important; }\n\n.d-inline-block {\n  display: inline-block !important; }\n\n.d-inline {\n  display: inline !important; }\n\n.float-xs-left {\n  float: left !important; }\n\n.float-xs-right {\n  float: right !important; }\n\n.float-xs-none {\n  float: none !important; }\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important; }\n  .float-sm-right {\n    float: right !important; }\n  .float-sm-none {\n    float: none !important; } }\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important; }\n  .float-md-right {\n    float: right !important; }\n  .float-md-none {\n    float: none !important; } }\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important; }\n  .float-lg-right {\n    float: right !important; }\n  .float-lg-none {\n    float: none !important; } }\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important; }\n  .float-xl-right {\n    float: right !important; }\n  .float-xl-none {\n    float: none !important; } }\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0; }\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto; }\n\n.w-100 {\n  width: 100% !important; }\n\n.h-100 {\n  height: 100% !important; }\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important; }\n\n.m-0 {\n  margin: 0 0 !important; }\n\n.mt-0 {\n  margin-top: 0 !important; }\n\n.mr-0 {\n  margin-right: 0 !important; }\n\n.mb-0 {\n  margin-bottom: 0 !important; }\n\n.ml-0 {\n  margin-left: 0 !important; }\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important; }\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important; }\n\n.m-1 {\n  margin: 1rem 1rem !important; }\n\n.mt-1 {\n  margin-top: 1rem !important; }\n\n.mr-1 {\n  margin-right: 1rem !important; }\n\n.mb-1 {\n  margin-bottom: 1rem !important; }\n\n.ml-1 {\n  margin-left: 1rem !important; }\n\n.mx-1 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important; }\n\n.my-1 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important; }\n\n.m-2 {\n  margin: 1.5rem 1.5rem !important; }\n\n.mt-2 {\n  margin-top: 1.5rem !important; }\n\n.mr-2 {\n  margin-right: 1.5rem !important; }\n\n.mb-2 {\n  margin-bottom: 1.5rem !important; }\n\n.ml-2 {\n  margin-left: 1.5rem !important; }\n\n.mx-2 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important; }\n\n.my-2 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important; }\n\n.m-3 {\n  margin: 3rem 3rem !important; }\n\n.mt-3 {\n  margin-top: 3rem !important; }\n\n.mr-3 {\n  margin-right: 3rem !important; }\n\n.mb-3 {\n  margin-bottom: 3rem !important; }\n\n.ml-3 {\n  margin-left: 3rem !important; }\n\n.mx-3 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important; }\n\n.my-3 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important; }\n\n.p-0 {\n  padding: 0 0 !important; }\n\n.pt-0 {\n  padding-top: 0 !important; }\n\n.pr-0 {\n  padding-right: 0 !important; }\n\n.pb-0 {\n  padding-bottom: 0 !important; }\n\n.pl-0 {\n  padding-left: 0 !important; }\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important; }\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important; }\n\n.p-1 {\n  padding: 1rem 1rem !important; }\n\n.pt-1 {\n  padding-top: 1rem !important; }\n\n.pr-1 {\n  padding-right: 1rem !important; }\n\n.pb-1 {\n  padding-bottom: 1rem !important; }\n\n.pl-1 {\n  padding-left: 1rem !important; }\n\n.px-1 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important; }\n\n.py-1 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important; }\n\n.p-2 {\n  padding: 1.5rem 1.5rem !important; }\n\n.pt-2 {\n  padding-top: 1.5rem !important; }\n\n.pr-2 {\n  padding-right: 1.5rem !important; }\n\n.pb-2 {\n  padding-bottom: 1.5rem !important; }\n\n.pl-2 {\n  padding-left: 1.5rem !important; }\n\n.px-2 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important; }\n\n.py-2 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important; }\n\n.p-3 {\n  padding: 3rem 3rem !important; }\n\n.pt-3 {\n  padding-top: 3rem !important; }\n\n.pr-3 {\n  padding-right: 3rem !important; }\n\n.pb-3 {\n  padding-bottom: 3rem !important; }\n\n.pl-3 {\n  padding-left: 3rem !important; }\n\n.px-3 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important; }\n\n.py-3 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important; }\n\n.pos-f-t {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030; }\n\n.text-justify {\n  text-align: justify !important; }\n\n.text-nowrap {\n  white-space: nowrap !important; }\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap; }\n\n.text-xs-left {\n  text-align: left !important; }\n\n.text-xs-right {\n  text-align: right !important; }\n\n.text-xs-center {\n  text-align: center !important; }\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important; }\n  .text-sm-right {\n    text-align: right !important; }\n  .text-sm-center {\n    text-align: center !important; } }\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important; }\n  .text-md-right {\n    text-align: right !important; }\n  .text-md-center {\n    text-align: center !important; } }\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important; }\n  .text-lg-right {\n    text-align: right !important; }\n  .text-lg-center {\n    text-align: center !important; } }\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important; }\n  .text-xl-right {\n    text-align: right !important; }\n  .text-xl-center {\n    text-align: center !important; } }\n\n.text-lowercase {\n  text-transform: lowercase !important; }\n\n.text-uppercase {\n  text-transform: uppercase !important; }\n\n.text-capitalize {\n  text-transform: capitalize !important; }\n\n.font-weight-normal {\n  font-weight: normal; }\n\n.font-weight-bold {\n  font-weight: bold; }\n\n.font-italic {\n  font-style: italic; }\n\n.text-white {\n  color: #fff !important; }\n\n.text-muted {\n  color: #818a91 !important; }\n\na.text-muted:focus, a.text-muted:hover {\n  color: #687077 !important; }\n\n.text-primary {\n  color: #0275d8 !important; }\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important; }\n\n.text-success {\n  color: #5cb85c !important; }\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important; }\n\n.text-info {\n  color: #5bc0de !important; }\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important; }\n\n.text-warning {\n  color: #f0ad4e !important; }\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important; }\n\n.text-danger {\n  color: #d9534f !important; }\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important; }\n\n.text-gray-dark {\n  color: #373a3c !important; }\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #1f2021 !important; }\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0; }\n\n.invisible {\n  visibility: hidden !important; }\n\n.hidden-xs-up {\n  display: none !important; }\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important; } }\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important; } }\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important; } }\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important; } }\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important; } }\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important; } }\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important; } }\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important; } }\n\n.hidden-xl-down {\n  display: none !important; }\n\n.visible-print-block {\n  display: none !important; }\n  @media print {\n    .visible-print-block {\n      display: block !important; } }\n\n.visible-print-inline {\n  display: none !important; }\n  @media print {\n    .visible-print-inline {\n      display: inline !important; } }\n\n.visible-print-inline-block {\n  display: none !important; }\n  @media print {\n    .visible-print-inline-block {\n      display: inline-block !important; } }\n\n@media print {\n  .hidden-print {\n    display: none !important; } }\n\nbody {\n  font-family: lato, sans-serif;\n  color: #333; }\n\nhr.dot {\n  background: url(" + __webpack_require__(32) + ") center no-repeat;\n  height: 10px;\n  border: none;\n  margin: 20px 0 0 0; }\n\nnav.main {\n  margin: 0;\n  text-align: center;\n  font-family: 'Montserrat', sans-serif;\n  text-transform: uppercase;\n  background: transparent;\n  transition: background 0.2s ease-out; }\n  nav.main ul {\n    margin: 0; }\n    nav.main ul li {\n      font-size: 1rem;\n      padding: 10px 5px; }\n  nav.main.sticky {\n    position: fixed;\n    z-index: 9999;\n    width: 100%;\n    top: 0;\n    background: #000;\n    transition: background 0.2s ease-out;\n    -webkit-transform: translate3d(0, 0, 0); }\n    nav.main.sticky ul li a {\n      color: #fafafa;\n      transition: color 0.2s ease-out; }\n    nav.main.sticky ul li.active {\n      background: #fff; }\n    nav.main.sticky ul li.active a {\n      color: #111; }\n\nsection {\n  background: #000;\n  margin-top: 40px; }\n  section .container-fluid {\n    background: #fff;\n    padding: 20px 0; }\n    section .container-fluid .pre-heading {\n      text-align: center;\n      font-size: 16px;\n      font-family: 'Montserrat', sans-serif;\n      text-transform: uppercase; }\n    section .container-fluid .line-heading {\n      text-transform: uppercase;\n      font-family: \"Montserrat\", sans-serif;\n      text-align: center;\n      font-size: 32px;\n      margin: 10px 0 0 0; }\n    section .container-fluid .sub-line-heading {\n      text-align: center;\n      width: 80%;\n      margin: 30px auto 0;\n      font-size: 18px;\n      font-style: italic;\n      font-family: Georgia, serif; }\n    section .container-fluid .pre-heading:empty, section .container-fluid .line-heading:empty, section .container-fluid .sub-line-heading:empty {\n      display: none; }\n  section .container {\n    padding-top: 30px;\n    padding-bottom: 30px;\n    color: #eaeaea; }\n    section .container h4, section .container h3 {\n      font-family: \"Montserrat\", sans-serif;\n      text-transform: uppercase; }\n    section .container p {\n      color: #b7b7b7; }\n\nsection#head {\n  background: #fff; }\n  section#head .container-fluid {\n    display: none; }\n  section#head .container {\n    color: #333;\n    padding-bottom: 0px; }\n  section#head h1 {\n    text-transform: uppercase;\n    font-family: \"Montserrat\", sans-serif;\n    text-align: center;\n    margin: 0 auto 20px;\n    font-size: 1.8rem; }\n    @media (min-width: 577px) {\n      section#head h1 {\n        font-size: 2.2rem; } }\n  section#head img.po {\n    margin: 0 auto;\n    display: block;\n    width: 200px;\n    height: 200px; }\n  section#head .po-quote {\n    font-family: Georgia, serif;\n    font-size: 26px;\n    position: relative;\n    text-align: center;\n    line-height: 35px;\n    margin: 0 auto;\n    color: #333; }\n    @media (min-width: 769px) {\n      section#head .po-quote {\n        max-width: 600px;\n        margin: 30px auto 0; } }\n    section#head .po-quote:before {\n      content: \"\\201C\";\n      font-size: 100px;\n      display: block;\n      padding: 60px 0 0; }\n      @media (min-width: 769px) {\n        section#head .po-quote:before {\n          font-size: 140px;\n          position: absolute;\n          left: -80px;\n          top: -40%; } }\n    section#head .po-quote:after {\n      content: \"\\201D\";\n      font-size: 100px;\n      display: block;\n      padding: 40px 0 0; }\n      @media (min-width: 769px) {\n        section#head .po-quote:after {\n          font-size: 140px;\n          position: absolute;\n          right: -80px;\n          top: 40%; } }\n\nsection#social .list-inline {\n  text-align: center; }\n  section#social .list-inline .list-inline-item {\n    margin: 0;\n    padding: 30px; }\n    section#social .list-inline .list-inline-item a {\n      /*color: $background-light;*/ }\n      section#social .list-inline .list-inline-item a i {\n        font-size: 4rem; }\n\nsection#projects {\n  background: #fff; }\n  section#projects .container {\n    color: #333; }\n    section#projects .container .row div .image {\n      text-align: center;\n      line-height: 200px; }\n    section#projects .container .row div p {\n      color: #333; }\n\nsection#menu {\n  background: #fff;\n  margin: 40px 0 40px; }\n\nsection#contact .container h5 {\n  margin-top: 1rem; }\n\nsection#contact .container img {\n  height: 230px; }\n\nsection#about h3 {\n  font-size: 1rem; }\n\nsection#about h4 {\n  font-size: .8rem;\n  margin: 40px 0 0 0; }\n\nsection#about ul {\n  margin: 10px 0 0 0;\n  list-style-type: none;\n  padding: 0; }\n  section#about ul li {\n    color: #b7b7b7; }\n\nfooter {\n  text-align: center;\n  margin: 50px auto 20px; }\n", ""]);
	
	// exports


/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2hpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpGQTY1RUVDQzAzMjE2ODExOEMxNEUwQjVENjQ3NEJERiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDo5RTU4QjhFMjJEMjUxMUUzQjBFQURGRUU1RDY2MEM5NCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5RTU4QjhFMTJEMjUxMUUzQjBFQURGRUU1RDY2MEM5NCIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDQ5MURGNTU3OTIxNjgxMThDMTRFMEI1RDY0NzRCREYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6RkE2NUVFQ0MwMzIxNjgxMThDMTRFMEI1RDY0NzRCREYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7yvnDkAAAAZElEQVR42mJigABOIG4E4jtA/BNKN0LFwYALiI8C8X8sGCTOxQwkaoE4hgE7kAXiPwxQo//jwXeZoKrxARmQoscEFD0FKVpOQNFion33G2raX5D9QMwDxA+AeAoQpwHxd4AAAwCydCSNIEKgfwAAAABJRU5ErkJggg=="

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map