import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import { extend } from './base';

function deserialize(val) {
  if (typeof val !== 'string') return undefined;

  try {
    return JSON.parse(val);
  } catch (e) {
    return val || undefined;
  }
}

var store = {
  storage: window.localStorage,
  session: {
    storage: window.sessionStorage
  }
};
var api = {
  set: function set(k, v) {
    if (this.disabled) return;
    if (v === undefined) return this.remove(k);
    this.storage.setItem(k, _JSON$stringify(v));
  },
  get: function get(k, def) {
    if (this.disabled) return def;
    var v = deserialize(this.storage.getItem(k));
    return v === undefined ? def : v;
  },
  has: function has(k) {
    return this.get(k) !== undefined;
  },
  remove: function remove(k) {
    if (this.disabled) return;
    this.storage.removeItem(k);
  },
  clear: function clear() {
    if (this.disabled) return;
    this.storage.clear();
  },
  forEach: function forEach(cb) {
    if (this.disabled) return;

    for (var i = 0; i < this.storage.length; i++) {
      var k = this.storage.key(i);
      cb(k, this.get(k));
    }
  },
  getAll: function getAll() {
    var _context;

    if (this.disabled) return null;
    var res = {};

    _forEachInstanceProperty(_context = this).call(_context, function (k, v) {
      res[k] = v;
    });

    return res;
  }
};
extend(store, api);
extend(store.session, api);
if (process.env.NODE_ENV === 'development') console.log('来首rap');
export default store;