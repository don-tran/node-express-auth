'use strict'

const
  jwt = require('jwt-simple'),
  conf = require('../configs'),
  common = require('./common'),
  _ = require('lodash')

function decryptToken(token, cb) {
  if (token) {
    try {
      let data = jwt.decode(token, conf.apiSecret)
      if (cb) return cb(0, data)
    }
    catch(e) {
      if (cb) return cb(1)
    }
  }
}

function encryptToken(payload, cb) {
  if (payload.constructor === Object && !_.isEmpty(payload)) {
    let d = new Date()
    payload.ts = d.toUTCString()
    try {
      let data = jwt.encode(payload, conf.apiSecret)

      if (cb) return cb(0,data)
    }
    catch(e) {
      if (cb) return cb(1)
    }
  }
}

function verifyToken(req, res, next) {
  let token = req.params.token

  if (!token) {
    return res.status(403).send(JSON.stringify({success:0, message:'Missing Token'}))
  }
  decryptToken(token, function(err, reply) {
    if (err) {
      return res.status(403).send(JSON.stringify({success:0, message:'Invalid Token'}))
    }
    let user = {username : reply.username}
    next(user)
  })
}

module.exports = {
  encryptToken: encryptToken,
  decryptToken: decryptToken,
  verifyToken: verifyToken
};
