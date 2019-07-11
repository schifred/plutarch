import { schema } from 'normalizr'

const testSchema = new schema.Entity('users', {}, {
  idAttribute: test => test.id
})

export const Schemas = {
  TEST: testSchema
}