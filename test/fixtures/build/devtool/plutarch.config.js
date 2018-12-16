module.exports = function(options){
  if ( this.isBuild ) options.devtool = 'source-map';

  return options;
};