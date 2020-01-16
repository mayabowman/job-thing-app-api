CREATE TYPE status_options AS ENUM (
  'Submitted',
  'Phone Interview Scheduled',
  'Phone Interview Completed',
  'On Site Interview Scheduled',
  'On Site Interview Completed',
  'Hired!',
  'Not Hired');

ALTER TABLE job_thing_jobs
  ADD COLUMN
    status status_options;