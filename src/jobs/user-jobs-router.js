const express = require('express')
const JobsService = require('./jobs-service')
const { requireAuth } = require('../middleware/jwt-auth')
const userJobsRouter = express.Router()
const bodyParser = express.json()

userJobsRouter
  .route('/jobs/user/:user_id')
  .get((req, res, next) => {
    JobsService.getJobsByUserId(req.app.get('db'), user_id)
      .then(jobs => {
        res.json(jobs)
      })
      .catch(next)
  })

module.exports = userJobsRouter;