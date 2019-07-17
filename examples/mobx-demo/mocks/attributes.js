const catrgories = [{
  id: 0, name: '家电 - 数码 - 手机', value: 'electronic', level: 1
},{
  id: 1, name: '女装 - 男装 - 内衣', value: 'clothes', level: 1
},{
  id: 2, name: '手机', value: 'cellphone', parentId: 0, level: 2
},{
  id: 3, name: '衬衫', value: 'shirt', parentId: 1, level: 2
}];

module.exports = (req, res) => {
  const { query: { level, cid } } = req;
  
  if ( level ){
    res.send({
      code: 200,
      success: true,
      data: catrgories.filter(item => item.level == level)
    });
  } else if ( cid ){
    res.send({
      code: 200,
      success: true,
      data: catrgories.filter(item => item.id == cid)
    });
  };
};