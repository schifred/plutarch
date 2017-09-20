# plutarch

前端脚手架

## 配置

plutarch.config.js

{
  entry: {
    index: "./src/index.js"
  }
}

## 本地调试

plutarch server 

## 打包编译

plutarch build

## 数据模拟

plutarch.mock.js

module.exports = function(app){

  app.get("/api/test.json",(req,res)=>{
    res.send("test");
  });

};

或

module.exports = {
  "get /api/test.json": "test"
};

或

module.exports = {

  app.get("/api/test.json","mocks.test");

};

mocks/test.js

module.exports = function(req,res){
  res.send("test");
};
