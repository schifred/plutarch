import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
// import DevTools from "mobx-react-devtools";
import $i18n from "utils/$i18n";
import zh from 'locales/zh';
import router from './router';

import stores from "stores";

$i18n.setLocale('zh');
$i18n.registerLanguagePack('zh', zh);

function getComponent() {
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    const element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    return element;
  }).catch(error => 'An error occurred while loading the component');
}
  
getComponent().then(component => {
  document.body.appendChild(component);
})

render(
  <Provider {...stores}>
    {router}
  </Provider>,
  document.getElementById("root")
);