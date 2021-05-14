const { NODE_ENV } = process.env

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
  require('dotenv').config()
}
const { PORT, DB_USER, DB_PASSWORD, DB_URL, DB_URL_TEST, SECRET } = process.env

module.exports = {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_URL,
  NODE_ENV,
  DB_URL_TEST,
  SECRET
}
