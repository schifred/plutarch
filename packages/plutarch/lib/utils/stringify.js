"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stringify;

function stringify(data, level, baseSpace) {
  if (!level) level = 0;
  let result = '';

  if (data instanceof RegExp) {
    result += `${data},\n`;
  } else if (Array.isArray(data)) {
    let i = level;
    let spaces = level ? baseSpace || '' : '';

    while (i > 0) {
      spaces += '  ';
      i--;
    }

    ;
    result += `[\n`;
    data.map(item => {
      result += `${spaces}  ${stringify(item, level + 1)}`;
    });
    result += `${spaces}]${level ? ',\n' : ''}`;
  } else if (typeof data === 'object') {
    let i = level;
    let spaces = level ? baseSpace || '' : '';

    while (i > 0) {
      spaces += '  ';
      i--;
    }

    ;
    result += `{\n`;
    Object.keys(data).map(key => {
      result += `${spaces}  "${key}": ${stringify(data[key], level + 1)}`;
    });
    result += `${spaces}}${level ? ',\n' : ''}`;
  } else if (typeof data === 'string') {
    result += `"${data}",\n`;
  } else {
    result += `${data},\n`;
  }

  ;
  return result;
}

module.exports = exports.default;