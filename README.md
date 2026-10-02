# Blog API

A small TypeScript/Express service backed by SQLite through Prisma. The application manages users, draft posts, and a published feed.

## Development

Use Node 22, then run `npm ci`, `npm run setup`, and `npm run dev`. The API listens on localhost:3000; set PORT to change it. Setup creates the local database and seeds sample users and posts. `npm run check` checks TypeScript. GitHub Actions is the team’s CI platform; this checkout does not yet have a workflow.

## API

- GET /users: list users.
- POST /signup: JSON {"name":"...","email":"..."}; optionally include posts [{"title":"...","content":"..."}].
- GET /user/:id/drafts: list a user's drafts.
- POST /post: JSON {"title":"...","content":"...","authorEmail":"..."}; returns the new draft and id.
- GET /post/:id: fetch one post.
- PUT /publish/:id: toggle published status.
- PUT /post/:id/views: increment view count.
- GET /feed: published posts; supports searchString, take, skip, and orderBy=asc|desc.
- DELETE /post/:id: delete a post.

Successful requests return JSON with status 200. Seed user alice@prisma.io can author posts. This development service contains synthetic data only.

## Authenticated environments

`npm run setup` creates isolated local (localhost:3101) and staging (localhost:3102) databases and random development tokens in ignored `.runtime/environments.json`. Both are disposable local instances, not production systems. Start them in separate terminals with `npm run dev:local` and `npm run dev:staging`. Supply `Authorization: Bearer <the corresponding token>` on every API request. Missing or wrong tokens return 401; X-Environment identifies the target. Never commit generated tokens.

Support currently reproduces issues with ad hoc curl requests and separately supplied tokens. External partners receive their own credentials and the API reference above. There is no shared request library or partner onboarding kit yet.

The existing postman/collection.json predates authentication and currently hardcodes the local URL. Its requests and checks should be retained.
