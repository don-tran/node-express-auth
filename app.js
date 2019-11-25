const
  express = require('express'),
  app = express(),
  routes = require('./application/routes')

routes.init(app)

module.exports = app
