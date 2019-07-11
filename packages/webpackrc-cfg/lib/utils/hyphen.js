"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hyphen;
function hyphen(str) {
  return str.replace(/[A-Z]/g, ($1, index) => {
    return !!index ? `-${$1.toLowerCase()}` : $1.toLowerCase();
  });
};
module.exports = exports.default;