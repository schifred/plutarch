export { default as classnames } from 'classnames'
export { default as lodash } from 'lodash'
export { default as config } from './config'
export { default as request } from './request'

export const getCallApiTypes = namespace => {
  const requestType = `${namespace.toUpperCase()}_REQUEST`
  const successType = `${namespace.toUpperCase()}_SUCCESS`
  const failureType = `${namespace.toUpperCase()}_FAILURE`

  return [requestType, successType, failureType]
}

export const getTypesNamespace = type => {
  const idx = type.lastIndexOf('_');
  let namespace = type.slice(1, idx+1)

  return namespace.toLowerCase()
}
