import React, { Component } from "react";
import { observer, inject } from "mobx-react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import PrimaryLayout from "./PrimaryLayout";
import Login from "pages/login";
import NotFound from "pages/404";

/**
 * 布局组件
 */
@inject("app")
@observer
class BaseLayout extends Component {
  requireLogin(Comp, props) {
    const { isLogin } = this.props.app;
    if (!isLogin) return <Redirect to={{ pathname: "/login", state: { from: props.location } }} />;
    return <Comp {...props} />;
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact render={() => <Redirect to="/app" />} />
          <Route path="/app" render={props => this.requireLogin(PrimaryLayout, props)} />
          <Route path="/login" component={Login} />
          <Route path="/404" component={NotFound} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default BaseLayout;
