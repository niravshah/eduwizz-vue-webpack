const User = require('../models/user')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const saltRounds = 10

module.exports = {

  createUser: function (email, password, username, callback) {
    const newUser = new User()
    newUser.sid = shortid.generate()
    newUser.email = email
    newUser.username = username
    newUser.password = bcrypt.hashSync(password, saltRounds)
    newUser.save(function (err, user) {
      callback(err, user)
    })
  }
}
