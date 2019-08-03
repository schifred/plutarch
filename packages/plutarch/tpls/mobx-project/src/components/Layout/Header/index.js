import React, { Component } from "react";
import PropTypes from "prop-types";
import { Menu, Avatar, Dropdown, Icon, Layout } from "antd";
import styles from "./styles/index.less";

/**
 * 全局头
 */
class Header extends Component {
  static propTypes = {
    collapsed: PropTypes.bool.isRequired,
    toggleCollapsed: PropTypes.func.isRequired,
    prefix: PropTypes.node,
    userInfo: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  /**
   * 渲染菜单
   */
  renderOverlay = () => {
    const { logout } = this.props;
    return (
      <Menu mode="vertical" className={styles.pluSiderUserMenu}>
        <Menu.Item>
          <span onClick={logout}>
            <Icon type="logout" style={{ marginRight: "10px" }} />
            退出登录
          </span>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { collapsed, toggleCollapsed, prefix, userInfo } = this.props;
    const overlay = this.renderOverlay();

    return (
      <Layout.Header className={styles.pluHeader}>
        <Icon
          className={styles.pluHeaderTrigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={toggleCollapsed}
        />

        {prefix}

        <div className={styles.pluHeaderAddon}>
          <Dropdown overlay={overlay} placement="bottomLeft">
            <span className={styles.pluHeaderUserInfo}>
              <Avatar size={28} />
              <span className={styles.pluHeaderAddonName}>{userInfo.name}</span>
            </span>
          </Dropdown>
        </div>
      </Layout.Header>
    );
  }
}

export default Header;
