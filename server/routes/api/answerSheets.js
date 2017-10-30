const express = require('express')
const router = express.Router()
const AnswerKeys = require('../../models/answerSheets')

module.exports = function (passport) {
  router.post('/api/keys/:qid/:sid', (req, res) => {
    AnswerKeys.findOneAndUpdate({
      sid: req.params.sid,
      questionPaperId: req.params.qid
    }, req.body, {new: true}, function (err, keys) {
      if (err) {
        res.status(500).json({message: 'Error updating answer keys'})
      } else {
        if (keys) {
          res.json({keys: keys})
        } else {
          res.status(500).json({message: 'Keys not found'})
        }
      }
    })
  })

  return router
}
