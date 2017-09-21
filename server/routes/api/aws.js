const express = require('express')
const router = express.Router()

const AWS = require('aws-sdk')

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: 'eu-west-2'
})
AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})

const myBucket = 'raisebetter'
const signedUrlExpireSeconds = 60 * 5

module.exports = function (passport) {
  router.get('/api/aws/links', function (req, res, next) {
    const url = s3.getSignedUrl('getObject', {
      Bucket: myBucket,
      Key: req.query.key,
      Expires: signedUrlExpireSeconds
    })

    res.json({url: url})
  })

  return router
}
