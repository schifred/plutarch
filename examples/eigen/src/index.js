"use strict";

import dva from "dva";
import { browserHistory } from 'dva/router';
import 'babel-polyfill';
import appModel from 'script/models/app.js';
import router from 'script/router.js';

const app = dva({
  history: browserHistory
});

app.model(appModel);

app.router(router);

app.start("#container");
