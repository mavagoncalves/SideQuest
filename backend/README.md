# SideQuest Backend

Express + Prisma backend for SideQuest, written in JavaScript.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

   ```bash
   cp .env.example .env
   ```

3. Update `DATABASE_URL` in `.env` with your MariaDB username, password, host, port, and database name.

   Example:

   ```env
   DATABASE_URL="mysql://sidequest_user:sidequest_password@localhost:3306/sidequest"
   ```

   If port `3306` is already used on your laptop, use the port where your local MariaDB is running instead.

4. Generate the Prisma client:

   ```bash
   npm run prisma:generate
   ```

5. Create/apply the database migration:

   ```bash
   npm run prisma:migrate
   ```

6. Start the API:

   ```bash
   npm run dev
   ```

## API

- `GET /health` checks that the server is running.
- `GET /users` lists users with their skills.
- `POST /users` creates a user.
- `GET /profiles` lists user profiles with skill tags.
- `GET /profiles/:id` fetches one profile.
- `GET /profiles/user/:userId` fetches a profile by user.
- `POST /profiles` creates a profile.
- `PUT /profiles/:id` updates a profile. When `skillTags` is included, new tags are added without removing existing tags.

Required `POST /users` JSON fields:

```json
{
  "email": "person@example.com",
  "passwordHash": "replace-with-real-hash",
  "firstName": "Ava",
  "lastName": "Smith"
}
```

Example `POST /profiles` JSON:

```json
{
  "userId": "user-id",
  "headline": "Frontend developer",
  "bio": "I build accessible React apps.",
  "location": "Stockholm",
  "hourlyRateCents": 35000,
  "availability": "Weekends",
  "skillTags": ["React", "CSS", "UI Design"]
}
```

Example `PUT /profiles/:id` JSON:

```json
{
  "headline": "Full-stack developer",
  "skillTags": ["React", "Node.js", "Prisma"]
}
```

Repeated skill tags, blank skill tags, and extra spaces are ignored during profile updates.
