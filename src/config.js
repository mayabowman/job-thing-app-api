module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL || 'postgresql://postgres@localhost/job-thing',
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
  // CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "https://job-thing-app.mayabowman.now.sh/",
  JWT_SECRET: process.env.JWT_SECRET || 'change-this-secret'
}