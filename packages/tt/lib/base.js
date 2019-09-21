"use strict";

exports.__esModule = true;
exports.getType = getType;
exports.isPlaneObject = isPlaneObject;
exports.extend = extend;
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