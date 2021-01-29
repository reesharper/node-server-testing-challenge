const request = require('supertest')
const db = require('../data/dbConfig')
const server = require('./server')

const rees = { name: 'rees' }
const chaz = { name: 'chaz' }

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})

it('sanity', () => {
  expect(1).toEqual(1)
})