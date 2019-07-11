import React from "react";
import { render } from "react-dom";
import { Provider } from "mobx-react";
import loadable from '@loadable/component'
import { HashRouter, Route, Redirect } from 'react-router-dom';
import DevTools from "mobx-react-devtools";
import $i18n from "utils/$i18n";
import zh from 'locales/zh';

$i18n.setLocale('zh');
$i18n.registerLanguagePack('zh', zh);

import stores from "stores";

function Loading(props) {
  if (props.isLoading) {
    if (props.timedOut) {
      return <div>Loader timed out!</div>;
    } else if (props.pastDelay) {
      return <div>Loading...</div>;
    } else {
      return null;
    }
  } else if (props.error) {
    return <div>Error! Component failed to load</div>;
  } else {
    return null;
  }
}

const ProductList = loadable(() => import(/* webpackChunkName: "ProductList" */'./pages/ProductList'), {
  fallback: Loading,
});
const CreateProduct = loadable(() => import(/* webpackChunkName: "CreateProduct" */'./pages/CreateProduct'), {
  fallback: Loading,
});
const ProductDetail = loadable(() => import(/* webpackChunkName: "ProductDetail" */'./pages/ProductDetail'), {
  fallback: Loading,
});

function getComponent() {
  const element = document.createElement('div');
  return import(/* webpackChunkName: "lodash" */ 'lodash').then(({ default: _ }) => {
    console.log(_.join)
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
    <HashRouter>
      <div>
        <Route path='/' component={ProductList} />
        <Route path='/products' component={ProductList} />
        <Route path='/create' component={CreateProduct} />
        <Route path='/edit/:id' component={CreateProduct} />
        <Route path='/detail/:id' component={ProductDetail} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);