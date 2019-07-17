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

render(
  <Provider {...stores}>
    {router}
  </Provider>,
  document.getElementById("root")
);