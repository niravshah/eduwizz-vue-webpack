const User = require('../models/user')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const saltRounds = 10

module.exports = {

  createUser: function (name, email, password, username, maths, physics, chemistry, biology, callback) {
    const newUser = new User()
    newUser.sid = shortid.generate()
    newUser.name = name
    newUser.email = email
    newUser.username = username
    newUser.password = bcrypt.hashSync(password, saltRounds)
    newUser.permissions.maths = maths
    newUser.permissions.physics = physics
    newUser.permissions.chemistry = chemistry
    newUser.permissions.biology = biology
    newUser.save(function (err, user) {
      callback(err, user)
    })
  }
}
