import dynamic from "utils/dynamic";
import pages from "./pages";

export default [
  {
    path: "/app/products/list",
    component: dynamic({
      loader: () => import("pages/product/list")
    }),
    title: "产品列表",
    icon: "appstore"
  },
  {
    path: "/app/products/create",
    component: pages["product/edit"],
    menu: false
  },
  {
    path: "/app/products/edit/:id",
    component: pages["product/edit"],
    menu: false
  },
  {
    path: "/app/products/detail/:id",
    component: pages["product/detail"],
    menu: false
  }
];
