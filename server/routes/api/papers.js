const express = require('express')
const router = express.Router()
const Paper = require('../../models/paper')
const utils = require('../utils')
module.exports = function (passport) {
  router.get('/api/admin/papers', (req, res) => {
    Paper.find({}, function (err, papers) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of papers'})
      } else {
        res.json({papers: papers})
      }
    })
  })

  router.get('/api/admin/papers/:subject', (req, res) => {
    Paper.find({subject: req.params.subject}, function (err, papers) {
      if (err) {
        res.status(500).json({message: 'Error fetching list of papers'})
      } else {
        res.json({papers: papers})
      }
    })
  })

  router.post('/api/admin/papers', (req, res) => {
    Paper.find({key: req.body.key}, function (err, papers) {
      if (err) {
        res.status(500).json({message: err.message})
      } else {
        if (papers.length > 0) {
          res.status(500).json({message: 'A paper with this file name already exists'})
        } else {
          utils.createPaper(req.body.name, req.body.key, req.body.subject, req.body.description, req.body.type, function (err, paper) {
            if (err) {
              res.status(500).json({message: err.message})
            } else {
              res.json({message: 'File Uploaded successfully'})
            }
          })
        }
      }
    })
  })

  return router
}
