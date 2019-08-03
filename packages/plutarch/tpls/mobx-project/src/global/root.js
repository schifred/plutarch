import React, { Fragment } from "react";
import { Provider } from "mobx-react";
// import DevTools from "mobx-react-devtools";
import { LocaleProvider } from "antd";
import zhCN from "antd/lib/locale-provider/zh_CN";
import stores from "./stores";
import BaseLayout from "layouts/BaseLayout";

export default function root() {
  return (
    <Provider {...stores}>
      <LocaleProvider locale={zhCN}>
        <Fragment>
          {/* <DevTools /> */}
          <BaseLayout />
        </Fragment>
      </LocaleProvider>
    </Provider>
  );
}
