module.exports = (error, req, res, next) => {
  console.error(error)

  if (error.name === 'CastError') {
    res.status(400).send({
      error: error.name
    })
  } else if (error.name === 'NotFound') {
    res.status(404).send({
      error: 'Note not found'
    })
  } else {
    res.status(500).end()
  }
}
