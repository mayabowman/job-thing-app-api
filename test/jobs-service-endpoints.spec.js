const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');

describe(`Jobs service object`, function() {
  let db

  const testUsers = helpers.makeUsersArray();
  const testJobs = helpers.makeJobsArray();
  console.log('testUsers', testUsers)
  console.log('testJobs', testJobs)

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw(
    `TRUNCATE
      job_thing_jobs,
      job_thing_users
      RESTART IDENTITY CASCADE`
    )
    .then(() => {
      // insert test users into job_thing_users table
      return db.into('job_thing_users').insert(testUsers)
    })
    .then(() => {
      // insert test jobs into job_thing_jobs table
      return db.into('job_thing_jobs').insert(testJobs)
    })
  );

  // post job
  describe.skip('POST /api/jobs', () => {
    it(`adds job to job list, responding with 201`, () => {
      const newJob = {
        user_id: '1',
        company: 'Tech Company',
        position: 'Front End Developer',
        status: 'Application submitted',
        description: 'Test description',
        date_submitted: '11/01/2019'
      }
      return supertest(app)
        .post('/api/jobs')
        .set('Content-Type', 'application/json')
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send(newJob)
        .expect(201)
    })
  })

  //getjobs by user id
  describe(`GET /api/jobs/user/:user_id`, () => {
    context(`Given no jobs for user id`, () => {
      it.skip(`responds with 404`, () => {
        const userId = 123
        return supertest(app)
          .get(`/api/jobs/user/${userId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404)
      })
    })
    context('Given there are jobs in the database', () => {
      it('responds with 200 and the specified job', () => {
        const jobId = 1
        const testUserId = testUsers[0].id
        return supertest(app)
          .get(`api/jobs/user/${testUserId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200, testJobs)
      })
    })
  })

  // get job by id
  describe(`GET /api/jobs/:job_id`, () => {
    context(`Given no jobs`, () => {
      it(`responds with 404`, () => {
        const jobId = 123
        return supertest(app)
          .get(`/api/jobs/${jobId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(404, { message: "Job does not exist"})
      })
    })
    context('Given there are jobs in the database', () => {
      it('responds with 200 and the specified job', () => {
        const jobId = 1
        const testJob = testJobs[0]
        return supertest(app)
          .get(`api/jobs/${jobId}`)
          .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
          .expect(200,testJob)
      })
    })
  })

  // update job
  describe('PATCH /api/jobs/:job_id', () => {
    it(`responds 204 when updated field is submitted`, () => {
      return supertest(app)
        .patch(`api/jobs/1`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .send({ company: '123 Tech' })
        .expect(204)
    })
  })

  // delete job
  describe(`DELETE api/jobs/:job_id`, () => {
    it.skip('responds with 204', () => {
      const jobId = 1
      return supertest(app)
        .delete(`/api/jobs/${jobId}`)
        .set('Authorization', helpers.makeAuthHeader(testUsers[0]))
        .expect(204)
    })
  })
})