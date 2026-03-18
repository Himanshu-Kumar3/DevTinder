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
- post /request/send/interested/:userId
- post /request/send/ignored/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

## UserRouter
- get user/connections
- get user/request
- get user/feed - get you the profile of other user in the platform


## Status : ignored / interested / accepted / rejected
- 