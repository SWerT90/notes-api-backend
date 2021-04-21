const app = require('./app')
const logger = require('./utils/logger')

const config = require('./utils/config')

const server = app.listen(config.PORT, () => {
  logger.info(`Server runnig on port ${config.PORT}`)
})

module.exports = server
