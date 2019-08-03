import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { matchPath, withRouter, Link } from "react-router-dom";
import { Menu, Icon, Layout } from "antd";
import configs from "configs";
import travser from "utils/travser";
import styles from "./styles/index.less";

/**
 * 侧边栏
 */
@withRouter
class Sider extends Component {
  static propTypes = {
    menus: PropTypes.array,
    collapsed: PropTypes.bool.isRequired
  };

  state = {
    menus: [],
    defaultOpenKeys: [],
    defaultSelectedKeys: []
  };

  static getDerivedStateFromProps(props, state) {
    const { menus } = props;
    if (state.menus !== menus) {
      const defaultOpenKeys = [];
      let defaultSelectedKeys = [];
      travser(menus, item => {
        if (
          matchPath(props.location.pathname, {
            path: item.path
          })
        ) {
          defaultOpenKeys.push(item.path);
          defaultSelectedKeys = [item.path];
        }
      });
      return {
        menus,
        defaultOpenKeys,
        defaultSelectedKeys
      };
    }
    return null;
  }

  /**
   * 渲染子菜单或菜单项
   * @param {object} item 节点
   * @param {array} children 子节点列表
   * @return {React.Node} 子菜单或菜单项
   */
  renderMenuItem(item, children) {
    if (item.menu === false) return "";

    const title = (
      <Fragment>
        {item.icon && <Icon type={item.icon} />}
        <span className={styles.pluMenuText}>{item.title}</span>
      </Fragment>
    );

    if (children) {
      return (
        <Menu.SubMenu key={item.path} title={title}>
          {children}
        </Menu.SubMenu>
      );
    }

    return (
      <Menu.Item key={item.path}>
        <Link to={item.path}>{title}</Link>
      </Menu.Item>
    );
  }

  render() {
    const { menus, defaultOpenKeys, defaultSelectedKeys } = this.state;
    const { collapsed } = this.props;

    return (
      <Layout.Sider className={styles.pluSider} trigger={null} collapsible collapsed={collapsed}>
        <div className={styles.pluLogo}>
          <Link to="/">
            {/* <img alt='logo' src="../../../imgs/logo.svg" /> */}
            {!collapsed && <div className={styles.pluTitle}>{configs.title}</div>}
          </Link>
        </div>

        <Menu
          mode="inline"
          defaultOpenKeys={defaultOpenKeys}
          defaultSelectedKeys={defaultSelectedKeys}
          className={styles.pluSiderMenu}
        >
          {menus && menus.length ? travser(menus, this.renderMenuItem) : ""}
        </Menu>
      </Layout.Sider>
    );
  }
}

export default Sider;
