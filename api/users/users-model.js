const db = require('../../data/dbConfig.js')

module.exports = {
  insert,
  remove,
  getAll,
}

function getAll() {
  return db('users')
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