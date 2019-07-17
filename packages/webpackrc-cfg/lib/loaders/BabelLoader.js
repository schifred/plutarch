"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = require("path");

var _Mod = require("../Mod");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// https://babeljs.io/docs/en/next/babel-preset-env.html
class Babel_Preset_Env extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      targets: {
        browsers: ['last 2 versions', 'IE >= 9']
      },
      loose: false,
      useBuiltIns: 'usage',
      corejs: '2',
      modules: false // 设置成 'commonjs' 将使懒加载失效
      // https://stackoverflow.com/questions/43042889/typescript-referenceerror-exports-is-not-defined

    });

    this.mod = '@babel/preset-env';
    this.init();
  }

}

;

class Babel_Preset_React extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/preset-react';
    this.init();
  }

}

; // 注入最新的 api

class Babel_Plugin_Transform_Runtime extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      'absoluteRuntime': (0, _path.dirname)(require.resolve('../../package'))
    });

    this.mod = '@babel/plugin-transform-runtime';
    this.init();
  }

  get dependencies() {
    return ['@babel/runtime-corejs2', this.mod];
  }

}

; // stage_0

class Babel_Plugin_Prorosal_Function_Bind extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-function-bind';
    this.init();
  }

}

; // stage_1

class Babel_Plugin_Proposal_Export_Default_From extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-export-default-from';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Logical_Assignment_Operators extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-logical-assignment-operators';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Pipeline_Operator extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      proposal: 'minimal'
    });

    this.mod = '@babel/plugin-proposal-pipeline-operator';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Nullish_Coalescing_Operator extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      loose: false
    });

    this.mod = '@babel/plugin-proposal-nullish-coalescing-operator';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Do_Expressions extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-do-expressions';
    this.init();
  }

}

; // stage_2
// https://babeljs.io/docs/en/babel-plugin-proposal-decorators

class Babel_Plugin_Proposal_Decorators extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      legacy: true
    });

    this.mod = '@babel/plugin-proposal-decorators';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Function_Sent extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-function-sent';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Export_Namespace_From extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-export-namespace-from';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Numeric_Separator extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-numeric-separator';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Throw_Expressions extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-throw-expressions';
    this.init();
  }

}

; // stage_3

class Babel_Plugin_Syntax_Dynamic_Import extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-syntax-dynamic-import';
    this.init();
  }

}

;

class Babel_Plugin_Syntax_Import_Meta extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-syntax-import-meta';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Class_Properties extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      loose: true
    });

    this.mod = '@babel/plugin-proposal-class-properties';
    this.init();
  }

}

;

class Babel_Plugin_Proposal_Json_Strings extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);
    this.mod = '@babel/plugin-proposal-json-strings';
    this.init();
  }

}

;

class Babel_Plugins_Stage_3 {
  get plugin() {
    return [new Babel_Plugin_Syntax_Dynamic_Import(), new Babel_Plugin_Syntax_Import_Meta(), new Babel_Plugin_Proposal_Class_Properties(), new Babel_Plugin_Proposal_Json_Strings()];
  }

}

;

class Babel_Plugins_Stage_2 {
  get plugin() {
    return [new Babel_Plugin_Proposal_Decorators(), new Babel_Plugin_Proposal_Function_Sent(), new Babel_Plugin_Proposal_Export_Namespace_From(), new Babel_Plugin_Proposal_Numeric_Separator(), new Babel_Plugin_Proposal_Throw_Expressions(), ...new Babel_Plugins_Stage_3().plugin];
  }

}

;

class Babel_Plugins_Stage_1 {
  get plugin() {
    return [new Babel_Plugin_Proposal_Export_Default_From(), new Babel_Plugin_Proposal_Logical_Assignment_Operators(), new Babel_Plugin_Proposal_Pipeline_Operator(), new Babel_Plugin_Proposal_Nullish_Coalescing_Operator(), new Babel_Plugin_Proposal_Do_Expressions(), ...new Babel_Plugins_Stage_2().plugin];
  }

}

;

class Babel_Plugins_Stage_0 {
  get plugin() {
    return [new Babel_Plugin_Prorosal_Function_Bind(), ...new Babel_Plugins_Stage_1().plugin];
  }

}

;

class BabelLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      babelrc: true,
      presets: [new BabelLoader.Babel_Preset_Env(), new BabelLoader.Babel_Preset_React()],
      plugins: [new BabelLoader.Babel_Plugin_Transform_Runtime(), ...new Babel_Plugins_Stage_0().plugin],
      cacheDirectory: true // 缓存babel-loader编译结果 

    });

    this.init();
  }

  get dependencies() {
    return ['@babel/core', this.mod];
  }

  transform(opts) {
    const {
      presets,
      plugins
    } = opts;
    let _presets = [];
    let _plugins = [];
    presets.map(preset => {
      if (!(preset instanceof _Mod.Mod)) {
        _presets.push(preset);

        return;
      }

      ;

      if (!preset.options) {
        _presets.push(preset.module);

        return;
      }

      ;
      if (preset.mod && preset.options) _presets.push([preset.module, preset.options]);
    });
    plugins.map(plugin => {
      if (!(plugin instanceof _Mod.Mod)) {
        _plugins.push(plugin);

        return;
      }

      ;

      if (!plugin.options) {
        _plugins.push(plugin.module);

        return;
      }

      ;
      if (plugin.mod && plugin.options) _plugins.push([plugin.module, plugin.options]);
    });
    return _objectSpread({}, this.opts, {
      presets: _presets,
      plugins: _plugins
    });
  }

  getOptions(opts = {}) {
    const {
      presets = [],
      plugins = []
    } = opts;

    const options = _objectSpread({}, opts, {
      presets: [...(this.opts.presets || []), ...presets],
      plugins: [...(this.opts.plugins || []), ...plugins]
    });

    return this.transform ? this.transform(options) : options;
  }

}

exports.default = BabelLoader;

_defineProperty(BabelLoader, "Babel_Preset_Env", Babel_Preset_Env);

_defineProperty(BabelLoader, "Babel_Preset_React", Babel_Preset_React);

_defineProperty(BabelLoader, "Babel_Plugin_Transform_Runtime", Babel_Plugin_Transform_Runtime);

_defineProperty(BabelLoader, "Babel_Plugin_Prorosal_Function_Bind", Babel_Plugin_Prorosal_Function_Bind);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Export_Default_From", Babel_Plugin_Proposal_Export_Default_From);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Logical_Assignment_Operators", Babel_Plugin_Proposal_Logical_Assignment_Operators);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Pipeline_Operator", Babel_Plugin_Proposal_Pipeline_Operator);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Nullish_Coalescing_Operator", Babel_Plugin_Proposal_Nullish_Coalescing_Operator);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Do_Expressions", Babel_Plugin_Proposal_Do_Expressions);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Decorators", Babel_Plugin_Proposal_Decorators);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Function_Sent", Babel_Plugin_Proposal_Function_Sent);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Export_Namespace_From", Babel_Plugin_Proposal_Export_Namespace_From);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Numeric_Separator", Babel_Plugin_Proposal_Numeric_Separator);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Throw_Expressions", Babel_Plugin_Proposal_Throw_Expressions);

_defineProperty(BabelLoader, "Babel_Plugin_Syntax_Dynamic_Import", Babel_Plugin_Syntax_Dynamic_Import);

_defineProperty(BabelLoader, "Babel_Plugin_Syntax_Import_Meta", Babel_Plugin_Syntax_Import_Meta);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Class_Properties", Babel_Plugin_Proposal_Class_Properties);

_defineProperty(BabelLoader, "Babel_Plugin_Proposal_Json_Strings", Babel_Plugin_Proposal_Json_Strings);

_defineProperty(BabelLoader, "Babel_Plugins_Stage_0", Babel_Plugins_Stage_0);

_defineProperty(BabelLoader, "Babel_Plugins_Stage_1", Babel_Plugins_Stage_1);

_defineProperty(BabelLoader, "Babel_Plugins_Stage_2", Babel_Plugins_Stage_2);

_defineProperty(BabelLoader, "Babel_Plugins_Stage_3", Babel_Plugins_Stage_3);

;
module.exports = exports.default;