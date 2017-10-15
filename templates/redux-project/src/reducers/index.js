import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import { combineReducers } from 'redux'
import { getTypesNamespace } from '../utils'

// 根据normalizr生成的response.entities更新state
const entities = (state = { test: {} }, action) => {
  if (action.response && action.response.entities) {
    const namespace = getTypesNamespace(action.type)
    const relativeState = state[namespace]
    return {
      ...state,
      [namespace]: {
        ...relativeState,
        ...action.response.entities
      }
    }
  }

  return state
}

const rootReducer = combineReducers({
  entities
})

export default rootReducer
