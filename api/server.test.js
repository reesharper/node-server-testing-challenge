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

describe('server', () => {
  describe('[GET] /users', () => {
    it('responds with 200 OK', async () => {
      const res = await request(server).get('/users')
      expect(res.status).toBe(200)
    })
    it('returns the right num of users', async () => {
      let res
      await db('users').insert(rees)
      res = await request(server).get('/users')
      expect(res.body).toHaveLength(1)

      await db('users').insert(chaz)
      res = await request(server).get('/users')
      expect(res.body).toHaveLength(2)
    })
    it('returns the right users', async () => {
      await db('users').insert(rees)
      await db('users').insert(chaz)
      const res = await request(server).get('/users')
      expect(res.body[0]).toMatchObject({ id: 1, ...rees })
      expect(res.body[1]).toMatchObject({ id: 2, ...chaz })
    })
  })
  describe('[POST] /users', () => {
    it('responds with the newly created user', async () => {
      let res
      res = await request(server).post("/users").send(rees)
      expect(res.body).toMatchObject({ id: 1, ...rees })

      res = await request(server).post("/users").send(chaz)
      expect(res.body).toMatchObject({ id: 2, ...chaz })
    })
  })
  describe('[DELETE] /users/:id', () => {
    it('responds with correct status code', async () => {
      const [id] = await db('users').insert(rees)
      const res = await request(server).delete("/users/:id").send({id: id})
      expect(res.status).toBe(200)
    })
  })
})