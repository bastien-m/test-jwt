# JWT-BACK
The aim of this project is to test how jwt can be implemented in NodeJS and in particular how to implement refresh token and access token.

- refresh token last for one day
- access token last for 20 seconds (testing purpose, should have a higher value)



There is 5 endpoints:
- POST - login: get both token (refresh and access)
- POST - token/refresh: get a brand new access token using the refresh token
- DELETE - token: delete a refresh token (by example if one leak)
- GET - token/all to get all the refresh token with corresponding user
- GET - users: get a list of user, this endpoint is protected by JWT

In order to login, you have 2 options:
- use the preconfigured user (password is "bastien")
- add a user in the database (you should hash your password using test/generate-pwd)

## Start

You can start this project using the command
```
npm start
```

You can also run this project with nodemon listening for change (development mode) using this command
```
npm run start:dev
```
