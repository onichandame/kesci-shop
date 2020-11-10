# Web Template

full stack web app including both frontend and backend.

# Author

[onichandame](https://onichandame.com)

# Project Structure

```text
root
|
--apps
  |
  --backend
  |
  --frontend
  |
  --proxy
```

- **backend:** GraphQL backend listening on port 9002. can be replaced by any backend app
- **frontend:** React SPA listening on port 9001. can be replaced by any frontend app
- **proxy:** Proxy server listening on port 3000. Tunneling requests of `/graphql` to port 9002, other requests to port 9001

The frontend and backend can be run separately or behind the same proxy. See `package.json` for preset commands.

For small full stack projects, the default backend and the default frontend are enough to work. For larger or collaborative projects it would be better to manage backend and frontend in different repositories. The dev server port and `dev` scripts need to comply with the default.

# Usage

- `yarn dev`: start development servers for all apps
- `yarn build`: build all apps

# Features

These come with default. Any component can be replaced by whatever you like.

1. GraphQL backend
2. Gatsby frontend

# Known Issues

1. configurations like env are split across many places. need to centralize it.
2. websocket not proxied
