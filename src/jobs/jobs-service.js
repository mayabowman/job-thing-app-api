const JobsService = {
  // getAllJobs()

  getJobByUserId(db, user_id) {
    return db
      .from('job_thing_jobs')
      .select('*')
      .where({ user_id })
      .then(rows => {
        return rows
      })
  },

  getJobById(db, id) {
    return db
      .from('job_thing_jobs')
      .select('*')
      .where({ id })
      .first()
  },

  postJob(db, newJob) {
    return db
      .insert(newJob)
      .into('job_thing_jobs')
      .returning('*')
      .then(rows => {
        return rows[0]
      })
  },

  updateJob(db, id, updateJob) {
    return db('job_thing_jobs')
      .where({ id })
      .update(updateJob)
  },

  deleteJob(db, id) {
    return db('job_thing_jobs')
      .where({ id })
      .delete()
  }
}

module.exports = JobsService;