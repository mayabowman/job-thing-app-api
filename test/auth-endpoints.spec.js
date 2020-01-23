const knex = require('knex');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = require('../src/app');
const { makeUsersArray } = require('./test-helpers');

function seedUsers(users) {
  const preppedUsers = users.map((user) => ({
    ...user,
    password: bcrypt.hashSync(user.password, 12),
  }));
  return preppedUsers
}

function makeAuthHeader(user, secret = process.env.JWT_SECRET) {
  const token = jwt.sign({ user_name: user.user_name }, secret, {
    subject: user.user_name,
    algorithm: 'HS256',
  });
  return `bearer ${token}`
}

describe.skip('Auth Endpoints', () => {
  let db;
  const testUsers = makeUsersArray();
  const testUser = testUsers[0];

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL,
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('clean the table', () => db.raw(`TRUNCATE job_thing_jobs, job_thing_users RESTART IDENTITY CASCADE`));

  afterEach('clean the table', () => db.raw(`TRUNCATE job_thing_jobs, job_thing_users RESTART IDENTITY CASCADE`));

  describe('POST /api/auth/login', () => {
    const preppedUsers = seedUsers(testUsers);
    beforeEach('insert users', () => db
      .into('job_thing_users')
      .insert(preppedUsers));

    it('responds 200 and JWT auth token using secret when valid credentials', () => {
      const userValidCreds = {
        user_name: testUser.user_name,
        password: testUser.password
      };
      const expectedToken = jwt.sign(
        { user_id: testUser.id },
        process.env.JWT_SECRET,
        {
          subject: testUser.user_name,
          algorithm: 'HS256',
        },
      );
      return supertest(app)
        .post('/api/auth/login')
        .send(userValidCreds)
        .expect(200, {
          authToken: expectedToken,
          userId: testUser.id
        });
    });
  });
});