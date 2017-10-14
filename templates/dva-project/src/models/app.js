/* global window */
/* global document */
/* global location */
import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import { query, logout } from 'services/app'
import queryString from 'query-string'

export default {
  namespace: 'app',
  state: {
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

  },
  effects: {

    * test ({
      payload,
    }, { call, put, select }) {
      const { success } = yield call(test, payload)
      const { locationPathname } = yield select(_ => _.app)
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            test: '12'
          },
        })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}