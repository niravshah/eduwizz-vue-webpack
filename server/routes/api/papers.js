const express = require('express')
const router = express.Router()
const Paper = require('../../models/paper')

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

  return router
}
