'use strict'

const
  userRoute = require('./user'),
  apiRoute = require('./api')

function init(app) {
  app.use('/user', userRoute)
  app.use('/api', apiRoute)
}

module.exports = { init: init }
