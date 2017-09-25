var mongoose = require('mongoose')
var Schema = mongoose.Schema

var paperSchema = new Schema({
  sid: {type: String},
  name: {type: String, required: true},
  key: {type: String, required: true},
  subject: {type: String, required: true},
  description: {type: String},
  type: {type: String}
})

paperSchema.methods.isMaths = function () {
  return this.subject === 'maths'
}

paperSchema.methods.isPhysics = function () {
  return this.subject === 'physics'
}

paperSchema.methods.isChemistry = function () {
  return this.subject === 'chemistry'
}

paperSchema.methods.isBiology = function () {
  return this.subject === 'biology'
}

module.exports = mongoose.model('Paper', paperSchema)

