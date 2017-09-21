const express = require('express')
const router = express.Router()

const AWS = require('aws-sdk')

const s3 = new AWS.S3()
AWS.config.update({accessKeyId: 'id-omitted', secretAccessKey: 'key-omitted', region: 'eu-west-2'})

const myBucket = 'raisebetter'
const myKey = 'file-name.pdf'
const signedUrlExpireSeconds = 60 * 5

module.exports = function (passport) {

  router.get('/api/aws/links', passport.authenticate('jwt', {
    failWithError: true
  }), function (req, res, next) {

    const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: myKey,
      Expires: signedUrlExpireSeconds
    })

    res.json({url: url})
  })

  return router
}
