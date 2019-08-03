import { observable, action } from "mobx";
import menus from "global/menus";
import * as UserServices from "services/user";

class App {
  @observable isLogin = true;

  @action
  login(params) {
    const res = UserServices.login(params);
    return res;
  }

  @action
  logout(params) {
    const res = UserServices.logout(params);
    return res;
  }

  @observable routes = menus;
}

export default new App();
