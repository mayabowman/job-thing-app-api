const express = require('express')
const JobsService = require('./jobs-service')
const { requireAuth } = require('../middleware/jwt-auth')
const jobsRouter = express.Router()
const bodyParser = express.json()

jobsRouter
  .route('/')
  // .get((req, res, next) => {
  //   JobsService.getJobsByUserId(req.app.get('db'), user_id)
  //     .then(jobs => {
  //       res.json(jobs)
  //     })
  //     .catch(next)
  // })
  .post(requireAuth, bodyParser, (req, res, next) => {
    const { user_id, company, position, description, date_submitted, status } = req.body
    const newJob = { user_id, company, position, description, date_submitted, status }

    for (const [key, value] of Object.entries(newJob))
      if (value == null)
      return res.status(400).json({
        error: { message: `Missing '${key}' in request body` }
      })

    JobsService.postJob(req.app.get('db'), newJob)
      .then(job => {
        res.status(201).send(newJob)
      })
      .catch(next)
  })

jobsRouter
  .route('/jobs/user/:user_id')
  .get((req, res, next) => {
    JobsService.getJobsByUserId(req.app.get('db'), user_id)
      .then(jobs => {
        res.json(jobs)
      })
      .catch(next)
  })

jobsRouter
  .route('/:job_id')
  .all((req, res, next) => {
    JobsService.getJobById(req.app.get('db'), req.params.job_id)
      .then(job => {
        if (!job) {
          return res.status(404).json({
            error: { message: "Job does not exist"}
          })
        }
        res.job = job
        next()
      })
      .catch(next)
  })
  .get((req, res, next) => {
    res.json(res.job)
  })
  .patch(requireAuth, bodyParser, (req, res, next) => {
    const { user_id, company, position, description, date_submitted, status } = req.body
    const updatedJob = { user_id, company, position, description, date_submitted, status }

    for (const [key, num] of Object.entries(updatedJob))
      if (num == 0)
        return res.status(400).json({
          error: { message: `Body must contain updated content` }
        })

    JobsService.updateJob(req.app.get('db'), req.params.job_id, updatedJob)
      .then(job => {
        res.status(204).end()
      })
      .catch(next)
  })
  .delete(requireAuth, (req, res, next) => {
    JobsService.deleteJob(req.app.get('db'), job_id)
      .then(job => {
        res.status(201).end()
      })
      .catch(next)
  })



module.exports = jobsRouter;
