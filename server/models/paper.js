var mongoose = require('mongoose')

module.exports = mongoose.model('Paper', {
  sid: {type: String},
  name: {type: String, required: true},
  description: {type: String},
  key: {type: String}
})

