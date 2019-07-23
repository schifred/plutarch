"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.Mod = void 0;

var _depend = require("./depend");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 抽象加载器、插件基类
 */
class AbstractMod {
  constructor() {
    _defineProperty(this, "addDependency", _depend.addDependency);

    _defineProperty(this, "removeDependency", _depend.removeDependency);

    _defineProperty(this, "transformDependencyName", _depend.transformDependencyName);
  }

  get dependencies() {
    return this.mod;
  }

}

;
/**
 * 加载器基类
 */

class Mod extends AbstractMod {
  constructor(opts = {}) {
    super(opts);
    this.mod = this.transformDependencyName(this.constructor.name);
    this.opts = opts;
    this.init();
  }

  init() {
    this.opts = _objectSpread({}, this.defaultOptions || {}, {}, this.opts || {});

    if (!Object.keys(this.opts).length) {
      this.opts = undefined;
    }

    ; // 依赖管理

    this.removeDependency(this.transformDependencyName(this.constructor.name));
    this.addDependency(this.dependencies);
  }

  get module() {
    const [moduleName, methodName] = this.mod.split('.');
    return !methodName ? require.resolve(moduleName) : require(moduleName)[methodName];
  }

  get options() {
    return this.transform ? this.transform(this.opts) : this.opts;
  }

  getOptions(opts) {
    let options;

    if (typeof this.opts === 'object' && typeof opts === 'object') {
      options = _objectSpread({}, this.opts, {}, opts);
    } else if (Array.isArray(this.opts) && Array.isArray(opts)) {
      options = [...this.opts, ...opts];
    } else if (opts) {
      options = opts;
    } else {
      options = this.opts;
    }

    return this.transform ? this.transform(options) : options;
  }

  createOptions(opts) {
    return opts;
  }

}

exports.Mod = Mod;
;
/**
 * 插件基类
 */

class Plugin extends AbstractMod {
  constructor(opts) {
    super(opts);
    this.mod = this.transformDependencyName(this.constructor.name);
    this.opts = opts;
    this.init();
  }

  init() {
    this.opts = this.defaultOptions ? _objectSpread({}, this.defaultOptions || {}, {}, this.opts || {}) : this.opts; // 依赖管理

    this.removeDependency(this.transformDependencyName(this.constructor.name));
    this.addDependency(this.dependencies);
  }

  get Plugin() {
    const [moduleName, ...methodNames] = this.mod.split('.');

    let Func = require(moduleName);

    let i = 0;

    while (i < methodNames.length) {
      const methodName = methodNames[i];
      if (methodName) Func = Func[methodName];
      i++;
    }

    ;
    return Func;
  }

  get plugin() {
    const Func = this.Plugin;
    return new Func(this.opts);
  }

  getPlugin(opts, ...args) {
    const Func = this.Plugin;
    let options;

    if (typeof this.opts === 'object' && typeof opts === 'object') {
      options = _objectSpread({}, this.opts, {}, opts);
    } else if (Array.isArray(this.opts) && Array.isArray(opts)) {
      options = [...this.opts, ...opts];
    } else if (opts) {
      options = opts;
    } else {
      options = this.opts;
    }

    return new Func(options, ...args);
  }

}

exports.Plugin = Plugin;
;