var mongoose = require('mongoose')

module.exports = mongoose.model('Paper', {
  sid: {type: String},
  name: {type: String, required: true},
  key: {type: String, required: true},
  subject: {type: String, required: true},
  description: {type: String},
  type: {type: String}
})

