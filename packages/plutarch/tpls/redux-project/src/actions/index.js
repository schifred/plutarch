import { config } from '../utils'
import { Schemas } from '../schema/test'

export const TEST_REQUEST = 'TEST_REQUEST'
export const TEST_SUCCESS = 'TEST_SUCCESS'
export const TEST_FAILURE = 'TEST_FAILURE'

const fetchTest = data => ({
  [config.CALL_API]: {
    types: [ TEST_REQUEST, TEST_SUCCESS, TEST_FAILURE ],
    endpoint: 'test',
    schema: Schemas.Test,
    data
  }
})

export const loadTest = (login, requiredFields = []) => (dispatch, getState) => {
  const user = getState().entities.test[login]
  if (user && requiredFields.every(key => user.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchTest(login))
}
