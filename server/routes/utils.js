const User = require('../models/user')
const bcrypt = require('bcrypt')
const shortid = require('shortid')
const saltRounds = 10

module.exports = {

  createUser: function (email, password, username, maths, physics, chemistry, biology, callback) {
    const newUser = new User()
    newUser.sid = shortid.generate()
    newUser.email = email
    newUser.username = username
    newUser.password = bcrypt.hashSync(password, saltRounds)
    newUser.maths = maths
    newUser.physics = physics
    newUser.chemistry = chemistry
    newUser.biology = biology
    newUser.save(function (err, user) {
      callback(err, user)
    })
  }
}
