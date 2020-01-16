## Users service
* hasUserWithEmail()
* addUser()
* validatePassword()
* hashPassword()
* serializeUser()

## Users router
route('/')
* .post()

## Auth service
* getUserByEmail()
* comparePasswords()
* createJwt()
* verifyJwt()
* parseBasicToken()

## Auth router
route('/login')
* .post()

## Middleware
* jwt-auth

## Jobs service
* getAllJobs()
* getJobById()
* postJob()
* updateJob()
* deleteJob()

## Jobs router
route('/')
* .get()
* .post()

route('/id')
* .get()
* .patch()
* .delete()