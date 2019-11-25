'use strict'

const
  express = require('express'),
  router = express.Router(),
  apiController = require('../controllers/apis')

router.use('/', apiController)

module.exports = router
