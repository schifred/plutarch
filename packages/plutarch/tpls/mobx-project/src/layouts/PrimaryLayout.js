import React, { Component, cloneElement } from "react";
import PropTypes from "prop-types";
import { observer, inject } from "mobx-react";
import { Switch, Route, Redirect } from "react-router-dom";
import { enquireScreen, unenquireScreen } from "enquire-js";
import { Layout, Drawer } from "antd";
import { Sider, Header } from "components/Layout";
import styles from "./styles/primary_layout.less";
import trasver from "utils/travser";

@inject("app")
@observer
class PrimaryLayout extends Component {
  static childContextTypes = {
    mobile: PropTypes.bool, // 是否手机
    toggleCollapsed: PropTypes.func // 展开折叠
  };

  state = {
    mobile: false,
    collapsed: false,
    routes: []
  };

  getChildContext() {
    return {
      mobile: this.state.mobile,
      toggleCollapsed: this.toggleCollapsed
    };
  }

  /**
   * 响应式
   */
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      if (mobile !== this.state.mobile) {
        this.setState({
          mobile
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  /**
   * 退出
   */
  logout = () => {
    this.props.app.logout();
  };

  /**
   * 侧边栏展开、折叠
   */
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  /**
   * 渲染路由
   * @param {object} item 节点
   * @param {array} children 子节点列表
   * @return {React.Node} 子菜单或菜单项
   */
  renderRoute = (item, children) => {
    const { userInfo } = this.props.app;
    const node = children ? (
      <item.component>
        <Switch>{children}</Switch>
      </item.component>
    ) : (
      <item.component />
    );

    return !item.auth || userInfo.rights.includes(item.auth) ? (
      <Route key={item.path} path={item.path} render={props => cloneElement(node, props)} />
    ) : (
      ""
    );
  };

  render() {
    const { mobile, collapsed } = this.state;
    const { app } = this.props;
    const { routes } = app;

    return (
      <Layout>
        {/* 侧边栏 */}
        {mobile ? (
          <Drawer maskClosable closable={false} visible={!collapsed} placement="left" className={styles.pluTopDrawer}>
            <Sider collapsed={false} menus={routes} />
          </Drawer>
        ) : (
          <Sider collapsed={collapsed} menus={routes} />
        )}

        <Layout className={styles.pluRightContent}>
          <Header collapsed={collapsed} toggleCollapsed={this.toggleCollapsed} userInfo={{}} logout={this.logout} />

          <Layout.Content className={styles.pluRealContent}>
            {routes && routes.length ? (
              <Switch>
                <Route path="/app" exact render={() => <Redirect to={routes[0].path} />} />
                {trasver(routes, this.renderRoute)}
              </Switch>
            ) : (
              ""
            )}
          </Layout.Content>
        </Layout>
      </Layout>
    );
  }
}

export default PrimaryLayout;
