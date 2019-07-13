"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = copy;

var _fs = require("fs");

function copy(src, target) {
  if (!(0, _fs.existsSync)(target)) {
    const srcBuffer = (0, _fs.readFileSync)(src);
    (0, _fs.writeFileSync)(target, srcBuffer);
  }

  ;
}

module.exports = exports.default;