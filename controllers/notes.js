const notesRouter = require('express').Router()
const Note = require('../models/Note')
const User = require('../models/User')

const userExtractor = require('../middleware/userExtractor')

notesRouter.get('/', async (req, res, next) => {
  const notes = await Note.find({}).populate('user', {
    username: 1,
    name: 1
  })

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

notesRouter.delete('/:id', userExtractor, async (req, res, next) => {
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

notesRouter.post('/', userExtractor, async (req, res, next) => {
  const {
    content,
    important = false,
    userId
  } = req.body

  const user = await User.findById(userId)

  if (!content) {
    return res.status(400).json({
      error: 'Content is missing'
    })
  }

  const newNote = new Note({
    content,
    important,
    date: new Date().toISOString(),
    user: user._id
  })

  try {
    const savedNote = await newNote.save()

    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.status(201).json(savedNote)
  } catch (error) {
    next(error)
  }

  // newNote.save()
  //   .then(savedNote => { res.status(201).json(savedNote) })
  //   .catch(error => next(error))
})

notesRouter.put('/:id', userExtractor, (req, res, next) => {
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
