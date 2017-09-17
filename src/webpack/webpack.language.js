'use strict';

const path = require("path");
const I18nPlugin = require("i18n-webpack-plugin");
var languages = {
	"en": null,
	"de": require("./de.json")
};
module.exports = function(languages){
  return Object.keys(languages).map(language=>{
    return {
      name: language,
      entry: "./example",
      output: {
        path: path.join(__dirname, "js"),
        filename: language + ".output.js"
      },
      plugins: [
        new I18nPlugin(
          languages[language]
        )
      ]
    };
  });
};
