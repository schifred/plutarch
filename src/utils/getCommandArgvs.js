'use strict';

// 获取命令参数
module.exports = function getCommandArgvs(process){
  const { cwd, env } = process;
  
  return {
    cwd: cwd(),
    env,
    ["NODE_ENV"]: env["NODE_ENV"],
    isProd: env["NODE_ENV"] === "production"
  };
};
