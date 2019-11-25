'use strict'

const
  express = require('express'),
  router = express.Router(),
  userController = require('../controllers/users')

router.use('/', userController)

module.exports = router
