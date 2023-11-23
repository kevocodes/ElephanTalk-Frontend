# ElephanTalk

## Configuration
Copy the `.env.example` file and rename it to `.env`.
Make sure you have the following environment variables:
```env
# Public API base URL
VITE_PUBLIC_API_URL=""

# Quantity of posts per page for infinite scroll
VITE_POSTS_PER_PAGE=10
```

## Testing

```bash
# unit testing
$ yarn run test

# e2e testing
$ yarn run test:e2e

# e2e testing with UI
$ yarn run test:e2e:open
```

### e2e testing prerequisites

#### Setup the test env vars

To be able to run the e2e tests, it is necessary to create the `cypress.env.json` file at the root of the project, where the following environment variables will be configured:

```json
{
  "AUTH_USER": "usernameoremail",
  "AUTH_PASSWORD": "password"
}
```

- `AUTH_USER`: It is the username or email of a valid and active user in the application.
- `AUTH_PASSWORD`: It is the password of the valid and active user in the application.

#### Setup the application base url

It is necessary for the application to be currently running in order to execute the e2e tests. Since the application is built with Vite, by default runs on `port 5173`, so the base URL configured in Cypress is `http://localhost:5173`. However, if you want to change this base URL (for example, if the application is running on port 3000), you should run the e2e test command as follows:

```bash
yarn run test:e2e --config baseUrl="http://localhost:3000"
```