const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  remove,
  getAll,
  getById,
}

function getAll() {
  return db('users')
}

function getById(id) {
  return null
}

async function insert(user) {
  const [id] = await db('users')
  .insert(user)
  return db('users')
  .where({ id })
  .first()
}


function remove(id) {
  return db('users')
    .where('id', id)
    .del()
}