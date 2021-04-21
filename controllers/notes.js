const notesRouter = require('express').Router()
const Note = require('../models/Note')

notesRouter.get('/', async (req, res, next) => {
  const notes = await Note.find({})

  res.json(notes)
  // Note.find({})
  //   .then(notes => { res.json(notes) })
  //   .catch(error => next(error))
})

notesRouter.get('/:id', (req, res, next) => {
  const { id } = req.params

  Note.findById(id).then(note => {
    if (note) {
      res.json(note)
    } else {
      res.status(404).end()
    }
  }).catch(error => { next(error) })
})

notesRouter.delete('/:id', async (req, res, next) => {
  const id = req.params.id

  try {
    await Note.deleteOne({ _id: id })
    res.status(204).end()
  } catch (error) {
    next(error)
  }

  // Note.deleteOne({ _id: id })
  //   .then(result => { res.status(204).end() })
  //   .catch(error => { next(error) })
})

notesRouter.post('/', async (req, res, next) => {
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

  try {
    const savedNote = await newNote.save()
    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }

  // newNote.save()
  //   .then(savedNote => { res.status(201).json(savedNote) })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', (req, res, next) => {
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

module.exports = notesRouter
