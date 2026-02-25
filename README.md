This is a meeting tracking demo app. Meetings are persisted in a local SQLite database (`meetings.db`) via a Next.js API route instead of the browser's `localStorage`.

## Getting Started

To run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## Database Migration Plan

### Phase 1 — Local SQLite (current)

Meetings are stored in a `meetings.db` SQLite file at the project root using the `better-sqlite3` package.

**How it works:**
- `lib/db.js` opens (or creates) the database file and initialises the `meetings` table on first start.
- `pages/api/meetings.js` exposes two endpoints:
  - `GET  /api/meetings` – returns all meetings sorted by date/time.
  - `POST /api/meetings` – validates and inserts a new meeting, returning the created row.
- `pages/index.js` reads and writes meetings through those endpoints instead of `localStorage`.

No environment variables are needed for Phase 1.  The `meetings.db` file is excluded from version control via `.gitignore`.

---

### Phase 2 — Azure SQL Database (future)

When you are ready to move to a production-grade database the following steps are needed.

#### 1. Provision an Azure SQL Database
1. Create an Azure SQL Server and Database in the Azure Portal (or with the Azure CLI / Bicep / Terraform).
2. Note the connection string – it looks like:
   ```
   Server=tcp:<server>.database.windows.net,1433;Database=<db>;User Id=<user>;Password=<password>;Encrypt=true;
   ```

#### 2. Add the `mssql` driver
```bash
yarn add mssql
```

#### 3. Update `lib/db.js`
Replace the `better-sqlite3` implementation with an `mssql` pool:

```js
// lib/db.js  (Phase 2 snippet)
const sql = require('mssql');

const config = {
  connectionString: process.env.DATABASE_URL,
};

let pool;
async function getPool() {
  if (!pool) pool = await sql.connect(config);
  return pool;
}

async function getMeetings() {
  const db = await getPool();
  const result = await db.request()
    .query('SELECT * FROM meetings ORDER BY meetingDate, meetingTime');
  return result.recordset;
}

async function addMeeting({ who, meetingTitle, meetingDate, meetingTime, meetingUrl }) {
  const db = await getPool();
  const result = await db.request()
    .input('who', sql.NVarChar, who)
    .input('meetingTitle', sql.NVarChar, meetingTitle)
    .input('meetingDate', sql.NVarChar, meetingDate)
    .input('meetingTime', sql.NVarChar, meetingTime)
    .input('meetingUrl', sql.NVarChar, meetingUrl)
    .query(`INSERT INTO meetings (who, meetingTitle, meetingDate, meetingTime, meetingUrl)
            OUTPUT INSERTED.*
            VALUES (@who, @meetingTitle, @meetingDate, @meetingTime, @meetingUrl)`);
  return result.recordset[0];
}

module.exports = { getMeetings, addMeeting };
```

Note: because `getMeetings` and `addMeeting` are now async, `pages/api/meetings.js` must `await` them:
```js
const meetings = await getMeetings();
const meeting  = await addMeeting(req.body);
```

#### 4. Store the connection string securely
Add to `.env.local` (never commit this file):
```
DATABASE_URL=Server=tcp:<server>.database.windows.net,1433;Database=meetings;...
```
For Azure App Service / Container Apps set this as an **Application Setting** (it is automatically exposed as an environment variable at runtime).

#### 5. Create the schema in Azure SQL
Run this once (e.g. via Azure Data Studio or the portal Query Editor):
```sql
CREATE TABLE meetings (
  id            INT IDENTITY(1,1) PRIMARY KEY,
  who           NVARCHAR(255) NOT NULL,
  meetingTitle  NVARCHAR(255) NOT NULL,
  meetingDate   NVARCHAR(10)  NOT NULL,
  meetingTime   NVARCHAR(5)   NOT NULL,
  meetingUrl    NVARCHAR(500) NOT NULL
);
```

#### 6. Deploy
Deploy the Next.js app to **Azure App Service** or **Azure Container Apps**.  The API routes run server-side so the database connection string is never exposed to the browser.

---

## Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

- [Next.js Documentation](https://nextjs.org/docs)
- [better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md)
- [mssql Documentation](https://github.com/tediousjs/node-mssql)
- [Azure SQL Database](https://learn.microsoft.com/azure/azure-sql/)
- [Azure App Service – Node.js](https://learn.microsoft.com/azure/app-service/quickstart-nodejs)
