require('dotenv').config()

require('./mongo')
const Note = require('./models/Note')

const express = require('express')
const logger = require('./loggerMiddleware')
const cors = require('cors')

const handleErrors = require('./middleware/handleErrors')
const notFound = require('./middleware/notFound')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)

// const app = http.createServer((req, res) => {
//     res.writeHead(200, { 'Content-Type': 'application/json' })
//     res.end(JSON.stringify(notes))
// })

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res, next) => {
  Note.find({})
    .then(notes => { res.json(notes) })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(error => { next(error) })
})

app.delete('/api/notes/:id', (req, res, next) => {
  const id = req.params.id

  Note.deleteOne({ _id: id })
    .then(result => { res.status(204).end() })
    .catch(error => { next(error) })
})

app.post('/api/notes', (req, res, next) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'Note.content is missing'
    })
  }

  const newNote = new Note({
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  })

  newNote.save()
    .then(savedNote => { res.status(201).json(savedNote) })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (req, res, next) => {
  const newNoteInfo = req.body
  const id = req.params.id

  if (!newNoteInfo || !newNoteInfo.content) {
    return res.status(400).json({
      error: 'Note.content is missing'
    })
  }

  Note.findByIdAndUpdate(id, newNoteInfo, { new: true }).then(result => {
    return result
      ? res.status(200).json(result)
      : next({ name: 'NotFound' })
  }).catch(error => { next(error) })
  // const noteToChange = notes.find(note => note.id === id)

  // if (noteToChange) {
  //   notes = [...notes.filter(note => note.id !== id), newNoteInfo]
  //   console.log({ notes })
  //   return res.status(200).json(newNoteInfo).end()
  // }
})

app.use(handleErrors)

app.use(notFound)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server runnig on port ${PORT}`)
})
