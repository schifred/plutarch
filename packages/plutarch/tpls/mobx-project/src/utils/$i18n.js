let locale;
let languagePacks = {};

// 获取文案
function $i18n(key) {
  return locale && languagePacks[locale] && languagePacks[locale][key] ? languagePacks[locale][key] : key;
}

// 设置语言
$i18n.setLocale = language => {
  locale = language;
};

// 设置语言
$i18n.registerLanguagePack = (locale, pack) => {
  languagePacks[locale] = pack;
};

export default $i18n;
