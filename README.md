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
