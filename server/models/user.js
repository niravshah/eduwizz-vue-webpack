var mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  sid: {type: String},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstLogin: {type: Boolean, default: true},
  active: {type: Boolean, default: true},
  locked: {type: Boolean, default: false}
})

