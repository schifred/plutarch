import * as locale from "script/i18n/en";

export default {
  namespace: 'app',
  state: {
    language: "en",
    locale: locale,
  },
  effects: {
    * changeLanguage ({ payload: { language } }, { put }) {
      let locale;
      yield require.ensure([], function(require){
        locale = require(`../i18n/${language}.js`);
      });
      yield put({
        type: "setLanguage",
        language,
        locale
      });
    }
  },
  reducers: {
    setLanguage (state, { language, locale }) {
      return {
        ...state,
        language,
        locale
      }
    }
  }
};
