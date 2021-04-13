const mongoose = require('mongoose')

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dbUrl = process.env.DB_URL
const connectionString = `mongodb+srv://${user}:${password}@${dbUrl}?retryWrites=true&w=majority`

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
