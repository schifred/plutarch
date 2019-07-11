'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Plugin = exports.Mod = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _depend = require('./depend');

/**
 * 抽象加载器、插件基类
 */
let AbstractMod = class AbstractMod {
  constructor() {
    this.addDependency = _depend.addDependency;
    this.removeDependency = _depend.removeDependency;
    this.transformDependencyName = _depend.transformDependencyName;
  }

  get dependencies() {
    return this.mod;
  }
};
;

/**
 * 加载器基类
 */
let Mod = exports.Mod = class Mod extends AbstractMod {
  constructor(opts = {}) {
    super(opts);
    this.mod = this.transformDependencyName(this.constructor.name);
    this.opts = opts;
    this.init();
  }

  init() {
    this.opts = _extends({}, this.defaultOptions || {}, this.opts || {});
    if (!Object.keys(this.opts).length) {
      this.opts = undefined;
    };

    // 依赖管理
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
      options = _extends({}, this.opts, opts);
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
};
;

/**
 * 插件基类
 */
let Plugin = exports.Plugin = class Plugin extends AbstractMod {
  constructor(opts) {
    super(opts);
    this.mod = this.transformDependencyName(this.constructor.name);
    this.opts = opts;
    this.init();
  }

  init() {
    this.opts = this.defaultOptions ? _extends({}, this.defaultOptions || {}, this.opts || {}) : this.opts;
    // 依赖管理
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
    };

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
      options = _extends({}, this.opts, opts);
    } else if (Array.isArray(this.opts) && Array.isArray(opts)) {
      options = [...this.opts, ...opts];
    } else if (opts) {
      options = opts;
    } else {
      options = this.opts;
    }

    return new Func(options, ...args);
  }
};
;