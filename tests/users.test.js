const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const server = require('../index')
const User = require('../models/User')
const { api, getAllUsers } = require('./helpers')

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('pswd', 10)

    const user = new User({
      username: 'MiguelRoot',
      passwordHash
    })

    await user.save()
  })

  test('works as expected creating a fresh username', async () => {
    const usersAtStart = await getAllUsers()

    const newUser = {
      username: 'WerT',
      name: 'Miguel',
      password: 'tw1tch'
    }

    await api.post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await getAllUsers()
    const usernames = usersAtEnd.map(user => user.username)

    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    expect(usernames).toContain(newUser.username)
  })

  test('fails with proper statuscode and messagge if username is already taken',
    async () => {
      const usersAtStart = await getAllUsers()

      const newUser = {
        username: 'MiguelRoot',
        name: 'Miguel',
        password: 'h4ck'
      }

      const result = await api.post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')
      const usersAtEnd = await getAllUsers()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

describe('geting users', () => {
  test('works properly for get all users', async () => {
    const usersAtStart = await getAllUsers()

    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  server.close()
  mongoose.connection.close()
})
