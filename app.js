const express = require('express')
require('./mongo')

const cors = require('cors')

const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')
const logger = require('./utils/logger')

const notesRouter = require('./controllers/notes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger.requestLogger)

app.use(express.static('build'))

app.use('/api/notes', notesRouter)

app.use(handleErrors)
app.use(notFound)

module.exports = app
