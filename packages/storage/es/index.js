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
    this.storage.setItem(k, JSON.stringify(v));
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
    if (this.disabled) return null;
    var res = {};
    this.forEach(function (k, v) {
      res[k] = v;
    });
    return res;
  }
};
extend(store, api);
extend(store.session, api);
export default store;
console.log('storage1');