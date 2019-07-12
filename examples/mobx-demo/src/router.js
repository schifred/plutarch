import React from "react";
import Loadable from 'react-loadable';
import loadable from '@loadable/component'
import { HashRouter, Route, Redirect } from 'react-router-dom';

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

const ProductList = 
loadable(() => import(/* webpackChunkName: "ProductList" */'./pages/ProductList'), {
  fallback: Loading,
});
// Loadable({
//   loader: () =>
//     import(/* webpackChunkName: "ProductList" */ "./pages/ProductList"),
//     loading: Loading
// });
const CreateProduct = Loadable({
  loader: () =>
    import(/* webpackChunkName: "CreateProduct" */ "./pages/CreateProduct"),
    loading: Loading
});
const ProductDetail = Loadable({
  loader: () =>
    import(/* webpackChunkName: "ProductDetail" */ "./pages/ProductDetail"),
    loading: Loading
});

const router = (
  <HashRouter>
    <div>
      <Route path='/' component={() => <Redirect to={'/products'} />} />
      <Route path='/products' component={ProductList} />
      <Route path='/create' component={CreateProduct} />
      <Route path='/edit/:id' component={CreateProduct} />
      <Route path='/detail/:id' component={ProductDetail} />
    </div>
  </HashRouter>
)

export default router;