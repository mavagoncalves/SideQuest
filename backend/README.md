# SideQuest Backend

Express + Prisma backend for SideQuest.

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

Required `POST /users` JSON fields:

```json
{
  "email": "person@example.com",
  "passwordHash": "replace-with-real-hash",
  "firstName": "Ava",
  "lastName": "Smith"
}
```
