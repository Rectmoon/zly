"use strict";

exports.__esModule = true;
exports.getType = getType;
exports.isPlaneObject = isPlaneObject;
exports.extend = extend;
exports.inherit = inherit;
exports.isObject = exports.isNumber = exports.isString = exports.isArray = exports.isFunction = exports.isBoolean = exports.isUndefined = exports.isNull = void 0;
var oproto = Object.prototype;

function getType(o) {
  return oproto.toString.call(o).slice(8, -1).toLowerCase();
}

var isNull = function isNull(o) {
  return getType(o) === 'null';
};

exports.isNull = isNull;

var isUndefined = function isUndefined(o) {
  return getType(o) === 'undefined';
};

exports.isUndefined = isUndefined;

var isBoolean = function isBoolean(o) {
  return getType(o) === 'boolean';
};

exports.isBoolean = isBoolean;

var isFunction = function isFunction(o) {
  return getType(o) === 'function';
};

exports.isFunction = isFunction;

var isArray = function isArray(o) {
  return getType(o) === 'array';
};

exports.isArray = isArray;

var isString = function isString(o) {
  return getType(o) === 'string';
};

exports.isString = isString;

var isNumber = function isNumber(o) {
  return getType(o) === 'number';
};

exports.isNumber = isNumber;

var isObject = function isObject(o) {
  return getType(o) === 'object';
};

exports.isObject = isObject;

function isPlaneObject(o) {
  return getType(o) === 'object' && Object.getPrototypeOf(o) === oproto;
}

function extend() {
  var options,
      name,
      src,
      copy,
      copyisArray,
      clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false; // 如果第一个参数为布尔,判定是否深拷贝

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {};
    i++;
  } // 确保接受方为一个复杂的数据类型


  if (typeof target !== 'object' && !isFunction(target)) {
    target = {};
  }

  if (i === length) {
    target = this;
    i--;
  }

  for (; i < length; i++) {
    if ((options = arguments[i]) !== null) {
      for (name in options) {
        src = target[name];
        copy = options[name];
        if (target === copy) continue;

        if (deep && copy && (isPlaneObject(copy) || (copyisArray = isArray(copy)))) {
          if (copyisArray) {
            copyisArray = false;
            clone = src && isArray(src) ? src : [];
          } else {
            clone = src && isPlaneObject(src) ? src : {};
          }

          target[name] = extend(deep, clone, copy);
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }

  return target;
}

function inherit(origin) {
  if (arguments.length === 0 || arguments.length > 2) throw '参数错误';
  var parent = null;
  var properties = slice.call(arguments);
  if (typeof properties[0] === 'function') parent = properties.shift();
  properties = properties[0];

  function Target() {
    if (isFunction(this.initialize)) {
      this.initialize.apply(this, arguments);
    }
  }

  Target.superclass = parent;

  if (parent) {
    var subclass = function subclass() {};

    subclass.prototype = parent.prototype;
    Target.prototype = new subclass();
  }

  var ancestor = Target.superclass && Target.superclass.prototype;

  for (var k in properties) {
    var value = properties[k];

    if (ancestor && typeof value == 'function') {
      var argslist = /^\s*function\s*\(([^\(\)]*?)\)\s*?\{/i.exec(value.toString())[1].replace(/\s/g, '').split(','); //只有在第一个参数为$super情况下才需要处理（是否具有重复方法需要用户自己决定）

      if (argslist[0] === '$super' && ancestor[k]) {
        value = function (methodName, fn) {
          return function () {
            var z = this,
                args = [function () {
              return ancestor[methodName].apply(z, arguments);
            }];
            return fn.apply(this, args.concat(slice.call(arguments)));
          };
        }(k, value);
      }
    }

    if (isObject(Target.prototype[k]) && isObject(value) && typeof Target.prototype[k] != 'function' && typeof value != 'fuction') {
      var temp = {};
      extend(temp, Target.prototype[k], value);
      Target.prototype[k] = temp;
    } else {
      Target.prototype[k] = value;
    }
  }

  for (var key in parent) {
    if (parent.hasOwnProperty(key) && key !== 'prototype' && key !== 'superclass') Target[key] = parent[key];
  }

  if (!Target.prototype.initialize) Target.prototype.initialize = function () {};
  Target.prototype.constructor = Target;
  return Target;
}