import _Object$getPrototypeOf from "@babel/runtime-corejs3/core-js-stable/object/get-prototype-of";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
var oproto = Object.prototype;
export function getType(o) {
  var _context;

  return _sliceInstanceProperty(_context = oproto.toString.call(o)).call(_context, 8, -1).toLowerCase();
}
export var isNull = function isNull(o) {
  return getType(o) === 'null';
};
export var isUndefined = function isUndefined(o) {
  return getType(o) === 'undefined';
};
export var isBoolean = function isBoolean(o) {
  return getType(o) === 'boolean';
};
export var isFunction = function isFunction(o) {
  return getType(o) === 'function';
};
export var isArray = function isArray(o) {
  return getType(o) === 'array';
};
export var isString = function isString(o) {
  return getType(o) === 'string';
};
export var isNumber = function isNumber(o) {
  return getType(o) === 'number';
};
export var isObject = function isObject(o) {
  return getType(o) === 'object';
};
export function isPlaneObject(o) {
  return getType(o) === 'object' && _Object$getPrototypeOf(o) === oproto;
}
export function extend() {
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