module.exports = function(options){
  if ( this.isBuild ) options.devtool = 'nosources-source-map';

  return options;
};