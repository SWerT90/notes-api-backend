const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const config = require('../utils/config')

const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body

  const user = await User.findOne({ username })
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!passwordCorrect) {
    return response.status(401).json({
      error: 'invalid user or password'
    })
  }

  const userForToken = {
    id: user._id,
    username: user.username
  }

  const token = jwt.sign(userForToken,
    config.SECRET,
    {
      expiresIn: 60 * 60
    })

  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
