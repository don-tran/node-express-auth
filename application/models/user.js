'use strict'

const jwt = require('../utils/jwt.js')

class User {
  constructor() {
    this.users = []
  }

  createUser(userData, cb) {
    if (userData.hasOwnProperty('username')  && userData.hasOwnProperty('password')) {
      let
        username = userData.username,
        password = userData.password,
        user = {username, password}

      this.users.push(user)
      console.log('users registered', this.users)
      if (cb) cb(0, user)
    }
    else {
      if (cb) cb(1)
    }
  }

  loginUser(userData, cb) {
    let
      username = userData.username,
      password = userData.password

    if (username && password) {
      let user = {username: username, password: password}
      jwt.encryptToken(user, cb)
    }
  }

}

module.exports = new User()
