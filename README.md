# Bookery API

This RESTful API controls all interactions between the front end Job Thing app and the database.

![image](https://user-images.githubusercontent.com/50124247/73125963-f8be4300-3f7a-11ea-9a42-be483c706f14.png)

## Technology

This API was built using Node, Express and Knex. The database was built using PostgreSQL.

## Client Repo

https://github.com/mayabowman/job-thing-app

## Live Site

https://job-thing-app.mayabowman.now.sh/

# Using this API

## Add User
Adds user to database

## URL
```javascript
/api/users
```
* Method
```
POST
```
* Body Params\
  User name\
  Full name\
  Password

* Success Response\
  Code: 201

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/users`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  ```

***

## Login
Authenticates user login credentials

## URL
```javascript
/api/auth/login
```
* Method
```
POST
```
* Body Params\
  User name\
  Password

* Success Response\
  Code: 200\
  Content:
  ```
  {
    authToken: 'authToken',
    userId: 'userId'
  }
  ```

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/auth/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ user_name, password }),
  })
  ```

***

## URL
```javascript
/api/jobs
```
* Method
```
POST
```
* Body Params
  user_id\
  company\
  position\
  description\
  date_submitted\
  status

* Success Response\
  Code: 201\
  Content:
  ```
  {
    newJob: 'newJob'
  }
  ```

* Error Response\
  Code: 400

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/jobs`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'Authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(newJob)
  })
  ```

***

## URL
```javascript
/api/jobs/user/:user_id
```
* Method
```
GET
```
* Body Params\
  user_id

* Success Response\
  Code: 200

* Error Response\
  Code: 404

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/jobs/user/${user_id}`, {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
  ```

***

## URL
```javascript
/api/jobs/:job_id
```
* Method
```
GET
```

* URL Params\
  ```
  job_id=[job_id]
  ```

* Body Params\
  job_id

* Success Response\
  Code: 200

* Error Response\
  Code: 404\
  Content:
  Content:
  ```
  {
    error: `Job does not exist`
  }
  ```

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `bearer ${TokenService.getAuthToken()}`
    }
  })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
  ```

***

## URL
```javascript
/api/jobs/:job_id
```
* Method
```
PATCH
```

* URL Params\
  ```
  job_id=[job_id]
  ```

* Body Params\
  user_id\
  company\
  position\
  description\
  date_submitted\
  status

* Success Response\
  Code: 204

* Error Response\
  Code: 400\
  Content:
  ```
  {
    error: `Body must contain updated content`
  }
  ```

* Sample Call
  ```javascript
  fetch(`${config.API_ENDPOINT}/jobs/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'Authorization': `bearer ${TokenService.getAuthToken()}`
    },
    body: JSON.stringify(updatedJob)
  })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res
    )
  }
  ```

***

## URL
```javascript
/api/jobs/:job_id
```
* Method
```
DELETE
```

* URL Params\
  ```
  job_id=[job_id]
  ```

* Body Params\
  None

* Success Response\
  Code: 204

* Error Response\
  Code: 404\

* Sample Call
  ```javascript
  ffetch(`${config.API_ENDPOINT}/jobs/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      'Authorization': `bearer ${TokenService.getAuthToken()}`
    }
  })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res
    )
  }
  ```