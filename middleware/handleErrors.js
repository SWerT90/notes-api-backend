const ERROR_HANDLER = {
  CastError: (res, { name }) =>
    res.status(400).send({ error: name }),

  NotFound: res =>
    res.status(404).send({ error: 'Note not found' }),

  JsonWebTokenError: res =>
    res.status(401).send({ error: 'Unathorized' }),

  defaultError: res =>
    res.status(500).end()
}

module.exports = (error, req, res, next) => {
  console.error(error)

  console.log('Ey en handleerrror')

  if (error.errors !== undefined && error.errors.username !== undefined) {
    res.status(400).send({
      error: '`username` to be unique'
    })
  }

  const handler = ERROR_HANDLER[error.name] || ERROR_HANDLER.defaultError

  handler(res)
}
