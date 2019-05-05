(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("WebGlobe", [], factory);
	else if(typeof exports === 'object')
		exports["WebGlobe"] = factory();
	else
		root["WebGlobe"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 178);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var REAL_EARTH_RADIUS = 6378137;
var EARTH_RADIUS = 500;
var SCALE_FACTOR = EARTH_RADIUS / REAL_EARTH_RADIUS;
var MAX_PROJECTED_COORD = Math.PI * EARTH_RADIUS;
var MAX_REAL_RESOLUTION = 156543.03392800014;
var MAX_RESOLUTION = MAX_REAL_RESOLUTION * SCALE_FACTOR;
var Kernel = (function () {
    function Kernel() {
    }
    Kernel.gl = null;
    Kernel.idCounter = 0;
    Kernel.version = "0.6.3";
    Kernel.SCALE_FACTOR = SCALE_FACTOR;
    Kernel.REAL_EARTH_RADIUS = REAL_EARTH_RADIUS;
    Kernel.EARTH_RADIUS = EARTH_RADIUS;
    Kernel.MAX_RESOLUTION = MAX_RESOLUTION;
    Kernel.MAX_REAL_RESOLUTION = MAX_REAL_RESOLUTION;
    Kernel.MAX_PROJECTED_COORD = MAX_PROJECTED_COORD;
    Kernel.BASE_LEVEL = 6;
    Kernel.MAX_LEVEL = 18;
    Kernel.MIN_LEVEL = 2;
    Kernel.MIN_PITCH_LEVEL = 8;
    Kernel.proxy = "";
    return Kernel;
}());
exports.default = Kernel;
;


/***/ }),
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Vertice_1 = __webpack_require__(11);
var Vector_1 = __webpack_require__(12);
var Line_1 = __webpack_require__(51);
var Plan_1 = __webpack_require__(85);
if (!Math.log2) {
    Math.log2 = function (value) { return (Math.log(value) / Math.log(2)); };
}
var pow2Cache = {};
(function (cache) {
    cache[0] = 1;
    for (var i = 1; i <= 20; i++) {
        cache[i] = cache[i - 1] << 1;
        cache[-i] = 1 / cache[i];
    }
})(pow2Cache);
var ONE_RADIAN_EQUAL_DEGREE = 57.29577951308232;
var ONE_DEGREE_EQUAL_RADIAN = 0.017453292519943295;
var MathUtils = (function () {
    function MathUtils() {
    }
    MathUtils.getRealValueInWorld = function (virtualValue) {
        return virtualValue / Kernel_1.default.SCALE_FACTOR;
    };
    MathUtils.pow2 = function (v) {
        var s = v.toString();
        if (pow2Cache.hasOwnProperty(s)) {
            return pow2Cache[s];
        }
        else {
            return Math.pow(2, v);
        }
    };
    MathUtils.log2 = function (value) {
        return Math.log2(value);
    };
    MathUtils.izZero = function (value) {
        if (!Utils_1.default.isNumber(value)) {
            throw "invalid value";
        }
        return Math.abs(value) < 0.000001;
    };
    MathUtils.isPowerOfTwo = function (value) {
        return (value & (value - 1)) === 0 && value !== 0;
    };
    MathUtils.asinSafely = function (value) {
        if (value > 1) {
            value = 1;
        }
        if (value < -1) {
            value = -1;
        }
        return Math.asin(value);
    };
    MathUtils.acosSafely = function (value) {
        if (value > 1) {
            value = 1;
        }
        if (value < -1) {
            value = -1;
        }
        return Math.acos(value);
    };
    MathUtils.numerationSystemTo10 = function (numSys, strNum) {
        var sum = 0;
        for (var i = 0; i < strNum.length; i++) {
            var level = strNum.length - 1 - i;
            var key = parseInt(strNum[i]);
            sum += key * Math.pow(numSys, level);
        }
        return sum;
    };
    MathUtils.numerationSystemFrom10 = function (numSys, num) {
        return num.toString(numSys);
    };
    MathUtils.numerationSystemChange = function (numSysFrom, numSysTo, strNumFrom) {
        var temp10 = this.numerationSystemTo10(numSysFrom, strNumFrom);
        var strResult = this.numerationSystemFrom10(numSysTo, temp10);
        return strResult;
    };
    MathUtils.getTriangleArea = function (v1, v2, v3) {
        var v1Copy = v1.clone();
        var v2Copy = v2.clone();
        var v3Copy = v3.clone();
        var direction = Vector_1.default.verticeMinusVertice(v3Copy, v2Copy);
        var line = new Line_1.default(v2Copy, direction);
        var h = this.getLengthFromVerticeToLine(v1Copy, line);
        var w = this.getLengthFromVerticeToVertice(v2Copy, v3Copy);
        var area = 0.5 * w * h;
        return area;
    };
    MathUtils.getLengthFromVerticeToVertice = function (vertice1, vertice2) {
        var vertice1Copy = vertice1.clone();
        var vertice2Copy = vertice2.clone();
        var length2 = Math.pow(vertice1Copy.x - vertice2Copy.x, 2) + Math.pow(vertice1Copy.y - vertice2Copy.y, 2) + Math.pow(vertice1Copy.z - vertice2Copy.z, 2);
        var length = Math.sqrt(length2);
        return length;
    };
    MathUtils.getLengthFromVerticeToLine = function (vertice, line) {
        var verticeCopy = vertice.clone();
        var lineCopy = line.clone();
        var x0 = verticeCopy.x;
        var y0 = verticeCopy.y;
        var z0 = verticeCopy.z;
        var verticeOnLine = lineCopy.vertice;
        var x1 = verticeOnLine.x;
        var y1 = verticeOnLine.y;
        var z1 = verticeOnLine.z;
        var lineVector = lineCopy.vector;
        lineVector.normalize();
        var a = lineVector.x;
        var b = lineVector.y;
        var c = lineVector.z;
        var A = (y0 - y1) * c - b * (z0 - z1);
        var B = (z0 - z1) * a - c * (x0 - x1);
        var C = (x0 - x1) * b - a * (y0 - y1);
        return Math.sqrt(A * A + B * B + C * C);
    };
    MathUtils.getLengthFromVerticeToPlan = function (vertice, plan) {
        var verticeCopy = vertice.clone();
        var planCopy = plan.clone();
        var x = verticeCopy.x;
        var y = verticeCopy.y;
        var z = verticeCopy.z;
        var A = planCopy.A;
        var B = planCopy.B;
        var C = planCopy.C;
        var D = planCopy.D;
        var numerator = Math.abs(A * x + B * y + C * z + D);
        var denominator = Math.sqrt(A * A + B * B + C * C);
        var length = numerator / denominator;
        return length;
    };
    MathUtils.getVerticeVerticalIntersectPointWidthPlan = function (vertice, plan) {
        var verticeCopy = vertice.clone();
        var planCopy = plan.clone();
        var x0 = verticeCopy.x;
        var y0 = verticeCopy.y;
        var z0 = verticeCopy.z;
        var normalVector = new Vector_1.default(planCopy.A, planCopy.B, planCopy.C);
        normalVector.normalize();
        var a = normalVector.x;
        var b = normalVector.y;
        var c = normalVector.z;
        var d = planCopy.D * a / planCopy.A;
        var k = -(a * x0 + b * y0 + c * z0 + d);
        var x = k * a + x0;
        var y = k * b + y0;
        var z = k * c + z0;
        var intersectVertice = new Vertice_1.default(x, y, z);
        return intersectVertice;
    };
    MathUtils.getIntersectPointByLineAdPlan = function (line, plan) {
        var lineCopy = line.clone();
        var planCopy = plan.clone();
        lineCopy.vector.normalize();
        var A = planCopy.A;
        var B = planCopy.B;
        var C = planCopy.C;
        var D = planCopy.D;
        var x0 = lineCopy.vertice.x;
        var y0 = lineCopy.vertice.y;
        var z0 = lineCopy.vertice.z;
        var a = lineCopy.vector.x;
        var b = lineCopy.vector.y;
        var c = lineCopy.vector.z;
        var k = -(A * x0 + B * y0 + C * z0 + D) / (A * a + B * b + C * c);
        var x = k * a + x0;
        var y = k * b + y0;
        var z = k * c + z0;
        var intersectVertice = new Vertice_1.default(x, y, z);
        return intersectVertice;
    };
    MathUtils.getLineIntersectPointWithEarth = function (line) {
        var result = [];
        var lineCopy = line.clone();
        var vertice = lineCopy.vertice;
        var direction = lineCopy.vector;
        direction.normalize();
        var r = Kernel_1.default.EARTH_RADIUS;
        var a = direction.x;
        var b = direction.y;
        var c = direction.z;
        var x0 = vertice.x;
        var y0 = vertice.y;
        var z0 = vertice.z;
        var a2 = a * a;
        var b2 = b * b;
        var c2 = c * c;
        var r2 = r * r;
        var ay0 = a * y0;
        var az0 = a * z0;
        var bx0 = b * x0;
        var bz0 = b * z0;
        var cx0 = c * x0;
        var cy0 = c * y0;
        var deltaA = ay0 * bx0 + az0 * cx0 + bz0 * cy0;
        var deltaB = ay0 * ay0 + az0 * az0 + bx0 * bx0 + bz0 * bz0 + cx0 * cx0 + cy0 * cy0;
        var deltaC = a2 + b2 + c2;
        var delta = 8 * deltaA - 4 * deltaB + 4 * r2 * deltaC;
        if (delta < 0) {
            result = [];
        }
        else {
            var t = a * x0 + b * y0 + c * z0;
            var A = a2 + b2 + c2;
            if (delta == 0) {
                var k = -t / A;
                var x = k * a + x0;
                var y = k * b + y0;
                var z = k * c + z0;
                var p = new Vertice_1.default(x, y, z);
                result.push(p);
            }
            else if (delta > 0) {
                var sqrtDelta = Math.sqrt(delta);
                var k1 = (-2 * t + sqrtDelta) / (2 * A);
                var x1 = k1 * a + x0;
                var y1 = k1 * b + y0;
                var z1 = k1 * c + z0;
                var p1 = new Vertice_1.default(x1, y1, z1);
                result.push(p1);
                var k2 = (-2 * t - sqrtDelta) / (2 * A);
                var x2 = k2 * a + x0;
                var y2 = k2 * b + y0;
                var z2 = k2 * c + z0;
                var p2 = new Vertice_1.default(x2, y2, z2);
                result.push(p2);
            }
        }
        return result;
    };
    MathUtils.getCrossPlaneByLine = function (vertice, direction) {
        var verticeCopy = vertice.clone();
        var directionCopy = direction.clone();
        directionCopy.normalize();
        var a = directionCopy.x;
        var b = directionCopy.y;
        var c = directionCopy.z;
        var x0 = verticeCopy.x;
        var y0 = verticeCopy.y;
        var z0 = verticeCopy.z;
        var d = -(a * x0 + b * y0 + c * z0);
        var plan = new Plan_1.default(a, b, c, d);
        return plan;
    };
    MathUtils.convertPointFromCanvasToNDC = function (canvasWidth, canvasHeight, canvasX, canvasY) {
        if (!(Utils_1.default.isNumber(canvasX))) {
            throw "invalid canvasX";
        }
        if (!(Utils_1.default.isNumber(canvasY))) {
            throw "invalid canvasY";
        }
        var ndcX = 2 * canvasX / canvasWidth - 1;
        var ndcY = 1 - 2 * canvasY / canvasHeight;
        return [ndcX, ndcY];
    };
    MathUtils.convertPointFromNdcToCanvas = function (canvasWidth, canvasHeight, ndcX, ndcY) {
        if (!(Utils_1.default.isNumber(ndcX))) {
            throw "invalid ndcX";
        }
        if (!(Utils_1.default.isNumber(ndcY))) {
            throw "invalid ndcY";
        }
        var canvasX = (1 + ndcX) * canvasWidth / 2.0;
        var canvasY = (1 - ndcY) * canvasHeight / 2.0;
        return [canvasX, canvasY];
    };
    MathUtils.geographicToCartesianCoord = function (lon, lat, r) {
        if (r === void 0) { r = Kernel_1.default.EARTH_RADIUS; }
        if (!(lon >= -(180 + 0.001) && lon <= (180 + 0.001))) {
            throw "invalid lon";
        }
        if (!(lat >= -(90 + 0.001) && lat <= (90 + 0.001))) {
            throw "invalid lat";
        }
        var radianLon = this.degreeToRadian(lon);
        var radianLat = this.degreeToRadian(lat);
        var sin1 = Math.sin(radianLon);
        var cos1 = Math.cos(radianLon);
        var sin2 = Math.sin(radianLat);
        var cos2 = Math.cos(radianLat);
        var x = r * sin1 * cos2;
        var y = r * sin2;
        var z = r * cos1 * cos2;
        return new Vertice_1.default(x, y, z);
    };
    MathUtils.cartesianCoordToGeographic = function (vertice) {
        var verticeCopy = vertice.clone();
        var x = verticeCopy.x;
        var y = verticeCopy.y;
        var z = verticeCopy.z;
        var sin2 = y / Kernel_1.default.EARTH_RADIUS;
        var radianLat = this.asinSafely(sin2);
        var cos2 = Math.cos(radianLat);
        var sin1 = x / (Kernel_1.default.EARTH_RADIUS * cos2);
        if (sin1 > 1) {
            sin1 = 1;
        }
        if (sin1 < -1) {
            sin1 = -1;
        }
        var cos1 = z / (Kernel_1.default.EARTH_RADIUS * cos2);
        if (cos1 > 1) {
            cos1 = 1;
        }
        if (cos1 < -1) {
            cos1 = -1;
        }
        var radianLog = this.asinSafely(sin1);
        if (sin1 >= 0) {
            if (cos1 >= 0) {
                radianLog = radianLog;
            }
            else {
                radianLog = Math.PI - radianLog;
            }
        }
        else {
            if (cos1 >= 0) {
                radianLog = radianLog;
            }
            else {
                radianLog = -radianLog - Math.PI;
            }
        }
        var degreeLat = this.radianToDegree(radianLat);
        var degreeLog = this.radianToDegree(radianLog);
        return [degreeLog, degreeLat];
    };
    MathUtils.degreeToRadian = function (degree) {
        return degree * ONE_DEGREE_EQUAL_RADIAN;
    };
    MathUtils.radianToDegree = function (radian) {
        return radian * ONE_RADIAN_EQUAL_DEGREE;
    };
    MathUtils.getRealArcDistanceBetweenLonLats = function (lon1, lat1, lon2, lat2) {
        var φ1 = this.degreeToRadian(lat1);
        var φ2 = this.degreeToRadian(lat2);
        var Δφ = φ2 - φ1;
        var Δλ = this.degreeToRadian(lon2 - lon1);
        var a = Math.sin(Δφ / 2);
        var b = Math.sin(Δλ / 2);
        var c = a * a + Math.cos(φ1) * Math.cos(φ2) * b * b;
        var d = 2 * Math.atan2(Math.sqrt(c), Math.sqrt(1 - c));
        var distance = Kernel_1.default.REAL_EARTH_RADIUS * d;
        return distance;
    };
    MathUtils.webMercatorXToRadianLon = function (x) {
        return x / Kernel_1.default.EARTH_RADIUS;
    };
    MathUtils.webMercatorXToDegreeLon = function (x) {
        var radianLog = this.webMercatorXToRadianLon(x);
        return this.radianToDegree(radianLog);
    };
    MathUtils.webMercatorYToRadianLat = function (y) {
        if (!(Utils_1.default.isNumber(y))) {
            throw "invalid y";
        }
        var a = y / Kernel_1.default.EARTH_RADIUS;
        var b = Math.pow(Math.E, a);
        var c = Math.atan(b);
        var radianLat = 2 * c - Math.PI / 2;
        return radianLat;
    };
    MathUtils.webMercatorYToDegreeLat = function (y) {
        var radianLat = this.webMercatorYToRadianLat(y);
        return this.radianToDegree(radianLat);
    };
    MathUtils.webMercatorToRadianGeographic = function (x, y) {
        var radianLog = this.webMercatorXToRadianLon(x);
        var radianLat = this.webMercatorYToRadianLat(y);
        return [radianLog, radianLat];
    };
    MathUtils.webMercatorToDegreeGeographic = function (x, y) {
        var degreeLog = this.webMercatorXToDegreeLon(x);
        var degreeLat = this.webMercatorYToDegreeLat(y);
        return [degreeLog, degreeLat];
    };
    MathUtils.radianLonToWebMercatorX = function (radianLog, real) {
        if (real === void 0) { real = false; }
        if (!(Utils_1.default.isNumber(radianLog) && radianLog <= (Math.PI + 0.001) && radianLog >= -(Math.PI + 0.001))) {
            throw "invalid radianLog";
        }
        if (real) {
            return Kernel_1.default.REAL_EARTH_RADIUS * radianLog;
        }
        else {
            return Kernel_1.default.EARTH_RADIUS * radianLog;
        }
    };
    MathUtils.degreeLonToWebMercatorX = function (degreeLog, real) {
        if (real === void 0) { real = false; }
        if (!(Utils_1.default.isNumber(degreeLog) && degreeLog <= (180 + 0.001) && degreeLog >= -(180 + 0.001))) {
            throw "invalid degreeLog";
        }
        var radianLog = this.degreeToRadian(degreeLog);
        return this.radianLonToWebMercatorX(radianLog, real);
    };
    MathUtils.radianLatToWebMercatorY = function (radianLat, real) {
        if (real === void 0) { real = false; }
        if (!(radianLat <= (Math.PI / 2 + 0.001) && radianLat >= -(Math.PI / 2 + 0.001))) {
            throw "invalid radianLat";
        }
        var a = Math.PI / 4 + radianLat / 2;
        var b = Math.tan(a);
        var c = Math.log(b);
        if (real) {
            return Kernel_1.default.REAL_EARTH_RADIUS * c;
        }
        else {
            return Kernel_1.default.EARTH_RADIUS * c;
        }
    };
    MathUtils.degreeLatToWebMercatorY = function (degreeLat, real) {
        if (real === void 0) { real = false; }
        if (!(degreeLat <= (90 + 0.001) && degreeLat >= -(90 + 0.001))) {
            throw "invalid degreeLat";
        }
        var radianLat = this.degreeToRadian(degreeLat);
        return this.radianLatToWebMercatorY(radianLat, real);
    };
    MathUtils.radianGeographicToWebMercator = function (radianLog, radianLat) {
        var x = this.radianLonToWebMercatorX(radianLog);
        var y = this.radianLatToWebMercatorY(radianLat);
        return [x, y];
    };
    MathUtils.degreeGeographicToWebMercator = function (degreeLog, degreeLat) {
        var x = this.degreeLonToWebMercatorX(degreeLog);
        var y = this.degreeLatToWebMercatorY(degreeLat);
        return [x, y];
    };
    MathUtils.getTileWebMercatorEnvelopeByGrid = function (level, row, column) {
        var k = Kernel_1.default.MAX_PROJECTED_COORD;
        var size = 2 * k / Math.pow(2, level);
        var minX = -k + column * size;
        var maxX = minX + size;
        var maxY = k - row * size;
        var minY = maxY - size;
        var Eproj = {
            "minX": minX,
            "minY": minY,
            "maxX": maxX,
            "maxY": maxY
        };
        return Eproj;
    };
    MathUtils.getTileGeographicEnvelopByGrid = function (level, row, column) {
        var Eproj = this.getTileWebMercatorEnvelopeByGrid(level, row, column);
        var pMin = this.webMercatorToDegreeGeographic(Eproj.minX, Eproj.minY);
        var pMax = this.webMercatorToDegreeGeographic(Eproj.maxX, Eproj.maxY);
        var Egeo = {
            "minLon": pMin[0],
            "minLat": pMin[1],
            "maxLon": pMax[0],
            "maxLat": pMax[1]
        };
        return Egeo;
    };
    MathUtils.getTileCartesianEnvelopByGrid = function (level, row, column) {
        var Egeo = this.getTileGeographicEnvelopByGrid(level, row, column);
        var minLon = Egeo.minLon;
        var minLat = Egeo.minLat;
        var maxLon = Egeo.maxLon;
        var maxLat = Egeo.maxLat;
        var pLeftBottom = this.geographicToCartesianCoord(minLon, minLat);
        var pLeftTop = this.geographicToCartesianCoord(minLon, maxLat);
        var pRightTop = this.geographicToCartesianCoord(maxLon, maxLat);
        var pRightBottom = this.geographicToCartesianCoord(maxLon, minLat);
        var Ecar = {
            "pLeftBottom": pLeftBottom,
            "pLeftTop": pLeftTop,
            "pRightTop": pRightTop,
            "pRightBottom": pRightBottom,
            "minLon": minLon,
            "minLat": minLat,
            "maxLon": maxLon,
            "maxLat": maxLat
        };
        return Ecar;
    };
    MathUtils.getGeographicTileCenter = function (level, row, column) {
        var Egeo = this.getTileGeographicEnvelopByGrid(level, row, column);
        var minLon = Egeo.minLon;
        var minLat = Egeo.minLat;
        var maxLon = Egeo.maxLon;
        var maxLat = Egeo.maxLat;
        var centerLon = (minLon + maxLon) / 2;
        var centerLat = (minLat + maxLat) / 2;
        var lonlatTileCenter = [centerLon, centerLat];
        return lonlatTileCenter;
    };
    MathUtils.getCartesianTileCenter = function (level, row, column) {
        var lonLat = this.getGeographicTileCenter(level, row, column);
        var vertice = this.geographicToCartesianCoord(lonLat[0], lonLat[1]);
        return vertice;
    };
    MathUtils.quad = function (p0, p1, p2, count) {
        var points = [];
        for (var i = 0; i < count; i++) {
            if (i === 0) {
                points.push(p0);
            }
            else if (i === count - 1) {
                points.push(p2);
            }
            else {
                var t = i / count;
                var a = (1 - t) * (1 - t);
                var b = 2 * t * (1 - t);
                var c = t * t;
                var x = a * p0[0] + b * p1[0] + c * p2[0];
                var y = a * p0[1] + b * p1[1] + c * p2[1];
                points.push([x, y]);
            }
        }
        return points;
    };
    MathUtils.calculateNormals = function (vs, ind) {
        var x = 0;
        var y = 1;
        var z = 2;
        var ns = [];
        for (var i = 0; i < vs.length; i = i + 3) {
            ns[i + x] = 0.0;
            ns[i + y] = 0.0;
            ns[i + z] = 0.0;
        }
        for (var i = 0; i < ind.length; i = i + 3) {
            var v1 = [];
            var v2 = [];
            var normal = [];
            v1[x] = vs[3 * ind[i + 2] + x] - vs[3 * ind[i + 1] + x];
            v1[y] = vs[3 * ind[i + 2] + y] - vs[3 * ind[i + 1] + y];
            v1[z] = vs[3 * ind[i + 2] + z] - vs[3 * ind[i + 1] + z];
            v2[x] = vs[3 * ind[i] + x] - vs[3 * ind[i + 1] + x];
            v2[y] = vs[3 * ind[i] + y] - vs[3 * ind[i + 1] + y];
            v2[z] = vs[3 * ind[i] + z] - vs[3 * ind[i + 1] + z];
            normal[x] = v1[y] * v2[z] - v1[z] * v2[y];
            normal[y] = v1[z] * v2[x] - v1[x] * v2[z];
            normal[z] = v1[x] * v2[y] - v1[y] * v2[x];
            for (var j = 0; j < 3; j++) {
                ns[3 * ind[i + j] + x] = ns[3 * ind[i + j] + x] + normal[x];
                ns[3 * ind[i + j] + y] = ns[3 * ind[i + j] + y] + normal[y];
                ns[3 * ind[i + j] + z] = ns[3 * ind[i + j] + z] + normal[z];
            }
        }
        for (var i = 0; i < vs.length; i = i + 3) {
            var nn = [];
            nn[x] = ns[i + x];
            nn[y] = ns[i + y];
            nn[z] = ns[i + z];
            var len = Math.sqrt((nn[x] * nn[x]) + (nn[y] * nn[y]) + (nn[z] * nn[z]));
            if (len == 0)
                len = 1.0;
            nn[x] = nn[x] / len;
            nn[y] = nn[y] / len;
            nn[z] = nn[z] / len;
            ns[i + x] = nn[x];
            ns[i + y] = nn[y];
            ns[i + z] = nn[z];
        }
        return ns;
    };
    MathUtils.intersectTriangle = function (orig, dir, v0, v1, v2) {
        var t, u, v;
        var E1 = Vector_1.default.verticeMinusVertice(v1, v0);
        var E2 = Vector_1.default.verticeMinusVertice(v2, v0);
        var P = dir.cross(E2);
        var det = E1.dot(P);
        var T = null;
        if (det > 0) {
            T = Vector_1.default.verticeMinusVertice(orig, v0);
        }
        else {
            T = Vector_1.default.verticeMinusVertice(v0, orig);
            det = -det;
        }
        if (det < 0.0001) {
            return false;
        }
        u = T.dot(P);
        if (u < 0 || u > det) {
            return false;
        }
        var Q = T.cross(E1);
        v = dir.dot(Q);
        if (v < 0 || (u + v) > det) {
            return false;
        }
        return true;
    };
    MathUtils.convertWorldVerticeToLocalVertice = function (worldVertice, localMatrix, inverseLocalMatrix) {
        if (!inverseLocalMatrix) {
            inverseLocalMatrix = localMatrix.getInverseMatrix();
        }
        var inputColumn = worldVertice.getArray();
        inputColumn.push(1);
        var column = inverseLocalMatrix.multiplyColumn(inputColumn);
        var localVertice = new Vertice_1.default(column[0], column[1], column[2]);
        return localVertice;
    };
    MathUtils.convertWorldVectorToLocalVector = function (worldVector, localMatrix, inverseLocalMatrix) {
        if (!inverseLocalMatrix) {
            inverseLocalMatrix = localMatrix.getInverseMatrix();
        }
        var worldVertice1 = new Vertice_1.default(0, 0, 0);
        var worldVertice2 = worldVector.getVertice();
        var localVertice1 = this.convertWorldVerticeToLocalVertice(worldVertice1, localMatrix, inverseLocalMatrix);
        var localVertice2 = this.convertWorldVerticeToLocalVertice(worldVertice2, localMatrix, inverseLocalMatrix);
        var localVector = Vector_1.default.verticeMinusVertice(localVertice2, localVertice1);
        localVector.normalize();
        return localVector;
    };
    MathUtils.convertWorldLineToLocalLine = function (worldLine, localMatrix, inverseLocalMatrix) {
        if (!inverseLocalMatrix) {
            inverseLocalMatrix = localMatrix.getInverseMatrix();
        }
        var localVertice = this.convertWorldVerticeToLocalVertice(worldLine.vertice, localMatrix, inverseLocalMatrix);
        var localVector = this.convertWorldVectorToLocalVector(worldLine.vector, localMatrix, inverseLocalMatrix);
        var localLine = new Line_1.default(localVertice, localVector);
        return localLine;
    };
    return MathUtils;
}());
exports.default = MathUtils;
;


/***/ }),
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var topic = {};
var Utils = (function () {
    function Utils() {
    }
    Utils.isNumber = function (v) {
        return typeof v === "number";
    };
    Utils.isInteger = function (v) {
        var isInt = false;
        var isNum = this.isNumber(v);
        if (isNum) {
            var numFloat = parseFloat(v);
            var numInt = parseInt(v);
            if (numFloat === numInt) {
                isInt = true;
            }
            else {
                isInt = false;
            }
        }
        else {
            isInt = false;
        }
        return isInt;
    };
    Utils.isPositive = function (v) {
        return v > 0;
    };
    Utils.isNegative = function (v) {
        return v < 0;
    };
    Utils.isNonNegative = function (v) {
        return v >= 0;
    };
    Utils.isNonPositive = function (v) {
        return v <= 0;
    };
    Utils.isPositiveInteger = function (v) {
        return this.isPositive(v) && this.isInteger(v);
    };
    Utils.isNonNegativeInteger = function (v) {
        return this.isNonNegative(v) && this.isInteger(v);
    };
    Utils.isArray = function (v) {
        return Object.prototype.toString.call(v) === '[object Array]';
    };
    Utils.isFunction = function (v) {
        return typeof v === 'function';
    };
    Utils.forEach = function (arr, func) {
        return this.isFunction(arr.forEach) ? arr.forEach(func) : Array.prototype.forEach.call(arr, func);
    };
    Utils.filter = function (arr, func) {
        return this.isFunction(arr.filter) ? arr.filter(func) : Array.prototype.filter.call(arr, func);
    };
    Utils.map = function (arr, func) {
        return this.isFunction(arr.map) ? arr.map(func) : Array.prototype.map.call(arr, func);
    };
    Utils.some = function (arr, func) {
        return this.isFunction(arr.some) ? arr.some(func) : Array.prototype.some.call(arr, func);
    };
    Utils.every = function (arr, func) {
        return this.isFunction(arr.every) ? arr.every(func) : Array.prototype.every.call(arr, func);
    };
    Utils.filterRepeatArray = function (arr) {
        var cloneArray = arr.map(function (item) {
            return item;
        });
        var simplifyArray = [];
        while (cloneArray.length > 0) {
            var e = cloneArray[0];
            var exist = simplifyArray.some(function (item) {
                return e.equals(item);
            });
            if (!exist) {
                simplifyArray.push(e);
            }
            cloneArray.splice(0, 1);
        }
        return simplifyArray;
    };
    Utils.isMobile = function () {
        return !!window.navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone|IEMobile|Opera Mini/i);
    };
    Utils.isWindows = function () {
        var platform = window.navigator.platform;
        return platform.toLowerCase().indexOf('win') === 0;
    };
    Utils.wrapUrlWithProxy = function (url) {
        if (Kernel_1.default.proxy) {
            return Kernel_1.default.proxy + "?" + url;
        }
        return url;
    };
    Utils.subscribe = function (topicName, callback) {
        if (!topic[topicName]) {
            topic[topicName] = [];
        }
        topic[topicName].push(callback);
    };
    Utils.publish = function (topicName, data) {
        var callbacks = topic[topicName];
        if (callbacks && callbacks.length > 0) {
            callbacks.forEach(function (callback) {
                callback(data);
            });
        }
    };
    return Utils;
}());
exports.default = Utils;
;


/***/ }),
/* 10 */,
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vertice = (function () {
    function Vertice(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vertice.prototype.getArray = function () {
        return [this.x, this.y, this.z];
    };
    Vertice.prototype.clone = function () {
        return new Vertice(this.x, this.y, this.z);
    };
    Vertice.prototype.getOpposite = function () {
        return new Vertice(-this.x, -this.y, -this.z);
    };
    return Vertice;
}());
exports.default = Vertice;
;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Vertice_1 = __webpack_require__(11);
var Vector = (function () {
    function Vector(x, y, z) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (z === void 0) { z = 0; }
        this.x = x;
        this.y = y;
        this.z = z;
    }
    Vector.fromVertice = function (vertice) {
        return new Vector(vertice.x, vertice.y, vertice.z);
    };
    Vector.verticeMinusVertice = function (endVertice, startVertice) {
        return new Vector(endVertice.x - startVertice.x, endVertice.y - startVertice.y, endVertice.z - startVertice.z);
    };
    Vector.verticePlusVector = function (vertice, vector) {
        return new Vertice_1.default(vertice.x + vector.x, vertice.y + vector.y, vertice.z + vector.z);
    };
    Vector.getRadianOfTwoVectors = function (vector1, vector2) {
        if (vector1.isZeroLength() || vector2.isZeroLength()) {
            return 0;
        }
        var v1 = vector1.clone().normalize();
        var v2 = vector2.clone().normalize();
        var dotValue = v1.dot(v2);
        if (dotValue < -1) {
            dotValue = -1;
        }
        if (dotValue > 1) {
            dotValue = 1;
        }
        var radian = Math.acos(dotValue);
        return radian;
    };
    Vector.prototype.getVertice = function () {
        return new Vertice_1.default(this.x, this.y, this.z);
    };
    Vector.prototype.getArray = function () {
        return [this.x, this.y, this.z];
    };
    Vector.prototype.clone = function () {
        return new Vector(this.x, this.y, this.z);
    };
    Vector.prototype.getOpposite = function () {
        return new Vector(-this.x, -this.y, -this.z);
    };
    Vector.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    };
    Vector.prototype.isZeroLength = function () {
        return this.x === 0 && this.y === 0 && this.z === 0;
    };
    Vector.prototype.normalize = function () {
        var length = this.getLength();
        if (Math.abs(length) >= 0.000001) {
            this.x /= length;
            this.y /= length;
            this.z /= length;
        }
        else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
        }
        return this;
    };
    Vector.prototype.setLength = function (length) {
        this.normalize();
        this.x *= length;
        this.y *= length;
        this.z *= length;
        return this;
    };
    Vector.prototype.getRandomVerticalVector = function () {
        var result;
        var length = this.getLength();
        if (length === 0) {
            result = new Vector(0, 0, 0);
        }
        else {
            var x2, y2, z2;
            if (this.x !== 0) {
                y2 = 1;
                z2 = 0;
                x2 = -this.y / this.x;
            }
            else if (this.y !== 0) {
                z2 = 1;
                x2 = 0;
                y2 = -this.z / this.y;
            }
            else if (this.z !== 0) {
                x2 = 1;
                y2 = 0;
                z2 = -this.x / this.z;
            }
            result = new Vector(x2, y2, z2);
            result.normalize();
        }
        return result;
    };
    Vector.prototype.cross = function (other) {
        var x = this.y * other.z - this.z * other.y;
        var y = this.z * other.x - this.x * other.z;
        var z = this.x * other.y - this.y * other.x;
        return new Vector(x, y, z);
    };
    Vector.prototype.dot = function (other) {
        if (!(other instanceof Vector)) {
            throw "invalid other";
        }
        return this.x * other.x + this.y * other.y + this.z * other.z;
    };
    return Vector;
}());
exports.default = Vector;
;


/***/ }),
/* 13 */,
/* 14 */,
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Extent = (function () {
    function Extent(minLon, minLat, maxLon, maxLat) {
        this.minLon = minLon;
        this.minLat = minLat;
        this.maxLon = maxLon;
        this.maxLat = maxLat;
    }
    Extent.prototype.clone = function () {
        return new Extent(this.minLon, this.minLat, this.maxLon, this.maxLat);
    };
    Extent.prototype.getMinLon = function () {
        return this.minLon;
    };
    Extent.prototype.getMinLat = function () {
        return this.minLat;
    };
    Extent.prototype.getMaxLon = function () {
        return this.maxLon;
    };
    Extent.prototype.getMaxLat = function () {
        return this.maxLat;
    };
    Extent.prototype.toJson = function () {
        return [this.minLon, this.minLat, this.maxLon, this.maxLat];
    };
    Extent.merge = function (extents, union) {
        var result = null;
        if (extents.length === 1) {
            result = extents[0].clone();
        }
        else if (extents.length > 1) {
            var minLons = [];
            var minLats = [];
            var maxLons = [];
            var maxLats = [];
            extents.forEach(function (extent) {
                minLons.push(extent.getMinLon());
                minLats.push(extent.getMinLat());
                maxLons.push(extent.getMaxLon());
                maxLats.push(extent.getMaxLat());
            });
            if (union) {
                var minLon = Math.min.apply(Math, minLons);
                var minLat = Math.min.apply(Math, minLats);
                var maxLon = Math.max.apply(Math, maxLons);
                var maxLat = Math.max.apply(Math, maxLats);
                result = new Extent(minLon, minLat, maxLon, maxLat);
            }
            else {
                var minLon = Math.max.apply(Math, minLons);
                var minLat = Math.max.apply(Math, minLats);
                var maxLon = Math.min.apply(Math, maxLons);
                var maxLat = Math.min.apply(Math, maxLats);
                if (minLon < maxLon && minLat < maxLat) {
                    result = new Extent(minLon, minLat, maxLon, maxLat);
                }
            }
        }
        return result;
    };
    Extent.union = function (extents) {
        return this.merge(extents, true);
    };
    Extent.intersect = function (extents) {
        return this.merge(extents, false);
    };
    Extent.fromLonlats = function (lonlats) {
        if (lonlats.length <= 1) {
            return null;
        }
        var lons = [];
        var lats = [];
        lonlats.forEach(function (lonlat) {
            lons.push(lonlat[0]);
            lats.push(lonlat[1]);
        });
        var minLon = Math.min.apply(Math, lons);
        var minLat = Math.min.apply(Math, lats);
        var maxLon = Math.max.apply(Math, lons);
        var maxLat = Math.max.apply(Math, lats);
        var extent = new Extent(minLon, minLat, maxLon, maxLat);
        return extent;
    };
    return Extent;
}());
exports.default = Extent;
;


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var GraphicGroup = (function () {
    function GraphicGroup() {
        this.visible = true;
        this.id = ++Kernel_1.default.idCounter;
        this.children = [];
    }
    GraphicGroup.prototype.add = function (g, first) {
        if (first === void 0) { first = false; }
        if (first) {
            this.children.unshift(g);
        }
        else {
            this.children.push(g);
        }
        g.parent = this;
    };
    GraphicGroup.prototype.remove = function (g) {
        var index = this.findChildIndex(g);
        if (index >= 0) {
            this.children.splice(index, 1);
            return true;
        }
        return false;
    };
    GraphicGroup.prototype.clear = function () {
        var i = 0, length = this.children.length, g = null;
        for (; i < length; i++) {
            g = this.children[i];
            g.destroy();
        }
        this.children = [];
    };
    GraphicGroup.prototype.destroy = function () {
        this.parent = null;
        this.clear();
    };
    GraphicGroup.prototype.findChildIndex = function (child) {
        var count = this.children.length;
        for (var i = 0; i < count; i++) {
            var g = this.children[i];
            if (child === g) {
                return i;
            }
        }
        return -1;
    };
    GraphicGroup.prototype.findChildById = function (graphicId) {
        var i = 0, length = this.children.length, g = null;
        for (; i < length; i++) {
            g = this.children[i];
            if (g.id === graphicId) {
                return {
                    index: i,
                    graphic: g
                };
            }
        }
        return null;
    };
    GraphicGroup.prototype.shouldDraw = function () {
        return this.visible && this.children.length > 0;
    };
    GraphicGroup.prototype.moveChildToLastPosition = function (child) {
        var index = this.findChildIndex(child);
        this.children.splice(index, 1);
        this.children.push(child);
    };
    GraphicGroup.prototype.draw = function (camera) {
        if (this.shouldDraw()) {
            this.onBeforeDraw();
            this.onDraw(camera);
            this.onAfterDraw();
        }
    };
    GraphicGroup.prototype.onBeforeDraw = function () {
    };
    GraphicGroup.prototype.onDraw = function (camera) {
        this.children.forEach(function (g) {
            if (g.shouldDraw(camera)) {
                g.draw(camera);
            }
        });
    };
    GraphicGroup.prototype.onAfterDraw = function () {
    };
    return GraphicGroup;
}());
;
var PickableGraphicGroup = (function (_super) {
    __extends(PickableGraphicGroup, _super);
    function PickableGraphicGroup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pickListener = null;
        return _this;
    }
    PickableGraphicGroup.prototype.pickByLocalLine = function (localLine, emitListener) {
        if (emitListener === void 0) { emitListener = false; }
        var count = this.children.length;
        for (var i = count - 1; i >= 0; i--) {
            var child = this.children[i];
            if (child.ifIntersectLocalLine(localLine)) {
                if (emitListener) {
                    this.onPick(child);
                }
                return child;
            }
        }
        return null;
    };
    PickableGraphicGroup.prototype.pickByWorldLine = function (worldLine, emitListener) {
        if (emitListener === void 0) { emitListener = false; }
        var count = this.children.length;
        for (var i = count - 1; i >= 0; i--) {
            var child = this.children[i];
            if (child.ifIntersectWorldLine(worldLine)) {
                if (emitListener) {
                    this.onPick(child);
                }
                return child;
            }
        }
        return null;
    };
    PickableGraphicGroup.prototype.onPick = function (target) {
        this.moveChildToLastPosition(target);
        if (this.pickListener) {
            this.pickListener(target);
        }
    };
    PickableGraphicGroup.prototype.hasPickListener = function () {
        return !!this.pickListener;
    };
    PickableGraphicGroup.prototype.setPickListener = function (listener) {
        this.pickListener = listener;
    };
    return PickableGraphicGroup;
}(GraphicGroup));
exports.PickableGraphicGroup = PickableGraphicGroup;
exports.default = GraphicGroup;


/***/ }),
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Material_1 = __webpack_require__(54);
var Image_1 = __webpack_require__(34);
var MeshTextureMaterial = (function (_super) {
    __extends(MeshTextureMaterial, _super);
    function MeshTextureMaterial(imageOrUrl, flipY) {
        if (imageOrUrl === void 0) { imageOrUrl = null; }
        if (flipY === void 0) { flipY = false; }
        var _this = _super.call(this) || this;
        _this.flipY = flipY;
        _this.ready = false;
        _this.deleted = false;
        _this.texture = Kernel_1.default.gl.createTexture();
        if (imageOrUrl) {
            _this.setImageOrUrl(imageOrUrl);
        }
        return _this;
    }
    MeshTextureMaterial.prototype.isReady = function () {
        return this.ready && !this.deleted;
    };
    MeshTextureMaterial.prototype.setImageOrUrl = function (imageOrUrl) {
        if (!imageOrUrl) {
            return;
        }
        if (imageOrUrl instanceof Image && imageOrUrl.width > 0 && imageOrUrl.height > 0) {
            this.setImage(imageOrUrl);
        }
        else if (typeof imageOrUrl === "string") {
            this.setImageUrl(imageOrUrl);
        }
    };
    MeshTextureMaterial.prototype.setImage = function (image) {
        if (image.width > 0 && image.height > 0) {
            this.ready = false;
            this.image = image;
            this.onLoad();
        }
    };
    MeshTextureMaterial.prototype.setImageUrl = function (url) {
        var tileImage = Image_1.default.get(url);
        if (tileImage) {
            this.setImage(tileImage);
        }
        else {
            this.ready = false;
            this.image = new Image();
            this.image.crossOrigin = 'anonymous';
            this.image.onload = this.onLoad.bind(this);
            this.image.src = url;
        }
    };
    MeshTextureMaterial.prototype.onLoad = function () {
        if (this.deleted) {
            return;
        }
        var gl = Kernel_1.default.gl;
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        if (this.flipY) {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, +true);
        }
        else {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, +false);
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        this.ready = true;
    };
    MeshTextureMaterial.prototype.destroy = function () {
        var gl = Kernel_1.default.gl;
        if (this.texture) {
            gl.deleteTexture(this.texture);
        }
        if (this.image && !this.ready) {
            this.image.src = "";
        }
        this.ready = false;
        this.texture = null;
        this.deleted = true;
    };
    return MeshTextureMaterial;
}(Material_1.default));
exports.default = MeshTextureMaterial;
;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Triangle_1 = __webpack_require__(39);
var Object3D_1 = __webpack_require__(52);
var VertexBufferObject_1 = __webpack_require__(55);
var Vertice_1 = __webpack_require__(11);
var Utils_1 = __webpack_require__(7);
var Mesh = (function (_super) {
    __extends(Mesh, _super);
    function Mesh() {
        var _this = _super.call(this) || this;
        _this.vertices = null;
        _this.triangles = null;
        _this.vbo = null;
        _this.ibo = null;
        _this.nbo = null;
        _this.uvbo = null;
        _this.cbo = null;
        _this.box = null;
        _this.vertices = [];
        _this.triangles = [];
        return _this;
    }
    Mesh.buildPlane = function (vLeftTop, vLeftBottom, vRightTop, vRightBottom) {
        var tri0 = new Triangle_1.default(vLeftTop, vLeftBottom, vRightTop);
        var tri1 = new Triangle_1.default(vRightTop, vLeftBottom, vRightBottom);
        return [tri0, tri1];
    };
    Mesh.buildMesh = function (vLeftTop, vLeftBottom, vRightTop, vRightBottom) {
        var mesh = new Mesh();
        mesh.vertices = [vLeftTop, vLeftBottom, vRightTop, vRightBottom];
        mesh.triangles = this.buildPlane(vLeftTop, vLeftBottom, vRightTop, vRightBottom);
        return mesh;
    };
    Mesh.prototype.updateBox = function (force) {
        if (force === void 0) { force = false; }
        var triCount = this.triangles.length;
        var verCount = this.vertices.length;
        if (triCount === 0 || verCount <= 3) {
            this.box = null;
            return;
        }
        if (!this.box || force) {
            var maxX = -Infinity;
            var maxY = -Infinity;
            var maxZ = -Infinity;
            var minX = Infinity;
            var minY = Infinity;
            var minZ = Infinity;
            for (var i = 0; i < verCount; i++) {
                var vertice = this.vertices[i];
                var _a = vertice.p, x = _a[0], y = _a[1], z = _a[2];
                if (x > maxX) {
                    maxX = x;
                }
                if (y > maxY) {
                    maxY = y;
                }
                if (z > maxZ) {
                    maxZ = z;
                }
                if (x < minX) {
                    minX = x;
                }
                if (y < minY) {
                    minY = y;
                }
                if (z < minZ) {
                    minZ = z;
                }
            }
            var deltaX = maxX - minX;
            var deltaY = maxY - minY;
            var deltaZ = maxZ - minZ;
            var radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY + deltaZ * deltaZ);
            var center = new Vertice_1.default((maxX + minX) / 2, (maxY + minY) / 2, (maxZ + minZ) / 2);
            this.box = {
                center: center,
                radius: radius
            };
        }
    };
    Mesh.prototype.ifIntersectWorldLine = function (worldLine) {
        var localLine = Utils_1.default.convertWorldLineToLocalLine(worldLine, this.matrix);
        return this.ifIntersectLocalLine(localLine);
    };
    Mesh.prototype.ifIntersectLocalLine = function (localLine) {
        this.updateBox(false);
        if (!this.box) {
            return false;
        }
        var distance = Utils_1.default.getLengthFromVerticeToLine(this.box.center, localLine);
        if (distance > this.box.radius) {
            return false;
        }
        var count = this.triangles.length;
        for (var i = 0; i < count; i++) {
            var tri = this.triangles[i];
            var v1 = new Vertice_1.default(tri.v1.p[0], tri.v1.p[1], tri.v1.p[2]);
            var v2 = new Vertice_1.default(tri.v2.p[0], tri.v2.p[1], tri.v2.p[2]);
            var v3 = new Vertice_1.default(tri.v3.p[0], tri.v3.p[1], tri.v3.p[2]);
            var isIntersected = Utils_1.default.intersectTriangle(localLine.vertice, localLine.vector, v1, v2, v3);
            if (isIntersected) {
                return true;
            }
        }
        return false;
    };
    Mesh.prototype.buildTriangles = function () {
        this.vertices = [];
        this.triangles = [];
    };
    Mesh.prototype.calculateVBO = function (force) {
        if (force === void 0) { force = false; }
        if (!this.vbo || force) {
            var vboData = [], vertex;
            for (var i = 0, length = this.vertices.length; i < length; i++) {
                vertex = this.vertices[i];
                vboData.push(vertex.p[0]);
                vboData.push(vertex.p[1]);
                vboData.push(vertex.p[2]);
            }
            if (!this.vbo) {
                this.vbo = new VertexBufferObject_1.default(Kernel_1.default.gl.ARRAY_BUFFER);
            }
            this.vbo.bind();
            this.vbo.bufferData(vboData, Kernel_1.default.gl.STATIC_DRAW, true);
        }
        return this.vbo;
    };
    Mesh.prototype.calculateIBO = function (force) {
        if (force === void 0) { force = false; }
        if (!this.ibo || force) {
            var iboData = [], triangle;
            for (var i = 0, length = this.triangles.length; i < length; i++) {
                triangle = this.triangles[i];
                iboData.push(triangle.v1.i);
                iboData.push(triangle.v2.i);
                iboData.push(triangle.v3.i);
            }
            if (!this.ibo) {
                this.ibo = new VertexBufferObject_1.default(Kernel_1.default.gl.ELEMENT_ARRAY_BUFFER);
            }
            this.ibo.bind();
            this.ibo.bufferData(iboData, Kernel_1.default.gl.STATIC_DRAW, true);
        }
        return this.ibo;
    };
    Mesh.prototype.calculateNBO = function (force) {
        if (force === void 0) { force = false; }
        if (!this.nbo || force) {
            var nboData = [], vertex;
            for (var i = 0, length = this.vertices.length; i < length; i++) {
                vertex = this.vertices[i];
                nboData.push(vertex.n[0]);
                nboData.push(vertex.n[1]);
                nboData.push(vertex.n[2]);
            }
            if (!this.nbo) {
                this.nbo = new VertexBufferObject_1.default(Kernel_1.default.gl.ARRAY_BUFFER);
            }
            this.nbo.bind();
            this.nbo.bufferData(nboData, Kernel_1.default.gl.STATIC_DRAW, true);
        }
        return this.nbo;
    };
    Mesh.prototype.calculateUVBO = function (force) {
        if (force === void 0) { force = false; }
        if (!this.uvbo || force) {
            var uvboData = [], vertex;
            for (var i = 0, length = this.vertices.length; i < length; i++) {
                vertex = this.vertices[i];
                uvboData.push(vertex.uv[0]);
                uvboData.push(vertex.uv[1]);
            }
            if (!this.uvbo) {
                this.uvbo = new VertexBufferObject_1.default(Kernel_1.default.gl.ARRAY_BUFFER);
            }
            this.uvbo.bind();
            this.uvbo.bufferData(uvboData, Kernel_1.default.gl.STATIC_DRAW, true);
        }
        return this.uvbo;
    };
    Mesh.prototype.calculateCBO = function (force) {
        if (force === void 0) { force = false; }
        if (!this.cbo || force) {
            var cboData = [], vertex;
            for (var i = 0, length = this.vertices.length; i < length; i++) {
                vertex = this.vertices[i];
                cboData.push(vertex.c[0]);
                cboData.push(vertex.c[1]);
                cboData.push(vertex.c[2]);
            }
            if (!this.cbo) {
                this.cbo = new VertexBufferObject_1.default(Kernel_1.default.gl.ARRAY_BUFFER);
            }
            this.cbo.bind();
            this.cbo.bufferData(cboData, Kernel_1.default.gl.STATIC_DRAW, true);
        }
        return this.cbo;
    };
    Mesh.prototype.destroy = function () {
        if (this.vbo) {
            this.vbo.destroy();
        }
        if (this.ibo) {
            this.ibo.destroy();
        }
        if (this.nbo) {
            this.nbo.destroy();
        }
        if (this.cbo) {
            this.cbo.destroy();
        }
        if (this.uvbo) {
            this.uvbo.destroy();
        }
        this.vbo = null;
        this.ibo = null;
        this.nbo = null;
        this.cbo = null;
        this.uvbo = null;
        this.vertices = [];
        this.triangles = [];
    };
    return Mesh;
}(Object3D_1.default));
exports.default = Mesh;
;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var MeshVertice = (function () {
    function MeshVertice(args) {
        this.i = args.i;
        this.p = args.p;
        this.uv = args.uv;
        this.n = args.n;
        this.c = args.c;
    }
    MeshVertice.prototype.clone = function () {
        var args = {};
        args.i = this.i;
        args.p = this.p.slice();
        args.uv = this.uv.slice();
        args.n = this.n.slice();
        args.c = this.c.slice();
        return new MeshVertice(args);
    };
    return MeshVertice;
}());
exports.default = MeshVertice;
;


/***/ }),
/* 25 */,
/* 26 */,
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(7);
var Service = (function () {
    function Service() {
    }
    Service.jsonp = function (url, callback, charset, callbackParameterName, callbackPrefix) {
        if (charset === void 0) { charset = ""; }
        if (callbackParameterName === void 0) { callbackParameterName = "cb"; }
        if (callbackPrefix === void 0) { callbackPrefix = "QQ"; }
        var callbackName = callbackPrefix + "_webglobe_callback_" + Math.random().toString().substring(2);
        if (url.indexOf('?') < 0) {
            url += '?';
        }
        else {
            url += '&';
        }
        url += callbackParameterName + "=window." + callbackName;
        var scriptElement = document.createElement("script");
        scriptElement.setAttribute("src", url);
        if (charset) {
            scriptElement.setAttribute("charset", charset);
        }
        scriptElement.setAttribute("async", "true");
        scriptElement.setAttribute("defer", "true");
        document.body.appendChild(scriptElement);
        var canceled = false;
        function clear() {
            delete window[callbackName];
            scriptElement.src = "";
            if (scriptElement.parentNode) {
                scriptElement.parentNode.removeChild(scriptElement);
            }
            scriptElement = null;
        }
        window[callbackName] = function (response) {
            if (!canceled) {
                callback(response);
            }
            clear();
        };
        return function () {
            canceled = true;
            clear();
        };
    };
    Service.getCityLocation = function () {
        var _this = this;
        var p = new Promise(function (resolve) {
            if (_this.cityLocation) {
                resolve(_this.cityLocation);
            }
            else {
                var url = "//apis.map.qq.com/jsapi?qt=gc&output=jsonp";
                Service.jsonp(url, function (response) {
                    console.log("\u5B9A\u4F4D\uFF1A", response);
                    var detail = response.detail;
                    if (response.detail) {
                        _this.cityLocation = {
                            lon: parseFloat(detail.pointx),
                            lat: parseFloat(detail.pointy),
                            accuracy: Infinity,
                            city: detail.cname
                        };
                        resolve(_this.cityLocation);
                    }
                    else {
                        resolve(null);
                    }
                });
            }
        });
        return p;
    };
    Service.getCurrentPosition = function (highAccuracy) {
        var _this = this;
        if (highAccuracy === void 0) { highAccuracy = false; }
        var p = new Promise(function (resolve) {
            _this.getCityLocation().then(function (cityLocation) {
                if (highAccuracy) {
                    navigator.geolocation.getCurrentPosition(function (response) {
                        var location = {
                            lon: response.coords.longitude,
                            lat: response.coords.latitude,
                            accuracy: response.coords.accuracy,
                            city: cityLocation.city
                        };
                        _this.location = location;
                        resolve(_this.location);
                    }, function (err) {
                        console.error(err);
                        if (_this.location) {
                            resolve(_this.location);
                        }
                        else {
                            resolve(cityLocation);
                        }
                    }, {
                        enableHighAccuracy: true
                    });
                }
                else {
                    if (_this.location) {
                        resolve(_this.location);
                    }
                    else {
                        resolve(cityLocation);
                    }
                }
            });
        });
        return p;
    };
    Service.createPoiTypes = function () {
        this._createPoiTypes(this.poiClasses, this.poiTypes);
        return this.poiTypes;
    };
    Service._createPoiTypes = function (obj, types) {
        var _this = this;
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                types.push(key);
                var values = obj[key];
                if (values && values.length > 0) {
                    values.forEach(function (value) {
                        if (typeof value === 'string') {
                            types.push(value);
                        }
                        else if (typeof value === 'object') {
                            _this._createPoiTypes(value, types);
                        }
                    });
                }
            }
        }
    };
    Service._getStrictSearchType = function (keyword) {
        var searchType = 'POI';
        for (var i = 0; i < this.poiTypes.length; i++) {
            var poiType = this.poiTypes[i];
            if (poiType.indexOf(keyword) >= 0) {
                searchType = 'Type';
                return searchType;
            }
            var looselyContain = true;
            for (var j = 0; j < keyword.length; j++) {
                var char = keyword.charAt(j);
                if (poiType.indexOf(char) < 0) {
                    looselyContain = false;
                    break;
                }
            }
            if (looselyContain) {
                searchType = 'Type';
                return searchType;
            }
        }
        return searchType;
    };
    Service._getUrlBySearchType = function (url, searchType) {
        if (searchType === 'Type') {
            url += '&qt=rn';
        }
        else if (searchType === 'POI') {
            url += '&qt=poi';
        }
        return url;
    };
    Service.searchByExtent = function (keyword, level, _a, pageCapacity, pageIndex) {
        var minLon = _a.minLon, minLat = _a.minLat, maxLon = _a.maxLon, maxLat = _a.maxLat;
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        var p = new Promise(function (resolve) {
            var url = "//apis.map.qq.com/jsapi?qt=syn&wd=" + keyword + "&pn=" + pageIndex + "&rn=" + pageCapacity + "&output=jsonp&b=" + minLon + "," + minLat + "," + maxLon + "," + maxLat + "&l=" + level + "&c=000000";
            Service.jsonp(url, function (response) {
                resolve(response);
            });
        });
        return p;
    };
    Service.searchByBuffer = function (keyword, lon, lat, radius, searchType, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        if (searchType === 'Auto') {
            searchType = this._getStrictSearchType(keyword);
            return this._rawSearchByBuffer(searchType, keyword, lon, lat, radius, pageCapacity, pageIndex).then(function (response) {
                var poiCount = 0;
                if (response && response.detail && response.detail.pois && response.detail.pois.length > 0) {
                    poiCount = response.detail.pois.length;
                }
                if (poiCount === 0) {
                    if (searchType === 'Type') {
                        return _this._rawSearchByBuffer('POI', keyword, lon, lat, radius, pageCapacity, pageIndex);
                    }
                    else if (searchType === 'POI') {
                        return _this._rawSearchByBuffer('Type', keyword, lon, lat, radius, pageCapacity, pageIndex);
                    }
                }
                return response;
            });
        }
        else {
            return this._rawSearchByBuffer(searchType, keyword, lon, lat, radius, pageCapacity, pageIndex);
        }
    };
    Service._rawSearchByBuffer = function (searchType, keyword, lon, lat, radius, pageCapacity, pageIndex) {
        var _this = this;
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        var p = new Promise(function (resolve) {
            var url = "//apis.map.qq.com/jsapi?wd=" + keyword + "&pn=" + pageIndex + "&rn=" + pageCapacity + "&px=" + lon + "&py=" + lat + "&r=" + radius + "&output=jsonp";
            url = _this._getUrlBySearchType(url, searchType);
            Service.jsonp(url, function (response) {
                if (response) {
                    response.location = [lon, lat];
                }
                resolve(response);
            });
        });
        return p;
    };
    Service.searchByCity = function (keyword, city, searchType, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        if (searchType === 'Auto') {
            searchType = this._getStrictSearchType(keyword);
            return this._rawSearchByCity(searchType, keyword, city, pageCapacity, pageIndex).then(function (response) {
                var poiCount = 0;
                if (response && response.detail && response.detail.pois && response.detail.pois.length > 0) {
                    poiCount = response.detail.pois.length;
                }
                if (poiCount === 0) {
                    if (searchType === 'Type') {
                        return _this._rawSearchByCity('POI', keyword, city, pageCapacity, pageIndex);
                    }
                    else if (searchType === 'POI') {
                        return _this._rawSearchByCity('Type', keyword, city, pageCapacity, pageIndex);
                    }
                }
                return response;
            });
        }
        else {
            return this._rawSearchByCity(searchType, keyword, city, pageCapacity, pageIndex);
        }
    };
    Service._rawSearchByCity = function (searchType, keyword, city, pageCapacity, pageIndex) {
        var _this = this;
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        var p = new Promise(function (resolve) {
            var url = "//apis.map.qq.com/jsapi?wd=" + keyword + "&pn=" + pageIndex + "&rn=" + pageCapacity + "&c=" + city + "&output=jsonp";
            url = _this._getUrlBySearchType(url, searchType);
            Service.jsonp(url, function (response) {
                if (response) {
                    if (_this.location) {
                        response.location = [_this.location.lon, _this.location.lat];
                    }
                    else if (_this.cityLocation) {
                        response.location = [_this.cityLocation.lon, _this.cityLocation.lat];
                    }
                    else {
                        response.location = null;
                    }
                }
                resolve(response);
            });
        });
        return p;
    };
    Service.searchNearby = function (keyword, radius, searchType, highAccuracy, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (highAccuracy === void 0) { highAccuracy = false; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        return this.getCurrentPosition(highAccuracy).then(function (location) {
            return _this.searchByBuffer(keyword, location.lon, location.lat, radius, searchType, pageCapacity, pageIndex);
        });
    };
    Service.searchByCurrentCity = function (keyword, searchType, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        return this.getCityLocation().then(function (cityLocation) {
            return _this.searchByCity(keyword, cityLocation.city, searchType, pageCapacity, pageIndex);
        });
    };
    Service.routeByDriving = function (fromLon, fromLat, toLon, toLat, key, strategy) {
        var _this = this;
        if (strategy === void 0) { strategy = 5; }
        var p = new Promise(function (resolve, reject) {
            var url = "//restapi.amap.com/v3/direction/driving?origin=" + fromLon + "," + fromLat + "&destination=" + toLon + "," + toLat + "&extensions=all&output=json&key=" + key + "&strategy=" + strategy;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (event) {
                var response = _this._handleDrivingResult(event.target.responseText);
                resolve(response);
            };
            xhr.onerror = function (err) {
                reject(err);
            };
            xhr.onabort = function (err) {
                reject(err);
            };
            xhr.send();
        });
        return p;
    };
    Service._handleDrivingResult = function (responseText) {
        var _this = this;
        var response = JSON.parse(responseText);
        if (response.route) {
            response.route.type = 'driving';
            if (response.route.paths && response.route.paths.length > 0) {
                response.route.paths.forEach(function (path) {
                    if (path.steps) {
                        path.steps.forEach(function (step) { return _this._parseStepPolyline(step); });
                    }
                });
            }
        }
        return response;
    };
    Service.routeByBus = function (fromLon, fromLat, toLon, toLat, startCity, endCity, key, strategy) {
        var _this = this;
        if (strategy === void 0) { strategy = 0; }
        var p = new Promise(function (resolve, reject) {
            var url = "//restapi.amap.com/v3/direction/transit/integrated?origin=" + fromLon + "," + fromLat + "&destination=" + toLon + "," + toLat + "&city=" + startCity + "&cityd=" + endCity + "&output=json&key=" + key;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (event) {
                var response = _this._handleBusResult(event.target.responseText);
                resolve(response);
            };
            xhr.onerror = function (err) {
                reject(err);
            };
            xhr.onabort = function (err) {
                reject(err);
            };
            xhr.send();
        });
        return p;
    };
    Service._handleBusResult = function (responseText) {
        var _this = this;
        var response = JSON.parse(responseText);
        if (response.route) {
            response.route.type = 'bus';
            if (response.route.transits && response.route.transits.length > 0) {
                response.route.transits.forEach(function (transit) {
                    var walking_distance = 0;
                    transit.segments.forEach(function (segment) {
                        if (segment.walking && segment.walking.steps && segment.walking.steps.length > 0) {
                            segment.walking.lonlats = [];
                            segment.walking.steps.forEach(function (step) {
                                var _a;
                                _this._parseStepPolyline(step);
                                (_a = segment.walking.lonlats).push.apply(_a, step.lonlats);
                                if (step.distance) {
                                    var stepDistance = parseFloat(step.distance);
                                    if (!isNaN(stepDistance)) {
                                        walking_distance += stepDistance;
                                    }
                                }
                            });
                            segment.walking.firstLonlat = segment.walking.lonlats[0];
                            segment.walking.lastLonlat = segment.walking.lonlats[segment.walking.lonlats.length - 1];
                        }
                        if (segment.bus && segment.bus.buslines && segment.bus.buslines.length > 0) {
                            segment.bus.lonlats = [];
                            segment.bus.buslines.forEach(function (step) {
                                var _a;
                                _this._parseStepPolyline(step);
                                (_a = segment.bus.lonlats).push.apply(_a, step.lonlats);
                                step.busName = step.name;
                                var idx = step.name.indexOf("(");
                                if (idx >= 0) {
                                    step.busName = step.name.slice(0, idx);
                                }
                            });
                            if (segment.bus.lonlats.length > 0) {
                                segment.bus.firstLonlat = segment.bus.lonlats[0];
                                segment.bus.lastLonlat = segment.bus.lonlats[segment.bus.lonlats.length - 1];
                            }
                        }
                        if (segment.railway && segment.railway.departure_stop && segment.railway.arrival_stop) {
                            var location1 = segment.railway.departure_stop.location;
                            var location2 = segment.railway.arrival_stop.location;
                            segment.railway.lonlats = [];
                            if (location1 && location2) {
                                var splits1 = location1.split(" ");
                                var lon1 = parseFloat(splits1[0]);
                                var lat1 = parseFloat(splits1[1]);
                                var splits2 = location2.split(" ");
                                var lon2 = parseFloat(splits2[0]);
                                var lat2 = parseFloat(splits2[1]);
                                if (!isNaN(lon1) && !isNaN(lat1) && !isNaN(lon2) && !isNaN(lat2)) {
                                    segment.railway.lonlats = [[lon1, lat1], [lon2, lat2]];
                                }
                            }
                        }
                    });
                    var originalWalkingDistance = parseFloat(transit.walking_distance);
                    if (isNaN(originalWalkingDistance)) {
                        transit.walking_distance = walking_distance;
                    }
                    else {
                        transit.walking_distance = originalWalkingDistance;
                    }
                });
            }
        }
        return response;
    };
    Service.routeByWalking = function (fromLon, fromLat, toLon, toLat, key) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            var url = "//restapi.amap.com/v3/direction/walking?origin=" + fromLon + "," + fromLat + "&destination=" + toLon + "," + toLat + "&key=" + key;
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = function (event) {
                var response = _this._handleWalkingResult(event.target.responseText);
                resolve(response);
            };
            xhr.onerror = function (err) {
                reject(err);
            };
            xhr.onabort = function (err) {
                reject(err);
            };
            xhr.send();
        });
        return p;
    };
    Service._handleWalkingResult = function (responseText) {
        var _this = this;
        var response = JSON.parse(responseText);
        if (response.route) {
            response.route.type = 'walking';
            if (response.route.paths && response.route.paths.length > 0) {
                response.route.paths.forEach(function (path) {
                    if (path && path.steps && path.steps.length > 0) {
                        path.steps.forEach(function (step) {
                            _this._parseStepPolyline(step);
                        });
                    }
                });
            }
        }
        return response;
    };
    Service._parseStepPolyline = function (step) {
        var strLonLats = step.polyline.split(";");
        var lonlats = strLonLats.map(function (strLonlat) {
            var splits = strLonlat.split(",");
            var lon = parseFloat(splits[0]);
            var lat = parseFloat(splits[1]);
            return [lon, lat];
        });
        step.firstLonlat = lonlats[0];
        step.lastLonlat = lonlats[lonlats.length - 1];
        step.lonlats = lonlats;
    };
    Service.decodeQQPolyline = function (polyline) {
        for (var i = 2; i < polyline.length; i++) {
            polyline[i] = polyline[i - 2] + polyline[i] / 1000000;
        }
        return polyline;
    };
    Service.qqRouteByDriving = function (fromLon, fromLat, toLon, toLat, key, policy) {
        var url = "//apis.map.qq.com/ws/direction/v1/driving/?from=" + fromLat + "," + fromLon + "&to=" + toLat + "," + toLon + "&output=jsonp&key=" + key;
        if (policy) {
            url += "&policy=" + policy;
        }
        var p = new Promise(function (resolve) {
            Service.jsonp(url, function (response) {
                response.result.routes.forEach(function (route) {
                    Service.decodeQQPolyline(route.polyline);
                });
                resolve(response);
            });
        });
        return p;
    };
    Service.qqRoute = function (routeType, fromLon, fromLat, toLon, toLat) {
        var fromX = Utils_1.default.degreeLonToWebMercatorX(fromLon, true);
        var fromY = Utils_1.default.degreeLatToWebMercatorY(fromLat, true);
        var toX = Utils_1.default.degreeLonToWebMercatorX(toLon, true);
        var toY = Utils_1.default.degreeLatToWebMercatorY(toLat, true);
        var url = "//apis.map.qq.com/jsapi?qt=" + routeType + "&start=1$$$$" + fromX + ", " + fromY + "$$&dest=1$$$$" + toX + ", " + toY + "$$&cond=3&mt=2&s=2&fm=0&output=jsonp&pf=jsapi&ref=jsapi";
        var p = new Promise(function (resolve) {
            Service.jsonp(url, function (response) {
                console.log(response);
                resolve(response);
            }, "GBK");
        });
        return p;
    };
    Service.cityLocation = null;
    Service.location = null;
    Service.poiClasses = {
        '美食': [
            '西餐', '烧烤', '火锅', '海鲜', '素食', '清真', '自助餐', '面包甜点', '冷饮店', '小吃快餐', {
                '中餐厅': ['鲁菜', '粤菜', '湘菜', '川菜', '浙江菜', '安徽菜', '东北菜', '北京菜'],
                '日韩菜': ['日本料理', '韩国料理'],
                '东南亚菜': ['泰国菜']
            }, '美食畅饮', '甜点饮品'
        ],
        '购物': ['综合商场', '便利店', '超市', '数码家电', '花鸟鱼虫', '家具家居建材', '农贸市场', '小商品市场', '旧货市场', '体育户外', '服饰鞋包', '图书音像', '眼镜店', '母婴儿童', '珠宝饰品', '化妆品', '礼品', '摄影器材', '拍卖典当行', '古玩字画', '自行车专卖', '烟酒专卖', '文化用品'],
        '生活服务': ['旅行社', '报刊亭', '自来水营业厅', '电力营业厅', '摄影冲印', '洗衣店', '招聘求职', '彩票', '中介机构', '宠物服务', '废品收购站', '福利院养老院', '美容美发', {
                '票务代售': ['飞机票代售', '火车票代售', '汽车票代售', '公交及IC卡'],
                '邮局速递': ['邮局', '速递'],
                '通讯服务': ['中国电信营业厅', '中国网通营业厅', '中国移动营业厅', '中国联通营业厅', '中国铁通营业厅'],
                '家政': ['月嫂保姆', '保洁钟点工', '开锁', '送水', '家电维修', '搬家']
            }],
        '娱乐休闲': ['洗浴推拿足疗', 'KTV', '酒吧', '咖啡厅', '夜总会', '电影院', '剧场音乐厅', '度假疗养', '网吧', {
                '户外活动': ['游乐场', '垂钓园', '采摘园'],
                '游戏棋牌': ['游戏厅', '棋牌室']
            }],
        '汽车': ['停车场', '汽车销售', '汽车维修', '汽车养护', '洗车场', {
                '加油站': ['中石化', '中石油', '其它加油加气站'],
                '摩托车': ['摩托车服务相关', '销售', '维修', '其它摩托车']
            }],
        '医疗保健': ['综合医院', '诊所', '急救中心', '药房药店'],
        '酒店宾馆': ['酒店宾馆', '星级酒店', '经济型酒店', '旅馆招待所', '青年旅社', '快捷酒店'],
        '旅游景点': [],
        '文化场馆': ['博物馆', '展览馆', '科技馆', '图书馆', '美术馆', '会展中心'],
        '教育学校': ['大学', '中学', '小学', '幼儿园', '培训', '职业技术学校', '成人教育'],
        '银行金融': ['银行', '自动提款机', '保险公司', '证券公司', 'ATM'],
        '基础设施': ['其它基础设施', {
                '交通设施': ['公交车站', '地铁站', '火车站', '长途汽车站', '公交线路', '地铁线路'],
                '公共设施': ['公共厕所', '公用电话', '紧急避难场所'],
                '道路附属': ['收费站', '服务区']
            }],
        '房产小区': ['商务楼宇', {
                '住宅区': ['住宅小区', '别墅', '宿舍', '社区中心']
            }]
    };
    Service.poiTypes = [];
    return Service;
}());
;
Service.createPoiTypes();
exports.default = Service;


/***/ }),
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(7);
var TileGridPosition;
(function (TileGridPosition) {
    TileGridPosition[TileGridPosition["LEFT_TOP"] = 0] = "LEFT_TOP";
    TileGridPosition[TileGridPosition["RIGHT_TOP"] = 1] = "RIGHT_TOP";
    TileGridPosition[TileGridPosition["LEFT_BOTTOM"] = 2] = "LEFT_BOTTOM";
    TileGridPosition[TileGridPosition["RIGHT_BOTTOM"] = 3] = "RIGHT_BOTTOM";
    TileGridPosition[TileGridPosition["LEFT"] = 4] = "LEFT";
    TileGridPosition[TileGridPosition["RIGHT"] = 5] = "RIGHT";
    TileGridPosition[TileGridPosition["TOP"] = 6] = "TOP";
    TileGridPosition[TileGridPosition["BOTTOM"] = 7] = "BOTTOM";
})(TileGridPosition = exports.TileGridPosition || (exports.TileGridPosition = {}));
var maxLatitudeOfWebMercator = Utils_1.default.webMercatorYToDegreeLat(Kernel_1.default.MAX_PROJECTED_COORD);
var TileGrid = (function () {
    function TileGrid(level, row, column) {
        this.level = level;
        this.row = row;
        this.column = column;
        this.Egeo = null;
    }
    TileGrid.prototype.equals = function (other) {
        return other && this.level === other.level && this.row === other.row && this.column === other.column;
    };
    TileGrid.prototype.getEgeo = function () {
        if (!this.Egeo) {
            this.Egeo = Utils_1.default.getTileGeographicEnvelopByGrid(this.level, this.row, this.column);
        }
        return this.Egeo;
    };
    TileGrid.prototype.getLeftTopTag = function () {
        return this.level + "_" + this.row + "_" + this.column;
    };
    TileGrid.prototype.getRightTopTag = function () {
        return this.level + "_" + this.row + "_" + (this.column + 1);
    };
    TileGrid.prototype.getLeftBottomTag = function () {
        return this.level + "_" + (this.row + 1) + "_" + this.column;
    };
    TileGrid.prototype.getRightBottomTag = function () {
        return this.level + "_" + (this.row + 1) + "_" + (this.column + 1);
    };
    TileGrid.prototype.getLeft = function () {
        return TileGrid.getTileGridByBrother(this.level, this.row, this.column, TileGridPosition.LEFT);
    };
    TileGrid.prototype.getRight = function () {
        return TileGrid.getTileGridByBrother(this.level, this.row, this.column, TileGridPosition.RIGHT);
    };
    TileGrid.prototype.getTop = function () {
        return TileGrid.getTileGridByBrother(this.level, this.row, this.column, TileGridPosition.TOP);
    };
    TileGrid.prototype.getBottom = function () {
        return TileGrid.getTileGridByBrother(this.level, this.row, this.column, TileGridPosition.BOTTOM);
    };
    TileGrid.prototype.getParent = function () {
        return TileGrid.getTileGridAncestor(this.level - 1, this.level, this.row, this.column);
    };
    TileGrid.prototype.getAncestor = function (ancestorLevel) {
        return TileGrid.getTileGridAncestor(ancestorLevel, this.level, this.row, this.column);
    };
    TileGrid.getTileGridByParent = function (parentLevel, parentRow, parentColumn, position) {
        var level = parentLevel + 1;
        var row = -1;
        var column = -1;
        if (position === TileGridPosition.LEFT_TOP) {
            row = 2 * parentRow;
            column = 2 * parentColumn;
        }
        else if (position === TileGridPosition.RIGHT_TOP) {
            row = 2 * parentRow;
            column = 2 * parentColumn + 1;
        }
        else if (position === TileGridPosition.LEFT_BOTTOM) {
            row = 2 * parentRow + 1;
            column = 2 * parentColumn;
        }
        else if (position === TileGridPosition.RIGHT_BOTTOM) {
            row = 2 * parentRow + 1;
            column = 2 * parentColumn + 1;
        }
        else {
            throw "invalid position";
        }
        return new TileGrid(level, row, column);
    };
    TileGrid.getTilePositionOfParent = function (level, row, column, parent) {
        var position = null;
        parent = parent || this.getTileGridAncestor(level - 1, level, row, column);
        var ltTileGrid = this.getTileGridByParent(parent.level, parent.row, parent.column, TileGridPosition.LEFT_TOP);
        if (ltTileGrid.row === row) {
            if (ltTileGrid.column === column) {
                position = TileGridPosition.LEFT_TOP;
            }
            else if (ltTileGrid.column + 1 === column) {
                position = TileGridPosition.RIGHT_TOP;
            }
        }
        else if (ltTileGrid.row + 1 === row) {
            if (ltTileGrid.column === column) {
                position = TileGridPosition.LEFT_BOTTOM;
            }
            else if (ltTileGrid.column + 1 === column) {
                position = TileGridPosition.RIGHT_BOTTOM;
            }
        }
        return position;
    };
    TileGrid.getTileGridByBrother = function (brotherLevel, brotherRow, brotherColumn, position, options) {
        options = options || {};
        var result = new TileGrid(brotherLevel, brotherRow, brotherColumn);
        if (position === TileGridPosition.LEFT) {
            if (brotherColumn === 0) {
                var maxSize = options.maxSize || Math.pow(2, brotherLevel);
                result.column = maxSize - 1;
            }
            else {
                result.column = brotherColumn - 1;
            }
        }
        else if (position === TileGridPosition.RIGHT) {
            var maxSize = options.maxSize || Math.pow(2, brotherLevel);
            if (brotherColumn === maxSize - 1) {
                result.column = 0;
            }
            else {
                result.column = brotherColumn + 1;
            }
        }
        else if (position === TileGridPosition.TOP) {
            if (brotherRow === 0) {
                var maxSize = options.maxSize || Math.pow(2, brotherLevel);
                result.row = maxSize - 1;
            }
            else {
                result.row = brotherRow - 1;
            }
        }
        else if (position === TileGridPosition.BOTTOM) {
            var maxSize = options.maxSize || Math.pow(2, brotherLevel);
            if (brotherRow === maxSize - 1) {
                result.row = 0;
            }
            else {
                result.row = brotherRow + 1;
            }
        }
        else {
            throw "invalid position";
        }
        return result;
    };
    TileGrid.getTileGridAncestor = function (ancestorLevel, level, row, column) {
        var result = null;
        if (ancestorLevel < level) {
            var deltaLevel = level - ancestorLevel;
            var a = Math.pow(2, deltaLevel);
            var ancestorRow = Math.floor(row / a);
            var ancestorColumn = Math.floor(column / a);
            result = new TileGrid(ancestorLevel, ancestorRow, ancestorColumn);
        }
        else if (ancestorLevel === level) {
            result = new TileGrid(level, row, column);
        }
        return result;
    };
    TileGrid.isValidLatitude = function (lat) {
        return lat >= -maxLatitudeOfWebMercator && lat <= maxLatitudeOfWebMercator;
    };
    TileGrid.getTileGridByGeo = function (lon, lat, level) {
        if (!(lon >= -180 && lon <= 180)) {
            throw "invalid lon: " + lon;
        }
        var coordWebMercator = Utils_1.default.degreeGeographicToWebMercator(lon, lat);
        var x = coordWebMercator[0];
        var y = coordWebMercator[1];
        var horX = x + Kernel_1.default.MAX_PROJECTED_COORD;
        var verY = Kernel_1.default.MAX_PROJECTED_COORD - y;
        var size = Kernel_1.default.MAX_PROJECTED_COORD / Math.pow(2, level - 1);
        var row = Math.floor(verY / size);
        var column = Math.floor(horX / size);
        return new TileGrid(level, row, column);
    };
    return TileGrid;
}());
exports.default = TileGrid;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(9);
var Vertice_1 = __webpack_require__(11);
var Vector_1 = __webpack_require__(12);
var Matrix = (function () {
    function Matrix(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        if (m11 === void 0) { m11 = 1; }
        if (m12 === void 0) { m12 = 0; }
        if (m13 === void 0) { m13 = 0; }
        if (m14 === void 0) { m14 = 0; }
        if (m21 === void 0) { m21 = 0; }
        if (m22 === void 0) { m22 = 1; }
        if (m23 === void 0) { m23 = 0; }
        if (m24 === void 0) { m24 = 0; }
        if (m31 === void 0) { m31 = 0; }
        if (m32 === void 0) { m32 = 0; }
        if (m33 === void 0) { m33 = 1; }
        if (m34 === void 0) { m34 = 0; }
        if (m41 === void 0) { m41 = 0; }
        if (m42 === void 0) { m42 = 0; }
        if (m43 === void 0) { m43 = 0; }
        if (m44 === void 0) { m44 = 1; }
        this.elements = new Float64Array(16);
        this.setElements(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44);
    }
    Matrix.prototype.getFloat32Array = function () {
        return new Float32Array(this.elements);
    };
    Matrix.prototype.equals = function (matrix) {
        if (this === matrix) {
            return true;
        }
        return Utils_1.default.every(this.elements, function (ele, index) {
            return ele === matrix.elements[index];
        });
    };
    Matrix.prototype.toJson = function () {
        var elements = [];
        Utils_1.default.forEach(this.elements, function (ele) {
            elements.push(ele);
        });
        return {
            elements: elements
        };
    };
    Matrix.prototype.fromJson = function (json) {
        var _this = this;
        json.elements.forEach(function (ele, i) {
            _this.elements[i] = ele;
        });
    };
    Matrix.fromJson = function (json) {
        if (!json) {
            return null;
        }
        var mat = new Matrix();
        mat.fromJson(json);
        return mat;
    };
    Matrix.prototype.setElements = function (m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44) {
        var count = arguments.length;
        if (count < 16) {
            throw "invalid arguments:arguments length error";
        }
        var values = this.elements;
        values[0] = m11;
        values[4] = m12;
        values[8] = m13;
        values[12] = m14;
        values[1] = m21;
        values[5] = m22;
        values[9] = m23;
        values[13] = m24;
        values[2] = m31;
        values[6] = m32;
        values[10] = m33;
        values[14] = m34;
        values[3] = m41;
        values[7] = m42;
        values[11] = m43;
        values[15] = m44;
        return this;
    };
    Matrix.prototype.setVectorX = function (vector) {
        this.elements[0] = vector.x;
        this.elements[1] = vector.y;
        this.elements[2] = vector.z;
    };
    Matrix.prototype.getVectorX = function () {
        return new Vector_1.default(this.elements[0], this.elements[1], this.elements[2]);
    };
    Matrix.prototype.setVectorY = function (vector) {
        this.elements[4] = vector.x;
        this.elements[5] = vector.y;
        this.elements[6] = vector.z;
    };
    Matrix.prototype.getVectorY = function () {
        return new Vector_1.default(this.elements[4], this.elements[5], this.elements[6]);
    };
    Matrix.prototype.setVectorZ = function (vector) {
        this.elements[8] = vector.x;
        this.elements[9] = vector.y;
        this.elements[10] = vector.z;
    };
    Matrix.prototype.getVectorZ = function () {
        return new Vector_1.default(this.elements[8], this.elements[9], this.elements[10]);
    };
    Matrix.prototype.setPosition = function (vertice) {
        this.elements[12] = vertice.x;
        this.elements[13] = vertice.y;
        this.elements[14] = vertice.z;
    };
    Matrix.prototype.getPosition = function () {
        return new Vertice_1.default(this.elements[12], this.elements[13], this.elements[14]);
    };
    Matrix.prototype.setLastRowDefault = function () {
        this.elements[3] = 0;
        this.elements[7] = 0;
        this.elements[11] = 0;
        this.elements[15] = 1;
    };
    Matrix.prototype.transpose = function () {
        var result = this.getTransposeMatrix();
        this.setMatrixByOther(result);
    };
    Matrix.prototype.getTransposeMatrix = function () {
        var result = new Matrix();
        result.elements[0] = this.elements[0];
        result.elements[4] = this.elements[1];
        result.elements[8] = this.elements[2];
        result.elements[12] = this.elements[3];
        result.elements[1] = this.elements[4];
        result.elements[5] = this.elements[5];
        result.elements[9] = this.elements[6];
        result.elements[13] = this.elements[7];
        result.elements[2] = this.elements[8];
        result.elements[6] = this.elements[9];
        result.elements[10] = this.elements[10];
        result.elements[14] = this.elements[11];
        result.elements[3] = this.elements[12];
        result.elements[7] = this.elements[13];
        result.elements[11] = this.elements[14];
        result.elements[15] = this.elements[15];
        return result;
    };
    Matrix.prototype.inverse = function () {
        var result = this.getInverseMatrix();
        this.setMatrixByOther(result);
    };
    Matrix.prototype.getInverseMatrix = function () {
        var a = this.elements;
        var result = new Matrix();
        var b = result.elements;
        var c = a[0], d = a[1], e = a[2], g = a[3], f = a[4], h = a[5], i = a[6], j = a[7], k = a[8], l = a[9], n = a[10], o = a[11], m = a[12], p = a[13], r = a[14], s = a[15];
        var A = c * h - d * f;
        var B = c * i - e * f;
        var t = c * j - g * f;
        var u = d * i - e * h;
        var v = d * j - g * h;
        var w = e * j - g * i;
        var x = k * p - l * m;
        var y = k * r - n * m;
        var z = k * s - o * m;
        var C = l * r - n * p;
        var D = l * s - o * p;
        var E = n * s - o * r;
        var q = A * E - B * D + t * C + u * z - v * y + w * x;
        if (!q) {
            console.log("can't get inverse matrix");
            return null;
        }
        q = 1 / q;
        b[0] = (h * E - i * D + j * C) * q;
        b[1] = (-d * E + e * D - g * C) * q;
        b[2] = (p * w - r * v + s * u) * q;
        b[3] = (-l * w + n * v - o * u) * q;
        b[4] = (-f * E + i * z - j * y) * q;
        b[5] = (c * E - e * z + g * y) * q;
        b[6] = (-m * w + r * t - s * B) * q;
        b[7] = (k * w - n * t + o * B) * q;
        b[8] = (f * D - h * z + j * x) * q;
        b[9] = (-c * D + d * z - g * x) * q;
        b[10] = (m * v - p * t + s * A) * q;
        b[11] = (-k * v + l * t - o * A) * q;
        b[12] = (-f * C + h * y - i * x) * q;
        b[13] = (c * C - d * y + e * x) * q;
        b[14] = (-m * u + p * B - r * A) * q;
        b[15] = (k * u - l * B + n * A) * q;
        return result;
    };
    Matrix.prototype.setMatrixByOther = function (otherMatrix) {
        for (var i = 0; i < otherMatrix.elements.length; i++) {
            this.elements[i] = otherMatrix.elements[i];
        }
    };
    Matrix.prototype.setUnitMatrix = function () {
        this.setElements(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    };
    Matrix.prototype.setUniqueValue = function (value) {
        var length = this.elements.length;
        for (var i = 0; i < length; i++) {
            this.elements[i] = value;
        }
    };
    Matrix.prototype.isUnitMatrix = function () {
        var values = this.elements;
        for (var i = 0; i < values.length; i++) {
            if (i % 4 === 0) {
                if (values[i] != 1) {
                    return false;
                }
            }
            else {
                if (values[i] !== 0) {
                    return false;
                }
            }
        }
        return true;
    };
    Matrix.prototype.clone = function () {
        return new Matrix(this.elements[0], this.elements[4], this.elements[8], this.elements[12], this.elements[1], this.elements[5], this.elements[9], this.elements[13], this.elements[2], this.elements[6], this.elements[10], this.elements[14], this.elements[3], this.elements[7], this.elements[11], this.elements[15]);
    };
    Matrix.prototype.multiplyMatrix = function (otherMatrix) {
        var values1 = this.elements;
        var values2 = otherMatrix.elements;
        var m11 = values1[0] * values2[0] + values1[4] * values2[1] + values1[8] * values2[2] + values1[12] * values2[3];
        var m12 = values1[0] * values2[4] + values1[4] * values2[5] + values1[8] * values2[6] + values1[12] * values2[7];
        var m13 = values1[0] * values2[8] + values1[4] * values2[9] + values1[8] * values2[10] + values1[12] * values2[11];
        var m14 = values1[0] * values2[12] + values1[4] * values2[13] + values1[8] * values2[14] + values1[12] * values2[15];
        var m21 = values1[1] * values2[0] + values1[5] * values2[1] + values1[9] * values2[2] + values1[13] * values2[3];
        var m22 = values1[1] * values2[4] + values1[5] * values2[5] + values1[9] * values2[6] + values1[13] * values2[7];
        var m23 = values1[1] * values2[8] + values1[5] * values2[9] + values1[9] * values2[10] + values1[13] * values2[11];
        var m24 = values1[1] * values2[12] + values1[5] * values2[13] + values1[9] * values2[14] + values1[13] * values2[15];
        var m31 = values1[2] * values2[0] + values1[6] * values2[1] + values1[10] * values2[2] + values1[14] * values2[3];
        var m32 = values1[2] * values2[4] + values1[6] * values2[5] + values1[10] * values2[6] + values1[14] * values2[7];
        var m33 = values1[2] * values2[8] + values1[6] * values2[9] + values1[10] * values2[10] + values1[14] * values2[11];
        var m34 = values1[2] * values2[12] + values1[6] * values2[13] + values1[10] * values2[14] + values1[14] * values2[15];
        var m41 = values1[3] * values2[0] + values1[7] * values2[1] + values1[11] * values2[2] + values1[15] * values2[3];
        var m42 = values1[3] * values2[4] + values1[7] * values2[5] + values1[11] * values2[6] + values1[15] * values2[7];
        var m43 = values1[3] * values2[8] + values1[7] * values2[9] + values1[11] * values2[10] + values1[15] * values2[11];
        var m44 = values1[3] * values2[12] + values1[7] * values2[13] + values1[11] * values2[14] + values1[15] * values2[15];
        return new Matrix(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44);
    };
    Matrix.prototype.multiplyColumn = function (c) {
        var valid = c.length == 4;
        if (!valid) {
            throw "invalid c";
        }
        var values1 = this.elements;
        var values2 = c;
        var m11 = values1[0] * values2[0] + values1[4] * values2[1] + values1[8] * values2[2] + values1[12] * values2[3];
        var m21 = values1[1] * values2[0] + values1[5] * values2[1] + values1[9] * values2[2] + values1[13] * values2[3];
        var m31 = values1[2] * values2[0] + values1[6] * values2[1] + values1[10] * values2[2] + values1[14] * values2[3];
        var m41 = values1[3] * values2[0] + values1[7] * values2[1] + values1[11] * values2[2] + values1[15] * values2[3];
        return [m11, m21, m31, m41];
    };
    Matrix.prototype.hasNaN = function () {
        return Utils_1.default.some(this.elements, function (v) {
            return isNaN(v);
        });
    };
    Matrix.prototype.divide = function (a) {
        if (a === 0) {
            throw "invalid a:a is 0";
        }
        if (a !== 0) {
            for (var i = 0, length = this.elements.length; i < length; i++) {
                this.elements[i] /= a;
            }
        }
    };
    Matrix.prototype.worldTranslate = function (x, y, z) {
        this.elements[12] += x;
        this.elements[13] += y;
        this.elements[14] += z;
    };
    Matrix.prototype.localTranslate = function (x, y, z) {
        var localColumn = [x, y, z, 1];
        var worldColumn = this.multiplyColumn(localColumn);
        var origin = this.getPosition();
        this.worldTranslate(worldColumn[0] - origin.x, worldColumn[1] - origin.y, worldColumn[2] - origin.z);
    };
    Matrix.prototype.worldScale = function (scaleX, scaleY, scaleZ) {
        scaleX = (scaleX !== undefined) ? scaleX : 1;
        scaleY = (scaleY !== undefined) ? scaleY : 1;
        scaleZ = (scaleZ !== undefined) ? scaleZ : 1;
        var m = new Matrix(scaleX, 0, 0, 0, 0, scaleY, 0, 0, 0, 0, scaleZ, 0, 0, 0, 0, 1);
        var result = m.multiplyMatrix(this);
        this.setMatrixByOther(result);
    };
    Matrix.prototype.localScale = function (scaleX, scaleY, scaleZ) {
        var transVertice = this.getPosition();
        this.setPosition(new Vertice_1.default(0, 0, 0));
        this.worldScale(scaleX, scaleY, scaleZ);
        this.setPosition(transVertice);
    };
    Matrix.prototype.worldRotateX = function (radian) {
        var c = Math.cos(radian);
        var s = Math.sin(radian);
        var m = new Matrix(1, 0, 0, 0, 0, c, -s, 0, 0, s, c, 0, 0, 0, 0, 1);
        var result = m.multiplyMatrix(this);
        this.setMatrixByOther(result);
    };
    Matrix.prototype.worldRotateY = function (radian) {
        var c = Math.cos(radian);
        var s = Math.sin(radian);
        var m = new Matrix(c, 0, s, 0, 0, 1, 0, 0, -s, 0, c, 0, 0, 0, 0, 1);
        var result = m.multiplyMatrix(this);
        this.setMatrixByOther(result);
    };
    Matrix.prototype.worldRotateZ = function (radian) {
        var c = Math.cos(radian);
        var s = Math.sin(radian);
        var m = new Matrix(c, -s, 0, 0, s, c, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        var result = m.multiplyMatrix(this);
        this.setMatrixByOther(result);
    };
    Matrix.prototype.worldRotateByVector = function (radian, vector) {
        var x = vector.x;
        var y = vector.y;
        var z = vector.z;
        var length, s, c;
        var xx, yy, zz, xy, yz, zx, xs, ys, zs, one_c;
        s = Math.sin(radian);
        c = Math.cos(radian);
        length = Math.sqrt(x * x + y * y + z * z);
        x /= length;
        y /= length;
        z /= length;
        xx = x * x;
        yy = y * y;
        zz = z * z;
        xy = x * y;
        yz = y * z;
        zx = z * x;
        xs = x * s;
        ys = y * s;
        zs = z * s;
        one_c = 1.0 - c;
        var m11 = (one_c * xx) + c;
        var m12 = (one_c * xy) - zs;
        var m13 = (one_c * zx) + ys;
        var m14 = 0.0;
        var m21 = (one_c * xy) + zs;
        var m22 = (one_c * yy) + c;
        var m23 = (one_c * yz) - xs;
        var m24 = 0.0;
        var m31 = (one_c * zx) - ys;
        var m32 = (one_c * yz) + xs;
        var m33 = (one_c * zz) + c;
        var m34 = 0.0;
        var m41 = 0.0;
        var m42 = 0.0;
        var m43 = 0.0;
        var m44 = 1.0;
        var mat = new Matrix(m11, m12, m13, m14, m21, m22, m23, m24, m31, m32, m33, m34, m41, m42, m43, m44);
        var result = mat.multiplyMatrix(this);
        this.setMatrixByOther(result);
    };
    Matrix.prototype.localRotateX = function (radian) {
        var transVertice = this.getPosition();
        this.setPosition(new Vertice_1.default(0, 0, 0));
        var columnX = this.getVectorX();
        this.worldRotateByVector(radian, columnX);
        this.setPosition(transVertice);
    };
    Matrix.prototype.localRotateY = function (radian) {
        var transVertice = this.getPosition();
        this.setPosition(new Vertice_1.default(0, 0, 0));
        var columnY = this.getVectorY();
        this.worldRotateByVector(radian, columnY);
        this.setPosition(transVertice);
    };
    Matrix.prototype.localRotateZ = function (radian) {
        var transVertice = this.getPosition();
        this.setPosition(new Vertice_1.default(0, 0, 0));
        var columnZ = this.getVectorZ();
        this.worldRotateByVector(radian, columnZ);
        this.setPosition(transVertice);
    };
    Matrix.prototype.localRotateByVector = function (radian, localVector) {
        var localColumn = localVector.getArray();
        localColumn.push(1);
        var worldColumn = this.multiplyColumn(localColumn);
        var worldVector = new Vector_1.default(worldColumn[0], worldColumn[1], worldColumn[2]);
        var transVertice = this.getPosition();
        this.setPosition(new Vertice_1.default(0, 0, 0));
        this.worldRotateByVector(radian, worldVector);
        this.setPosition(transVertice);
    };
    return Matrix;
}());
exports.default = Matrix;
;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ImageUtils = {
    MAX_LEVEL: 4,
    images: {},
    add: function (url, img) {
        this.images[url] = img;
    },
    get: function (url) {
        return this.images[url];
    },
    remove: function (url) {
        delete this.images[url];
    },
    clear: function () {
        this.images = {};
    },
    getCount: function () {
        var count = 0;
        for (var url in this.images) {
            if (this.images.hasOwnProperty(url)) {
                count++;
            }
        }
        return count;
    }
};
exports.default = ImageUtils;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Extent_1 = __webpack_require__(15);
var Utils_1 = __webpack_require__(7);
var MeshTextureGraphic_1 = __webpack_require__(36);
var TileMaterial_1 = __webpack_require__(89);
var TileGeometry_1 = __webpack_require__(90);
var MeshVertice_1 = __webpack_require__(24);
var Triangle_1 = __webpack_require__(39);
var TileGrid_1 = __webpack_require__(32);
var TileInfo = (function () {
    function TileInfo(level, row, column, url) {
        this.level = level;
        this.row = row;
        this.column = column;
        this.url = url;
        this.minLon = null;
        this.minLat = null;
        this.maxLon = null;
        this.maxLat = null;
        this.minX = null;
        this.minY = null;
        this.maxX = null;
        this.maxY = null;
        this.segment = 1;
        this._setTileInfo();
        this._handleGlobeTile();
        this.material = new TileMaterial_1.default(this.level, this.url);
    }
    TileInfo.prototype._setTileInfo = function () {
        var Egeo = Utils_1.default.getTileGeographicEnvelopByGrid(this.level, this.row, this.column);
        this.minLon = Egeo.minLon;
        this.minLat = Egeo.minLat;
        this.maxLon = Egeo.maxLon;
        this.maxLat = Egeo.maxLat;
        var minCoord = Utils_1.default.degreeGeographicToWebMercator(this.minLon, this.minLat);
        var maxCoord = Utils_1.default.degreeGeographicToWebMercator(this.maxLon, this.maxLat);
        this.minX = minCoord[0];
        this.minY = minCoord[1];
        this.maxX = maxCoord[0];
        this.maxY = maxCoord[1];
    };
    TileInfo.prototype._handleGlobeTile = function () {
        var BASE_LEVEL = Kernel_1.default.BASE_LEVEL;
        if (this.level < BASE_LEVEL) {
            var changeLevel = BASE_LEVEL - this.level;
            this.segment = Math.pow(2, changeLevel);
        }
        else {
            this.segment = 1;
        }
        this._handleTile();
    };
    TileInfo.prototype._handleTile = function () {
        this.visible = true;
        var verticeArray = [];
        var triangleArray = [];
        var vertices = [];
        var indices = [];
        var textureCoords = [];
        var deltaX = (this.maxX - this.minX) / this.segment;
        var deltaY = (this.maxY - this.minY) / this.segment;
        var deltaTextureCoord = 1.0 / this.segment;
        var levelDeltaR = 0;
        var mercatorXs = [];
        var mercatorYs = [];
        var textureSs = [];
        var textureTs = [];
        var i, j;
        for (i = 0; i <= this.segment; i++) {
            mercatorXs.push(this.minX + i * deltaX);
            mercatorYs.push(this.maxY - i * deltaY);
            var b = i * deltaTextureCoord;
            textureSs.push(b);
            textureTs.push(1 - b);
        }
        var index = 0;
        for (i = 0; i <= this.segment; i++) {
            for (j = 0; j <= this.segment; j++) {
                var merX = mercatorXs[j];
                var merY = mercatorYs[i];
                var ele = 0;
                var lonlat = Utils_1.default.webMercatorToDegreeGeographic(merX, merY);
                var p = Utils_1.default.geographicToCartesianCoord(lonlat[0], lonlat[1], Kernel_1.default.EARTH_RADIUS + ele + levelDeltaR).getArray();
                vertices = vertices.concat(p);
                textureCoords = textureCoords.concat(textureSs[j], textureTs[i]);
                var v = new MeshVertice_1.default({
                    p: p,
                    i: index,
                    uv: [textureSs[j], textureTs[i]]
                });
                verticeArray.push(v);
                index++;
            }
        }
        for (i = 0; i < this.segment; i++) {
            for (j = 0; j < this.segment; j++) {
                var idx0 = (this.segment + 1) * i + j;
                var idx1 = (this.segment + 1) * (i + 1) + j;
                var idx2 = idx1 + 1;
                var idx3 = idx0 + 1;
                indices = indices.concat(idx0, idx1, idx2);
                indices = indices.concat(idx2, idx3, idx0);
                var v0 = verticeArray[idx0];
                var v1 = verticeArray[idx1];
                var v2 = verticeArray[idx2];
                var v3 = verticeArray[idx3];
                var triangle1 = new Triangle_1.default(v0, v1, v2);
                var triangle2 = new Triangle_1.default(v2, v3, v0);
                triangleArray.push(triangle1, triangle2);
            }
        }
        this.geometry = new TileGeometry_1.default(verticeArray, triangleArray);
    };
    return TileInfo;
}());
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile(geometry, material, tileInfo) {
        var _this = _super.call(this, geometry, material) || this;
        _this.geometry = geometry;
        _this.material = material;
        _this.tileInfo = tileInfo;
        return _this;
    }
    Tile.getInstance = function (level, row, column, url) {
        var tileInfo = new TileInfo(level, row, column, url);
        return new Tile(tileInfo.geometry, tileInfo.material, tileInfo);
    };
    Tile.prototype.updateShaderUniforms = function (camera) {
    };
    Tile.prototype.getExtent = function () {
        var tileInfo = this.tileInfo;
        var tileGrid = new TileGrid_1.default(tileInfo.level, tileInfo.row, tileInfo.column);
        return new Extent_1.default(this.tileInfo.minLon, this.tileInfo.minLat, this.tileInfo.maxLon, this.tileInfo.maxLat);
    };
    Tile.prototype.shouldDraw = function (camera) {
        return this.tileInfo.visible && _super.prototype.shouldDraw.call(this, camera);
    };
    Tile.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.subTiledLayer = null;
    };
    return Tile;
}(MeshTextureGraphic_1.default));
exports.default = Tile;
;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Program_1 = __webpack_require__(37);
var Graphic_1 = __webpack_require__(38);
var vs = "\nattribute vec3 aPosition;\nattribute vec2 aUV;\nvarying vec2 vUV;\nuniform mat4 uPMVMatrix;\n\nvoid main()\n{\n\tgl_Position = uPMVMatrix * vec4(aPosition,1.0);\n\tvUV = aUV;\n}\n";
var fs = "\nprecision mediump float;\nvarying vec2 vUV;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n\tgl_FragColor = texture2D(uSampler, vec2(vUV.s, vUV.t));\n}\n";
var MeshTextureGraphic = (function (_super) {
    __extends(MeshTextureGraphic, _super);
    function MeshTextureGraphic(geometry, material, attributes) {
        if (attributes === void 0) { attributes = null; }
        var _this = _super.call(this, geometry, material, attributes) || this;
        _this.geometry = geometry;
        _this.material = material;
        _this.attributes = attributes;
        _this.geometry.calculateVBO();
        _this.geometry.calculateIBO();
        _this.geometry.calculateUVBO();
        return _this;
    }
    MeshTextureGraphic.prototype.isGeometryReady = function () {
        return !!this.geometry.vbo && !!this.geometry.ibo && !!this.geometry.uvbo;
    };
    MeshTextureGraphic.prototype.isReady = function () {
        return this.isGeometryReady() && _super.prototype.isReady.call(this);
    };
    MeshTextureGraphic.findProgram = function () {
        return Program_1.default.findProgram(vs, fs);
    };
    MeshTextureGraphic.prototype.createProgram = function () {
        return Program_1.default.getProgram(vs, fs);
    };
    MeshTextureGraphic.prototype.updateShaderUniforms = function (camera) {
        var gl = Kernel_1.default.gl;
        var pmvMatrix = camera.getProjViewMatrixForDraw().multiplyMatrix(this.geometry.getMatrix());
        var locPMVMatrix = this.program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());
        gl.activeTexture(Kernel_1.default.gl.TEXTURE0);
        var locSampler = this.program.getUniformLocation('uSampler');
        gl.uniform1i(locSampler, 0);
    };
    MeshTextureGraphic.prototype.onDraw = function (camera) {
        var gl = Kernel_1.default.gl;
        this.updateShaderUniforms(camera);
        var locPosition = this.program.getAttribLocation('aPosition');
        this.program.enableVertexAttribArray('aPosition');
        this.geometry.vbo.bind();
        gl.vertexAttribPointer(locPosition, 3, Kernel_1.default.gl.FLOAT, false, 0, 0);
        var locUV = this.program.getAttribLocation('aUV');
        this.program.enableVertexAttribArray('aUV');
        this.geometry.uvbo.bind();
        gl.vertexAttribPointer(locUV, 2, Kernel_1.default.gl.FLOAT, false, 0, 0);
        gl.bindTexture(Kernel_1.default.gl.TEXTURE_2D, this.material.texture);
        this.geometry.ibo.bind();
        var count = this.geometry.triangles.length * 3;
        gl.drawElements(Kernel_1.default.gl.TRIANGLES, count, Kernel_1.default.gl.UNSIGNED_SHORT, 0);
    };
    MeshTextureGraphic.prototype.ifIntersectLocalLine = function (localLine) {
        if (this.geometry) {
            return this.geometry.ifIntersectLocalLine(localLine);
        }
        return false;
    };
    MeshTextureGraphic.prototype.ifIntersectWorldLine = function (worldLine) {
        if (this.geometry) {
            return this.geometry.ifIntersectWorldLine(worldLine);
        }
        return false;
    };
    return MeshTextureGraphic;
}(Graphic_1.default));
exports.default = MeshTextureGraphic;
;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Program = (function () {
    function Program(vs, fs) {
        this.vs = vs;
        this.fs = fs;
        this.ready = false;
        this.activeInfosObject = {};
        this._init();
    }
    Program.getProgram = function (vs, fs) {
        var program = Program.findProgram(vs, fs);
        if (!program) {
            program = new Program(vs, fs);
            Program.programs.push(program);
        }
        return program;
    };
    Program.findProgram = function (vs, fs) {
        var program = null;
        Program.programs.some(function (item) {
            if (item.vs === vs && item.fs === fs) {
                program = item;
                return true;
            }
            else {
                return false;
            }
        });
        return program;
    };
    Program.prototype.use = function () {
        if (this.ready && Program.currentProgram !== this) {
            Kernel_1.default.gl.useProgram(this.program);
            Program.currentProgram = this;
        }
    };
    Program.prototype.updateActiveAttribInfos = function () {
        var count = Kernel_1.default.gl.getProgramParameter(this.program, Kernel_1.default.gl.ACTIVE_ATTRIBUTES);
        for (var i = 0, activeInfo; i < count; i++) {
            activeInfo = Kernel_1.default.gl.getActiveAttrib(this.program, i);
            activeInfo.loc = Kernel_1.default.gl.getAttribLocation(this.program, activeInfo.name);
            activeInfo.isAttribute = true;
            this.activeInfosObject[activeInfo.name] = activeInfo;
        }
    };
    Program.prototype.updateActiveUniformInfos = function () {
        var count = Kernel_1.default.gl.getProgramParameter(this.program, Kernel_1.default.gl.ACTIVE_UNIFORMS);
        for (var i = 0, activeInfo; i < count; i++) {
            activeInfo = Kernel_1.default.gl.getActiveUniform(this.program, i);
            activeInfo.loc = Kernel_1.default.gl.getUniformLocation(this.program, activeInfo.name);
            activeInfo.isAttribute = false;
            this.activeInfosObject[activeInfo.name] = activeInfo;
        }
    };
    Program.prototype.getLocation = function (name) {
        var loc = -1;
        var activeInfo = this.activeInfosObject[name];
        if (activeInfo) {
            loc = activeInfo.loc;
        }
        return loc;
    };
    Program.prototype.getAttribLocation = function (name) {
        var loc = -1;
        var activeInfo = this.activeInfosObject[name];
        if (activeInfo && activeInfo.isAttribute) {
            loc = activeInfo.loc;
        }
        return loc;
    };
    Program.prototype.getUniformLocation = function (name) {
        var loc;
        var activeInfo = this.activeInfosObject[name];
        if (activeInfo && !activeInfo.isAttribute) {
            loc = activeInfo.loc;
        }
        return loc;
    };
    Program.prototype.getVertexAttrib = function () {
    };
    Program.prototype.getUniform = function (name) {
        var result;
        var loc = this.getUniformLocation(name);
        if (loc) {
            result = Kernel_1.default.gl.getUniform(this.program, loc);
        }
        return result;
    };
    Program.prototype.enableVertexAttribArray = function (name) {
        var activeInfo = this.activeInfosObject[name];
        if (activeInfo && activeInfo.isAttribute && activeInfo.isEnabled !== true) {
            var loc = activeInfo.loc;
            Kernel_1.default.gl.enableVertexAttribArray(loc);
            activeInfo.isEnabled = true;
        }
    };
    Program.prototype.disableVertexAttribArray = function (name) {
        var activeInfo = this.activeInfosObject[name];
        if (activeInfo && activeInfo.isAttribute && activeInfo.isEnabled !== false) {
            var loc = activeInfo.loc;
            Kernel_1.default.gl.disableVertexAttribArray(loc);
            activeInfo.isEnabled = false;
        }
    };
    Program.prototype._init = function () {
        var vs = this._getShader(Kernel_1.default.gl.VERTEX_SHADER, this.vs);
        if (!vs) {
            return;
        }
        var fs = this._getShader(Kernel_1.default.gl.FRAGMENT_SHADER, this.fs);
        if (!fs) {
            return;
        }
        this.program = Kernel_1.default.gl.createProgram();
        Kernel_1.default.gl.attachShader(this.program, vs);
        Kernel_1.default.gl.attachShader(this.program, fs);
        Kernel_1.default.gl.linkProgram(this.program);
        if (!Kernel_1.default.gl.getProgramParameter(this.program, Kernel_1.default.gl.LINK_STATUS)) {
            console.error("Could not link program!");
            Kernel_1.default.gl.deleteProgram(this.program);
            Kernel_1.default.gl.deleteShader(vs);
            Kernel_1.default.gl.deleteShader(fs);
            this.program = null;
            return;
        }
        this.updateActiveAttribInfos();
        this.updateActiveUniformInfos();
        this.ready = true;
    };
    Program.prototype._getShader = function (shaderType, shaderText) {
        var shader = Kernel_1.default.gl.createShader(shaderType);
        Kernel_1.default.gl.shaderSource(shader, shaderText);
        Kernel_1.default.gl.compileShader(shader);
        if (!Kernel_1.default.gl.getShaderParameter(shader, Kernel_1.default.gl.COMPILE_STATUS)) {
            console.error("create shader failed", Kernel_1.default.gl.getShaderInfoLog(shader));
            Kernel_1.default.gl.deleteShader(shader);
            return null;
        }
        return shader;
    };
    Program.programs = [];
    return Program;
}());
exports.default = Program;
;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Graphic = (function () {
    function Graphic(geometry, material, attributes) {
        if (geometry === void 0) { geometry = null; }
        if (material === void 0) { material = null; }
        if (attributes === void 0) { attributes = null; }
        this.geometry = geometry;
        this.material = material;
        this.attributes = attributes;
        this.visible = true;
        this.id = ++Kernel_1.default.idCounter;
        this.parent = null;
        this.program = this.createProgram();
    }
    Graphic.prototype.setVisible = function (visible) {
        this.visible = visible;
    };
    Graphic.prototype.isReady = function () {
        return !!(this.geometry && this.material && this.material.isReady());
    };
    Graphic.prototype.shouldDraw = function (camera) {
        return this.visible && this.isReady();
    };
    Graphic.prototype.draw = function (camera) {
        if (this.shouldDraw(camera)) {
            this.program.use();
            this.onDraw(camera);
        }
    };
    Graphic.prototype.destroy = function () {
        this.parent = null;
        if (this.geometry) {
            this.geometry.destroy();
        }
        if (this.material) {
            this.material.destroy();
        }
        this.geometry = null;
        this.material = null;
    };
    return Graphic;
}());
exports.default = Graphic;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Triangle = (function () {
    function Triangle(v1, v2, v3) {
        this.v1 = v1;
        this.v2 = v2;
        this.v3 = v3;
    }
    Triangle.prototype.setColor = function (c) {
        this.v1.c = this.v2.c = this.v3.c = c;
    };
    Triangle.assembleQuad = function (leftTop, leftBottom, rightTop, rightBottom) {
        return [new Triangle(leftTop, leftBottom, rightTop), new Triangle(rightTop, leftBottom, rightBottom)];
    };
    return Triangle;
}());
exports.default = Triangle;
;


/***/ }),
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Line = (function () {
    function Line(position, direction) {
        this.vertice = position.clone();
        this.vector = direction.clone();
        this.vector.normalize();
    }
    Line.prototype.setVertice = function (position) {
        this.vertice = position.clone();
        return this;
    };
    Line.prototype.setVector = function (direction) {
        this.vector = direction.clone();
        this.vector.normalize();
        return this;
    };
    Line.prototype.clone = function () {
        var lineCopy = new Line(this.vertice, this.vector);
        return lineCopy;
    };
    return Line;
}());
exports.default = Line;
;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Matrix_1 = __webpack_require__(33);
var Object3D = (function () {
    function Object3D() {
        this.matrix = new Matrix_1.default();
    }
    Object3D.prototype.setMatrix = function (matrix) {
        this.matrix = matrix;
    };
    Object3D.prototype.getMatrix = function () {
        return this.matrix;
    };
    Object3D.prototype.cloneMatrix = function () {
        return this.matrix.clone();
    };
    Object3D.prototype.setVectorX = function (vector) {
        this.matrix.setVectorX(vector);
    };
    Object3D.prototype.getVectorX = function () {
        return this.matrix.getVectorX();
    };
    Object3D.prototype.setVectorY = function (vector) {
        this.matrix.setVectorY(vector);
    };
    Object3D.prototype.getVectorY = function () {
        return this.matrix.getVectorY();
    };
    Object3D.prototype.setVectorZ = function (vector) {
        this.matrix.setVectorZ(vector);
    };
    Object3D.prototype.getVectorZ = function () {
        return this.matrix.getVectorZ();
    };
    Object3D.prototype.setPosition = function (vertice) {
        this.matrix.setPosition(vertice);
    };
    Object3D.prototype.getPosition = function () {
        return this.matrix.getPosition();
    };
    Object3D.prototype.worldTranslate = function (x, y, z) {
        this.matrix.worldTranslate(x, y, z);
    };
    Object3D.prototype.localTranslate = function (x, y, z) {
        this.matrix.localTranslate(x, y, z);
    };
    Object3D.prototype.worldScale = function (scaleX, scaleY, scaleZ) {
        this.matrix.worldScale(scaleX, scaleY, scaleZ);
    };
    Object3D.prototype.localScale = function (scaleX, scaleY, scaleZ) {
        this.matrix.localScale(scaleX, scaleY, scaleZ);
    };
    Object3D.prototype.worldRotateX = function (radian) {
        this.matrix.worldRotateX(radian);
    };
    Object3D.prototype.worldRotateY = function (radian) {
        this.matrix.worldRotateY(radian);
    };
    Object3D.prototype.worldRotateZ = function (radian) {
        this.matrix.worldRotateZ(radian);
    };
    Object3D.prototype.worldRotateByVector = function (radian, vector) {
        this.matrix.worldRotateByVector(radian, vector);
    };
    Object3D.prototype.localRotateX = function (radian) {
        this.matrix.localRotateX(radian);
    };
    Object3D.prototype.localRotateY = function (radian) {
        this.matrix.localRotateY(radian);
    };
    Object3D.prototype.localRotateZ = function (radian) {
        this.matrix.localRotateZ(radian);
    };
    Object3D.prototype.localRotateByVector = function (radian, localVector) {
        this.matrix.localRotateByVector(radian, localVector);
    };
    Object3D.prototype.getXAxisDirection = function () {
        var directionX = this.matrix.getVectorX();
        directionX.normalize();
        return directionX;
    };
    Object3D.prototype.getYAxisDirection = function () {
        var directionY = this.matrix.getVectorY();
        directionY.normalize();
        return directionY;
    };
    Object3D.prototype.getZAxisDirection = function () {
        var directionZ = this.matrix.getVectorZ();
        directionZ.normalize();
        return directionZ;
    };
    return Object3D;
}());
exports.default = Object3D;
;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Tile_1 = __webpack_require__(35);
var GraphicGroup_1 = __webpack_require__(18);
var SubTiledLayer_1 = __webpack_require__(56);
var TiledLayer = (function (_super) {
    __extends(TiledLayer, _super);
    function TiledLayer(style) {
        if (style === void 0) { style = ""; }
        var _this = _super.call(this) || this;
        _this.style = style;
        _this.imageRequestOptimizeDeltaLevel = 2;
        _this.globe = null;
        var subLayer0 = new SubTiledLayer_1.default(0);
        _this.add(subLayer0);
        var subLayer1 = new SubTiledLayer_1.default(1);
        _this.add(subLayer1);
        return _this;
    }
    TiledLayer.prototype.destroy = function () {
        this.globe = null;
        _super.prototype.destroy.call(this);
    };
    TiledLayer.prototype._checkSubLayer1 = function () {
        var subLayer1 = this.children[1];
        if (subLayer1 && subLayer1.getLevel() === 1) {
            if (subLayer1.children.length !== 4) {
                subLayer1.children = [];
                for (var m = 0; m <= 1; m++) {
                    for (var n = 0; n <= 1; n++) {
                        var args = {
                            level: 1,
                            row: m,
                            column: n,
                            url: ""
                        };
                        args.url = this.getTileUrl(args.level, args.row, args.column);
                        var tile = Tile_1.default.getInstance(args.level, args.row, args.column, args.url);
                        subLayer1.add(tile);
                    }
                }
            }
        }
    };
    TiledLayer.prototype.refresh = function () {
        if (!this.globe) {
            return;
        }
        this._checkSubLayer1();
        var camera = this.globe.camera;
        var level = this.globe.getLevel();
        var options = {
            threshold: 1
        };
        options.threshold = 1;
        var lastLevelTileGrids = camera.getVisibleTilesByLevel(level, options);
        var levelsTileGrids = [];
        var parentTileGrids = lastLevelTileGrids;
        var subLevel;
        for (subLevel = level; subLevel >= 2; subLevel--) {
            levelsTileGrids[subLevel] = parentTileGrids;
            parentTileGrids = parentTileGrids.map(function (item) {
                return item.getParent();
            });
            parentTileGrids = Utils_1.default.filterRepeatArray(parentTileGrids);
        }
        for (subLevel = 2; subLevel <= level; subLevel++) {
            var addNew = level === subLevel || (level - subLevel) > this.imageRequestOptimizeDeltaLevel;
            this.children[subLevel].updateTiles(subLevel, levelsTileGrids[subLevel], addNew);
        }
    };
    TiledLayer.prototype.updateSubLayerCount = function () {
        if (!this.globe) {
            return;
        }
        var level = this.globe.getLevel();
        var subLayerCount = this.children.length;
        var deltaLevel = level + 1 - subLayerCount;
        var i, subLayer;
        if (deltaLevel > 0) {
            for (i = 0; i < deltaLevel; i++) {
                subLayer = new SubTiledLayer_1.default(i + subLayerCount);
                this.add(subLayer);
            }
        }
        else if (deltaLevel < 0) {
            deltaLevel *= -1;
            for (i = 0; i < deltaLevel; i++) {
                var removeLevel = this.children.length - 1;
                if (removeLevel >= 2) {
                    subLayer = this.children[removeLevel];
                    this.remove(subLayer);
                }
                else {
                    break;
                }
            }
        }
    };
    TiledLayer.prototype._getReadyTile = function (tileGrid) {
        var level = tileGrid.level;
        var row = tileGrid.row;
        var column = tileGrid.column;
        var tile = this.children[level].findTile(level, row, column);
        if (level === 1) {
            return tile;
        }
        else {
            if (tile && tile.isReady()) {
                return tile;
            }
            else {
                return this._getReadyTile(tileGrid.getParent());
            }
        }
    };
    TiledLayer.prototype.updateTileVisibility = function () {
        var _this = this;
        if (!this.globe) {
            return;
        }
        var level = this.globe.getLevel();
        this.children.forEach(function (subTiledLayer) {
            subTiledLayer.showAllTiles();
        });
        var ancesorLevel = level - this.imageRequestOptimizeDeltaLevel - 1;
        if (ancesorLevel >= 1) {
            var camera = this.globe.camera;
            var tileGrids = camera.getTileGridsOfBoundary(ancesorLevel, false);
            if (tileGrids.length === 8) {
                tileGrids = Utils_1.default.filterRepeatArray(tileGrids);
                for (var i = 0; i <= ancesorLevel; i++) {
                    this.children[i].hideAllTiles();
                }
                tileGrids.forEach(function (tileGrid) {
                    var tile = _this._getReadyTile(tileGrid);
                    if (tile) {
                        tile.setVisible(true);
                        tile.parent.visible = true;
                    }
                });
            }
        }
    };
    TiledLayer.prototype.onDraw = function (camera) {
        var gl = this.globe && this.globe.gl;
        if (!gl) {
            return;
        }
        var program = Tile_1.default.findProgram();
        if (!program) {
            return;
        }
        program.use();
        var pmvMatrix = camera.getProjViewMatrixForDraw();
        var locPMVMatrix = program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());
        gl.activeTexture(Kernel_1.default.gl.TEXTURE0);
        var locSampler = program.getUniformLocation('uSampler');
        gl.uniform1i(locSampler, 0);
        gl.depthFunc(Kernel_1.default.gl.ALWAYS);
        _super.prototype.onDraw.call(this, camera);
        gl.depthFunc(Kernel_1.default.gl.LEQUAL);
    };
    TiledLayer.prototype.getExtent = function () {
        if (this.globe.isRenderingPaused()) {
            return null;
        }
        var subTiledLayer = this.children[this.children.length - 1];
        return subTiledLayer.getExtent();
    };
    TiledLayer.prototype.wrapUrlWithProxy = function (url) {
        return Utils_1.default.wrapUrlWithProxy(url);
    };
    TiledLayer.prototype.getLastLevelVisibleTileGrids = function () {
        var tileGrids = null;
        var subTiledLayer = this.children[this.children.length - 1];
        if (subTiledLayer) {
            tileGrids = subTiledLayer.getVisibleTileGrids();
        }
        return tileGrids;
    };
    TiledLayer.prototype.logVisibleTiles = function () {
        var result = [];
        this.children.forEach(function (subLayer) {
            var allCount = subLayer.children.length;
            var visibleCount = subLayer.getShouldDrawTilesCount();
            result.push({
                level: subLayer.getLevel(),
                allCount: allCount,
                visibleCount: visibleCount
            });
        });
        console.table(result);
    };
    return TiledLayer;
}(GraphicGroup_1.default));
;
exports.default = TiledLayer;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Material = (function () {
    function Material() {
    }
    return Material;
}());
exports.default = Material;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var maxBufferSize = 200;
var buffers = [];
var VertexBufferObject = (function () {
    function VertexBufferObject(target) {
        this.target = target;
        if (buffers.length > 0) {
            this.buffer = buffers.pop();
        }
        else {
            this.buffer = Kernel_1.default.gl.createBuffer();
        }
    }
    VertexBufferObject.prototype.bind = function () {
        Kernel_1.default.gl.bindBuffer(this.target, this.buffer);
    };
    VertexBufferObject.prototype.bufferData = function (data, usage, hasBinded) {
        if (hasBinded === void 0) { hasBinded = false; }
        if (!hasBinded) {
            this.bind();
        }
        var gl = Kernel_1.default.gl;
        if (this.target === Kernel_1.default.gl.ARRAY_BUFFER) {
            gl.bufferData(Kernel_1.default.gl.ARRAY_BUFFER, new Float32Array(data), usage);
        }
        else if (this.target === Kernel_1.default.gl.ELEMENT_ARRAY_BUFFER) {
            gl.bufferData(Kernel_1.default.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(data), usage);
        }
    };
    VertexBufferObject.prototype.destroy = function () {
        if (this.buffer) {
            if (buffers.length < maxBufferSize) {
                buffers.push(this.buffer);
            }
            else {
                Kernel_1.default.gl.deleteBuffer(this.buffer);
            }
        }
        this.buffer = null;
    };
    return VertexBufferObject;
}());
exports.default = VertexBufferObject;
;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Extent_1 = __webpack_require__(15);
var TileGrid_1 = __webpack_require__(32);
var GraphicGroup_1 = __webpack_require__(18);
var Tile_1 = __webpack_require__(35);
var SubTiledLayer = (function (_super) {
    __extends(SubTiledLayer, _super);
    function SubTiledLayer(level) {
        var _this = _super.call(this) || this;
        _this.level = level;
        return _this;
    }
    SubTiledLayer.prototype.getLevel = function () {
        return this.level;
    };
    SubTiledLayer.prototype.showAllTiles = function () {
        this.visible = true;
        this.children.forEach(function (tile) {
            tile.setVisible(true);
        });
    };
    SubTiledLayer.prototype.hideAllTiles = function () {
        this.visible = false;
        this.children.forEach(function (tile) {
            tile.setVisible(false);
        });
    };
    SubTiledLayer.prototype.add = function (tile) {
        if (tile.tileInfo.level === this.level) {
            _super.prototype.add.call(this, tile);
            tile.subTiledLayer = this;
        }
    };
    SubTiledLayer.prototype.findTile = function (level, row, column) {
        var length = this.children.length;
        for (var i = 0; i < length; i++) {
            var tile = this.children[i];
            if (tile.tileInfo.level === level && tile.tileInfo.row === row && tile.tileInfo.column === column) {
                return tile;
            }
        }
        return null;
    };
    SubTiledLayer.prototype.updateTiles = function (level, visibleTileGrids, addNew) {
        this.level = level;
        function checkTileExist(tileArray, lev, row, col) {
            var result = {
                isExist: false,
                index: -1
            };
            for (var m = 0; m < tileArray.length; m++) {
                var tileInfo = tileArray[m];
                if (tileInfo.level === lev && tileInfo.row === row && tileInfo.column === col) {
                    result.isExist = true;
                    result.index = m;
                    return result;
                }
            }
            return result;
        }
        var tilesNeedDelete = [];
        var i, tile;
        for (i = 0; i < this.children.length; i++) {
            tile = this.children[i];
            var checkResult = checkTileExist(visibleTileGrids, tile.tileInfo.level, tile.tileInfo.row, tile.tileInfo.column);
            var isExist = checkResult.isExist;
            if (isExist) {
                visibleTileGrids.splice(checkResult.index, 1);
            }
            else {
                tilesNeedDelete.push(tile);
            }
        }
        while (tilesNeedDelete.length > 0) {
            var b = this.remove(tilesNeedDelete[0]);
            tilesNeedDelete.splice(0, 1);
            if (!b) {
                console.debug("subTiledLayer.remove(tilesNeedDelete[0])失败");
            }
        }
        if (addNew) {
            for (i = 0; i < visibleTileGrids.length; i++) {
                var tileGridInfo = visibleTileGrids[i];
                var args = {
                    level: tileGridInfo.level,
                    row: tileGridInfo.row,
                    column: tileGridInfo.column,
                    url: ""
                };
                args.url = this.getTileUrl(args.level, args.row, args.column);
                tile = Tile_1.default.getInstance(args.level, args.row, args.column, args.url);
                this.add(tile);
            }
        }
    };
    SubTiledLayer.prototype.getTileUrl = function (level, row, column) {
        if (this.parent && typeof this.parent.getTileUrl === "function") {
            return this.parent.getTileUrl(level, row, column);
        }
        return "";
    };
    SubTiledLayer.prototype.checkIfAllTilesLoaded = function () {
        for (var i = 0; i < this.children.length; i++) {
            var tile = this.children[i];
            if (tile) {
                var isTileLoaded = tile.material.isReady();
                if (!isTileLoaded) {
                    return false;
                }
            }
        }
        return true;
    };
    SubTiledLayer.prototype.getExtent = function () {
        return Extent_1.default.union(this.getExtents());
    };
    SubTiledLayer.prototype.getExtents = function () {
        return this.children.map(function (item) { return item.getExtent(); });
    };
    SubTiledLayer.prototype.getVisibleTileGrids = function () {
        var tileGrids = [];
        if (this.visible) {
            this.children.forEach(function (tile) {
                if (tile.visible) {
                    tileGrids.push(new TileGrid_1.default(tile.tileInfo.level, tile.tileInfo.row, tile.tileInfo.column));
                }
            });
        }
        return tileGrids;
    };
    SubTiledLayer.prototype.getShouldDrawTilesCount = function () {
        return this.visible ? this.children.filter(function (tile) {
            return tile.visible && tile.isReady();
        }).length : 0;
    };
    return SubTiledLayer;
}(GraphicGroup_1.default));
exports.default = SubTiledLayer;
;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Tile_1 = __webpack_require__(35);
var SubTiledLayer_1 = __webpack_require__(56);
var LabelLayer = (function (_super) {
    __extends(LabelLayer, _super);
    function LabelLayer() {
        var _this = _super.call(this, -1) || this;
        _this.minLevel = 4;
        return _this;
    }
    LabelLayer.prototype.onDraw = function (camera) {
        var program = Tile_1.default.findProgram();
        if (!program) {
            return;
        }
        program.use();
        var gl = Kernel_1.default.gl;
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        var pmvMatrix = camera.getProjViewMatrixForDraw();
        var locPMVMatrix = program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());
        gl.activeTexture(gl.TEXTURE0);
        var locSampler = program.getUniformLocation('uSampler');
        gl.uniform1i(locSampler, 0);
        gl.depthFunc(gl.ALWAYS);
        _super.prototype.onDraw.call(this, camera);
        gl.depthFunc(gl.LEQUAL);
        gl.disable(gl.BLEND);
    };
    LabelLayer.prototype.updateTiles = function (level, visibleTileGrids) {
        var _this = this;
        var validTileGrids = visibleTileGrids.filter(function (tileGrid) { return tileGrid.level >= _this.minLevel; });
        _super.prototype.updateTiles.call(this, level, validTileGrids, true);
    };
    return LabelLayer;
}(SubTiledLayer_1.default));
exports.default = LabelLayer;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.devicePixelRatio = window.devicePixelRatio;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(7);
var Program_1 = __webpack_require__(37);
var Graphic_1 = __webpack_require__(38);
var VertexBufferObject_1 = __webpack_require__(55);
var vs = "\nattribute vec3 aPosition;\nuniform mat4 uPMVMatrix;\nuniform float uSize;\n\nvoid main(void) {\n  gl_Position = uPMVMatrix * vec4(aPosition, 1.0);\n  gl_PointSize = uSize;\n}\n";
var fs = "\nprecision mediump float;\nuniform sampler2D uSampler;\n\nvoid main()\n{\n\tvec4 color = texture2D(uSampler, vec2(gl_PointCoord.x, gl_PointCoord.y));\n  if(color.a == 0.0){\n    discard;\n  }\n  gl_FragColor = color;\n}\n";
var MultiPointsGraphic = (function (_super) {
    __extends(MultiPointsGraphic, _super);
    function MultiPointsGraphic(material) {
        var _this = _super.call(this, null, material) || this;
        _this.material = material;
        _this.vbo = null;
        _this.vertices = null;
        _this.vbo = new VertexBufferObject_1.default(Kernel_1.default.gl.ARRAY_BUFFER);
        _this.vertices = [];
        return _this;
    }
    MultiPointsGraphic.prototype.createProgram = function () {
        return Program_1.default.getProgram(vs, fs);
    };
    MultiPointsGraphic.prototype.isReady = function () {
        return !!(this.vertices.length > 0 && this.material && this.material.isReady());
    };
    MultiPointsGraphic.prototype.onDraw = function (camera) {
        var gl = Kernel_1.default.gl;
        gl.disable(Kernel_1.default.gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.enable(Kernel_1.default.gl.BLEND);
        gl.blendFunc(Kernel_1.default.gl.SRC_ALPHA, Kernel_1.default.gl.ONE_MINUS_SRC_ALPHA);
        var locPosition = this.program.getAttribLocation('aPosition');
        this.program.enableVertexAttribArray('aPosition');
        this.vbo.bind();
        var vertices = [];
        this.vertices.map(function (vertice) {
            vertices.push(vertice.x, vertice.y, vertice.z);
        });
        this.vbo.bufferData(vertices, Kernel_1.default.gl.DYNAMIC_DRAW, true);
        gl.vertexAttribPointer(locPosition, 3, Kernel_1.default.gl.FLOAT, false, 0, 0);
        var pmvMatrix = camera.getProjViewMatrixForDraw();
        var locPMVMatrix = this.program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());
        var locSize = this.program.getUniformLocation('uSize');
        gl.uniform1f(locSize, this.material.size);
        var locSampler = this.program.getUniformLocation('uSampler');
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.material.texture);
        gl.uniform1i(locSampler, 0);
        gl.drawArrays(gl.POINTS, 0, vertices.length / 3);
        gl.enable(gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.disable(gl.BLEND);
    };
    MultiPointsGraphic.prototype.setLonlats = function (lonlats) {
        var _this = this;
        MultiPointsGraphic.prototype.clear.apply(this);
        this.vertices = [];
        lonlats.forEach(function (lonlat) {
            var p = Utils_1.default.geographicToCartesianCoord(lonlat[0], lonlat[1], Kernel_1.default.EARTH_RADIUS + 0.001);
            _this.vertices.push(p);
        });
    };
    MultiPointsGraphic.prototype.clear = function () {
        this.vertices = [];
    };
    return MultiPointsGraphic;
}(Graphic_1.default));
exports.default = MultiPointsGraphic;
;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MeshTextureMaterial_1 = __webpack_require__(22);
var MarkerTextureMaterial = (function (_super) {
    __extends(MarkerTextureMaterial, _super);
    function MarkerTextureMaterial(imageOrUrl, size) {
        if (size === void 0) { size = 16; }
        var _this = _super.call(this, imageOrUrl, false) || this;
        _this.size = size;
        return _this;
    }
    return MarkerTextureMaterial;
}(MeshTextureMaterial_1.default));
exports.default = MarkerTextureMaterial;
;


/***/ }),
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

!function (t, e) {
  "object" == ( false ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = e() :  true ? !(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : t.ES6Promise = e();
}(undefined, function () {
  "use strict";
  function t(t) {
    var e = typeof t === "undefined" ? "undefined" : _typeof(t);return null !== t && ("object" === e || "function" === e);
  }function e(t) {
    return "function" == typeof t;
  }function n(t) {
    B = t;
  }function r(t) {
    G = t;
  }function o() {
    return function () {
      return process.nextTick(a);
    };
  }function i() {
    return "undefined" != typeof z ? function () {
      z(a);
    } : c();
  }function s() {
    var t = 0,
        e = new J(a),
        n = document.createTextNode("");return e.observe(n, { characterData: !0 }), function () {
      n.data = t = ++t % 2;
    };
  }function u() {
    var t = new MessageChannel();return t.port1.onmessage = a, function () {
      return t.port2.postMessage(0);
    };
  }function c() {
    var t = setTimeout;return function () {
      return t(a, 1);
    };
  }function a() {
    for (var t = 0; t < W; t += 2) {
      var e = V[t],
          n = V[t + 1];e(n), V[t] = void 0, V[t + 1] = void 0;
    }W = 0;
  }function f() {
    try {
      var t = Function("return this")().require("vertx");return z = t.runOnLoop || t.runOnContext, i();
    } catch (e) {
      return c();
    }
  }function l(t, e) {
    var n = this,
        r = new this.constructor(p);void 0 === r[Z] && O(r);var o = n._state;if (o) {
      var i = arguments[o - 1];G(function () {
        return P(o, r, i, n._result);
      });
    } else E(n, r, t, e);return r;
  }function h(t) {
    var e = this;if (t && "object" == (typeof t === "undefined" ? "undefined" : _typeof(t)) && t.constructor === e) return t;var n = new e(p);return g(n, t), n;
  }function p() {}function v() {
    return new TypeError("You cannot resolve a promise with itself");
  }function d() {
    return new TypeError("A promises callback cannot return that same promise.");
  }function _(t) {
    try {
      return t.then;
    } catch (e) {
      return nt.error = e, nt;
    }
  }function y(t, e, n, r) {
    try {
      t.call(e, n, r);
    } catch (o) {
      return o;
    }
  }function m(t, e, n) {
    G(function (t) {
      var r = !1,
          o = y(n, e, function (n) {
        r || (r = !0, e !== n ? g(t, n) : S(t, n));
      }, function (e) {
        r || (r = !0, j(t, e));
      }, "Settle: " + (t._label || " unknown promise"));!r && o && (r = !0, j(t, o));
    }, t);
  }function b(t, e) {
    e._state === tt ? S(t, e._result) : e._state === et ? j(t, e._result) : E(e, void 0, function (e) {
      return g(t, e);
    }, function (e) {
      return j(t, e);
    });
  }function w(t, n, r) {
    n.constructor === t.constructor && r === l && n.constructor.resolve === h ? b(t, n) : r === nt ? (j(t, nt.error), nt.error = null) : void 0 === r ? S(t, n) : e(r) ? m(t, n, r) : S(t, n);
  }function g(e, n) {
    e === n ? j(e, v()) : t(n) ? w(e, n, _(n)) : S(e, n);
  }function A(t) {
    t._onerror && t._onerror(t._result), T(t);
  }function S(t, e) {
    t._state === $ && (t._result = e, t._state = tt, 0 !== t._subscribers.length && G(T, t));
  }function j(t, e) {
    t._state === $ && (t._state = et, t._result = e, G(A, t));
  }function E(t, e, n, r) {
    var o = t._subscribers,
        i = o.length;t._onerror = null, o[i] = e, o[i + tt] = n, o[i + et] = r, 0 === i && t._state && G(T, t);
  }function T(t) {
    var e = t._subscribers,
        n = t._state;if (0 !== e.length) {
      for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3) {
        r = e[s], o = e[s + n], r ? P(n, r, o, i) : o(i);
      }t._subscribers.length = 0;
    }
  }function M(t, e) {
    try {
      return t(e);
    } catch (n) {
      return nt.error = n, nt;
    }
  }function P(t, n, r, o) {
    var i = e(r),
        s = void 0,
        u = void 0,
        c = void 0,
        a = void 0;if (i) {
      if (s = M(r, o), s === nt ? (a = !0, u = s.error, s.error = null) : c = !0, n === s) return void j(n, d());
    } else s = o, c = !0;n._state !== $ || (i && c ? g(n, s) : a ? j(n, u) : t === tt ? S(n, s) : t === et && j(n, s));
  }function x(t, e) {
    try {
      e(function (e) {
        g(t, e);
      }, function (e) {
        j(t, e);
      });
    } catch (n) {
      j(t, n);
    }
  }function C() {
    return rt++;
  }function O(t) {
    t[Z] = rt++, t._state = void 0, t._result = void 0, t._subscribers = [];
  }function k() {
    return new Error("Array Methods must be provided an Array");
  }function F(t) {
    return new ot(this, t).promise;
  }function Y(t) {
    var e = this;return new e(U(t) ? function (n, r) {
      for (var o = t.length, i = 0; i < o; i++) {
        e.resolve(t[i]).then(n, r);
      }
    } : function (t, e) {
      return e(new TypeError("You must pass an array to race."));
    });
  }function q(t) {
    var e = this,
        n = new e(p);return j(n, t), n;
  }function D() {
    throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");
  }function K() {
    throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");
  }function L() {
    var t = void 0;if ("undefined" != typeof global) t = global;else if ("undefined" != typeof self) t = self;else try {
      t = Function("return this")();
    } catch (e) {
      throw new Error("polyfill failed because global object is unavailable in this environment");
    }var n = t.Promise;if (n) {
      var r = null;try {
        r = Object.prototype.toString.call(n.resolve());
      } catch (e) {}if ("[object Promise]" === r && !n.cast) return;
    }t.Promise = it;
  }var N = void 0;N = Array.isArray ? Array.isArray : function (t) {
    return "[object Array]" === Object.prototype.toString.call(t);
  };var U = N,
      W = 0,
      z = void 0,
      B = void 0,
      G = function G(t, e) {
    V[W] = t, V[W + 1] = e, W += 2, 2 === W && (B ? B(a) : X());
  },
      H = "undefined" != typeof window ? window : void 0,
      I = H || {},
      J = I.MutationObserver || I.WebKitMutationObserver,
      Q = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
      R = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
      V = new Array(1e3),
      X = void 0;X = Q ? o() : J ? s() : R ? u() : void 0 === H && "function" == "function" ? f() : c();var Z = Math.random().toString(36).substring(2),
      $ = void 0,
      tt = 1,
      et = 2,
      nt = { error: null },
      rt = 0,
      ot = function () {
    function t(t, e) {
      this._instanceConstructor = t, this.promise = new t(p), this.promise[Z] || O(this.promise), U(e) ? (this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? S(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(e), 0 === this._remaining && S(this.promise, this._result))) : j(this.promise, k());
    }return t.prototype._enumerate = function (t) {
      for (var e = 0; this._state === $ && e < t.length; e++) {
        this._eachEntry(t[e], e);
      }
    }, t.prototype._eachEntry = function (t, e) {
      var n = this._instanceConstructor,
          r = n.resolve;if (r === h) {
        var o = _(t);if (o === l && t._state !== $) this._settledAt(t._state, e, t._result);else if ("function" != typeof o) this._remaining--, this._result[e] = t;else if (n === it) {
          var i = new n(p);w(i, t, o), this._willSettleAt(i, e);
        } else this._willSettleAt(new n(function (e) {
          return e(t);
        }), e);
      } else this._willSettleAt(r(t), e);
    }, t.prototype._settledAt = function (t, e, n) {
      var r = this.promise;r._state === $ && (this._remaining--, t === et ? j(r, n) : this._result[e] = n), 0 === this._remaining && S(r, this._result);
    }, t.prototype._willSettleAt = function (t, e) {
      var n = this;E(t, void 0, function (t) {
        return n._settledAt(tt, e, t);
      }, function (t) {
        return n._settledAt(et, e, t);
      });
    }, t;
  }(),
      it = function () {
    function t(e) {
      this[Z] = C(), this._result = this._state = void 0, this._subscribers = [], p !== e && ("function" != typeof e && D(), this instanceof t ? x(this, e) : K());
    }return t.prototype["catch"] = function (t) {
      return this.then(null, t);
    }, t.prototype["finally"] = function (t) {
      var n = this,
          r = n.constructor;return e(t) ? n.then(function (e) {
        return r.resolve(t()).then(function () {
          return e;
        });
      }, function (e) {
        return r.resolve(t()).then(function () {
          throw e;
        });
      }) : n.then(t, t);
    }, t;
  }();return it.prototype.then = l, it.all = F, it.race = Y, it.resolve = h, it.reject = q, it._setScheduler = n, it._setAsap = r, it._asap = G, it.polyfill = L, it.Promise = it, it.polyfill(), it;
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(80)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Renderer_1 = __webpack_require__(82);
var Camera_1 = __webpack_require__(83);
var Scene_1 = __webpack_require__(86);
var Image_1 = __webpack_require__(34);
var EventHandler_1 = __webpack_require__(87);
var Google_1 = __webpack_require__(88);
var Autonavi_1 = __webpack_require__(91);
var Atmosphere_1 = __webpack_require__(92);
var LocationGraphic_1 = __webpack_require__(95);
var PoiLayer_1 = __webpack_require__(97);
var RouteLayer_1 = __webpack_require__(99);
var Extent_1 = __webpack_require__(15);
var Service_1 = __webpack_require__(27);
var Env_1 = __webpack_require__(58);
var initLevel = Utils_1.default.isMobile() ? 11 : 3;
var initLonlat = [116.3975, 39.9085];
var GlobeOptions = (function () {
    function GlobeOptions() {
        this.pauseRendering = false;
        this.satellite = true;
        this.level = 'auto';
        this.lonlat = 'auto';
        this.key = "";
    }
    return GlobeOptions;
}());
exports.GlobeOptions = GlobeOptions;
var Globe = (function () {
    function Globe(canvas, width, height, options) {
        var _this = this;
        this.canvas = canvas;
        this.options = options;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.tiledLayer = null;
        this.labelLayer = null;
        this.trafficLayer = null;
        this.poiLayer = null;
        this.routeLayer = null;
        this.locationGraphic = null;
        this.debugStopRefreshTiles = false;
        this.REFRESH_INTERVAL = 150;
        this.lastRefreshTimestamp = -1;
        this.lastRefreshCameraCore = null;
        this.eventHandler = null;
        this.allRefreshCount = 0;
        this.realRefreshCount = 0;
        this.width = 0;
        this.height = 0;
        this.afterRenderCallbacks = [];
        this.gl = null;
        if (!this.options) {
            this.options = new GlobeOptions();
        }
        this.resizeCanvas(width, height);
        this.renderer = new Renderer_1.default(canvas, this._onBeforeRender.bind(this), this._onAfterRender.bind(this));
        this.gl = this.renderer.gl;
        this.scene = new Scene_1.default();
        var radio = this.width / this.height;
        var level = this.options.level >= 0 ? this.options.level : initLevel;
        var lonlat = (this.options.lonlat && this.options.lonlat.length === 2) ? this.options.lonlat : initLonlat;
        this.camera = new Camera_1.default(width, height, 30, radio, 1, Kernel_1.default.EARTH_RADIUS * 2, level, lonlat, options.resolutionFactor);
        this.renderer.setScene(this.scene);
        this.renderer.setCamera(this.camera);
        if (this.options.satellite) {
            this._setTiledLayer(new Google_1.GoogleTiledLayer("Default"), this.options.pauseRendering);
        }
        else {
            this._setTiledLayer(new Autonavi_1.AutonaviTiledLayer(), this.options.pauseRendering);
        }
        var atmosphere = Atmosphere_1.default.getInstance();
        this.scene.add(atmosphere);
        this.routeLayer = RouteLayer_1.default.getInstance(this.camera, this.options.key);
        this.scene.add(this.routeLayer);
        this.poiLayer = PoiLayer_1.default.getInstance();
        this.poiLayer.globe = this;
        this.scene.add(this.poiLayer);
        this.locationGraphic = LocationGraphic_1.default.getInstance(this);
        this.scene.add(this.locationGraphic);
        this.eventHandler = new EventHandler_1.default(this);
        if (this.options.pauseRendering !== true) {
            this.renderer.resumeRendering();
        }
        var locationCallback = function (location) {
            if (location) {
                _this.afterRenderCallbacks.push(function () {
                    _this.updateUserLocation(location);
                });
            }
        };
        Service_1.default.getCurrentPosition(false).then(locationCallback).then(function () {
            if (Utils_1.default.isMobile()) {
                Service_1.default.getCurrentPosition(true).then(locationCallback);
            }
        });
    }
    Globe.getInstance = function (options) {
        if (!this.globe) {
            var canvas = document.createElement("canvas");
            var width = document.documentElement.clientWidth;
            var height = document.documentElement.clientHeight;
            this.globe = new Globe(canvas, width, height, options);
        }
        return this.globe;
    };
    Globe.prototype.placeAt = function (container) {
        if (this.canvas.parentNode) {
            if (this.canvas.parentNode !== container) {
                container.appendChild(this.canvas);
            }
        }
        else {
            container.appendChild(this.canvas);
        }
    };
    Globe.prototype.getWidth = function () {
        return this.width;
    };
    Globe.prototype.getHeight = function () {
        return this.height;
    };
    Globe.prototype.resize = function (width, height) {
        this.resizeCanvas(width, height);
        this.renderer.updateViewportSize();
        this.camera.setSize(width, height);
        Utils_1.default.publish("extent-change");
    };
    Globe.prototype.resizeCanvas = function (width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width * Env_1.devicePixelRatio;
        this.canvas.height = height * Env_1.devicePixelRatio;
        this.canvas.style.width = width + "px";
        this.canvas.style.height = height + "px";
    };
    Globe.prototype.updateUserLocation = function (location) {
        this.locationGraphic.setLonLat(location.lon, location.lat);
        var _a = this.camera.getLonlat(), lon = _a[0], lat = _a[1];
        if (this.options.lonlat === 'auto') {
            lon = location.lon;
            lat = location.lat;
        }
        var level = this.getLevel();
        if (this.options.level === 'auto') {
            level = 8;
            if (location.accuracy <= 100) {
                level = 16;
            }
            else if (location.accuracy <= 1000) {
                level = 13;
            }
            else {
                level = 11;
            }
        }
        this.centerTo(lon, lat, level);
    };
    Globe.prototype.getLonlat = function () {
        return this.camera.getLonlat();
    };
    Globe.prototype.isRenderingPaused = function () {
        return this.renderer.isRenderingPaused();
    };
    Globe.prototype.pauseRendering = function () {
        this.renderer.pauseRendering();
    };
    Globe.prototype.resumeRendering = function () {
        this.renderer.resumeRendering();
        this.refresh(true);
    };
    Globe.prototype._setTiledLayer = function (tiledLayer, dontRefresh) {
        if (dontRefresh === void 0) { dontRefresh = false; }
        Image_1.default.clear();
        if (this.tiledLayer) {
            var b = this.scene.remove(this.tiledLayer);
            if (!b) {
                console.error("this.scene.remove(this.tiledLayer)失败");
            }
            this.scene.tiledLayer = null;
        }
        tiledLayer.globe = this;
        this.tiledLayer = tiledLayer;
        this.scene.add(this.tiledLayer, true);
        if (!dontRefresh) {
            this.refresh(true);
        }
    };
    Globe.prototype.showLabelLayer = function () {
        if (this.labelLayer) {
            this.labelLayer.visible = true;
        }
    };
    Globe.prototype.hideLabelLayer = function () {
        if (this.labelLayer) {
            this.labelLayer.visible = false;
        }
    };
    Globe.prototype.showTrafficLayer = function () {
        if (this.trafficLayer) {
            this.trafficLayer.visible = true;
        }
    };
    Globe.prototype.hideTrafficLayer = function () {
        if (this.trafficLayer) {
            this.trafficLayer.visible = false;
        }
    };
    Globe.prototype.getLevel = function () {
        return this.camera.getLevel();
    };
    Globe.prototype.zoomIn = function () {
        this.setLevel(this.getLevel() + 1);
    };
    Globe.prototype.setLevel = function (level) {
        if (this.camera) {
            this.camera.setLevel(level);
        }
    };
    Globe.prototype.centerTo = function (lon, lat, level) {
        if (level === void 0) { level = this.getLevel(); }
        return this.camera.centerTo(lon, lat, level);
    };
    Globe.prototype.animateTo = function (newLon, newLat, newLevel, duration) {
        if (newLevel === void 0) { newLevel = this.getLevel(); }
        if (duration === void 0) { duration = 1000; }
        return this.camera.animateTo(newLon, newLat, newLevel, duration);
    };
    Globe.prototype.setExtent = function (extent) {
        return this.camera.setExtent(extent);
    };
    Globe.prototype.animateToExtent = function (extent, duration) {
        if (duration === void 0) { duration = 1000; }
        return this.camera.animateToExtent(extent, duration);
    };
    Globe.prototype.isAnimating = function () {
        return this.camera.isAnimating();
    };
    Globe.prototype.animateToLevel = function (level, cb) {
        if (!this.isAnimating()) {
            if (level < Kernel_1.default.MIN_LEVEL) {
                level = Kernel_1.default.MIN_LEVEL;
            }
            if (level > Kernel_1.default.MAX_LEVEL) {
                level = Kernel_1.default.MAX_LEVEL;
            }
            if (level !== this.getLevel()) {
                this.camera.animateToLevel(level, cb);
            }
        }
    };
    Globe.prototype.animateOut = function (cb) {
        this.animateToLevel(this.getLevel() - 1, cb);
    };
    Globe.prototype.animateIn = function (cb) {
        this.animateToLevel(this.getLevel() + 1, cb);
    };
    Globe.prototype._onBeforeRender = function (renderer) {
        this.refresh();
    };
    Globe.prototype._onAfterRender = function (render) {
        this.afterRenderCallbacks.forEach(function (callback) { return callback(); });
        this.afterRenderCallbacks = [];
    };
    Globe.prototype.logRefreshInfo = function () {
        console.log(this.realRefreshCount, this.allRefreshCount, this.realRefreshCount / this.allRefreshCount);
    };
    Globe.prototype.refresh = function (force) {
        if (force === void 0) { force = false; }
        this.allRefreshCount++;
        var timestamp = Date.now();
        this.camera.update(force);
        if (!this.tiledLayer || !this.scene || !this.camera) {
            return;
        }
        if (this.debugStopRefreshTiles) {
            return;
        }
        var newCameraCore = this.camera.getCameraCore();
        var isNeedRefresh = false;
        if (force) {
            isNeedRefresh = true;
        }
        else {
            if (this.isRenderingPaused()) {
                isNeedRefresh = false;
            }
            else {
                if (newCameraCore.equals(this.lastRefreshCameraCore)) {
                    isNeedRefresh = false;
                }
                else {
                    isNeedRefresh = timestamp - this.lastRefreshTimestamp >= this.REFRESH_INTERVAL;
                }
            }
        }
        this.tiledLayer.updateSubLayerCount();
        if (isNeedRefresh) {
            this.realRefreshCount++;
            this.lastRefreshTimestamp = timestamp;
            this.lastRefreshCameraCore = newCameraCore;
            this.tiledLayer.refresh();
        }
        this.tiledLayer.updateTileVisibility();
        if (!this.isRenderingPaused()) {
            var a = !!(this.labelLayer && this.labelLayer.visible);
            var b = !!(this.trafficLayer && this.trafficLayer.visible);
            if (a || b) {
                var lastLevelTileGrids = this.tiledLayer.getLastLevelVisibleTileGrids();
                if (a) {
                    this.labelLayer.updateTiles(this.getLevel(), lastLevelTileGrids);
                }
                if (b) {
                    this.trafficLayer.updateTiles(this.getLevel(), lastLevelTileGrids);
                }
            }
        }
    };
    Globe.prototype.getExtent = function () {
        var extents = [];
        var layerExtent = this.tiledLayer.getExtent();
        if (layerExtent) {
            extents.push(layerExtent);
        }
        var cameraExtent = this.camera.getExtent();
        if (cameraExtent) {
            extents.push(cameraExtent);
        }
        if (extents.length === 0) {
            return null;
        }
        else if (extents.length === 1) {
            return extents[0];
        }
        else {
            return Extent_1.default.intersect(extents);
        }
    };
    Globe.prototype.pick = function (canvasX, canvasY) {
        var pickInfo = this.camera.getPickInfoByCanvas(canvasX, canvasY, false);
        var line = pickInfo.line;
        this.scene.pickByWorldLine(line);
    };
    Globe.prototype.test = function () {
        this.debugStopRefreshTiles = true;
        this.labelLayer.hideAllTiles();
        this.tiledLayer.children.forEach(function (subLayer) { return subLayer.hideAllTiles(); });
        var subLayer = this.tiledLayer.children[this.tiledLayer.children.length - 1];
        subLayer.visible = true;
        subLayer.children[0].visible = true;
        return subLayer;
    };
    Globe.globe = null;
    return Globe;
}());
exports.default = Globe;
;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Renderer = (function () {
    function Renderer(canvas, onBeforeRender, onAfterRender) {
        this.canvas = canvas;
        this.onBeforeRender = onBeforeRender;
        this.onAfterRender = onAfterRender;
        this.scene = null;
        this.camera = null;
        this.renderingPaused = true;
        this.gl = null;
        this.gl = this._getWebGLContext(this.canvas);
        Kernel_1.default.gl = this.gl;
        if (!this.gl) {
            console.debug("浏览器不支持WebGL或将WebGL禁用!");
        }
        var gl = this.gl;
        this.updateViewportSize();
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.depthMask(true);
        gl.enable(gl.CULL_FACE);
        gl.frontFace(gl.CCW);
        gl.cullFace(gl.BACK);
    }
    Renderer.prototype._getWebGLContext = function (canvas) {
        var gl = null;
        try {
            var contextList = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            for (var i = 0; i < contextList.length; i++) {
                gl = canvas.getContext(contextList[i], {
                    antialias: true
                });
                if (gl) {
                    break;
                }
            }
        }
        catch (e) {
            console.error(e);
        }
        return gl;
    };
    Renderer.prototype.render = function (scene, camera) {
        var gl = this.gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.clearColor(0, 0, 0, 1);
        try {
            camera.update();
        }
        catch (e) {
            console.error(e);
        }
        try {
            if (this.onBeforeRender) {
                this.onBeforeRender(this);
            }
        }
        catch (e) {
            console.error(e);
        }
        try {
            if (!this.renderingPaused) {
                scene.draw(camera);
            }
        }
        catch (e) {
            console.error(e);
        }
        try {
            if (this.onAfterRender) {
                this.onAfterRender(this);
            }
        }
        catch (e) {
            console.error(e);
        }
    };
    Renderer.prototype.updateViewportSize = function () {
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    };
    Renderer.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    Renderer.prototype.setCamera = function (camera) {
        this.camera = camera;
    };
    Renderer.prototype._tick = function () {
        if (this.scene && this.camera) {
            this.render(this.scene, this.camera);
        }
        window.requestAnimationFrame(this._tick.bind(this));
    };
    Renderer.prototype.isRenderingPaused = function () {
        return this.renderingPaused;
    };
    Renderer.prototype.pauseRendering = function () {
        this.renderingPaused = true;
    };
    Renderer.prototype.resumeRendering = function () {
        this.renderingPaused = false;
        this._tick();
    };
    return Renderer;
}());
exports.default = Renderer;
;


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Events_1 = __webpack_require__(84);
var Utils_2 = __webpack_require__(7);
var Vertice_1 = __webpack_require__(11);
var Vector_1 = __webpack_require__(12);
var Line_1 = __webpack_require__(51);
var TileGrid_1 = __webpack_require__(32);
var Matrix_1 = __webpack_require__(33);
var Object3D_1 = __webpack_require__(52);
var Extent_1 = __webpack_require__(15);
var CameraCore = (function () {
    function CameraCore(fov, aspect, near, far, floatLevel, matrix) {
        this.fov = fov;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.floatLevel = floatLevel;
        this.matrix = matrix;
    }
    CameraCore.prototype.getFov = function () {
        return this.fov;
    };
    CameraCore.prototype.getAspect = function () {
        return this.aspect;
    };
    CameraCore.prototype.getNear = function () {
        return this.near;
    };
    CameraCore.prototype.getFar = function () {
        return this.far;
    };
    CameraCore.prototype.getFloatLevel = function () {
        return this.floatLevel;
    };
    CameraCore.prototype.getMatrix = function () {
        return this.matrix;
    };
    CameraCore.prototype.equals = function (other) {
        if (!other) {
            return false;
        }
        return this.fov === other.getFov() &&
            this.aspect === other.getAspect() &&
            this.near === other.getNear() &&
            this.far === other.getFar() &&
            this.floatLevel === other.getFloatLevel() &&
            this.matrix.equals(other.getMatrix());
    };
    return CameraCore;
}());
exports.CameraCore = CameraCore;
var realResolutionCache = {};
(function () {
    for (var i = 0; i <= Kernel_1.default.MAX_LEVEL; i++) {
        realResolutionCache[i] = Kernel_1.default.MAX_REAL_RESOLUTION / Math.pow(2, i);
    }
})();
var Camera = (function (_super) {
    __extends(Camera, _super);
    function Camera(width, height, fov, aspect, near, far, level, lonlat, resolutionFactor) {
        if (fov === void 0) { fov = 45; }
        if (aspect === void 0) { aspect = 1; }
        if (near === void 0) { near = 1; }
        if (far === void 0) { far = 100; }
        if (level === void 0) { level = 3; }
        if (lonlat === void 0) { lonlat = [0, 0]; }
        if (resolutionFactor === void 0) { resolutionFactor = Math.pow(2, 0.3752950); }
        var _this = _super.call(this) || this;
        _this.width = width;
        _this.height = height;
        _this.fov = fov;
        _this.aspect = aspect;
        _this.near = near;
        _this.far = far;
        _this.animationDuration = 200;
        _this.nearFactor = 0.6;
        _this.maxPitch = 40;
        _this.isZeroPitch = true;
        _this.level = -1;
        _this.floatLevel = -2;
        _this.lastFloatLevel = -3;
        _this.lastFov = -1;
        _this.lastAspect = -1;
        _this.lastNear = -1;
        _this.lastFar = -1;
        _this.lonlatsOfBoundary = null;
        _this.animating = false;
        _this.eventEmitter = null;
        if (!(resolutionFactor > 0)) {
            resolutionFactor = Math.pow(2, 0.3752950);
        }
        _this.resolutionFactor1 = resolutionFactor;
        _this.resolutionFactor2 = _this.resolutionFactor1 * 2;
        _this.eventEmitter = new Events_1.EventEmitter();
        _this.lonlatsOfBoundary = [];
        _this.initFov = _this.fov;
        _this.lastMatrix = new Matrix_1.default();
        _this.lastMatrix.setUniqueValue(0);
        _this.projMatrix = new Matrix_1.default();
        _this._rawSetPerspectiveMatrix(_this.fov, _this.aspect, _this.near, _this.far);
        _this._initCameraPosition(level, lonlat[0], lonlat[1]);
        _this.update(true);
        return _this;
    }
    Camera.prototype.getExtent = function () {
        var extent = null;
        if (this.isEarthFullOverlapScreen()) {
            var lons = [];
            var lats = [];
            this.lonlatsOfBoundary.forEach(function (lonlat) {
                lons.push(lonlat[0]);
                lats.push(lonlat[1]);
            });
            var minLon = Math.min.apply(Math, lons);
            var maxLon = Math.max.apply(Math, lons);
            var minLat = Math.min.apply(Math, lats);
            var maxLat = Math.max.apply(Math, lats);
            extent = new Extent_1.default(minLon, minLat, maxLon, maxLat);
        }
        return extent;
    };
    Camera.prototype.getEventEmitter = function () {
        return this.eventEmitter;
    };
    Camera.prototype.isEarthFullOverlapScreen = function () {
        return this.lonlatsOfBoundary.length === 8;
    };
    Camera.prototype.getTileGridsOfBoundary = function (level, filterRepeat) {
        var tileGridsOfBoundary = this.lonlatsOfBoundary.map(function (lonlat) {
            return TileGrid_1.default.getTileGridByGeo(lonlat[0], lonlat[1], level);
        });
        return filterRepeat ? Utils_1.default.filterRepeatArray(tileGridsOfBoundary) : tileGridsOfBoundary;
    };
    Camera.prototype.toJson = function () {
        function matrixToJson(mat) {
            return mat ? mat.toJson() : null;
        }
        var json = {
            matrix: matrixToJson(this.matrix),
            isZeroPitch: this.isZeroPitch,
            level: this.level,
            floatLevel: this.floatLevel,
            lastFloatLevel: this.lastFloatLevel,
            lastMatrix: matrixToJson(this.lastMatrix),
            lastFov: this.lastFov,
            lastAspect: this.lastAspect,
            lastNear: this.lastNear,
            lastFar: this.lastFar,
            viewMatrix: matrixToJson(this.viewMatrix),
            projMatrix: matrixToJson(this.projMatrix),
            projViewMatrix: matrixToJson(this.projViewMatrix),
            matrixForDraw: matrixToJson(this.matrixForDraw),
            viewMatrixForDraw: matrixToJson(this.viewMatrixForDraw),
            projMatrixForDraw: matrixToJson(this.projMatrixForDraw),
            projViewMatrixForDraw: matrixToJson(this.projViewMatrixForDraw),
            animating: this.animating
        };
        return json;
    };
    Camera.prototype.toJsonString = function () {
        return JSON.stringify(this.toJson());
    };
    Camera.prototype.fromJson = function (json) {
        this.matrix = Matrix_1.default.fromJson(json.matrix);
        this.isZeroPitch = json.isZeroPitch;
        this.level = json.level;
        this.floatLevel = json.floatLevel;
        this.lastFloatLevel = json.lastFloatLevel;
        this.lastMatrix = Matrix_1.default.fromJson(json.lastMatrix);
        this.lastFov = json.lastFov;
        this.lastAspect = json.lastAspect;
        this.lastNear = json.lastNear;
        this.lastFar = json.lastFar;
        this.viewMatrix = Matrix_1.default.fromJson(json.viewMatrix);
        this.projMatrix = Matrix_1.default.fromJson(json.projMatrix);
        this.projViewMatrix = Matrix_1.default.fromJson(json.projViewMatrix);
        this.matrixForDraw = Matrix_1.default.fromJson(json.matrixForDraw);
        this.viewMatrixForDraw = Matrix_1.default.fromJson(json.viewMatrixForDraw);
        this.projMatrixForDraw = Matrix_1.default.fromJson(json.projMatrixForDraw);
        this.projViewMatrixForDraw = Matrix_1.default.fromJson(json.projViewMatrixForDraw);
        this.animating = json.animating;
        this.update(true);
    };
    Camera.prototype.fromJsonString = function (jsonStr) {
        this.fromJson(JSON.parse(jsonStr));
    };
    Camera.prototype._setPerspectiveMatrix = function (fov, aspect, near, far) {
        this._rawSetPerspectiveMatrix(fov, aspect, near, far);
        this._updateFar();
    };
    Camera.prototype._rawSetPerspectiveMatrix = function (fov, aspect, near, far, projMatrix) {
        if (projMatrix === void 0) { projMatrix = this.projMatrix; }
        if (this.projMatrix === projMatrix) {
            this.fov = fov;
            this.aspect = aspect;
            this.near = near;
            this.far = far;
        }
        var mat = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ];
        var halfFov = fov * Math.PI / 180 / 2;
        var f = 1 / Math.tan(halfFov);
        var nf = 1 / (near - far);
        mat[0] = f / aspect;
        mat[5] = f;
        mat[10] = (far + near) * nf;
        mat[11] = -1;
        mat[14] = 2 * near * far * nf;
        mat[15] = 0;
        projMatrix.setElements(mat[0], mat[1], mat[2], mat[3], mat[4], mat[5], mat[6], mat[7], mat[8], mat[9], mat[10], mat[11], mat[12], mat[13], mat[14], mat[15]);
    };
    Camera.prototype._setFov = function (fov) {
        if (!(fov > 0)) {
            throw "invalid fov:" + fov;
        }
        this._setPerspectiveMatrix(fov, this.aspect, this.near, this.far);
    };
    Camera.prototype.setSize = function (width, height) {
        this.width = width;
        this.height = height;
        this.setAspect(this.width / this.height);
    };
    Camera.prototype.setAspect = function (aspect) {
        if (!(aspect > 0)) {
            throw "invalid aspect:" + aspect;
        }
        this._setPerspectiveMatrix(this.fov, aspect, this.near, this.far);
        this.setLevel(this.level, true);
    };
    Camera.prototype._updateFar = function () {
    };
    Camera.prototype._getMinimalFar = function (cameraPosition) {
        var distance2EarthOrigin = Vector_1.default.fromVertice(cameraPosition).getLength();
        var far = Math.sqrt(distance2EarthOrigin * distance2EarthOrigin - Kernel_1.default.EARTH_RADIUS * Kernel_1.default.EARTH_RADIUS);
        far *= 1.05;
        return far;
    };
    Camera.prototype.update = function (force) {
        if (force === void 0) { force = false; }
        var shouldUpdate = this._updateCore(force);
        if (shouldUpdate) {
            this._updateTileGridsOfBoundary();
        }
        return shouldUpdate;
    };
    Camera.prototype._updateCore = function (force) {
        if (force === void 0) { force = false; }
        var shouldUpdate = force || this._isNeedUpdate();
        if (shouldUpdate) {
            this._normalUpdate();
            this._updateProjViewMatrixForDraw();
        }
        this.lastFov = this.fov;
        this.lastAspect = this.aspect;
        this.lastNear = this.near;
        this.lastFar = this.far;
        this.lastFloatLevel = this.floatLevel;
        this.lastMatrix.setMatrixByOther(this.matrix);
        return shouldUpdate;
    };
    Camera.prototype._updateTileGridsOfBoundary = function () {
        var _this = this;
        var lonlatsOfBoundary = [];
        var ndcs = [
            [-1, 1],
            [-1, 0],
            [-1, -1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, 1],
            [0, -1]
        ];
        ndcs.forEach(function (ndcXY) {
            var lonlat = _this._getPickLonLatByNDC(ndcXY[0], ndcXY[1]);
            if (lonlat && lonlat.length > 0) {
                lonlatsOfBoundary.push(lonlat);
            }
        });
        this.lonlatsOfBoundary = lonlatsOfBoundary;
    };
    Camera.prototype.getCameraCore = function () {
        return new CameraCore(this.fov, this.aspect, this.near, this.far, this.floatLevel, this.matrix.clone());
    };
    Camera.prototype._isNeedUpdate = function () {
        return (this.fov !== this.lastFov) ||
            (this.aspect !== this.lastAspect) ||
            (this.near !== this.lastNear) ||
            (this.far !== this.lastFar) ||
            (this.floatLevel !== this.lastFloatLevel) ||
            (!this.matrix.equals(this.lastMatrix));
    };
    Camera.prototype.getProjViewMatrixForDraw = function () {
        return this.projViewMatrixForDraw;
    };
    Camera.prototype._normalUpdate = function () {
        this.viewMatrix = this.matrix.getInverseMatrix();
        this._updateFar();
        this.projViewMatrix = this.projMatrix.multiplyMatrix(this.viewMatrix);
    };
    Camera.prototype._updateProjViewMatrixForDraw = function () {
        this.matrixForDraw = this.matrix.clone();
        var newFov = this._updatePositionAndFov(this.matrixForDraw);
        var aspect = this.aspect;
        var near = this.near;
        var newFar = this.far;
        this.projMatrixForDraw = new Matrix_1.default();
        this._rawSetPerspectiveMatrix(newFov, aspect, near, newFar, this.projMatrixForDraw);
        this.viewMatrixForDraw = this.matrixForDraw.getInverseMatrix();
        this.projViewMatrixForDraw = this.projMatrixForDraw.multiplyMatrix(this.viewMatrixForDraw);
    };
    Camera.prototype._updatePositionAndFov = function (cameraMatrix) {
        var currentLevel = this.animating ? this.floatLevel : this.level;
        var safeLevel = this._getSafeThresholdLevelForNear();
        if (currentLevel > safeLevel) {
            this._updatePositionByLevel(safeLevel, cameraMatrix);
            var deltaLevel = currentLevel - safeLevel;
            var newFov = this._calculateFovByDeltaLevel(this.initFov, deltaLevel);
            return newFov;
        }
        else {
            this._updatePositionByLevel(currentLevel, cameraMatrix);
            return this.initFov;
        }
    };
    Camera.prototype._getSafeThresholdLevelForNear = function () {
        var thresholdNear = this.near * this.nearFactor;
        var result = this._calculateResolutionAndBestDisplayLevelByDistance2EarthSurface(thresholdNear);
        var level = result[1];
        return level;
    };
    Camera.prototype._calculateDeltaLevelByFov = function (oldFov, newFov) {
        var radianOldFov = Utils_2.default.degreeToRadian(oldFov);
        var halfRadianOldFov = radianOldFov / 2;
        var tanOld = Math.tan(halfRadianOldFov);
        var radianNewFov = Utils_2.default.degreeToRadian(newFov);
        var halfRadianNewFov = radianNewFov / 2;
        var tanNew = Math.tan(halfRadianNewFov);
        var deltaLevel = Utils_2.default.log2(tanOld / tanNew);
        return deltaLevel;
    };
    Camera.prototype._calculateFovByDeltaLevel = function (oldFov, deltaLevel) {
        var radianOldFov = Utils_2.default.degreeToRadian(oldFov);
        var halfRadianOldFov = radianOldFov / 2;
        var tanOld = Math.tan(halfRadianOldFov);
        var tanNew = tanOld / Math.pow(2, deltaLevel);
        var halfRadianNewFov = Math.atan(tanNew);
        var radianNewFov = halfRadianNewFov * 2;
        var newFov = Utils_2.default.radianToDegree(radianNewFov);
        return newFov;
    };
    Camera.prototype.getResolution = function () {
        var _a = this.measureXYResolutionAndBestDisplayLevel(), resolutionX = _a.resolutionX, bestDisplayLevelFloatX = _a.bestDisplayLevelFloatX, resolutionY = _a.resolutionY, bestDisplayLevelFloatY = _a.bestDisplayLevelFloatY;
        return (resolutionX + resolutionY) / 2 / this.resolutionFactor1;
    };
    Camera.prototype.getResolutionInWorld = function () {
        return this.getResolution() / Kernel_1.default.SCALE_FACTOR;
    };
    Camera.prototype.getResolutionInWorld2 = function () {
        if (realResolutionCache.hasOwnProperty(this.level)) {
            return realResolutionCache[this.level];
        }
        else {
            return Kernel_1.default.MAX_REAL_RESOLUTION / Math.pow(2, this.level);
        }
    };
    Camera.prototype.measureXYResolutionAndBestDisplayLevel = function () {
        var p = this.matrix.getPosition();
        var dir = Vector_1.default.fromVertice(p);
        var line = new Line_1.default(p, dir);
        var pickResult1 = this._getPickCartesianCoordInEarthByLine(line);
        var p1 = pickResult1[0];
        var ndc1 = this._convertVerticeFromWorldToNDC(p1);
        var canvasXY1 = Utils_2.default.convertPointFromNdcToCanvas(this.width, this.height, ndc1.x, ndc1.y);
        var centerX = canvasXY1[0];
        var centerY = canvasXY1[1];
        var offsetPixel = 10;
        var leftPickResult = this.getPickCartesianCoordInEarthByCanvas(centerX - offsetPixel, centerY);
        var vLeft = Vector_1.default.fromVertice(leftPickResult[0]);
        var rightPickResult = this.getPickCartesianCoordInEarthByCanvas(centerX + offsetPixel, centerY);
        var vRight = Vector_1.default.fromVertice(rightPickResult[0]);
        var α = Vector_1.default.getRadianOfTwoVectors(vLeft, vRight);
        var resolutionX = α * Kernel_1.default.EARTH_RADIUS / (2 * offsetPixel) * this.resolutionFactor1;
        var bestDisplayLevelFloatX = this._calculateLevelByResolution(resolutionX);
        var topPickResult = this.getPickCartesianCoordInEarthByCanvas(centerX, centerY + offsetPixel);
        var vTop = Vector_1.default.fromVertice(topPickResult[0]);
        var bottomPickResult = this.getPickCartesianCoordInEarthByCanvas(centerX, centerY - offsetPixel);
        var vBottom = Vector_1.default.fromVertice(bottomPickResult[0]);
        var β = Vector_1.default.getRadianOfTwoVectors(vTop, vBottom);
        var resolutionY = β * Kernel_1.default.EARTH_RADIUS / (2 * offsetPixel) * this.resolutionFactor1;
        var bestDisplayLevelFloatY = this._calculateLevelByResolution(resolutionY);
        return {
            resolutionX: resolutionX,
            bestDisplayLevelFloatX: bestDisplayLevelFloatX,
            resolutionY: resolutionY,
            bestDisplayLevelFloatY: bestDisplayLevelFloatY
        };
    };
    Camera.prototype.calculateCurrentResolutionAndBestDisplayLevel = function () {
        var distance2EarthOrigin = this.getDistance2EarthOrigin();
        return this._calculateResolutionAndBestDisplayLevelByDistance2EarthOrigin(distance2EarthOrigin);
    };
    Camera.prototype._calculateResolutionAndBestDisplayLevelByDistance2EarthOrigin = function (distance2EarthOrigin) {
        var α2 = Utils_2.default.degreeToRadian(this.fov / 2);
        var α1 = Math.atan(2 / this.height * Math.tan(α2));
        var δ = Math.asin(distance2EarthOrigin * Math.sin(α1) / Kernel_1.default.EARTH_RADIUS);
        var β = δ - α1;
        var resolution = β * Kernel_1.default.EARTH_RADIUS * this.resolutionFactor2;
        var bestDisplayLevelFloat = this._calculateLevelByResolution(resolution);
        return [resolution, bestDisplayLevelFloat];
    };
    Camera.prototype._calculateResolutionAndBestDisplayLevelByDistance2EarthSurface = function (distance2EarthSurface) {
        var distance2EarthOrigin = distance2EarthSurface + Kernel_1.default.EARTH_RADIUS;
        return this._calculateResolutionAndBestDisplayLevelByDistance2EarthOrigin(distance2EarthOrigin);
    };
    Camera.prototype._calculateDistance2EarthSurfaceByBestDisplayLevel = function (level) {
        return this._calculateDistance2EarthOriginByBestDisplayLevel(level) - Kernel_1.default.EARTH_RADIUS;
    };
    Camera.prototype._calculateDistance2EarthOriginByBestDisplayLevel = function (level) {
        var resolution = this._calculateResolutionByLevel(level);
        return this._calculateDistance2EarthOriginByResolution(resolution);
    };
    Camera.prototype._calculateDistance2EarthOriginByResolution = function (resolution) {
        resolution /= this.resolutionFactor2;
        var α2 = Utils_2.default.degreeToRadian(this.fov / 2);
        var α1 = Math.atan(2 / this.height * Math.tan(α2));
        var β = resolution / Kernel_1.default.EARTH_RADIUS;
        var δ = α1 + β;
        var distance2EarthOrigin = Kernel_1.default.EARTH_RADIUS * Math.sin(δ) / Math.sin(α1);
        return distance2EarthOrigin;
    };
    Camera.prototype._calculateLevelByResolution = function (resolution) {
        var pow2value = Kernel_1.default.MAX_RESOLUTION / resolution;
        var bestDisplayLevelFloat = Utils_2.default.log2(pow2value);
        return bestDisplayLevelFloat;
    };
    Camera.prototype._calculateResolutionByLevel = function (level) {
        return Kernel_1.default.MAX_RESOLUTION / Math.pow(2, level);
    };
    Camera.prototype.getVertice = function () {
        var origin2PositionVector = Vector_1.default.fromVertice(this.getPosition());
        origin2PositionVector.setLength(Kernel_1.default.EARTH_RADIUS);
        var p = origin2PositionVector.getVertice();
        return p;
    };
    Camera.prototype.getLonlat = function () {
        var p = this.getVertice();
        var lonlat = Utils_2.default.cartesianCoordToGeographic(p);
        return lonlat;
    };
    Camera.prototype.getLevel = function () {
        return this.level;
    };
    Camera.prototype.setLevel = function (level, force) {
        if (force === void 0) { force = false; }
        if (!(Utils_1.default.isNonNegativeInteger(level))) {
            throw "invalid level:" + level;
        }
        if (level < Kernel_1.default.MIN_LEVEL) {
            level = Kernel_1.default.MIN_LEVEL;
        }
        if (level > Kernel_1.default.MAX_LEVEL) {
            level = Kernel_1.default.MAX_LEVEL;
        }
        var oldLevel = this.level;
        var levelChanged = level !== this.level;
        if (levelChanged || force) {
            this._updatePositionByLevel(level, this.matrix);
            this.level = level;
            this.floatLevel = level;
        }
        if (levelChanged) {
            Utils_1.default.publish('level-change', {
                oldLevel: oldLevel,
                newLevel: this.level
            });
        }
    };
    Camera.prototype._initCameraPosition = function (level, lon, lat) {
        var initDistanceToOrigin = this._calculateDistance2EarthOriginByBestDisplayLevel(level);
        var initPosition = Utils_2.default.geographicToCartesianCoord(lon, lat, initDistanceToOrigin);
        var origin = new Vertice_1.default(0, 0, 0);
        var vector = this.getLightDirection().getOpposite();
        vector.setLength(initDistanceToOrigin);
        this._look(initPosition, origin);
        this.setLevel(level);
    };
    Camera.prototype._updatePositionByLevel = function (level, cameraMatrix) {
        var intersects = this._getDirectionIntersectPointWithEarth(cameraMatrix);
        if (intersects.length === 0) {
            throw "no intersect";
        }
        var intersect = intersects[0];
        var theoryDistance2Interscet = this._calculateDistance2EarthSurfaceByBestDisplayLevel(level);
        var vector = cameraMatrix.getVectorZ();
        vector.setLength(theoryDistance2Interscet);
        var newCameraPosition = Vector_1.default.verticePlusVector(intersect, vector);
        cameraMatrix.setPosition(newCameraPosition);
    };
    Camera.prototype.setDeltaPitch = function (deltaPitch) {
        if (this.level < Kernel_1.default.MIN_PITCH_LEVEL || !this.isEarthFullOverlapScreen()) {
            return;
        }
        var currentPitch = this.getPitch();
        var newPitch = currentPitch + deltaPitch;
        if (newPitch > this.maxPitch) {
            return;
        }
        if (newPitch < 0) {
            newPitch = 0;
        }
        deltaPitch = newPitch - currentPitch;
        if (deltaPitch === 0) {
            return;
        }
        var intersects = this._getDirectionIntersectPointWithEarth(this.matrix);
        if (intersects.length === 0) {
            throw "no intersects";
        }
        var intersect = intersects[0];
        var deltaRadian = Utils_2.default.degreeToRadian(deltaPitch);
        var matrix = this.matrix.clone();
        matrix.setPosition(intersect);
        matrix.localRotateX(deltaRadian);
        this._updatePositionByLevel(this.level, matrix);
        this.isZeroPitch = newPitch === 0;
        this.matrix = matrix;
    };
    Camera.prototype.getPitch = function () {
        if (this.isZeroPitch) {
            return 0;
        }
        var intersects = this._getDirectionIntersectPointWithEarth(this.matrix);
        if (intersects.length === 0) {
            throw "no intersects";
        }
        var intersect = intersects[0];
        var vectorOrigin2Intersect = Vector_1.default.fromVertice(intersect);
        var length1 = vectorOrigin2Intersect.getLength();
        var vectorIntersect2Camera = Vector_1.default.verticeMinusVertice(this.getPosition(), intersect);
        var length2 = vectorIntersect2Camera.getLength();
        var cosθ = vectorOrigin2Intersect.dot(vectorIntersect2Camera) / (length1 * length2);
        var radian = Utils_2.default.acosSafely(cosθ);
        var crossVector = vectorOrigin2Intersect.cross(vectorIntersect2Camera);
        var xAxisDirection = this.matrix.getVectorX();
        if (crossVector.dot(xAxisDirection)) {
            radian = Math.abs(radian);
        }
        else {
            radian = -Math.abs(radian);
        }
        var pitch = Utils_2.default.radianToDegree(radian);
        if (pitch >= 90) {
            throw "Invalid pitch: " + pitch;
        }
        return pitch;
    };
    Camera.prototype.getPickInfoByCanvas = function (canvasX, canvasY, verticesResult) {
        if (verticesResult === void 0) { verticesResult = false; }
        var result = {
            line: null,
            vertices: []
        };
        this._updateCore();
        var matrix = this.matrix;
        var viewMatrix = this.viewMatrix;
        var projMatrix = this.projMatrix;
        var projViewMatrix = this.projViewMatrix;
        this.matrix = this.matrixForDraw;
        this.viewMatrix = this.viewMatrixForDraw;
        this.projMatrix = this.projMatrixForDraw;
        this.projViewMatrix = this.projViewMatrixForDraw;
        var pickDirection = this._getPickDirectionByCanvas(canvasX, canvasY);
        var p = this.getPosition();
        result.line = new Line_1.default(p, pickDirection);
        if (verticesResult) {
            result.vertices = this._getPickCartesianCoordInEarthByLine(result.line);
        }
        this.matrix = matrix;
        this.viewMatrix = viewMatrix;
        this.projMatrix = projMatrix;
        this.projViewMatrix = projViewMatrix;
        return result;
    };
    Camera.prototype.getPickCartesianCoordInEarthByCanvas = function (canvasX, canvasY) {
        var pickInfo = this.getPickInfoByCanvas(canvasX, canvasY, true);
        return pickInfo.vertices;
    };
    Camera.prototype.getLightDirection = function () {
        var dirVertice = this.matrix.getVectorZ();
        var direction = new Vector_1.default(-dirVertice.x, -dirVertice.y, -dirVertice.z);
        direction.normalize();
        return direction;
    };
    Camera.prototype.getDistance2EarthSurface = function () {
        var position = this.getPosition();
        var length2EarthSurface = Vector_1.default.fromVertice(position).getLength() - Kernel_1.default.EARTH_RADIUS;
        return length2EarthSurface;
    };
    Camera.prototype.getDistance2EarthOrigin = function () {
        var position = this.getPosition();
        return Vector_1.default.fromVertice(position).getLength();
    };
    Camera.prototype.isAnimating = function () {
        return this.animating;
    };
    Camera.prototype.centerTo = function (newLon, newLat, newLevel) {
        if (newLevel === void 0) { newLevel = this.getLevel(); }
        if (newLevel !== this.getLevel()) {
            var newPosition = this._safelyGetNewPositonByLevel(newLevel);
            var newDistance = Vector_1.default.fromVertice(newPosition).getLength();
            this._setPositionByLonLatDistance(newLon, newLat, newDistance);
        }
        else {
            this._setPositionByLonLatDistance(newLon, newLat);
        }
        this.setLevel(newLevel, true);
    };
    Camera.prototype.animateTo = function (newLon, newLat, newLevel, duration) {
        var _this = this;
        if (newLevel === void 0) { newLevel = this.getLevel(); }
        if (duration === void 0) { duration = 1000; }
        var promise = new Promise(function (resolve, reject) {
            if (_this.isAnimating()) {
                reject("be animating");
                return;
            }
            var _a = _this.getLonlat(), startLon = _a[0], startLat = _a[1];
            var singleSpan = 1000 / 60;
            var count = Math.floor(duration / singleSpan);
            var start = -1;
            var deltaLon = (newLon - startLon) / count;
            var deltaLat = (newLat - startLat) / count;
            var deltaLevel = 0;
            var deltaHeight = 0;
            if (newLevel !== _this.level) {
                deltaLevel = (newLevel - _this.level) / count;
                var startDistance = _this.getDistance2EarthOrigin();
                var newPosition = _this._safelyGetNewPositonByLevel(newLevel);
                var newDistance = Vector_1.default.fromVertice(newPosition).getLength();
                deltaHeight = (newDistance - startDistance) / count;
            }
            _this.animating = true;
            var callback = function (timestap) {
                if (start < 0) {
                    start = timestap;
                }
                var a = timestap - start;
                if (a >= duration) {
                    _this.animating = false;
                    _this.floatLevel = newLevel;
                    _this.centerTo(newLon, newLat, newLevel);
                    resolve();
                }
                else {
                    _this.floatLevel += deltaLevel;
                    _this._setPositionByDeltaLonLatDistance(deltaLon, deltaLat, deltaHeight);
                    requestAnimationFrame(callback);
                }
            };
            requestAnimationFrame(callback);
        });
        return promise;
    };
    Camera.prototype.animateToLevel = function (newLevel, cb) {
        var _this = this;
        if (this.isAnimating()) {
            return;
        }
        if (!(Utils_1.default.isNonNegativeInteger(newLevel))) {
            throw "invalid level:" + newLevel;
        }
        var newPosition = this._safelyGetNewPositonByLevel(newLevel);
        var oldPosition = this.getPosition();
        var span = this.animationDuration;
        var singleSpan = 1000 / 60;
        var count = Math.floor(span / singleSpan);
        var deltaX = (newPosition.x - oldPosition.x) / count;
        var deltaY = (newPosition.y - oldPosition.y) / count;
        var deltaZ = (newPosition.z - oldPosition.z) / count;
        var deltaLevel = (newLevel - this.level) / count;
        var start = -1;
        this.floatLevel = this.level;
        this.animating = true;
        var callback = function (timestap) {
            if (start < 0) {
                start = timestap;
            }
            var a = timestap - start;
            if (a >= span) {
                _this.animating = false;
                _this.floatLevel = newLevel;
                _this.setLevel(newLevel);
                if (cb) {
                    cb();
                }
            }
            else {
                _this.floatLevel += deltaLevel;
                var p = _this.getPosition();
                _this.setPosition(new Vertice_1.default(p.x + deltaX, p.y + deltaY, p.z + deltaZ));
                requestAnimationFrame(callback);
            }
        };
        requestAnimationFrame(callback);
    };
    Camera.prototype.setExtent = function (extent) {
        if (extent) {
            var _a = this._calculateLonLatLevelByExtent(extent), lon = _a[0], lat = _a[1], level = _a[2];
            this.centerTo(lon, lat, level);
        }
    };
    Camera.prototype.animateToExtent = function (extent, duration) {
        if (duration === void 0) { duration = 1000; }
        var _a = this._calculateLonLatLevelByExtent(extent), lon = _a[0], lat = _a[1], level = _a[2];
        return this.animateTo(lon, lat, level, duration);
    };
    Camera.prototype._safelyGetNewPositonByLevel = function (newLevel) {
        var newCameraMatrix = this.matrix.clone();
        this._updatePositionByLevel(newLevel, newCameraMatrix);
        var newPosition = newCameraMatrix.getPosition();
        return newPosition;
    };
    Camera.prototype._setPositionByLonLatDistance = function (newLon, newLat, newLengthFromOrigin2Positon) {
        var _a = this.getLonlat(), lon = _a[0], lat = _a[1];
        var deltaLon = newLon - lon;
        var deltaLat = newLat - lat;
        this._setPositionByDeltaLonLatDistance(deltaLon, deltaLat);
        if (newLengthFromOrigin2Positon > 0) {
            this._setPositionByDistanceFromOrigin2Camera(newLengthFromOrigin2Positon);
        }
    };
    Camera.prototype._setPositionByDeltaLonLatDistance = function (deltaLon, deltaLat, deltaHeight) {
        var deltaLonRadian = Utils_2.default.degreeToRadian(deltaLon);
        var deltaLatRadian = Utils_2.default.degreeToRadian(deltaLat);
        this.worldRotateY(deltaLonRadian);
        var vector1 = Vector_1.default.fromVertice(this.getPosition());
        var vector2 = new Vector_1.default(0, 1, 0);
        var crossAxis = vector1.cross(vector2);
        this.worldRotateByVector(deltaLatRadian, crossAxis);
        if (deltaHeight > 0 || deltaHeight < 0) {
            var vectorFromOrigin2Position = Vector_1.default.fromVertice(this.getPosition());
            var newLength = vectorFromOrigin2Position.getLength() + deltaHeight;
            vectorFromOrigin2Position.setLength(newLength);
            var newPosition = vectorFromOrigin2Position.getVertice();
            this.setPosition(newPosition);
        }
    };
    Camera.prototype._setPositionByDistanceFromOrigin2Camera = function (newLengthFromOrigin2Positon) {
        var vectorFromOrigin2Position = Vector_1.default.fromVertice(this.getPosition());
        vectorFromOrigin2Position.setLength(newLengthFromOrigin2Positon);
        var newPosition = vectorFromOrigin2Position.getVertice();
        this.setPosition(newPosition);
    };
    Camera.prototype._safelyGetValidLevel = function (level) {
        if (level > Kernel_1.default.MAX_LEVEL) {
            level = Kernel_1.default.MAX_LEVEL;
        }
        else if (level < Kernel_1.default.MIN_LEVEL) {
            level = Kernel_1.default.MIN_LEVEL;
        }
        return level;
    };
    Camera.prototype._calculateLonLatLevelByExtent = function (extent) {
        var centerLon = (extent.getMinLon() + extent.getMaxLon()) / 2;
        var centerLat = (extent.getMinLat() + extent.getMaxLat()) / 2;
        var deltaLon = extent.getMaxLon() - extent.getMinLon();
        var deltaLonRadian = Utils_2.default.degreeToRadian(deltaLon);
        var deltaLength = Kernel_1.default.EARTH_RADIUS * deltaLonRadian;
        var resolution = deltaLength / this.width;
        var bestFloatLevel = this._calculateLevelByResolution(resolution);
        var level = Math.floor(bestFloatLevel);
        level = this._safelyGetValidLevel(level);
        return [centerLon, centerLat, level];
    };
    Camera.prototype._look = function (cameraPnt, targetPnt, upDirection) {
        if (upDirection === void 0) { upDirection = new Vector_1.default(0, 1, 0); }
        var cameraPntCopy = cameraPnt.clone();
        var targetPntCopy = targetPnt.clone();
        var up = upDirection.clone();
        var zAxis = new Vector_1.default(cameraPntCopy.x - targetPntCopy.x, cameraPntCopy.y - targetPntCopy.y, cameraPntCopy.z - targetPntCopy.z);
        zAxis.normalize();
        var xAxis = up.cross(zAxis).normalize();
        var yAxis = zAxis.cross(xAxis).normalize();
        this.matrix.setVectorX(xAxis);
        this.matrix.setVectorY(yAxis);
        this.matrix.setVectorZ(zAxis);
        this.matrix.setPosition(cameraPntCopy);
        this.matrix.setLastRowDefault();
        this._updateFar();
    };
    Camera.prototype._lookAt = function (targetPnt, upDirection) {
        var targetPntCopy = targetPnt.clone();
        var position = this.getPosition();
        this._look(position, targetPntCopy, upDirection);
    };
    Camera.prototype._getPickDirectionByCanvas = function (canvasX, canvasY) {
        var ndcXY = Utils_2.default.convertPointFromCanvasToNDC(this.width, this.height, canvasX, canvasY);
        var pickDirection = this._getPickDirectionByNDC(ndcXY[0], ndcXY[1]);
        return pickDirection;
    };
    Camera.prototype._getDirectionIntersectPointWithEarth = function (cameraMatrix) {
        var dir = cameraMatrix.getVectorZ().getOpposite();
        var p = cameraMatrix.getPosition();
        var line = new Line_1.default(p, dir);
        var result = this._getPickCartesianCoordInEarthByLine(line);
        return result;
    };
    Camera.prototype._getPickDirectionByNDC = function (ndcX, ndcY) {
        var verticeInNDC = new Vertice_1.default(ndcX, ndcY, 0.499);
        var verticeInWorld = this._convertVerticeFromNdcToWorld(verticeInNDC);
        var cameraPositon = this.getPosition();
        var pickDirection = Vector_1.default.verticeMinusVertice(verticeInWorld, cameraPositon);
        pickDirection.normalize();
        return pickDirection;
    };
    Camera.prototype._getPickCartesianCoordInEarthByLine = function (line) {
        var result = [];
        var pickVertices = Utils_2.default.getLineIntersectPointWithEarth(line);
        if (pickVertices.length === 0) {
            result = [];
        }
        else if (pickVertices.length == 1) {
            result = pickVertices;
        }
        else if (pickVertices.length == 2) {
            var pickVerticeA = pickVertices[0];
            var pickVerticeB = pickVertices[1];
            var cameraVertice = this.getPosition();
            var lengthA = Utils_2.default.getLengthFromVerticeToVertice(cameraVertice, pickVerticeA);
            var lengthB = Utils_2.default.getLengthFromVerticeToVertice(cameraVertice, pickVerticeB);
            result = lengthA <= lengthB ? [pickVerticeA, pickVerticeB] : [pickVerticeB, pickVerticeA];
        }
        return result;
    };
    Camera.prototype._getPickLonLatByNDC = function (ndcX, ndcY) {
        var result = null;
        var vertices = this._getPickCartesianCoordInEarthByNDC(ndcX, ndcY);
        if (vertices.length > 0) {
            result = Utils_2.default.cartesianCoordToGeographic(vertices[0]);
        }
        return result;
    };
    Camera.prototype._getPickCartesianCoordInEarthByNDC = function (ndcX, ndcY) {
        var pickDirection = this._getPickDirectionByNDC(ndcX, ndcY);
        var p = this.getPosition();
        var line = new Line_1.default(p, pickDirection);
        var result = this._getPickCartesianCoordInEarthByLine(line);
        return result;
    };
    Camera.prototype._getPlanXOZ = function () {
        var position = this.getPosition();
        var direction = this.getLightDirection();
        var plan = Utils_2.default.getCrossPlaneByLine(position, direction);
        return plan;
    };
    Camera.prototype._convertVerticeFromWorldToNDC = function (verticeInWorld) {
        var columnWorld = [verticeInWorld.x, verticeInWorld.y, verticeInWorld.z, 1];
        var columnProject = this.projViewMatrix.multiplyColumn(columnWorld);
        var w = columnProject[3];
        var columnNDC = [];
        columnNDC[0] = columnProject[0] / w;
        columnNDC[1] = columnProject[1] / w;
        columnNDC[2] = columnProject[2] / w;
        columnNDC[3] = 1;
        var verticeInNDC = new Vertice_1.default(columnNDC[0], columnNDC[1], columnNDC[2]);
        return verticeInNDC;
    };
    Camera.prototype._convertVerticeFromNdcToWorld = function (verticeInNDC) {
        var columnNDC = [verticeInNDC.x, verticeInNDC.y, verticeInNDC.z, 1];
        var inverseProj = this.projMatrix.getInverseMatrix();
        var columnCameraTemp = inverseProj.multiplyColumn(columnNDC);
        var cameraX = columnCameraTemp[0] / columnCameraTemp[3];
        var cameraY = columnCameraTemp[1] / columnCameraTemp[3];
        var cameraZ = columnCameraTemp[2] / columnCameraTemp[3];
        var cameraW = 1;
        var columnCamera = [cameraX, cameraY, cameraZ, cameraW];
        var columnWorld = this.matrix.multiplyColumn(columnCamera);
        var verticeInWorld = new Vertice_1.default(columnWorld[0], columnWorld[1], columnWorld[2]);
        return verticeInWorld;
    };
    Camera.prototype._convertVerticeFromCameraToWorld = function (verticeInCamera) {
        var verticeInCameraCopy = verticeInCamera.clone();
        var column = [verticeInCameraCopy.x, verticeInCameraCopy.y, verticeInCameraCopy.z, 1];
        var column2 = this.matrix.multiplyColumn(column);
        var verticeInWorld = new Vertice_1.default(column2[0], column2[1], column2[2]);
        return verticeInWorld;
    };
    Camera.prototype._convertVectorFromCameraToWorld = function (vectorInCamera) {
        var vectorInCameraCopy = vectorInCamera.clone();
        var verticeInCamera = vectorInCameraCopy.getVertice();
        var verticeInWorld = this._convertVerticeFromCameraToWorld(verticeInCamera);
        var originInWorld = this.getPosition();
        var vectorInWorld = Vector_1.default.verticeMinusVertice(verticeInWorld, originInWorld);
        vectorInWorld.normalize();
        return vectorInWorld;
    };
    Camera.prototype._isWorldVerticeVisibleInCanvas = function (verticeInWorld, options) {
        if (options === void 0) { options = {}; }
        var threshold = typeof options.threshold == "number" ? Math.abs(options.threshold) : 1;
        var cameraP = this.getPosition();
        var dir = Vector_1.default.verticeMinusVertice(verticeInWorld, cameraP);
        var line = new Line_1.default(cameraP, dir);
        var pickResult = this._getPickCartesianCoordInEarthByLine(line);
        if (pickResult.length > 0) {
            var pickVertice = pickResult[0];
            var length2Vertice = Utils_2.default.getLengthFromVerticeToVertice(cameraP, verticeInWorld);
            var length2Pick = Utils_2.default.getLengthFromVerticeToVertice(cameraP, pickVertice);
            if (length2Vertice < length2Pick + 5) {
                if (!(options.verticeInNDC instanceof Vertice_1.default)) {
                    options.verticeInNDC = this._convertVerticeFromWorldToNDC(verticeInWorld);
                }
                var result = options.verticeInNDC.x >= -1 && options.verticeInNDC.x <= 1 && options.verticeInNDC.y >= -threshold && options.verticeInNDC.y <= 1;
                return result;
            }
        }
        return false;
    };
    Camera.prototype._isGeoVisibleInCanvas = function (lon, lat, options) {
        var verticeInWorld = Utils_2.default.geographicToCartesianCoord(lon, lat);
        var result = this._isWorldVerticeVisibleInCanvas(verticeInWorld, options);
        return result;
    };
    Camera.prototype.getVisibleTilesByLevel = function (level, options) {
        if (options === void 0) { options = {}; }
        if (!(level >= 0)) {
            throw "invalid level";
        }
        var result = [];
        var LOOP_LIMIT = Math.min(10, Math.pow(2, level) - 1);
        var mathOptions = {
            maxSize: Math.pow(2, level)
        };
        function checkVisible(visibleInfo) {
            if (visibleInfo.area >= 5000 && visibleInfo.clockwise) {
                if (visibleInfo.visibleCount >= 1) {
                    return true;
                }
            }
            return false;
        }
        function handleRow(centerRow, centerColumn) {
            var result = [];
            var grid = new TileGrid_1.default(level, centerRow, centerColumn);
            var visibleInfo = this._getTileVisibleInfo(grid.level, grid.row, grid.column, options);
            var isRowCenterVisible = checkVisible(visibleInfo);
            if (isRowCenterVisible) {
                grid.visibleInfo = visibleInfo;
                result.push(grid);
                var leftLoopTime = 0;
                var leftColumn = centerColumn;
                var visible;
                while (leftLoopTime < LOOP_LIMIT) {
                    leftLoopTime++;
                    grid = TileGrid_1.default.getTileGridByBrother(level, centerRow, leftColumn, TileGrid_1.TileGridPosition.LEFT, mathOptions);
                    leftColumn = grid.column;
                    visibleInfo = this._getTileVisibleInfo(grid.level, grid.row, grid.column, options);
                    visible = checkVisible(visibleInfo);
                    if (visible) {
                        grid.visibleInfo = visibleInfo;
                        result.push(grid);
                    }
                    else {
                        break;
                    }
                }
                var rightLoopTime = 0;
                var rightColumn = centerColumn;
                while (rightLoopTime < LOOP_LIMIT) {
                    rightLoopTime++;
                    grid = TileGrid_1.default.getTileGridByBrother(level, centerRow, rightColumn, TileGrid_1.TileGridPosition.RIGHT, mathOptions);
                    rightColumn = grid.column;
                    visibleInfo = this._getTileVisibleInfo(grid.level, grid.row, grid.column, options);
                    visible = checkVisible(visibleInfo);
                    if (visible) {
                        grid.visibleInfo = visibleInfo;
                        result.push(grid);
                    }
                    else {
                        break;
                    }
                }
            }
            return result;
        }
        var centerGrid = null;
        var verticalCenterInfo = this._getVerticalVisibleCenterInfo();
        if (TileGrid_1.default.isValidLatitude(verticalCenterInfo.lat)) {
            centerGrid = TileGrid_1.default.getTileGridByGeo(verticalCenterInfo.lon, verticalCenterInfo.lat, level);
        }
        else {
            centerGrid = new TileGrid_1.default(level, 0, 0);
        }
        var handleRowThis = handleRow.bind(this);
        var rowResult = handleRowThis(centerGrid.row, centerGrid.column);
        result = result.concat(rowResult);
        var grid;
        var bottomLoopTime = 0;
        var bottomRow = centerGrid.row;
        while (bottomLoopTime < LOOP_LIMIT) {
            bottomLoopTime++;
            grid = TileGrid_1.default.getTileGridByBrother(level, bottomRow, centerGrid.column, TileGrid_1.TileGridPosition.BOTTOM, mathOptions);
            bottomRow = grid.row;
            rowResult = handleRowThis(grid.row, grid.column);
            if (rowResult.length > 0) {
                result = result.concat(rowResult);
            }
            else {
                break;
            }
        }
        var topLoopTime = 0;
        var topRow = centerGrid.row;
        while (topLoopTime < LOOP_LIMIT) {
            topLoopTime++;
            grid = TileGrid_1.default.getTileGridByBrother(level, topRow, centerGrid.column, TileGrid_1.TileGridPosition.TOP, mathOptions);
            topRow = grid.row;
            rowResult = handleRowThis(grid.row, grid.column);
            if (rowResult.length > 0) {
                result = result.concat(rowResult);
            }
            else {
                break;
            }
        }
        return result;
    };
    Camera.prototype._getTileVisibleInfo = function (level, row, column, options) {
        if (!(level >= 0)) {
            throw "invalid level";
        }
        if (!(row >= 0)) {
            throw "invalid row";
        }
        if (!(column >= 0)) {
            throw "invalid column";
        }
        var threshold = typeof options.threshold == "number" ? Math.abs(options.threshold) : 1;
        options.threshold = threshold;
        var result = {
            lb: {
                lon: null,
                lat: null,
                verticeInWorld: null,
                verticeInNDC: null,
                visible: false
            },
            lt: {
                lon: null,
                lat: null,
                verticeInWorld: null,
                verticeInNDC: null,
                visible: false
            },
            rt: {
                lon: null,
                lat: null,
                verticeInWorld: null,
                verticeInNDC: null,
                visible: false
            },
            rb: {
                lon: null,
                lat: null,
                verticeInWorld: null,
                verticeInNDC: null,
                visible: false
            },
            Egeo: null,
            visibleCount: 0,
            clockwise: false,
            width: null,
            height: null,
            area: null
        };
        result.Egeo = Utils_2.default.getTileGeographicEnvelopByGrid(level, row, column);
        var tileMinLon = result.Egeo.minLon;
        var tileMaxLon = result.Egeo.maxLon;
        var tileMinLat = result.Egeo.minLat;
        var tileMaxLat = result.Egeo.maxLat;
        result.lb.lon = tileMinLon;
        result.lb.lat = tileMinLat;
        result.lb.verticeInWorld = Utils_2.default.geographicToCartesianCoord(result.lb.lon, result.lb.lat);
        result.lb.verticeInNDC = this._convertVerticeFromWorldToNDC(result.lb.verticeInWorld);
        result.lb.visible = this._isWorldVerticeVisibleInCanvas(result.lb.verticeInWorld, {
            verticeInNDC: result.lb.verticeInNDC,
            threshold: threshold
        });
        if (result.lb.visible) {
            result.visibleCount++;
        }
        result.lt.lon = tileMinLon;
        result.lt.lat = tileMaxLat;
        result.lt.verticeInWorld = Utils_2.default.geographicToCartesianCoord(result.lt.lon, result.lt.lat);
        result.lt.verticeInNDC = this._convertVerticeFromWorldToNDC(result.lt.verticeInWorld);
        result.lt.visible = this._isWorldVerticeVisibleInCanvas(result.lt.verticeInWorld, {
            verticeInNDC: result.lt.verticeInNDC,
            threshold: threshold
        });
        if (result.lt.visible) {
            result.visibleCount++;
        }
        result.rt.lon = tileMaxLon;
        result.rt.lat = tileMaxLat;
        result.rt.verticeInWorld = Utils_2.default.geographicToCartesianCoord(result.rt.lon, result.rt.lat);
        result.rt.verticeInNDC = this._convertVerticeFromWorldToNDC(result.rt.verticeInWorld);
        result.rt.visible = this._isWorldVerticeVisibleInCanvas(result.rt.verticeInWorld, {
            verticeInNDC: result.rt.verticeInNDC,
            threshold: threshold
        });
        if (result.rt.visible) {
            result.visibleCount++;
        }
        result.rb.lon = tileMaxLon;
        result.rb.lat = tileMinLat;
        result.rb.verticeInWorld = Utils_2.default.geographicToCartesianCoord(result.rb.lon, result.rb.lat);
        result.rb.verticeInNDC = this._convertVerticeFromWorldToNDC(result.rb.verticeInWorld);
        result.rb.visible = this._isWorldVerticeVisibleInCanvas(result.rb.verticeInWorld, {
            verticeInNDC: result.rb.verticeInNDC,
            threshold: threshold
        });
        if (result.rb.visible) {
            result.visibleCount++;
        }
        var ndcs = [result.lb.verticeInNDC, result.lt.verticeInNDC, result.rt.verticeInNDC, result.rb.verticeInNDC];
        var vector03 = Vector_1.default.verticeMinusVertice(ndcs[3], ndcs[0]);
        vector03.z = 0;
        var vector01 = Vector_1.default.verticeMinusVertice(ndcs[1], ndcs[0]);
        vector01.z = 0;
        var cross = vector03.cross(vector01);
        result.clockwise = cross.z > 0;
        var topWidth = Math.sqrt(Math.pow(ndcs[1].x - ndcs[2].x, 2) + Math.pow(ndcs[1].y - ndcs[2].y, 2)) * this.width / 2;
        var bottomWidth = Math.sqrt(Math.pow(ndcs[0].x - ndcs[3].x, 2) + Math.pow(ndcs[0].y - ndcs[3].y, 2)) * this.width / 2;
        result.width = Math.floor((topWidth + bottomWidth) / 2);
        var leftHeight = Math.sqrt(Math.pow(ndcs[0].x - ndcs[1].x, 2) + Math.pow(ndcs[0].y - ndcs[1].y, 2)) * this.height / 2;
        var rightHeight = Math.sqrt(Math.pow(ndcs[2].x - ndcs[3].x, 2) + Math.pow(ndcs[2].y - ndcs[3].y, 2)) * this.height / 2;
        result.height = Math.floor((leftHeight + rightHeight) / 2);
        result.area = result.width * result.height;
        return result;
    };
    Camera.prototype._getVerticalVisibleCenterInfo = function () {
        var result = {
            ndcY: null,
            pIntersect: null,
            lon: null,
            lat: null
        };
        var pickResults;
        if (this.isZeroPitch) {
            result.ndcY = 0;
        }
        else {
            var count = 10;
            var delta = 2.0 / count;
            var topNdcY = 1;
            var bottomNdcY = -1;
            var ndcY;
            for (ndcY = 1.0; ndcY >= -1.0; ndcY -= delta) {
                pickResults = this._getPickCartesianCoordInEarthByNDC(0, ndcY);
                if (pickResults.length > 0) {
                    topNdcY = ndcY;
                    break;
                }
            }
            for (ndcY = -1.0; ndcY <= 1.0; ndcY += delta) {
                pickResults = this._getPickCartesianCoordInEarthByNDC(0, ndcY);
                if (pickResults.length > 0) {
                    bottomNdcY = ndcY;
                    break;
                }
            }
            result.ndcY = (topNdcY + bottomNdcY) / 2;
        }
        pickResults = this._getPickCartesianCoordInEarthByNDC(0, result.ndcY);
        result.pIntersect = pickResults[0];
        var lonlat = Utils_2.default.cartesianCoordToGeographic(result.pIntersect);
        result.lon = lonlat[0];
        result.lat = lonlat[1];
        return result;
    };
    return Camera;
}(Object3D_1.default));
exports.default = Camera;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventEmitter = (function () {
    function EventEmitter() {
        this.events = null;
        this.events = {};
    }
    EventEmitter.prototype.emit = function (eventName, data) {
        var listeners = this.events[eventName];
        if (listeners) {
            listeners.forEach(function (listener) {
                listener(data);
            });
        }
    };
    EventEmitter.prototype.on = function (eventName, listener) {
        return this.addEventListener(eventName, listener);
    };
    EventEmitter.prototype.addEventListener = function (eventName, listener) {
        var _this = this;
        var listeners = this.events[eventName];
        if (listeners) {
            listeners.push(listener);
        }
        else {
            this.events[eventName] = [listener];
        }
        var handle = {};
        handle.remove = function () { return _this.removeEventListener(eventName, listener); };
        return handle;
    };
    EventEmitter.prototype.removeEventListener = function (eventName, listener) {
        var listeners = this.events[eventName];
        if (listeners) {
            var index1 = listeners.indexOf(listener);
            if (index1 >= 0) {
                listeners.splice(index1, 1);
            }
        }
    };
    EventEmitter.prototype.removeAllEventListeners = function (eventName) {
        if (eventName) {
            this.events[eventName] = [];
        }
        else {
            this.events = {};
        }
    };
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;
;


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Plan = (function () {
    function Plan(A, B, C, D) {
        this.A = A;
        this.B = B;
        this.C = C;
        this.D = D;
    }
    Plan.prototype.clone = function () {
        var planCopy = new Plan(this.A, this.B, this.C, this.D);
        return planCopy;
    };
    return Plan;
}());
exports.default = Plan;
;


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var GraphicGroup_1 = __webpack_require__(18);
var Scene = (function (_super) {
    __extends(Scene, _super);
    function Scene() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scene.prototype.pickByWorldLine = function (worldLine) {
        var count = this.children.length;
        for (var i = count - 1; i >= 0; i--) {
            var graphicGroup = this.children[i];
            if (graphicGroup instanceof GraphicGroup_1.PickableGraphicGroup) {
                var pickableGraphicGroup = graphicGroup;
                var target = pickableGraphicGroup.pickByWorldLine(worldLine, true);
                if (target) {
                    return target;
                }
            }
        }
        return null;
    };
    return Scene;
}(GraphicGroup_1.default));
exports.default = Scene;
;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Utils_1 = __webpack_require__(9);
var Utils_2 = __webpack_require__(7);
var Vector_1 = __webpack_require__(12);
var EventHandler = (function () {
    function EventHandler(globe) {
        this.globe = globe;
        this.down = false;
        this.dragGeo = null;
        this.previousX = -1;
        this.previousY = -1;
        this.twoTouchDistance = -1;
        this.oldTime = -1;
        this.lastTime = -1;
        this.startTime = -1;
        this.endTime = -1;
        this.resizeListener = null;
        this.bodyKeydownListener = null;
        this.endTime = this.startTime = this.lastTime = this.oldTime = Date.now();
        this._bindEvents();
    }
    EventHandler.prototype.destroy = function () {
        if (this.bodyKeydownListener) {
            document.body.removeEventListener("keydown", this.bodyKeydownListener);
        }
        this.bodyKeydownListener = null;
        this.globe = null;
    };
    EventHandler.prototype._bindEvents = function () {
        if (Utils_1.default.isMobile()) {
            this.globe.canvas.addEventListener("touchstart", this._onTouchStart.bind(this), false);
            this.globe.canvas.addEventListener("touchend", this._onTouchEnd.bind(this), false);
            this.globe.canvas.addEventListener("touchmove", this._onTouchMove.bind(this), false);
        }
        else {
            this.globe.canvas.addEventListener("mousedown", this._onMouseDown.bind(this), false);
            this.globe.canvas.addEventListener("mouseup", this._onMouseUp.bind(this), false);
            this.globe.canvas.addEventListener("mousemove", this._onMouseMove.bind(this), false);
            this.globe.canvas.addEventListener("click", this._onClick.bind(this), false);
            this.globe.canvas.addEventListener("dblclick", this._onDbClick.bind(this), false);
            this.globe.canvas.addEventListener("mousewheel", this._onMouseWheel.bind(this), false);
            this.globe.canvas.addEventListener("DOMMouseScroll", this._onMouseWheel.bind(this), false);
            this.bodyKeydownListener = this._onKeyDown.bind(this);
            document.body.addEventListener("keydown", this.bodyKeydownListener, false);
        }
    };
    EventHandler.prototype.moveLonLatToCanvas = function (lon, lat, canvasX, canvasY) {
        var pickResult = this.globe.camera.getPickCartesianCoordInEarthByCanvas(canvasX, canvasY);
        if (pickResult.length > 0) {
            var newLonLat = Utils_2.default.cartesianCoordToGeographic(pickResult[0]);
            var newLon = newLonLat[0];
            var newLat = newLonLat[1];
            this._moveGeo(lon, lat, newLon, newLat);
        }
    };
    EventHandler.prototype._moveGeo = function (oldLon, oldLat, newLon, newLat) {
        if (oldLon === newLon && oldLat === newLat) {
            return;
        }
        var p1 = Utils_2.default.geographicToCartesianCoord(oldLon, oldLat);
        var v1 = Vector_1.default.fromVertice(p1);
        var p2 = Utils_2.default.geographicToCartesianCoord(newLon, newLat);
        var v2 = Vector_1.default.fromVertice(p2);
        var rotateVector = v1.cross(v2);
        var rotateRadian = -Vector_1.default.getRadianOfTwoVectors(v1, v2);
        this.globe.camera.worldRotateByVector(rotateRadian, rotateVector);
    };
    EventHandler.prototype._handleSingleClick = function (canvasX, canvasY) {
        this.globe.pick(canvasX, canvasY);
    };
    EventHandler.prototype._handleMouseDownOrTouchStart = function (offsetX, offsetY) {
        this.down = true;
        this.previousX = offsetX;
        this.previousY = offsetY;
        var pickResult = this.globe.camera.getPickCartesianCoordInEarthByCanvas(this.previousX, this.previousY);
        if (pickResult.length > 0) {
            this.dragGeo = Utils_2.default.cartesianCoordToGeographic(pickResult[0]);
        }
    };
    EventHandler.prototype._handleMouseMoveOrTouchMove = function (currentX, currentY) {
        var globe = this.globe;
        if (!globe || globe.isAnimating() || !this.down) {
            return;
        }
        var pickResult = globe.camera.getPickCartesianCoordInEarthByCanvas(currentX, currentY);
        if (pickResult.length > 0) {
            if (this.dragGeo) {
                var newGeo = Utils_2.default.cartesianCoordToGeographic(pickResult[0]);
                this._moveGeo(this.dragGeo[0], this.dragGeo[1], newGeo[0], newGeo[1]);
            }
            else {
                this.dragGeo = Utils_2.default.cartesianCoordToGeographic(pickResult[0]);
            }
            this.previousX = currentX;
            this.previousY = currentY;
            this.globe.canvas.style.cursor = "pointer";
        }
        else {
            this.previousX = -1;
            this.previousY = -1;
            this.dragGeo = null;
            this.globe.canvas.style.cursor = "default";
        }
    };
    EventHandler.prototype._handleMouseUpOrTouchEnd = function () {
        this.down = false;
        this.previousX = -1;
        this.previousY = -1;
        this.dragGeo = null;
        if (this.globe.canvas) {
            this.globe.canvas.style.cursor = "default";
        }
        Utils_1.default.publish("extent-change");
    };
    EventHandler.prototype._onMouseDown = function (event) {
        var globe = this.globe;
        if (!globe || globe.isAnimating()) {
            return;
        }
        var previousX = event.layerX || event.offsetX;
        var previousY = event.layerY || event.offsetY;
        this._handleMouseDownOrTouchStart(previousX, previousY);
    };
    EventHandler.prototype._onMouseMove = function (event) {
        if (!this.down) {
            return;
        }
        if (this.globe.isAnimating()) {
            return;
        }
        var currentX = event.layerX || event.offsetX;
        var currentY = event.layerY || event.offsetY;
        this._handleMouseMoveOrTouchMove(currentX, currentY);
    };
    EventHandler.prototype._onMouseUp = function () {
        this._handleMouseUpOrTouchEnd();
    };
    EventHandler.prototype._onClick = function (event) {
        var absoluteX = event.layerX || event.offsetX;
        var absoluteY = event.layerY || event.offsetY;
        this._handleSingleClick(absoluteX, absoluteY);
    };
    EventHandler.prototype._onDbClick = function (event) {
        var globe = this.globe;
        if (!globe || globe.isAnimating()) {
            return;
        }
        var absoluteX = event.layerX || event.offsetX;
        var absoluteY = event.layerY || event.offsetY;
        var pickResult = globe.camera.getPickCartesianCoordInEarthByCanvas(absoluteX, absoluteY);
        globe.zoomIn();
        if (pickResult.length >= 1) {
            var pickVertice = pickResult[0];
            var lonlat = Utils_2.default.cartesianCoordToGeographic(pickVertice);
            var lon = lonlat[0];
            var lat = lonlat[1];
            globe.zoomIn();
            this.moveLonLatToCanvas(lon, lat, absoluteX, absoluteY);
        }
    };
    EventHandler.prototype._onMouseWheel = function (event) {
        var globe = this.globe;
        if (!globe || globe.isAnimating()) {
            return;
        }
        var deltaLevel = 0;
        var delta;
        if (event.wheelDelta) {
            delta = event.wheelDelta;
            deltaLevel = parseInt((delta / 120));
        }
        else if (event.detail) {
            delta = event.detail;
            deltaLevel = -parseInt((delta / 3));
        }
        var newLevel = globe.getLevel() + deltaLevel;
        if (newLevel >= 0) {
            globe.animateToLevel(newLevel, function () {
                Utils_1.default.publish("extent-change");
            });
        }
    };
    EventHandler.prototype._onKeyDown = function (event) {
        var globe = this.globe;
        if (!globe || globe.isAnimating()) {
            return;
        }
        var DELTA_PITCH = 2;
        var camera = globe.camera;
        var keyNum = event.keyCode !== undefined ? event.keyCode : event.which;
        if (keyNum === 38) {
            camera.setDeltaPitch(DELTA_PITCH);
        }
        else if (keyNum === 40) {
            camera.setDeltaPitch(-DELTA_PITCH);
        }
    };
    EventHandler.prototype._onTouchZero = function (event) {
        this.twoTouchDistance = -1;
        var previousX = this.previousX;
        var previousY = this.previousY;
        this._handleMouseUpOrTouchEnd();
        this.endTime = Date.now();
        var time = this.endTime - this.startTime;
        if (time <= 200) {
            var time2 = this.endTime - this.lastTime;
            if (time2 < 300) {
                this.lastTime = this.oldTime;
                this.globe.zoomIn();
            }
            else {
                this.lastTime = this.endTime;
                var _a = this.globe.canvas.getBoundingClientRect(), left = _a.left, top_1 = _a.top;
                var canvasX = previousX - left;
                var canvasY = previousY - top_1;
                this._handleSingleClick(canvasX, canvasY);
            }
        }
    };
    EventHandler.prototype._onTouchOne = function (event) {
        this.twoTouchDistance = -1;
        var touch = event.targetTouches[0];
        var previousX = touch.pageX;
        var previousY = touch.pageY;
        this._handleMouseDownOrTouchStart(previousX, previousY);
        this.startTime = Date.now();
    };
    EventHandler.prototype._onTouchTwo = function (event) {
        this.down = true;
        this.previousX = -1;
        this.previousY = -1;
        this.dragGeo = null;
        var touch1 = event.targetTouches[0];
        var x1 = touch1.pageX;
        var y1 = touch1.pageY;
        var touch2 = event.targetTouches[1];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        this.twoTouchDistance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    };
    EventHandler.prototype._onTouchMulti = function () {
        this.down = true;
        this.previousX = -1;
        this.previousY = -1;
        this.dragGeo = null;
        this.twoTouchDistance = -1;
    };
    EventHandler.prototype._onTouchStart = function (event) {
        var globe = this.globe;
        if (!globe || globe.isAnimating()) {
            return;
        }
        var touchCount = event.targetTouches.length;
        if (touchCount === 0) {
            this._onTouchZero(event);
        }
        else if (touchCount === 1) {
            this._onTouchOne(event);
        }
        else if (touchCount === 2) {
            this._onTouchTwo(event);
        }
        else {
            this._onTouchMulti();
        }
    };
    EventHandler.prototype._onTouchMoveOne = function (event) {
        var touch = event.targetTouches[0];
        var currentX = touch.pageX;
        var currentY = touch.pageY;
        this._handleMouseMoveOrTouchMove(currentX, currentY);
    };
    EventHandler.prototype._onTouchMoveTwo = function (event) {
        var _this = this;
        var touch1 = event.targetTouches[0];
        var x1 = touch1.pageX;
        var y1 = touch1.pageY;
        var touch2 = event.targetTouches[1];
        var x2 = touch2.pageX;
        var y2 = touch2.pageY;
        var twoTouchDistance = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        var radio = twoTouchDistance / this.twoTouchDistance;
        if (radio >= 1.3) {
            this.globe.animateIn(function () {
                _this.twoTouchDistance = twoTouchDistance;
            });
        }
        else if (radio <= 0.7) {
            this.globe.animateOut(function () {
                _this.twoTouchDistance = twoTouchDistance;
            });
        }
    };
    EventHandler.prototype._onTouchMove = function (event) {
        event.preventDefault();
        if (!this.down) {
            return;
        }
        if (this.globe.isAnimating()) {
            return;
        }
        var touchCount = event.targetTouches.length;
        if (touchCount === 1) {
            this._onTouchMoveOne(event);
        }
        else if (touchCount === 2) {
            this._onTouchMoveTwo(event);
        }
    };
    EventHandler.prototype._onTouchEnd = function (event) {
        var touchCount = event.targetTouches.length;
        if (touchCount === 0) {
            this._onTouchZero(event);
        }
        else if (touchCount === 1) {
            this._onTouchOne(event);
        }
        else if (touchCount === 2) {
            this._onTouchTwo(event);
        }
        else {
            this._onTouchMulti();
        }
    };
    return EventHandler;
}());
exports.default = EventHandler;
;


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TiledLayer_1 = __webpack_require__(53);
var LabelLayer_1 = __webpack_require__(57);
var Env_1 = __webpack_require__(58);
var scale = Env_1.devicePixelRatio > 1 ? 2 : 1;
var GoogleTiledLayer = (function (_super) {
    __extends(GoogleTiledLayer, _super);
    function GoogleTiledLayer(style) {
        if (style === void 0) { style = "Default"; }
        var _this = _super.call(this, style) || this;
        _this.idx = 0;
        return _this;
    }
    GoogleTiledLayer.prototype.getTileUrl = function (level, row, column) {
        if (this.idx === undefined) {
            this.idx = 0;
        }
        var lyrs = "y";
        switch (this.style) {
            case "Satellite":
                lyrs = "s";
                break;
            case "Road":
                lyrs = "m";
                break;
            case "RoadOnly":
                lyrs = "h";
                break;
            case "Terrain":
                lyrs = "p";
                break;
            case "TerrainOnly":
                lyrs = "t";
                break;
        }
        var url = "//mt" + this.idx + ".google.cn/maps/vt?lyrs=" + lyrs + "&hl=zh-CN&gl=CN&&x=" + column + "&y=" + row + "&z=" + level + "&scale=" + scale;
        this.idx++;
        if (this.idx >= 4) {
            this.idx = 0;
        }
        return url;
    };
    return GoogleTiledLayer;
}(TiledLayer_1.default));
exports.GoogleTiledLayer = GoogleTiledLayer;
;
var GoogleLabelLayer = (function (_super) {
    __extends(GoogleLabelLayer, _super);
    function GoogleLabelLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.idx = 0;
        return _this;
    }
    GoogleLabelLayer.prototype.getTileUrl = function (level, row, column) {
        if (this.idx === undefined) {
            this.idx = 0;
        }
        var url = "//mt" + this.idx + ".google.cn/vt/imgtp=png32&lyrs=h@365000000&hl=zh-CN&gl=cn&x=" + column + "&y=" + row + "&z=" + level + "&s=Galil";
        this.idx++;
        if (this.idx >= 4) {
            this.idx = 0;
        }
        return url;
    };
    return GoogleLabelLayer;
}(LabelLayer_1.default));
exports.GoogleLabelLayer = GoogleLabelLayer;
;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MeshTextureMaterial_1 = __webpack_require__(22);
var Image_1 = __webpack_require__(34);
var TileMaterial = (function (_super) {
    __extends(TileMaterial, _super);
    function TileMaterial(level, imageOrUrl) {
        var _this = _super.call(this, imageOrUrl, true) || this;
        _this.level = level >= 0 ? level : 20;
        return _this;
    }
    TileMaterial.prototype.onLoad = function () {
        if (this.level <= Image_1.default.MAX_LEVEL) {
            Image_1.default.add(this.image.src, this.image);
        }
        _super.prototype.onLoad.call(this);
    };
    return TileMaterial;
}(MeshTextureMaterial_1.default));
exports.default = TileMaterial;
;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Mesh_1 = __webpack_require__(23);
var TileGeometry = (function (_super) {
    __extends(TileGeometry, _super);
    function TileGeometry(vertices, triangles) {
        var _this = _super.call(this) || this;
        _this.vertices = vertices;
        _this.triangles = triangles;
        return _this;
    }
    return TileGeometry;
}(Mesh_1.default));
exports.default = TileGeometry;
;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var TiledLayer_1 = __webpack_require__(53);
var LabelLayer_1 = __webpack_require__(57);
var AutonaviTiledLayer = (function (_super) {
    __extends(AutonaviTiledLayer, _super);
    function AutonaviTiledLayer(style) {
        if (style === void 0) { style = "Default"; }
        var _this = _super.call(this, style) || this;
        _this.idx = 1;
        return _this;
    }
    AutonaviTiledLayer.prototype.getTileUrl = function (level, row, column) {
        if (this.idx === undefined) {
            this.idx = 1;
        }
        var url = "";
        if (this.style === 'Satellite') {
            url = "//webst0" + this.idx + ".is.autonavi.com/appmaptile?style=6&x=" + column + "&y=" + row + "&z=" + level;
        }
        else {
            url = "//webst0" + this.idx + ".is.autonavi.com/appmaptile?style=7&x=" + column + "&y=" + row + "&z=" + level;
        }
        this.idx++;
        if (this.idx >= 5) {
            this.idx = 1;
        }
        return url;
    };
    return AutonaviTiledLayer;
}(TiledLayer_1.default));
exports.AutonaviTiledLayer = AutonaviTiledLayer;
;
var AutonaviLabelLayer = (function (_super) {
    __extends(AutonaviLabelLayer, _super);
    function AutonaviLabelLayer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.idx = 1;
        return _this;
    }
    AutonaviLabelLayer.prototype.getTileUrl = function (level, row, column) {
        if (this.idx === undefined) {
            this.idx = 1;
        }
        var url = "//webst0" + this.idx + ".is.autonavi.com/appmaptile?style=8&x=" + column + "&y=" + row + "&z=" + level;
        this.idx++;
        if (this.idx >= 5) {
            this.idx = 1;
        }
        return url;
    };
    return AutonaviLabelLayer;
}(LabelLayer_1.default));
exports.AutonaviLabelLayer = AutonaviLabelLayer;
;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var MeshTextureGraphic_1 = __webpack_require__(36);
var Atmosphere_1 = __webpack_require__(93);
var MeshTextureMaterial_1 = __webpack_require__(22);
var Vector_1 = __webpack_require__(12);
var atmosphereImgUrl = __webpack_require__(94);
var Atmosphere = (function (_super) {
    __extends(Atmosphere, _super);
    function Atmosphere(geometry, material) {
        var _this = _super.call(this, geometry, material) || this;
        _this.geometry = geometry;
        _this.material = material;
        return _this;
    }
    Atmosphere.getInstance = function () {
        var geometry = new Atmosphere_1.default();
        var material = new MeshTextureMaterial_1.default(atmosphereImgUrl, false);
        return new Atmosphere(geometry, material);
    };
    Atmosphere.prototype.shouldDraw = function (camera) {
        return !camera.isEarthFullOverlapScreen() && _super.prototype.shouldDraw.call(this, camera);
    };
    Atmosphere.prototype.onDraw = function (camera) {
        var gl = Kernel_1.default.gl;
        gl.disable(Kernel_1.default.gl.DEPTH_TEST);
        gl.depthMask(false);
        gl.enable(Kernel_1.default.gl.BLEND);
        gl.blendFunc(Kernel_1.default.gl.SRC_ALPHA, Kernel_1.default.gl.ONE_MINUS_SRC_ALPHA);
        this.geometry.getMatrix().setUnitMatrix();
        var R = Kernel_1.default.EARTH_RADIUS;
        var distanceCamera2Origin = camera.getDistance2EarthOrigin();
        var distanceCamera2EarthTangent = Math.sqrt(distanceCamera2Origin * distanceCamera2Origin - R * R);
        var sinθ = distanceCamera2EarthTangent / distanceCamera2Origin;
        var distanceCamera2Atmosphere = distanceCamera2EarthTangent * sinθ;
        var vector = camera.getLightDirection().setLength(distanceCamera2Atmosphere);
        var atmosphereNewPosition = Vector_1.default.verticePlusVector(camera.getPosition(), vector);
        this.geometry.setPosition(atmosphereNewPosition);
        this.geometry.setVectorX(camera.getVectorX());
        this.geometry.setVectorY(camera.getVectorY());
        this.geometry.setVectorZ(camera.getVectorZ());
        this.geometry.localScale(sinθ, sinθ, sinθ);
        _super.prototype.onDraw.call(this, camera);
        gl.enable(Kernel_1.default.gl.DEPTH_TEST);
        gl.depthMask(true);
        gl.disable(Kernel_1.default.gl.BLEND);
    };
    return Atmosphere;
}(MeshTextureGraphic_1.default));
exports.default = Atmosphere;
;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var MeshVertice_1 = __webpack_require__(24);
var Triangle_1 = __webpack_require__(39);
var Mesh_1 = __webpack_require__(23);
var Vertice_1 = __webpack_require__(11);
var Matrix_1 = __webpack_require__(33);
var Atmosphere = (function (_super) {
    __extends(Atmosphere, _super);
    function Atmosphere() {
        var _this = _super.call(this) || this;
        _this.segment = 360;
        _this.radius1 = Kernel_1.default.EARTH_RADIUS * 0.99;
        _this.radius2 = Kernel_1.default.EARTH_RADIUS * 1.01;
        _this.buildTriangles();
        return _this;
    }
    Atmosphere.prototype.buildTriangles = function () {
        var _a, _b;
        this.vertices = [];
        this.triangles = [];
        var mat1 = new Matrix_1.default();
        mat1.setPosition(new Vertice_1.default(0, this.radius1, 0));
        var meshVertices1 = [];
        var mat2 = new Matrix_1.default();
        mat2.setPosition(new Vertice_1.default(0, this.radius2, 0));
        var meshVertices2 = [];
        var deltaRadian = -Math.PI * 2 / this.segment;
        var deltaS = 1.0 / this.segment;
        var u = 0;
        for (var i = 0; i <= this.segment; i++) {
            u = deltaS * i;
            if (u > 1) {
                u = 1;
            }
            meshVertices1.push(new MeshVertice_1.default({
                i: i,
                p: mat1.getPosition().getArray(),
                uv: [u, 1]
            }));
            meshVertices2.push(new MeshVertice_1.default({
                i: this.segment + 1 + i,
                p: mat2.getPosition().getArray(),
                uv: [u, 0]
            }));
            if (i > 0) {
                var vLeftTop = meshVertices2[i - 1];
                var vLeftBottom = meshVertices1[i - 1];
                var vRightTop = meshVertices2[i];
                var vRightBottom = meshVertices1[i];
                (_a = this.triangles).push.apply(_a, Triangle_1.default.assembleQuad(vLeftTop, vLeftBottom, vRightTop, vRightBottom));
            }
            mat1.worldRotateZ(deltaRadian);
            mat2.worldRotateZ(deltaRadian);
        }
        (_b = this.vertices).push.apply(_b, meshVertices1.concat(meshVertices2));
    };
    return Atmosphere;
}(Mesh_1.default));
exports.default = Atmosphere;
;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "f42e74f3a391873a7d0d2ec2ae63eff9.png";

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var MultiPointsGraphic_1 = __webpack_require__(59);
var MarkerTextureMaterial_1 = __webpack_require__(60);
var locationImageUrl = __webpack_require__(96);
var LocationGraphic = (function (_super) {
    __extends(LocationGraphic, _super);
    function LocationGraphic(material, globe) {
        var _this = _super.call(this, material) || this;
        _this.globe = globe;
        return _this;
    }
    LocationGraphic.prototype.setLonLat = function (lon, lat) {
        this.setLonlats([[lon, lat]]);
    };
    LocationGraphic.prototype.destroy = function () {
        this.globe = null;
        _super.prototype.destroy.call(this);
    };
    LocationGraphic.prototype.isReady = function () {
        return this.globe && this.globe.camera.isEarthFullOverlapScreen() && _super.prototype.isReady.call(this);
    };
    LocationGraphic.getInstance = function (globe) {
        var material = new MarkerTextureMaterial_1.default(locationImageUrl, 24);
        return new LocationGraphic(material, globe);
    };
    return LocationGraphic;
}(MultiPointsGraphic_1.default));
exports.default = LocationGraphic;
;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0a1a7c4881e6fd01b9ef9772a7e1b2f3.png";

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Utils_2 = __webpack_require__(7);
var Vector_1 = __webpack_require__(12);
var MeshVertice_1 = __webpack_require__(24);
var Mesh_1 = __webpack_require__(23);
var MeshTextureGraphic_1 = __webpack_require__(36);
var GraphicGroup_1 = __webpack_require__(18);
var MeshTextureMaterial_1 = __webpack_require__(22);
var Service_1 = __webpack_require__(27);
var Extent_1 = __webpack_require__(15);
var poiImgUrl = __webpack_require__(98);
var PoiLayer = (function (_super) {
    __extends(PoiLayer, _super);
    function PoiLayer() {
        var _this = _super.call(this) || this;
        _this.keyword = null;
        _this.searchExtentMode = false;
        _this.globe = null;
        _this.currentHighLightPoi = null;
        _this.highlightListener = null;
        _this.unHighlightListener = null;
        _this.iconsWidth = 874;
        _this.iconsHeight = 524;
        _this.iconsRow = 6;
        _this.iconsColumn = 10;
        _this.MAX_POI_COUNT = _this.iconsColumn;
        _this.validPinIconWidth = 50;
        _this.validPinIconHeight = 70;
        _this.normalMaterialRow = 3;
        _this.highLightMaterialRow = 1;
        _this.pinIconWidth = _this.iconsWidth / _this.iconsColumn;
        _this.pinIconHeight = _this.iconsHeight / _this.iconsRow;
        _this.pinIconDeltaU = _this.pinIconWidth / _this.iconsWidth;
        _this.pinIconDeltaV = _this.pinIconHeight / _this.iconsHeight;
        _this.validPinIconDeltaU = _this.validPinIconWidth / _this.iconsWidth;
        _this.validPinIconDeltaV = _this.validPinIconHeight / _this.iconsHeight;
        _this.validPinIconOffsetU = (_this.pinIconDeltaU - _this.validPinIconDeltaU) / 2;
        _this.validPinIconOffsetV = (_this.pinIconDeltaV - _this.validPinIconDeltaV) / 2;
        _this.poiPixelWidth = 30;
        _this.poiPixelHeight = 42;
        Utils_1.default.subscribe('extent-change', function () {
            if (_this.searchExtentMode && _this.keyword) {
                _this.search(_this.keyword);
            }
        });
        Utils_1.default.subscribe('level-change', function () {
            if (_this.children.length > 0) {
                var resolution_1 = _this.globe.camera.getResolution();
                _this.children.forEach(function (graphic) {
                    var scale = resolution_1 / graphic.geometry.resolution;
                    graphic.geometry.localScale(scale, scale, scale);
                    graphic.geometry.resolution = resolution_1;
                });
            }
        });
        _this.setPickListener(function (target) {
            if (_this.currentHighLightPoi !== target) {
                _this.unHighlightPoi();
                _this.highlightPoi(target);
            }
        });
        return _this;
    }
    PoiLayer.getInstance = function () {
        return new PoiLayer();
    };
    PoiLayer.prototype._getUV = function (row, column) {
        var smallV = this.pinIconDeltaV * row + this.validPinIconOffsetV;
        var bigV = smallV + this.validPinIconDeltaV;
        var smallU = this.pinIconDeltaU * column + this.validPinIconOffsetU;
        var bigU = smallU + this.validPinIconDeltaU;
        var v0 = [smallU, smallV];
        var v1 = [smallU, bigV];
        var v2 = [bigU, smallV];
        var v3 = [bigU, bigV];
        return [v0, v1, v2, v3];
    };
    PoiLayer.prototype.getHighlightPoi = function () {
        return this.currentHighLightPoi;
    };
    PoiLayer.prototype.highlightPoi = function (target) {
        if (this.currentHighLightPoi === target) {
            return;
        }
        this.unHighlightPoi();
        this.currentHighLightPoi = target;
        this._updateMaterial(this.currentHighLightPoi, this.highLightMaterialRow);
        this.moveChildToLastPosition(this.currentHighLightPoi);
        if (this.highlightListener) {
            this.highlightListener(this.currentHighLightPoi);
        }
    };
    PoiLayer.prototype.unHighlightPoi = function () {
        if (this.currentHighLightPoi) {
            this._updateMaterial(this.currentHighLightPoi, this.normalMaterialRow);
            this.currentHighLightPoi = null;
            if (this.unHighlightListener) {
                this.unHighlightListener();
            }
        }
    };
    PoiLayer.prototype.setHighlightListener = function (listener) {
        this.highlightListener = listener;
    };
    PoiLayer.prototype.setUnHighlightListener = function (listener) {
        this.unHighlightListener = listener;
    };
    PoiLayer.prototype._updateMaterial = function (target, row) {
        var columnIndex = target.columnIndex;
        var uv = this._getUV(row, columnIndex);
        var _a = target.geometry.vertices, vLeftTop = _a[0], vLeftBottom = _a[1], vRightTop = _a[2], vRightBottom = _a[3];
        vLeftTop.uv = uv[0];
        vLeftBottom.uv = uv[1];
        vRightTop.uv = uv[2];
        vRightBottom.uv = uv[3];
        target.geometry.calculateUVBO(true);
    };
    PoiLayer.prototype.shouldDraw = function () {
        return this.globe && this.globe.camera.isEarthFullOverlapScreen() && _super.prototype.shouldDraw.call(this);
    };
    PoiLayer.prototype.onBeforeDraw = function () {
        var gl = Kernel_1.default.gl;
        gl.disable(gl.DEPTH_TEST);
        gl.enable(Kernel_1.default.gl.BLEND);
        gl.blendFunc(Kernel_1.default.gl.SRC_ALPHA, Kernel_1.default.gl.ONE_MINUS_SRC_ALPHA);
    };
    PoiLayer.prototype.onAfterDraw = function () {
        var gl = Kernel_1.default.gl;
        gl.enable(gl.DEPTH_TEST);
        gl.disable(Kernel_1.default.gl.BLEND);
    };
    PoiLayer.prototype.destroy = function () {
        this.globe = null;
        _super.prototype.destroy.call(this);
    };
    PoiLayer.prototype.clear = function () {
        this.currentHighLightPoi = null;
        _super.prototype.clear.call(this);
    };
    PoiLayer.prototype.clearAll = function () {
        this.clear();
        this.keyword = null;
    };
    PoiLayer.prototype._addPoi = function (lon, lat, resolution, item, index) {
        var localMatrix = this.globe.camera.getMatrix().clone();
        var pCenterBottom = Utils_2.default.geographicToCartesianCoord(lon, lat, Kernel_1.default.EARTH_RADIUS + 0.001);
        localMatrix.setPosition(pCenterBottom);
        var localXAxisVector = new Vector_1.default(1, 0, 0);
        var halfWidth = resolution * this.poiPixelWidth / 2;
        localXAxisVector.setLength(halfWidth);
        var v3 = localXAxisVector.getVertice();
        var v1 = localXAxisVector.getOpposite().getVertice();
        var localUp = new Vector_1.default(0, 1, 0);
        var height = resolution * this.poiPixelHeight;
        localUp.setLength(height);
        var v0 = Vector_1.default.verticePlusVector(v1, localUp);
        var v2 = Vector_1.default.verticePlusVector(v3, localUp);
        var uv = this._getUV(this.normalMaterialRow, index);
        var meshV0 = new MeshVertice_1.default({
            i: 0,
            p: v0.getArray(),
            uv: uv[0]
        });
        var meshV1 = new MeshVertice_1.default({
            i: 1,
            p: v1.getArray(),
            uv: uv[1]
        });
        var meshV2 = new MeshVertice_1.default({
            i: 2,
            p: v2.getArray(),
            uv: uv[2]
        });
        var meshV3 = new MeshVertice_1.default({
            i: 3,
            p: v3.getArray(),
            uv: uv[3]
        });
        var mesh = Mesh_1.default.buildMesh(meshV0, meshV1, meshV2, meshV3);
        mesh.setMatrix(localMatrix);
        var material = new MeshTextureMaterial_1.default(poiImgUrl);
        var graphic = new MeshTextureGraphic_1.default(mesh, material, item);
        graphic.geometry.resolution = resolution;
        graphic.columnIndex = index;
        this.add(graphic);
        return graphic;
    };
    PoiLayer.prototype._showPois = function (searchResponse) {
        var _this = this;
        this.clear();
        var pois = searchResponse.detail.pois || [];
        if (pois.length === 0) {
            return;
        }
        if (pois.length > this.MAX_POI_COUNT) {
            pois = pois.slice(0, this.MAX_POI_COUNT);
        }
        var lonlats = pois.map(function (item) {
            var lon = parseFloat(item.pointx);
            var lat = parseFloat(item.pointy);
            return [lon, lat];
        });
        if (lonlats.length > 1) {
            var extent = Extent_1.default.fromLonlats(lonlats);
            this.globe.setExtent(extent);
        }
        else {
            var lonlat = lonlats[0];
            this.globe.centerTo(lonlat[0], lonlat[1]);
        }
        var resolution = this.globe.camera.getResolution();
        searchResponse.detail.graphics = pois.map(function (item, index) {
            var lon = parseFloat(item.pointx);
            var lat = parseFloat(item.pointy);
            return _this._addPoi(lon, lat, resolution, item, index);
        });
    };
    PoiLayer.prototype.search = function (keyword) {
        var _this = this;
        this.searchExtentMode = true;
        this.clearAll();
        this.keyword = keyword;
        var level = this.globe.getLevel();
        if (level >= 10) {
            var extent = this.globe.getExtent();
            if (extent) {
                Service_1.default.searchByExtent(keyword, level, extent).then(function (response) {
                    _this._showPois(response);
                });
            }
        }
    };
    PoiLayer.prototype.searchNearby = function (keyword, radius, searchType, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        this.clearAll();
        this.keyword = keyword;
        this.searchExtentMode = false;
        return Service_1.default.searchNearby(keyword, radius, searchType, false, pageCapacity, pageIndex).then(function (response) {
            _this._showPois(response);
            return response;
        });
    };
    PoiLayer.prototype.searchByCurrentCity = function (keyword, searchType, pageCapacity, pageIndex) {
        var _this = this;
        if (searchType === void 0) { searchType = 'Auto'; }
        if (pageCapacity === void 0) { pageCapacity = 50; }
        if (pageIndex === void 0) { pageIndex = 0; }
        this.clearAll();
        this.keyword = keyword;
        return Service_1.default.searchByCurrentCity(keyword, searchType, pageCapacity, pageIndex).then(function (response) {
            if (response) {
                if (!response.location) {
                    response.location = _this.globe.getLonlat();
                }
            }
            _this._showPois(response);
            return response;
        });
    };
    return PoiLayer;
}(GraphicGroup_1.PickableGraphicGroup));
exports.default = PoiLayer;
;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "0f1e4f2d34556cdc2a9c4a8bc46f5def.png";

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Utils_1 = __webpack_require__(9);
var Utils_2 = __webpack_require__(7);
var Vertice_1 = __webpack_require__(11);
var Vector_1 = __webpack_require__(12);
var MeshVertice_1 = __webpack_require__(24);
var Mesh_1 = __webpack_require__(23);
var MeshColorGraphic_1 = __webpack_require__(100);
var ColorMaterial_1 = __webpack_require__(101);
var MarkerTextureMaterial_1 = __webpack_require__(60);
var MultiPointsGraphic_1 = __webpack_require__(59);
var GraphicGroup_1 = __webpack_require__(18);
var Service_1 = __webpack_require__(27);
var Extent_1 = __webpack_require__(15);
var startPointImageUrl = __webpack_require__(102);
var startPointImageSize = 80;
var endPointImageUrl = __webpack_require__(103);
var endPointImageSize = 80;
var MeshRouteGraphic = (function (_super) {
    __extends(MeshRouteGraphic, _super);
    function MeshRouteGraphic(originalLonlats, pixelWidth, resolution, material) {
        var _this = _super.call(this, null, material) || this;
        _this.originalLonlats = originalLonlats;
        _this.pixelWidth = pixelWidth;
        _this.inflexionPointAngle = 30;
        _this._removeDuplicatePoints(_this.originalLonlats);
        _this.updateGeometry(resolution);
        return _this;
    }
    MeshRouteGraphic.prototype.updateGeometry = function (resolution) {
        var lonlats = this._handleCurveJoin(this.originalLonlats, resolution, this.pixelWidth);
        var geometry = this._getRouteGeometryByLonlats(lonlats, resolution, this.pixelWidth);
        this.setGeometry(geometry);
    };
    MeshRouteGraphic.prototype._removeDuplicatePoints = function (lonlats) {
        var cursor = 0;
        while (cursor <= (lonlats.length - 2)) {
            var currentLonlat = lonlats[cursor];
            var nextLonlat = lonlats[cursor + 1];
            if (currentLonlat[0] === nextLonlat[0] && currentLonlat[1] === nextLonlat[1]) {
                lonlats.splice(cursor + 1, 1);
            }
            else {
                cursor += 1;
            }
        }
    };
    MeshRouteGraphic.prototype._handleCurveJoin = function (_lonlats, resolution, pixelWidth) {
        var lonlats = [].concat(_lonlats);
        var cursor = 1;
        var offsetLonlat = Utils_2.default.radianToDegree(resolution * pixelWidth / Kernel_1.default.EARTH_RADIUS);
        while (cursor <= (lonlats.length - 2)) {
            var currentLonlat = lonlats[cursor];
            var prevLonlat = lonlats[cursor - 1];
            var nextLonlat = lonlats[cursor + 1];
            var currentPoint = new Vertice_1.default(currentLonlat[0], currentLonlat[1], 0);
            var prevPoint = new Vertice_1.default(prevLonlat[0], prevLonlat[1], 0);
            var nextPoint = new Vertice_1.default(nextLonlat[0], nextLonlat[1], 0);
            var vector1 = Vector_1.default.verticeMinusVertice(currentPoint, prevPoint);
            var vector2 = Vector_1.default.verticeMinusVertice(nextPoint, currentPoint);
            var radian = Vector_1.default.getRadianOfTwoVectors(vector1, vector2);
            var angle = Utils_2.default.radianToDegree(radian);
            if (angle > this.inflexionPointAngle) {
                var p0 = null;
                var p1 = currentLonlat;
                var p2 = null;
                var length1 = vector1.getLength();
                var length2 = vector2.getLength();
                var minLength = Math.min(length1, length2);
                var deltaLength = Math.min(offsetLonlat, minLength / 2);
                var p0Vertice = Vector_1.default.verticePlusVector(currentPoint, vector1.getOpposite().setLength(deltaLength));
                p0 = [p0Vertice.x, p0Vertice.y];
                var p2Vertice = Vector_1.default.verticePlusVector(currentPoint, vector2.clone().setLength(deltaLength));
                p2 = [p2Vertice.x, p2Vertice.y];
                var curveLonlats = Utils_2.default.quad(p0, p1, p2, 10);
                lonlats.splice.apply(lonlats, [cursor, 1].concat(curveLonlats));
                cursor += curveLonlats.length;
            }
            else {
                cursor++;
            }
        }
        return lonlats;
    };
    MeshRouteGraphic.prototype._getRouteGeometryByLonlats = function (lonlats, resolution, pixelWidth) {
        var _this = this;
        var mesh = new Mesh_1.default();
        var points = lonlats.map(function (lonlat) {
            return {
                lonlat: lonlat,
                vertice: Utils_2.default.geographicToCartesianCoord(lonlat[0], lonlat[1]),
                start2EndVector: null,
                v1: null,
                v3: null
            };
        });
        points.forEach(function (startPoint, index) {
            if (index !== points.length - 1) {
                var endPoint = points[index + 1];
                startPoint.start2EndVector = Vector_1.default.verticeMinusVertice(endPoint.vertice, startPoint.vertice);
            }
            else {
                var prevPoint = points[index - 1];
                startPoint.start2EndVector = prevPoint.start2EndVector;
            }
        });
        var startIndex = 0;
        points.forEach(function (point, index) {
            var _a;
            var result = _this._getRouteVertices(startIndex, point.vertice, point.start2EndVector, resolution, pixelWidth);
            startIndex = result.startIndex;
            point.v1 = result.v1;
            point.v3 = result.v3;
            mesh.vertices.push(point.v1, point.v3);
            if (index !== 0) {
                var prevPoint = points[index - 1];
                var v1 = prevPoint.v1;
                var v3 = prevPoint.v3;
                var v0 = point.v1;
                var v2 = point.v3;
                var triangles = Mesh_1.default.buildPlane(v0, v1, v2, v3);
                (_a = mesh.triangles).push.apply(_a, triangles);
            }
        });
        return mesh;
    };
    MeshRouteGraphic.prototype._getRouteVertices = function (startIndex, startVertice, start2EndVector, resolution, pixelWidth) {
        var origin2StartVector = Vector_1.default.fromVertice(startVertice);
        var end2StartVector = start2EndVector.getOpposite();
        var offset = resolution * pixelWidth / 2;
        var start2LeftBottomVector = origin2StartVector.cross(start2EndVector).setLength(offset);
        var p1 = Vector_1.default.verticePlusVector(startVertice, start2LeftBottomVector).getArray();
        var v1 = new MeshVertice_1.default({
            i: startIndex++,
            p: p1
        });
        var start2RightBottomVector = origin2StartVector.cross(end2StartVector).setLength(offset);
        var p3 = Vector_1.default.verticePlusVector(startVertice, start2RightBottomVector).getArray();
        var v3 = new MeshVertice_1.default({
            i: startIndex++,
            p: p3
        });
        return {
            startIndex: startIndex,
            v1: v1,
            v3: v3
        };
    };
    return MeshRouteGraphic;
}(MeshColorGraphic_1.default));
var RouteLayer = (function (_super) {
    __extends(RouteLayer, _super);
    function RouteLayer(camera, key) {
        var _this = _super.call(this) || this;
        _this.camera = camera;
        _this.key = key;
        _this.pixelWidth = 5;
        _this.busColor = [82, 153, 255];
        _this.drivingColor = [0, 189, 0];
        _this.walkingColor = [76, 221, 38];
        _this.startLonlat = null;
        _this.endLonlat = null;
        _this.route = null;
        _this.deltaLonlatSquareThreshold = Math.pow(1 / (2 * Math.PI * Kernel_1.default.REAL_EARTH_RADIUS) * 360, 2);
        Utils_1.default.subscribe('level-change', function () {
            if (_this.children.length > 0) {
                var resolution_1 = _this.camera.getResolution();
                _this.children.forEach(function (graphic) {
                    if (graphic instanceof MeshRouteGraphic) {
                        graphic.updateGeometry(resolution_1);
                    }
                });
            }
        });
        return _this;
    }
    RouteLayer.prototype.test = function (pixelWidth, segments, rgb) {
        if (pixelWidth === void 0) { pixelWidth = 5; }
        if (segments === void 0) { segments = 100; }
        if (rgb === void 0) { rgb = [0, 255, 0]; }
        var resolution = this.camera.getResolution();
        this._addRouteByLonlats([[90, 0], [120, 0], [120, 40]], resolution, this.pixelWidth, rgb);
    };
    RouteLayer.prototype._addRouteByLonlat = function (startLonLat, endLonLat, resolution, pixelWidth, segments, rgb) {
        var lonlats = this._getLonlatsBySegments(startLonLat, endLonLat, segments);
        return this._addRouteByLonlats(lonlats, resolution, pixelWidth, rgb);
    };
    RouteLayer.prototype._addRouteByLonlats = function (lonlats, resolution, pixelWidth, rgb) {
        var graphic = null;
        if (lonlats.length >= 2) {
            var validLonlats = lonlats;
            if (validLonlats.length >= 2) {
                graphic = new MeshRouteGraphic(validLonlats, pixelWidth, resolution, new ColorMaterial_1.default(rgb));
                this.add(graphic);
            }
        }
        return graphic;
    };
    RouteLayer.prototype._getLonlatsBySegments = function (startLonLat, endLonLat, segments) {
        var deltaLon = (endLonLat[0] - startLonLat[0]) / segments;
        var deltaLat = (endLonLat[1] - startLonLat[1]) / segments;
        var lonlats = [];
        for (var i = 0; i < segments; i++) {
            var lonlat = [startLonLat[0] + deltaLon * i, startLonLat[1] + deltaLat * i];
            lonlats.push(lonlat);
        }
        lonlats.push(endLonLat);
        return lonlats;
    };
    RouteLayer.prototype.showPath = function (pathIndex) {
        if (this.route) {
            if (this.route.type === 'driving') {
                this._showDrivingPath(pathIndex);
            }
            else if (this.route.type === 'bus') {
                this._showBusPath(pathIndex);
            }
            else if (this.route.type === 'walking') {
                this._showWalkingPath(pathIndex);
            }
        }
    };
    RouteLayer.prototype.routeByDriving = function (fromLon, fromLat, toLon, toLat, strategy) {
        var _this = this;
        if (strategy === void 0) { strategy = 5; }
        return Service_1.default.routeByDriving(fromLon, fromLat, toLon, toLat, this.key, strategy).then(function (response) {
            _this._clearAll();
            if (response.route && response.route.paths && response.route.paths.length > 0) {
                _this.startLonlat = [fromLon, fromLat];
                _this.endLonlat = [toLon, toLat];
                _this.route = response.route;
                _this.showPath(0);
            }
            return response;
        });
    };
    RouteLayer.prototype._showDrivingPath = function (pathIndex) {
        var _this = this;
        if (this.route && this.route.paths && this.route.paths.length > 0) {
            var path = this.route.paths[pathIndex];
            if (path && path.steps && path.steps.length > 0) {
                this.clear();
                var lonlats_1 = [];
                path.steps.forEach(function (step, index, steps) {
                    lonlats_1.push.apply(lonlats_1, step.lonlats);
                });
                var extent = Extent_1.default.fromLonlats(lonlats_1);
                if (extent) {
                    this.camera.setExtent(extent);
                    setTimeout(function () {
                        var resolution = _this.camera.getResolution();
                        _this._addRouteByLonlats(lonlats_1, resolution, _this.pixelWidth, _this.drivingColor);
                        _this._showStartEndPoints();
                    }, 0);
                }
            }
        }
    };
    RouteLayer.prototype.routeByBus = function (fromLon, fromLat, toLon, toLat, startCity, endCity, strategy) {
        var _this = this;
        if (strategy === void 0) { strategy = 0; }
        return Service_1.default.routeByBus(fromLon, fromLat, toLon, toLat, startCity, endCity, this.key, strategy).then(function (response) {
            _this._clearAll();
            if (response.route && response.route.transits && response.route.transits.length > 0) {
                _this.startLonlat = [fromLon, fromLat];
                _this.endLonlat = [toLon, toLat];
                _this.route = response.route;
                _this.showPath(0);
            }
            return response;
        });
    };
    RouteLayer.prototype._showBusPath = function (pathIndex) {
        var _this = this;
        if (this.route && this.route.transits && this.route.transits.length > 0) {
            var transit = this.route.transits[pathIndex];
            if (transit && transit.segments && transit.segments.length > 0) {
                this.clear();
                var lonlats_2 = [];
                var lonlatsSegments_1 = [];
                transit.segments.forEach(function (segment) {
                    if (segment.walking && segment.walking.lonlats && segment.walking.lonlats.length > 0) {
                        segment.walking.lonlats.color = _this.walkingColor;
                        lonlatsSegments_1.push(segment.walking.lonlats);
                        lonlats_2.push.apply(lonlats_2, segment.walking.lonlats);
                    }
                    if (segment.bus && segment.bus.lonlats && segment.bus.lonlats.length > 0) {
                        segment.bus.lonlats.color = _this.busColor;
                        lonlatsSegments_1.push(segment.bus.lonlats);
                        lonlats_2.push.apply(lonlats_2, segment.bus.lonlats);
                    }
                    if (segment.railway && segment.railway.lonlats && segment.railway.lonlats.length > 0) {
                        segment.railway.lonlats.color = _this.busColor;
                        lonlatsSegments_1.push(segment.railway.lonlats);
                        lonlats_2.push.apply(lonlats_2, segment.railway.lonlats);
                    }
                });
                var extent = Extent_1.default.fromLonlats(lonlats_2);
                if (extent) {
                    this.camera.setExtent(extent);
                    setTimeout(function () {
                        var resolution = _this.camera.getResolution();
                        lonlatsSegments_1.forEach(function (lonlats) {
                            _this._addRouteByLonlats(lonlats, resolution, _this.pixelWidth, lonlats.color);
                        });
                        _this._showStartEndPoints();
                    }, 0);
                }
            }
        }
    };
    RouteLayer.prototype.routeByWalking = function (fromLon, fromLat, toLon, toLat) {
        var _this = this;
        return Service_1.default.routeByWalking(fromLon, fromLat, toLon, toLat, this.key).then(function (response) {
            _this._clearAll();
            if (response.route && response.route.paths && response.route.paths.length > 0) {
                _this.startLonlat = [fromLon, fromLat];
                _this.endLonlat = [toLon, toLat];
                _this.route = response.route;
                _this._showWalkingPath(0);
            }
            return response;
        });
    };
    RouteLayer.prototype._showWalkingPath = function (pathIndex) {
        var _this = this;
        if (this.route && this.route.paths && this.route.paths.length > 0) {
            var path = this.route.paths[pathIndex];
            if (path && path.steps && path.steps.length > 0) {
                this.clear();
                var lonlats_3 = [];
                path.steps.forEach(function (step) {
                    lonlats_3.push.apply(lonlats_3, step.lonlats);
                });
                var extent = Extent_1.default.fromLonlats(lonlats_3);
                if (extent) {
                    this.camera.setExtent(extent);
                    setTimeout(function () {
                        var resolution = _this.camera.getResolution();
                        _this._addRouteByLonlats(lonlats_3, resolution, _this.pixelWidth, _this.walkingColor);
                        _this._showStartEndPoints();
                    }, 0);
                }
            }
        }
    };
    RouteLayer.prototype._showStartEndPoints = function () {
        if (this.startLonlat) {
            var material = new MarkerTextureMaterial_1.default(startPointImageUrl, startPointImageSize);
            var startPointGraphic = new MultiPointsGraphic_1.default(material);
            startPointGraphic.setLonlats([this.startLonlat]);
            this.add(startPointGraphic);
        }
        if (this.endLonlat) {
            var material = new MarkerTextureMaterial_1.default(endPointImageUrl, endPointImageSize);
            var endPointGraphic = new MultiPointsGraphic_1.default(material);
            endPointGraphic.setLonlats([this.endLonlat]);
            this.add(endPointGraphic);
        }
    };
    RouteLayer.prototype._clearAll = function () {
        this.startLonlat = null;
        this.endLonlat = null;
        this.route = null;
        this.clear();
    };
    RouteLayer.prototype.onDraw = function (camera) {
        var gl = Kernel_1.default.gl;
        gl.disable(Kernel_1.default.gl.DEPTH_TEST);
        gl.depthMask(false);
        _super.prototype.onDraw.call(this, camera);
        gl.enable(Kernel_1.default.gl.DEPTH_TEST);
        gl.depthMask(true);
    };
    RouteLayer.prototype.destroy = function () {
        this.camera = null;
        _super.prototype.destroy.call(this);
    };
    RouteLayer.prototype.test2 = function (str) {
        var splits = str.split(";");
        var splits1 = splits[0].split(",");
        var splits2 = splits[1].split(",");
        var lon1 = parseFloat(splits1[0]);
        var lat1 = parseFloat(splits1[1]);
        var lon2 = parseFloat(splits2[0]);
        var lat2 = parseFloat(splits2[1]);
        var s = Math.pow((lon1 - lon2), 2) + Math.pow((lat1 - lat2), 2);
        var distance = Utils_2.default.getRealArcDistanceBetweenLonLats(lon1, lat1, lon2, lat2);
        return {
            lon1: lon1,
            lat1: lat1,
            lon2: lon2,
            lat2: lat2,
            s: s,
            distance: distance
        };
    };
    RouteLayer.getInstance = function (camera, key) {
        return new RouteLayer(camera, key);
    };
    return RouteLayer;
}(GraphicGroup_1.default));
exports.default = RouteLayer;
;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
var Program_1 = __webpack_require__(37);
var Graphic_1 = __webpack_require__(38);
var vs = "\nattribute vec3 aPosition;\nattribute vec3 aColor;\nvarying vec4 vColor;\nuniform mat4 uPMVMatrix;\n\nvoid main()\n{\n\tgl_Position = uPMVMatrix * vec4(aPosition,1.0);\n\tvColor = vec4(aColor,1.0);\n}\n";
var fs = "\nprecision mediump float;\nvarying vec4 vColor;\n\nvoid main()\n{\n\tgl_FragColor = vColor;\n}\n";
var MeshColorGraphic = (function (_super) {
    __extends(MeshColorGraphic, _super);
    function MeshColorGraphic(geometry, material) {
        var _this = _super.call(this, geometry, material) || this;
        _this.geometry = geometry;
        _this.material = material;
        _this.setGeometry(geometry);
        return _this;
    }
    MeshColorGraphic.prototype.setGeometry = function (geometry) {
        var _this = this;
        if (this.geometry) {
            this.geometry.destroy();
        }
        this.geometry = geometry;
        if (this.geometry) {
            this.geometry.vertices.forEach(function (vertice) {
                vertice.c = _this.material.color;
            });
            this.geometry.calculateVBO();
            this.geometry.calculateIBO();
            this.geometry.calculateCBO();
        }
    };
    MeshColorGraphic.prototype.isGeometryReady = function () {
        return !!this.geometry.vbo && !!this.geometry.ibo && !!this.geometry.cbo;
    };
    MeshColorGraphic.prototype.isReady = function () {
        return this.isGeometryReady() && _super.prototype.isReady.call(this);
    };
    MeshColorGraphic.prototype.createProgram = function () {
        return Program_1.default.getProgram(vs, fs);
    };
    MeshColorGraphic.prototype.updateShaderUniforms = function (camera) {
        var gl = Kernel_1.default.gl;
        var pmvMatrix = camera.getProjViewMatrixForDraw().multiplyMatrix(this.geometry.getMatrix());
        var locPMVMatrix = this.program.getUniformLocation('uPMVMatrix');
        gl.uniformMatrix4fv(locPMVMatrix, false, pmvMatrix.getFloat32Array());
    };
    MeshColorGraphic.prototype.onDraw = function (camera) {
        var gl = Kernel_1.default.gl;
        this.updateShaderUniforms(camera);
        var locPosition = this.program.getAttribLocation('aPosition');
        this.program.enableVertexAttribArray('aPosition');
        this.geometry.vbo.bind();
        gl.vertexAttribPointer(locPosition, 3, Kernel_1.default.gl.FLOAT, false, 0, 0);
        var locColor = this.program.getAttribLocation('aColor');
        this.program.enableVertexAttribArray('aColor');
        this.geometry.cbo.bind();
        gl.vertexAttribPointer(locColor, 3, Kernel_1.default.gl.FLOAT, false, 0, 0);
        this.geometry.ibo.bind();
        var count = this.geometry.triangles.length * 3;
        gl.drawElements(Kernel_1.default.gl.TRIANGLES, count, Kernel_1.default.gl.UNSIGNED_SHORT, 0);
    };
    return MeshColorGraphic;
}(Graphic_1.default));
exports.default = MeshColorGraphic;
;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Material_1 = __webpack_require__(54);
var ColorMaterial = (function (_super) {
    __extends(ColorMaterial, _super);
    function ColorMaterial(rgb255) {
        var _this = _super.call(this) || this;
        _this.color = null;
        _this.color = [rgb255[0] / 255, rgb255[1] / 255, rgb255[2] / 255];
        return _this;
    }
    ColorMaterial.prototype.isReady = function () {
        return this.color && this.color.length > 0;
    };
    ColorMaterial.prototype.destroy = function () {
    };
    return ColorMaterial;
}(Material_1.default));
exports.default = ColorMaterial;
;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "1e93a1226fa156bb6eeecd8276af7194.png";

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "34bb6835acf6236b7da4eaedd6b3db4e.png";

/***/ }),
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(79);
module.exports = __webpack_require__(179);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Kernel_1 = __webpack_require__(1);
exports.Kernel = Kernel_1.default;
var Globe_1 = __webpack_require__(81);
exports.Globe = Globe_1.default;
exports.GlobeOptions = Globe_1.GlobeOptions;


/***/ })
/******/ ]);
});
//# sourceMappingURL=index.842316328de347a542fe.js.map