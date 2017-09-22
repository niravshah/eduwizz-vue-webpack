var mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  sid: {type: String},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  firstLogin: {type: Boolean, default: true},
  active: {type: Boolean, default: true},
  locked: {type: Boolean, default: false},
  permissions: {
    maths: {type: Boolean, default: false},
    chemistry: {type: Boolean, default: false},
    biology: {type: Boolean, default: false},
    physics: {type: Boolean, default: false}
  }
})

