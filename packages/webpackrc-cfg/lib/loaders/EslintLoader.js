"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _eslintFormatter = _interopRequireDefault(require("react-dev-utils/eslintFormatter"));

var _Mod = require("../Mod");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EslintLoader extends _Mod.Mod {
  constructor(opts = {}) {
    super(opts);

    _defineProperty(this, "defaultOptions", {
      formatter: _eslintFormatter.default,
      useEslintrc: false,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app')]
      }
    });

    this.init();
  }

  get dependencies() {
    return [this.mod, 'eslint', 'eslint-config-react-app', 'eslint-plugin-flowtype', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'eslint-plugin-import'];
  }

}

exports.default = EslintLoader;
;
module.exports = exports.default;