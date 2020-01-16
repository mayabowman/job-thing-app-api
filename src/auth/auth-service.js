const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

const AuthService = {
  getUserByEmail(db, user_email) {
    return db('job_thing_users')
      .where({ user_email })
      .first()
  },
}