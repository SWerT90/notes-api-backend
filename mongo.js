const mongoose = require('mongoose')

const config = require('./utils/config')

const connectionString = config.NODE_ENV === 'test'
  ? `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URL_TEST}?retryWrites=true&w=majority`
  : `mongodb+srv://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_URL}?retryWrites=true&w=majority`

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
})
  .then(() => {
    console.log('Database connected')
  }).catch(error => {
    console.log(error)
  })

process.on('uncaught', () => {
  mongoose.connection.disconnect()
})

// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Mongo es la polla',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(error => {
//     console.log(error)
//   })
