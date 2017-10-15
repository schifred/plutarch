import { normalize } from 'normalizr'
import { config, request } from '../utils'

// 发送请求
const callApi = ({endpoint, fetchType, method, data, format, schema}) => {
  const url = (endpoint.indexOf(config.apiPrefix) === -1) ? config.apiPrefix + endpoint : endpoint

  return request({
    url,
    fetchType,
    method,
    data,
    format
  }).then(response =>
    response.json().then(json => {
      if (!response.success) {
        return Promise.reject(json)
      }

      return normalize(format ? format(json) : json, schema)
    })
  )
}

// 携带有'Call API'属性的action将会进入本中间件处理
// 'Call API'属性值为{ 
//   types: ['REQUEST', 'SUCCESS', 'FAILURE'],// 请求前后派发特定的action
//   schema: ,数据模型
//   endpoint: [str|function(state)],// 字符串或函数形式的请求路径，待拼接上API_ROOT
//   method: 'get',// 请求方式
//   data,// 请求数据
//   fetchType,// 请求类型，如jsonp等
// }
export default store => next => action => {
  const callAPI = action[config.CALL_API]
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint } = callAPI
  const { fetchType, method, data, format, schema, types } = callAPI

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.')
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }
  if (typeof format !== 'function'){
    throw new Error('Expected action format to be function.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[config.CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi({endpoint, fetchType, method, data, format, schema}).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Something bad happened'
    }))
  )
}
