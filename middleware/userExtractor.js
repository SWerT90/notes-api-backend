const config = require('../utils/config')
const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authorization = req.get('authorization')
  let token = ''

  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  let decodedToken = {}

  try {
    decodedToken = jwt.verify(token, config.SECRET)
  } catch (error) {
    return next(error)
  }

  // if (!token || !decodedToken.id) {
  //   return res.status(401).json({ error: 'Unathorized' })
  // }

  const { id: userId } = decodedToken

  req.body.userId = userId

  next()
}
