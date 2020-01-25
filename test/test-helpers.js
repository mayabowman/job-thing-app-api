const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

function makeUsersArray() {
  return [
    {
      id: 1,
      user_name: 'cwelch',
      full_name: 'Carl Welch',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 2,
      user_name: 'zhenderson',
      full_name: 'Zoe Henderson',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    },
    {
      id: 3,
      user_name: 'lknox',
      full_name: 'Lucas Knox',
      password: 'Thinkful1!',
      date_created: new Date('2029-01-22T16:28:32.615Z')
    }
  ];
}

function makeJobsArray() {
  return [
    {
      // id: 1,
      user_id: 1,
      company: 'IBM',
      position: 'Front End Developer',
      description: 'Test description',
      status: 'Application submitted',
      date_submitted: '11/01/2019',
      date_created: '2029-01-22T16:28:32.615Z'
    }
  ]
}

function seedUsers(users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 12),
  }));
  return preppedUsers
}

function seedTables(db, jobs) {
  return db
    .into('job_thing_jobs')
    .insert([jobs])
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_id: user.id }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  })
  return `Bearer ${token}`
}

module.exports = {
  makeUsersArray,
  seedUsers,
  makeJobsArray,
  seedTables,
  makeAuthHeader
};