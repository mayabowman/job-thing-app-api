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
* getUserWithEmail()
* comparePasswords()
* createJwt()
* verifyJwt()
* parseBasicToken()

## Auth router
route('/login')
* .post()

## Middleware
* jwt-auth

## Job service
* getAllJobs()
* getJobById()
* postJob()
* updateJob()
* deleteJob()

## Job router
route('/')
* .get()
* .post()

route('/id')
* .get()
* .patch()
* .delete()