# Personal Portfolio Backend

REST API backend for a personal portfolio/CV website. All portfolio content is stored in MongoDB and exposed through JSON endpoints for a separate frontend.

## Technologies

- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- Zod (validation)
- JWT + bcrypt (admin authentication)
- Helmet, CORS, express-rate-limit

## Installation

```bash
npm install
cp .env.example .env
```

Fill in `.env` with your values (see below).

## Environment variables

| Variable         | Description                          | Example                    |
|------------------|--------------------------------------|----------------------------|
| `PORT`           | HTTP port                            | `5000`                     |
| `MONGODB_URI`    | MongoDB connection string            | `mongodb://127.0.0.1:27017/portfolio` |
| `JWT_SECRET`     | Secret for signing JWT tokens        | long random string         |
| `JWT_EXPIRES_IN` | Token expiry                         | `7d`                       |
| `CLIENT_URL`     | Allowed CORS origin (frontend URL)   | `http://localhost:3000`    |

Never commit `.env`.

## MongoDB setup

**Local (Docker):**

```bash
docker run -d --name portfolio-mongo -p 27017:27017 mongo:7
```

**Local (MongoDB installed):**

```bash
mongod
```

Set `MONGODB_URI=mongodb://127.0.0.1:27017/portfolio` in `.env`.

**MongoDB Atlas:** create a cluster, get the connection string, and set `MONGODB_URI`.

## Seed CV data

```bash
npm run seed
```

Populates profile, skills, experience, education, achievements, and languages from the provided CV. Projects remain empty until you add them via the API.

## Development

```bash
npm run dev
```

Server: `http://localhost:5000` (or your `PORT`).

## Deploy on Render

1. Push this repo to GitHub.
2. Create a **Web Service** on [Render](https://render.com) and connect the repo.
3. **Root Directory:** leave empty (repository root, not `src`).
4. **Build Command:** `npm install && npm run build`
5. **Start Command:** `npm start`
6. **Environment variables** (Render dashboard → Environment):
   - `MONGODB_URI` — your Atlas connection string (include database name, e.g. `/portfolio`)
   - `JWT_SECRET` — long random string
   - `JWT_EXPIRES_IN` — `7d`
   - `CLIENT_URL` — your frontend URL (e.g. Vercel app)
7. In **MongoDB Atlas → Network Access**, allow Render IPs or `0.0.0.0/0` (dev only).

Alternatively use the included `render.yaml` Blueprint for the same build/start commands.

Render sets `PORT` automatically; the app reads it via `env.PORT`.

## Production build

```bash
npm run build
npm start
```

## Authentication

Admin routes use `Authorization: Bearer <token>`.

| Method | Endpoint              | Auth | Description        |
|--------|-----------------------|------|--------------------|
| POST   | `/api/auth/register`  | No   | Register admin     |
| POST   | `/api/auth/login`     | No   | Login              |
| GET    | `/api/auth/me`        | Yes  | Current admin user |

Passwords are hashed with bcrypt and never returned in responses.

## API endpoints

Base path: `/api`

### Portfolio (aggregate)

| Method | Endpoint           | Auth |
|--------|--------------------|------|
| GET    | `/api/portfolio`   | No   |

### Profile

| Method | Endpoint           | Auth |
|--------|--------------------|------|
| GET    | `/api/profile`     | No   |
| PUT    | `/api/profile`     | Yes  |

### Skills

| Method | Endpoint           | Auth |
|--------|--------------------|------|
| GET    | `/api/skills`      | No   |
| PUT    | `/api/skills`      | Yes  |

### Experience

| Method | Endpoint                    | Auth |
|--------|-----------------------------|------|
| GET    | `/api/experience`           | No   |
| GET    | `/api/experience/:id`       | No   |
| POST   | `/api/experience`           | Yes  |
| PUT    | `/api/experience/:id`       | Yes  |
| DELETE | `/api/experience/:id`       | Yes  |

### Education

| Method | Endpoint                    | Auth |
|--------|-----------------------------|------|
| GET    | `/api/education`            | No   |
| GET    | `/api/education/:id`        | No   |
| POST   | `/api/education`            | Yes  |
| PUT    | `/api/education/:id`        | Yes  |
| DELETE | `/api/education/:id`        | Yes  |

### Achievements

| Method | Endpoint                      | Auth |
|--------|-------------------------------|------|
| GET    | `/api/achievements`           | No   |
| GET    | `/api/achievements/:id`       | No   |
| POST   | `/api/achievements`           | Yes  |
| PUT    | `/api/achievements/:id`       | Yes  |
| DELETE | `/api/achievements/:id`       | Yes  |

### Languages

| Method | Endpoint                    | Auth |
|--------|-----------------------------|------|
| GET    | `/api/languages`            | No   |
| GET    | `/api/languages/:id`        | No   |
| POST   | `/api/languages`            | Yes  |
| PUT    | `/api/languages/:id`        | Yes  |
| DELETE | `/api/languages/:id`        | Yes  |

### Projects

| Method | Endpoint                         | Auth |
|--------|----------------------------------|------|
| GET    | `/api/projects`                  | No   |
| GET    | `/api/projects/slug/:slug`       | No   |
| GET    | `/api/projects/:id`              | No   |
| POST   | `/api/projects`                  | Yes  |
| DELETE | `/api/projects/:id`              | Yes  |
| PUT    | `/api/projects/:id`              | Yes  |

**Project query params:** `featured`, `category`, `technology`, `search`, `page`, `limit`.

## Example requests

**Full portfolio:**

```bash
curl http://localhost:5000/api/portfolio
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"yourpassword"}'
```

**Create project (authenticated):**

```bash
curl -X POST http://localhost:5000/api/projects \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT" \
  -d '{
    "title": "Personal Portfolio",
    "slug": "personal-portfolio",
    "shortDescription": "Personal portfolio website",
    "description": "A personal portfolio built with modern web technologies.",
    "image": "https://example.com/cover.png",
    "gallery": ["https://example.com/1.png"],
    "technologies": ["Next.js", "TypeScript", "Tailwind CSS"],
    "githubUrl": "https://github.com/NigarHasanzda/portfolio",
    "liveUrl": "https://example.com",
    "category": "Frontend",
    "featured": true,
    "order": 1
  }'
```

## Response format

Success:

```json
{ "success": true, "data": {} }
```

Error:

```json
{ "success": false, "message": "..." }
```

## Folder structure

```
src/
  config/         env, database
  controllers/    route handlers
  middleware/     auth, errors, validation
  models/         Mongoose schemas
  routes/         Express routers
  services/       shared business logic
  types/          TypeScript declarations
  validations/    Zod schemas
  app.ts
  server.ts
scripts/
  seed.ts
```

## Frontend integration

The frontend should load dynamic CV/portfolio data from this API (e.g. `GET /api/portfolio`). Do not hardcode CV content in the frontend.

## Health check

`GET /health` — returns `{ "success": true, "message": "OK" }`.
