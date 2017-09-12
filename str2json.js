let str1 = `奴隶社会,非洲,古埃及文明,金字塔
          ,亚洲,两河流域文明,汉谟拉比法典
          ,,古印度,种姓制度
          ,,,佛教的创立
          ,欧洲,希腊,希腊城邦
          ,,,雅典民主
          ,,罗马,城邦
          ,,,帝国的征服与扩展
          ,,希腊罗马古典文化,建筑艺术
          ,,,公历`;

let str2 = `奴隶社会,非洲
,亚洲
,,古印度
,欧洲`;

function str2json(str){
  const defaultLen = 4;
  let lines = str.split(/\n/);
  let humanPeriods = {};

  lines.reduce((prevKeys,line) => {
    line = line.split(/,/).map(item=>item.trim());
    return parseLine(line,prevKeys);;
  }, []);

  // 将每一行元素加入到对象中
  function parseLine(line,prevKeys){
    let currentKeys = [];

    line.reduce((obj,item,idx)=>{
      let key;

      if ( !item ){
        key = prevKeys[idx];
      }else{
        key = item;
        switch( idx ){
          case defaultLen - 1:
            obj.push(key);
            break;
          case defaultLen - 2:
            obj[key] = [];
            break;
          default:
            obj[key] = {};
        };
      };

      currentKeys.push(key);
      return obj[key];
    },humanPeriods);

    return currentKeys;
  };

  // 将对象转化成数组
  function obj2arr(obj,ignore){
    if ( ignore || Array.isArray(obj) ) return obj;

    let arr = [];

    Object.keys(obj).map(key=>{
      arr.push({
        [key]: obj2arr(obj[key])
      });
    });

    return arr;
  };

  humanPeriods = obj2arr(humanPeriods,true);
  console.log(JSON.stringify(humanPeriods))
  
  return humanPeriods;
};

str2json(str1);
str2json(str2);
