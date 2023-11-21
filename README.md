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

To be able to run the e2e tests, it is necessary to create the `cypress.env.json` file at the root of the project, where the following environment variables will be configured:

```json
{
  "AUTH_USER": "usernameoremail",
  "AUTH_PASSWORD": "password"
}
```

- `AUTH_USER`: It is the username or email of a valid and active user in the application.
- `AUTH_PASSWORD`: It is the password of the valid and active user in the application.