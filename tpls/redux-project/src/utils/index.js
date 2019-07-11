export classnames from 'classnames'
export lodash from 'lodash'
export configDefault from './config'
export requestDefault from './request'

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
