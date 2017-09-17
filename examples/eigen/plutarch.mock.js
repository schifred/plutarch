module.exports = function(app){
  app.get("/api/test.json",(req,res)=>{
    res.send("test");
  })
}