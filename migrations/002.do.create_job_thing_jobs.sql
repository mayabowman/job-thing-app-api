CREATE TABLE job_thing_jobs (
  id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
  user_id INTEGER REFERENCES job_thing_users(id) ON DELETE CASCADE NOT NULL,
  company TEXT NOT NULL,
  position TEXT NOT NULL,
  description TEXT NOT NULL,
  date_submitted TEXT NOT NULL,
  date_created TIMESTAMP DEFAULT now() NOT NULL
);