import React from 'react';
import PropTypes from 'prop-types';
import { HashRouter, Route } from 'dva/router';

import App from 'script/routes/app';
import IndexPage from 'script/routes/pages/index';

const Routers = function ({ app }) {
  return <HashRouter>
    <App>
      <Route path="/" component={IndexPage}/>
    </App>
  </HashRouter>
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers;
