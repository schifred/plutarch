import { request, config } from 'utils'

const { api } = config
const { testUrl } = api

export async function test (params) {
  return request({
    url: testUrl,
    method: 'get',
    data: params,
  })
}