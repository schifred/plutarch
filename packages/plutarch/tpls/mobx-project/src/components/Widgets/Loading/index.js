import React from "react";
import { Spin } from "antd";
import styles from "./styles/index.less";

export default function Loading({ loading, children }) {
  return <div className={styles.pluLoading}>{loading ? <Spin spinning={true} /> : children}</div>;
}
