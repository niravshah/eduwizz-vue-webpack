const express = require('express')
const router = express.Router()
const AnswerKeys = require('../../models/answerSheets')

module.exports = function (passport) {
  router.patch('/api/keys/:qid/:sid', (req, res) => {
    AnswerKeys.findOneAndUpdate({
      sid: req.params.sid,
      questionPaperId: req.params.qid
    }, req.body, {upsert: true, new: true}, function (err, keys) {
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

  router.get('/api/answers/to-correct', (req, res) => {
    AnswerKeys.find({status: 'NEW'}, function (err, answers) {
      if (err) {
        res.status(500).json({messaged: 'Error. ' + err.message})
      } else {
        if (answers) {
          res.json({papers: answers})
        } else {
          res.json({papers: []})
        }
      }
    })
  })

  router.get('/api/answers/:sid', (req, res) => {
    AnswerKeys.find({sid: req.params.sid}, function (err, answers) {
      if (err) {
        res.status(500).json({messaged: 'Error. ' + err.message})
      } else {
        if (answers) {
          res.json({answers: answers})
        } else {
          res.json({answers: []})
        }
      }
    })
  })

  return router
}
