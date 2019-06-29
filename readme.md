# JWT Test

This project is an example of how to implement a refresh token using Angular8. The backend is not relevant, I choosed NodeJS but it can be anything else, the real purpose is to implement refresh token in Angular.


## JWT

For a description of what is a refresh token you can read this documentation [Auth0-RefreshToken](https://auth0.com/blog/refresh-tokens-what-are-they-and-when-to-use-them/)

## How it works

To handle JWT with Angular, we have to use HttpInterceptor, we can add as many as we want (more readable than puttin all the code in one place), they will be executing in the order provided.

### jwt-interceptor

This interceptor set the access token in the header using the Bearer Strategy (Authorization: Bearer <AccessToken>)

### http-error-interceptor (should be rename because it handle only 401 error)

This interceptor retrieve every error that can occur while fetching data from http call.
Steps explain below: 
- Filter on 401 error response
- If the error come from the login endpoint or the refresh token endpoint, then go to the login page
- Else figure if there is already a request to get a fresh access token
    - If we already wait for a new access token then freeze the incoming request from the UI while we get the response
    - Else ask the back endpoint to get a new access token using the refresh token, when getting back this token then free all pending request with the new access token set


