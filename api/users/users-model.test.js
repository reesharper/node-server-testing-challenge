it('is the correct env', () => {
  expect(process.env.DB_ENV)
    .toBe('testing')
})

const User = require('./users-model')
const db = require('../../data/dbConfig')

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

describe('users model', () => {
  describe('insert function', () => {
    it('adds user to db', async () => {
      let all
      await User.insert(rees)
      all = await db('users')
      expect(all).toHaveLength(1)

      await User.insert(chaz)
      all = await db('users')
      expect(all).toHaveLength(2)
    })
    it('returns new user', async () => {
      const user = await User.insert(rees)
      expect(user).toMatchObject({ id: 1, ...rees})
    })
  })
  describe('delete function', () => {
    it('deletes the user', async () => {
      const [id] = await db('users').insert(rees)
      await User.remove(id)
      let user = await db('users')
      expect(user).toHaveLength(0)
    })
  })
})