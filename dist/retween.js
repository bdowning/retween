(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Retween"] = factory();
	else
		root["Retween"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.easingFormulas = exports.cachePreprocessor = exports.createColorPreprocessor = exports.createEasingPreprocessor = exports.createTokenPreprocessor = undefined;

	var _core = __webpack_require__(7);

	Object.keys(_core).forEach(function (key) {
	  if (key === "default") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _core[key];
	    }
	  });
	});

	var _createTokenPreprocessor = __webpack_require__(13);

	var _createTokenPreprocessor2 = _interopRequireDefault(_createTokenPreprocessor);

	var _createEasingPreprocessor = __webpack_require__(12);

	var _createEasingPreprocessor2 = _interopRequireDefault(_createEasingPreprocessor);

	var _createColorPreprocessor = __webpack_require__(11);

	var _createColorPreprocessor2 = _interopRequireDefault(_createColorPreprocessor);

	var _cachePreprocessor = __webpack_require__(5);

	var _cachePreprocessor2 = _interopRequireDefault(_cachePreprocessor);

	var _easingFormulas = __webpack_require__(9);

	var _easingFormulas2 = _interopRequireDefault(_easingFormulas);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.createTokenPreprocessor = _createTokenPreprocessor2.default;
	exports.createEasingPreprocessor = _createEasingPreprocessor2.default;
	exports.createColorPreprocessor = _createColorPreprocessor2.default;
	exports.cachePreprocessor = _cachePreprocessor2.default;
	exports.easingFormulas = _easingFormulas2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = identity;
	function identity(x) {
	  return x;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = compose;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function compose() {
	  for (var _len = arguments.length, functions = Array(_len), _key = 0; _key < _len; _key++) {
	    functions[_key] = arguments[_key];
	  }

	  var ret = _identity2.default;

	  var _loop = function _loop(i) {
	    if (ret === _identity2.default) {
	      ret = functions[i];
	    } else if (functions[i] !== _identity2.default) {
	      (function () {
	        var boundRet = ret;
	        ret = function ret(x) {
	          return functions[i](boundRet(x));
	        };
	      })();
	    }
	  };

	  for (var i = functions.length - 1; i >= 0; --i) {
	    _loop(i);
	  }
	  return ret;
	}

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.default = functionCacheId;
	var nextId = 1;

	function functionCacheId(func) {
	  if (!func.__retweenCacheId) {
	    func.__retweenCacheId = "__id_" + nextId++;
	  }
	  return func.__retweenCacheId;
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = identityPreprocessor;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function identityPreprocessor(state, easing) {
	  return [state, easing, _identity2.default];
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = cachePreprocessor;

	var _functionCacheId = __webpack_require__(3);

	var _functionCacheId2 = _interopRequireDefault(_functionCacheId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function cachePreprocessor(preprocessor) {
	  var cache = {};
	  return function (state, easing) {
	    var props = Object.keys(state).sort();
	    var sig = props.map(function (p) {
	      return p + '!!!' + JSON.stringify(state[p]) + '!!!' + (typeof easing[p] === 'function' ? (0, _functionCacheId2.default)(easing[p]) : JSON.stringify(easing[p]));
	    });
	    var cacheKey = sig.join('!!!');
	    if (!cache[cacheKey]) {
	      cache[cacheKey] = preprocessor(state, easing);
	    }
	    return cache[cacheKey];
	  };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = composePreprocessors;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	var _compose = __webpack_require__(2);

	var _compose2 = _interopRequireDefault(_compose);

	var _identityPreprocessor = __webpack_require__(4);

	var _identityPreprocessor2 = _interopRequireDefault(_identityPreprocessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function composePreprocessors() {
	  for (var _len = arguments.length, preprocessors = Array(_len), _key = 0; _key < _len; _key++) {
	    preprocessors[_key] = arguments[_key];
	  }

	  if (preprocessors.length === 0) {
	    return _identityPreprocessor2.default;
	  } else {
	    var composed = preprocessors[preprocessors.length - 1];

	    var _loop = function _loop(i) {
	      var preprocessor = preprocessors[i];
	      var boundComposed = composed;
	      composed = function composed(state, easing) {
	        var _boundComposed = boundComposed(state, easing);

	        var innerState = _boundComposed[0];
	        var innerEasing = _boundComposed[1];
	        var innerDecoder = _boundComposed[2];

	        var _preprocessor = preprocessor(innerState, innerEasing);

	        var outerState = _preprocessor[0];
	        var outerEasing = _preprocessor[1];
	        var outerDecoder = _preprocessor[2];

	        var combinedDecoder = (0, _compose2.default)(innerDecoder, outerDecoder);
	        return [outerState, outerEasing, combinedDecoder];
	      };
	    };

	    for (var i = preprocessors.length - 2; i >= 0; --i) {
	      _loop(i);
	    }
	    return composed;
	  }
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.identityPreprocessor = exports.composePreprocessors = exports.createInterpolator = exports.compose = exports.identity = undefined;

	__webpack_require__(10);

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	var _compose = __webpack_require__(2);

	var _compose2 = _interopRequireDefault(_compose);

	var _createInterpolator = __webpack_require__(8);

	var _createInterpolator2 = _interopRequireDefault(_createInterpolator);

	var _composePreprocessors = __webpack_require__(6);

	var _composePreprocessors2 = _interopRequireDefault(_composePreprocessors);

	var _identityPreprocessor = __webpack_require__(4);

	var _identityPreprocessor2 = _interopRequireDefault(_identityPreprocessor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.identity = _identity2.default;
	exports.compose = _compose2.default;
	exports.createInterpolator = _createInterpolator2.default;
	exports.composePreprocessors = _composePreprocessors2.default;
	exports.identityPreprocessor = _identityPreprocessor2.default;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createInterpolator;

	var _functionCacheId = __webpack_require__(3);

	var _functionCacheId2 = _interopRequireDefault(_functionCacheId);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var interpolateFunctionCache = {};

	function propRef(prop, arr) {
	  return arr + '[' + JSON.stringify(prop) + ']';
	}

	function getInterpolateFunction(props, state, easing, cacheKey) {
	  if (!interpolateFunctionCache[cacheKey]) {
	    var code = ['return function interpolate (fromState, toState, position, outputState) {', 'outputState = outputState || { };'];

	    var easingNames = [];
	    var easingFuncs = [];

	    for (var i = 0; i < props.length; ++i) {
	      var prop = props[i];

	      code.push(propRef(prop, 'outputState') + ' = ');
	      code.push(propRef(prop, 'fromState') + ' + ');
	      code.push('(' + propRef(prop, 'toState') + ' - ' + propRef(prop, 'fromState') + ') * ');
	      code.push('easing' + i + '(position);');

	      easingNames[i] = 'easing' + i;
	      easingFuncs[i] = easing[prop];
	    }

	    code.push('return outputState;');
	    code.push('};');

	    interpolateFunctionCache[cacheKey] = new (Function.prototype.bind.apply(Function, [null].concat(easingNames, [code.join('')])))().apply(undefined, easingFuncs);
	  }
	  return interpolateFunctionCache[cacheKey];
	}

	function interpolate(from, to, position) {
	  return from + (to - from) * position;
	}

	function createInterpolator(state, easing) {
	  var props = Object.keys(state).sort();
	  var sig = [];

	  for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	    var _ref;

	    if (_isArray) {
	      if (_i >= _iterator.length) break;
	      _ref = _iterator[_i++];
	    } else {
	      _i = _iterator.next();
	      if (_i.done) break;
	      _ref = _i.value;
	    }

	    var prop = _ref;

	    if (typeof state[prop] !== 'number') {
	      throw new Error('Prototype state value ' + prop + ' is not a number');
	    }
	    if (typeof easing[prop] !== 'function') {
	      if (!easing[prop]) {
	        throw new Error('Easing function for ' + prop + ' is missing');
	      } else {
	        throw new Error('Easing function for ' + prop + ' is not a function');
	      }
	    }

	    sig.push(prop + '!!!' + (0, _functionCacheId2.default)(easing[prop]));
	  }

	  var cacheKey = sig.join('!!!');

	  return getInterpolateFunction(props, state, easing, cacheKey);
	  return function (fromState, toState, position) {
	    var outputState = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

	    for (var prop in state) {
	      outputState[prop] = interpolate(fromState[prop], toState[prop], easing[prop](position));
	    }
	    return outputState;
	  };
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var easingFormulas = {
	  identity: _identity2.default,

	  linear: _identity2.default,

	  easeInQuad: function easeInQuad(pos) {
	    return Math.pow(pos, 2);
	  },

	  easeOutQuad: function easeOutQuad(pos) {
	    return -(Math.pow(pos - 1, 2) - 1);
	  },

	  easeInOutQuad: function easeInOutQuad(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 2);
	    }
	    return -0.5 * ((pos -= 2) * pos - 2);
	  },

	  easeInCubic: function easeInCubic(pos) {
	    return Math.pow(pos, 3);
	  },

	  easeOutCubic: function easeOutCubic(pos) {
	    return Math.pow(pos - 1, 3) + 1;
	  },

	  easeInOutCubic: function easeInOutCubic(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 3);
	    }
	    return 0.5 * (Math.pow(pos - 2, 3) + 2);
	  },

	  easeInQuart: function easeInQuart(pos) {
	    return Math.pow(pos, 4);
	  },

	  easeOutQuart: function easeOutQuart(pos) {
	    return -(Math.pow(pos - 1, 4) - 1);
	  },

	  easeInOutQuart: function easeInOutQuart(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 4);
	    }
	    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
	  },

	  easeInQuint: function easeInQuint(pos) {
	    return Math.pow(pos, 5);
	  },

	  easeOutQuint: function easeOutQuint(pos) {
	    return Math.pow(pos - 1, 5) + 1;
	  },

	  easeInOutQuint: function easeInOutQuint(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 5);
	    }
	    return 0.5 * (Math.pow(pos - 2, 5) + 2);
	  },

	  easeInSine: function easeInSine(pos) {
	    return -Math.cos(pos * (Math.PI / 2)) + 1;
	  },

	  easeOutSine: function easeOutSine(pos) {
	    return Math.sin(pos * (Math.PI / 2));
	  },

	  easeInOutSine: function easeInOutSine(pos) {
	    return -0.5 * (Math.cos(Math.PI * pos) - 1);
	  },

	  easeInExpo: function easeInExpo(pos) {
	    return pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1));
	  },

	  easeOutExpo: function easeOutExpo(pos) {
	    return pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1;
	  },

	  easeInOutExpo: function easeInOutExpo(pos) {
	    if (pos === 0) {
	      return 0;
	    }
	    if (pos === 1) {
	      return 1;
	    }
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(2, 10 * (pos - 1));
	    }
	    return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
	  },

	  easeInCirc: function easeInCirc(pos) {
	    return -(Math.sqrt(1 - pos * pos) - 1);
	  },

	  easeOutCirc: function easeOutCirc(pos) {
	    return Math.sqrt(1 - Math.pow(pos - 1, 2));
	  },

	  easeInOutCirc: function easeInOutCirc(pos) {
	    if ((pos /= 0.5) < 1) {
	      return -0.5 * (Math.sqrt(1 - pos * pos) - 1);
	    }
	    return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
	  },

	  easeOutBounce: function easeOutBounce(pos) {
	    if (pos < 1 / 2.75) {
	      return 7.5625 * pos * pos;
	    } else if (pos < 2 / 2.75) {
	      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
	    } else if (pos < 2.5 / 2.75) {
	      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
	    } else {
	      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
	    }
	  },

	  easeInBack: function easeInBack(pos) {
	    var s = 1.70158;
	    return pos * pos * ((s + 1) * pos - s);
	  },

	  easeOutBack: function easeOutBack(pos) {
	    var s = 1.70158;
	    return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
	  },

	  easeInOutBack: function easeInOutBack(pos) {
	    var s = 1.70158;
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
	    }
	    return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
	  },

	  elastic: function elastic(pos) {
	    return -1 * Math.pow(4, -8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
	  },

	  swingFromTo: function swingFromTo(pos) {
	    var s = 1.70158;
	    return (pos /= 0.5) < 1 ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s)) : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
	  },

	  swingFrom: function swingFrom(pos) {
	    var s = 1.70158;
	    return pos * pos * ((s + 1) * pos - s);
	  },

	  swingTo: function swingTo(pos) {
	    var s = 1.70158;
	    return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
	  },

	  bounce: function bounce(pos) {
	    if (pos < 1 / 2.75) {
	      return 7.5625 * pos * pos;
	    } else if (pos < 2 / 2.75) {
	      return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
	    } else if (pos < 2.5 / 2.75) {
	      return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
	    } else {
	      return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
	    }
	  },

	  bouncePast: function bouncePast(pos) {
	    if (pos < 1 / 2.75) {
	      return 7.5625 * pos * pos;
	    } else if (pos < 2 / 2.75) {
	      return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
	    } else if (pos < 2.5 / 2.75) {
	      return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
	    } else {
	      return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
	    }
	  },

	  easeFromTo: function easeFromTo(pos) {
	    if ((pos /= 0.5) < 1) {
	      return 0.5 * Math.pow(pos, 4);
	    }
	    return -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);
	  },

	  easeFrom: function easeFrom(pos) {
	    return Math.pow(pos, 4);
	  },

	  easeTo: function easeTo(pos) {
	    return Math.pow(pos, 0.25);
	  }
	}; /*!
	    * All equations adapted from [Shifty](https://github.com/jeremyckahn/shifty).
	    *
	    * All equations are adapted from Thomas Fuchs'
	    * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
	    *
	    * Based on Easing Equations (c) 2003 [Robert
	    * Penner](http://www.robertpenner.com/), all rights reserved. This work is
	    * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
	    */

	/*!
	 *  TERMS OF USE - EASING EQUATIONS
	 *  Open source under the BSD License.
	 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
	 */

	exports.default = easingFormulas;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	// From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys
	if (!Object.keys) {
	  Object.keys = function () {
	    'use strict';

	    var hasOwnProperty = Object.prototype.hasOwnProperty,
	        hasDontEnumBug = !{ toString: null }.propertyIsEnumerable('toString'),
	        dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
	        dontEnumsLength = dontEnums.length;

	    return function (obj) {
	      if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' && (typeof obj !== 'function' || obj === null)) {
	        throw new TypeError('Object.keys called on non-object');
	      }

	      var result = [],
	          prop,
	          i;

	      for (prop in obj) {
	        if (hasOwnProperty.call(obj, prop)) {
	          result.push(prop);
	        }
	      }

	      if (hasDontEnumBug) {
	        for (i = 0; i < dontEnumsLength; i++) {
	          if (hasOwnProperty.call(obj, dontEnums[i])) {
	            result.push(dontEnums[i]);
	          }
	        }
	      }
	      return result;
	    };
	  }();
	}

	if (typeof Object.assign != 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';

	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var output = Object(target);
	      for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (var nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  })();
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createColorPreprocessor;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var hexColor = /#([0-9A-Fa-f]{8}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{4}|[0-9A-Fa-f]{3})\b/g;
	var rgbIntColor = /(rgba?)\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/g;

	function convertHexColor(match, hexDigits) {
	  var dehex = function dehex(start, size, div, mult, prec) {
	    var ret = (parseInt(hexDigits.slice(start, start + size), 16) / div * mult).toFixed(prec);
	    return ret;
	  };
	  var dehex1 = function dehex1(start) {
	    return dehex(start, 1, 15, 100, 2);
	  };
	  var dehex1a = function dehex1a(start) {
	    return dehex(start, 1, 15, 1, 3);
	  };
	  var dehex2 = function dehex2(start) {
	    return dehex(start, 2, 255, 100, 2);
	  };
	  var dehex2a = function dehex2a(start) {
	    return dehex(start, 2, 255, 1, 3);
	  };

	  switch (hexDigits.length) {
	    case 3:
	      return 'rgb(' + dehex1(0) + '%, ' + dehex1(1) + '%, ' + dehex1(2) + '%)';
	    case 4:
	      return 'rgba(' + dehex1(0) + '%, ' + dehex1(1) + '%, ' + dehex1(2) + '%, ' + dehex1a(3) + ')';
	    case 6:
	      return 'rgb(' + dehex2(0) + '%, ' + dehex2(2) + '%, ' + dehex2(4) + '%)';
	    case 8:
	      return 'rgba(' + dehex2(0) + '%, ' + dehex2(2) + '%, ' + dehex2(4) + '%, ' + dehex2a(6) + ')';
	  }

	  return match; // should never reach
	}

	function convertRgbIntColor(match, rgb, red, green, blue) {
	  var redP = (red / 255 * 100).toFixed(2);
	  var greenP = (green / 255 * 100).toFixed(2);
	  var blueP = (blue / 255 * 100).toFixed(2);

	  return rgb + '(' + redP + '%, ' + greenP + '%, ' + blueP + '%';
	}

	function createColorPreprocessor() {
	  return function (state, easing) {
	    var newState = state;

	    for (var prop in state) {
	      var value = state[prop];
	      if (typeof value === 'string') {
	        var newValue = value.replace(hexColor, convertHexColor);
	        newValue = newValue.replace(rgbIntColor, convertRgbIntColor);
	        if (newValue !== value) {
	          if (newState === state) {
	            newState = Object.assign({}, state);
	          }
	          newState[prop] = newValue;
	        }
	      }
	    }

	    return [newState, easing, _identity2.default];
	  };
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createEasingPreprocessor;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function createEasingPreprocessor(easingsMap) {
	  return function (state, easing) {
	    var props = Object.keys(easing).filter(function (el) {
	      return typeof easing[el] === 'string';
	    });

	    if (props.length === 0) {
	      return [state, easing, _identity2.default];
	    }

	    var newEasing = Object.assign({}, easing);
	    for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var prop = _ref;

	      if (easingsMap[easing[prop]]) {
	        newEasing[prop] = easingsMap[easing[prop]];
	      }
	    }

	    return [state, newEasing, _identity2.default];
	  };
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.default = createTokenPreprocessor;

	var _identity = __webpack_require__(1);

	var _identity2 = _interopRequireDefault(_identity);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var decodeFunctionCache = {};

	function getDecodeFunction(propsInfo, cacheKey) {
	  if (!decodeFunctionCache[cacheKey]) {
	    var code = ['return function decode (state) { return {'];

	    for (var _iterator = propsInfo, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
	      var _ref;

	      if (_isArray) {
	        if (_i >= _iterator.length) break;
	        _ref = _iterator[_i++];
	      } else {
	        _i = _iterator.next();
	        if (_i.done) break;
	        _ref = _i.value;
	      }

	      var propInfo = _ref;
	      var prop = propInfo.prop;
	      var pass = propInfo.pass;
	      var parts = propInfo.parts;
	      var values = propInfo.values;

	      code.push(JSON.stringify(prop));
	      code.push(':');
	      if (propInfo.pass) {
	        code.push('state[' + JSON.stringify(prop) + ']');
	      } else {
	        for (var i = 0; i < parts.length; ++i) {
	          if (i > 0) {
	            code.push('+');
	          }
	          if (i % 2 === 1) {
	            var value = values[(i - 1) / 2];
	            code.push('parseFloat(state[' + JSON.stringify(value.name) + ']).toFixed(' + value.precision + ')');
	          } else {
	            code.push(JSON.stringify(parts[i]));
	          }
	        }
	      }
	      code.push(',');
	    }
	    code.push('}; };');

	    decodeFunctionCache[cacheKey] = new Function(code.join(''))();
	  }
	  return decodeFunctionCache[cacheKey];
	}

	function createTokenPreprocessor() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  options = Object.assign({
	    defaultPrecision: 2
	  }, options);

	  return function (state, easing) {
	    var props = Object.keys(state).sort();

	    if (props.filter(function (k) {
	      return typeof state[k] === 'string';
	    }).length === 0) {
	      return [state, easing, _identity2.default];
	    }

	    var newState = Object.assign({}, state);
	    var newEasing = Object.assign({}, easing);
	    var propsInfo = [];

	    for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
	      var _ref2;

	      if (_isArray2) {
	        if (_i2 >= _iterator2.length) break;
	        _ref2 = _iterator2[_i2++];
	      } else {
	        _i2 = _iterator2.next();
	        if (_i2.done) break;
	        _ref2 = _i2.value;
	      }

	      var prop = _ref2;

	      if (typeof state[prop] === 'string') {
	        var parts = state[prop].split(/(-?\b(?:\d+(?:\.\d+|\.)?|\.\d+))/);
	        var values = [];

	        if (typeof easing[prop] === 'string' && easing[prop].match(/\s/)) {
	          easing[prop] = easing[prop].split(/\s+/);
	        }

	        for (var i = 1; i < parts.length; i += 2) {
	          values.push({
	            value: parts[i],
	            precision: options.defaultPrecision
	          });
	          parts[i] = prop;
	        }

	        for (var _i3 = 0; _i3 < values.length; ++_i3) {
	          values[_i3].num = _i3;
	          values[_i3].name = prop + '__' + _i3;
	          newState[values[_i3].name] = parseFloat(values[_i3].value);

	          if (easing[prop]) {
	            if (Array.isArray(easing[prop])) {
	              newEasing[values[_i3].name] = easing[prop][_i3];
	            } else {
	              newEasing[values[_i3].name] = easing[prop];
	            }
	          }
	        }

	        var _cacheKey = parts.join('!!!');

	        delete newState[prop];
	        delete newEasing[prop];

	        propsInfo.push({ prop: prop, parts: parts, values: values, cacheKey: _cacheKey });
	      } else {
	        propsInfo.push({ prop: prop, pass: true, cacheKey: prop });
	      }
	    }

	    var cacheKey = propsInfo.map(function (x) {
	      return x.cacheKey;
	    }).join('!!!PROP!!!');

	    var decoder = getDecodeFunction(propsInfo, cacheKey);

	    return [newState, newEasing, decoder];
	  };
	}

/***/ }
/******/ ])
});
;