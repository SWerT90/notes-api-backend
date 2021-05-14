const supertest = require('supertest')
const app = require('../app')

const User = require('../models/User')

const api = supertest(app)

const initialNotes = [
  {
    content: 'Aprendiendo Fullstack JS con midudev',
    important: true,
    date: new Date()
  },
  {
    content: 'Aprendiendo pa ganarme el pan',
    important: true,
    date: new Date()
  }
]

const getAllContentFromNotes = async () => {
  const response = await api.get('/api/notes')

  return {
    contents: response.body.map(note => note.content),
    response
  }
}

const getAllUsers = async () => {
  const usersDB = await User.find({})

  return usersDB.map(user => user.toJSON())
}

module.exports = {
  initialNotes,
  api,
  getAllContentFromNotes,
  getAllUsers
}
