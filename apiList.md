# DevTinder API

## User Auth
- post /signup
- post /login
- post /logout

## Profile Router
- get profile/view
- post profile/update
- post profile/password


## ConnectionRequestRouter
- post /request/send/:status/:userId
- post /request/review/:status/:requestId

## UserRouter
- get user/request
- get user/connections
- get user/feed - get you the profile of other user in the platform


## Status : ignored / interested / accepted / rejected
- 