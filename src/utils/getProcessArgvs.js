'use strict';

// 获取命令参数
module.exports = function getProcessArgvs(process){
  const { cwd, env, platform } = process;
  
  return {
    cwd: cwd(),
    env,
    ["NODE_ENV"]: env["NODE_ENV"],
    isProd: env["NODE_ENV"] === "production",
    platform,// 操作系统{ Mac-Os: drawin，windows: Windows_NT, linux: linux }
  };
};
