export default function stringify(data, options = {}){
  const { level = 0, baseSpace, noComma } = options;
  let result = '';
  const end = noComma ? "" : ",";
  if ( data instanceof RegExp ){
    result += `${data}${end}\n`;
  } else if ( Array.isArray(data) ){
    let i = level;
    let spaces = level ? baseSpace || '' : '';
    while(i > 0){
      spaces += '  ';
      i--;
    };
    result += `[\n`;
    data.map((item, idx) => {
      const val = stringify(item, {
        level: level + 1,
        noComma: idx === data.length - 1
      });
      result += `${spaces}  ${val}`;
    });
    result += `${spaces}]${level ? `${end}\n` : ''}`;
  } else if ( typeof data === 'object' ){
    let i = level;
    let spaces = level ? baseSpace || '' : '';
    while(i > 0){
      spaces += '  ';
      i--;
    };
    result += `{\n`
    Object.keys(data).map((key, idx) => {
      const val = stringify(data[key], {
        level:level + 1,
        noComma: idx === Object.keys(data).length - 1
      });
      result += `${spaces}  "${key}": ${val}`;
    });
    result += `${spaces}}${level ? `${end}\n` : ''}`;
  } else if ( typeof data === 'string' ){
    result += `"${data}"${end}\n`;
  } else {
    result += `${data}${end}\n`;
  };

  return result;
}