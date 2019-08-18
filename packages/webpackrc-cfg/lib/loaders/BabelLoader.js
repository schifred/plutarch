"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Mod = require("../Mod");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Babel_Preset_Plu extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      isBrowser: true,
      isTS: true,
      transformRuntime: true
    });

    this.init();
  }

}

;

class BabelLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      // babelrc: false,// 置为 true 将忽略部分语法报错
      presets: [new Babel_Preset_Plu()] // cacheDirectory: true// 缓存babel-loader编译结果。置为真值会导致 proposal-class-properties 不能编译装饰属性

    });

    this.init();
  }

  get dependencies() {
    return ['@babel/core', this.mod];
  }

  transform(opts) {
    const {
      presets = [],
      plugins = []
    } = opts,
          options = _objectWithoutProperties(opts, ["presets", "plugins"]);

    let _presets = [];
    let _plugins = [];
    presets.map(preset => {
      if (!(preset instanceof _Mod.Mod)) {
        _presets.push(preset);

        return;
      }

      ;
      const presetOptions = options[preset.mod];

      if (!preset.options) {
        if (!presetOptions) _presets.push(preset.module);else _presets.push([preset.module, presetOptions]);
      } else if (preset.mod && preset.options) {
        const options = _objectSpread({}, preset.options, {}, presetOptions || {});

        _presets.push([preset.module, options]);
      }

      ;
      delete options[preset.mod];
    });
    plugins.map(plugin => {
      if (!(plugin instanceof _Mod.Mod)) {
        _plugins.push(plugin);

        return;
      }

      ;
      const pluginOptions = options[preset.mod];

      if (!plugin.options) {
        if (!pluginOptions) _plugins.push(plugin.module);else _plugins.push([plugin.module, pluginOptions]);
        return;
      } else if (plugin.mod && plugin.options) {
        const options = _objectSpread({}, plugin.options, {}, pluginOptions || {});

        _plugins.push([plugin.module, options]);
      }

      ;
      delete options[plugin.mod];
    });
    return _objectSpread({}, this.opts, {}, options, {
      presets: _presets,
      plugins: _plugins
    });
  }

  getOptions(opts = {}) {
    const {
      presets = [],
      plugins = [],
      plu = {}
    } = opts;

    const options = _objectSpread({}, opts, {
      presets: [...(this.opts.presets || []), ...presets],
      plugins: [...(this.opts.plugins || []), ...plugins]
    });

    return this.transform(options);
  }

}

exports.default = BabelLoader;
;
module.exports = exports.default;