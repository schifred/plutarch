'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _eslintFormatter = require('react-dev-utils/eslintFormatter');

var _eslintFormatter2 = _interopRequireDefault(_eslintFormatter);

var _Mod = require('../Mod');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EslintLoader = class EslintLoader extends _Mod.Mod {

  constructor(opts = {}) {
    super(opts);
    this.defaultOptions = {
      formatter: _eslintFormatter2.default,
      useEslintrc: false,
      baseConfig: {
        extends: [require.resolve('eslint-config-react-app')]
      }
    };
    this.init();
  }

  get dependencies() {
    return [this.mod, 'eslint', 'eslint-config-react-app', 'eslint-plugin-flowtype', 'eslint-plugin-jsx-a11y', 'eslint-plugin-react', 'eslint-plugin-import'];
  }
};
exports.default = EslintLoader;
;
module.exports = exports.default;