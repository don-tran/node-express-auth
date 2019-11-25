'use strict'

const
  express = require('express'),
  bcrypt = require('bcrypt'),
  router = express.Router(),
  userModel = require('../../models/user'),
  bodyParser = require('body-parser'),
  common = require('../../utils/common')

router.use(bodyParser.json({type: 'application/*+json'}))

router.post('/register', (req, res) => {
  common.getPostData(req, res, function(data) {
    let
      username = data.username,
      password = bcrypt.hashSync(data.password, 10),
      userData = {username, password}

    userModel.createUser(userData, (err, user) => {
      if (err) return res.status(500).json({sucess: 0})
      return res.status(200).json({success: 1, data: {usesrname: user.username}})
    })
  })
})

router.post('/login', (req, res) => {
  common.getPostData(req, res, function(data) {
    let
      username = data.username,
      password = data.password,
      userData = {username, password}

    userModel.loginUser(userData, (err, userToken) => {
      if (err) return res.status(500).json({sucess: 0})
      return res.status(200).json({success: 1, token: userToken})
    })
  })
})

module.exports = router
