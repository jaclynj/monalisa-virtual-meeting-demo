/**
 * Database layer for meetings.
 *
 * Phase 1 – Local SQLite (current)
 *   Uses better-sqlite3 to persist meetings in a local `meetings.db` file.
 *   No environment variable is required; the file is created automatically
 *   next to this project on first start.
 *
 * Phase 2 – Azure SQL Database (future)
 *   Replace the better-sqlite3 implementation below with a driver such as
 *   `mssql` or `@azure/cosmos` and read the connection string from
 *   the DATABASE_URL environment variable.  The exported functions
 *   (getMeetings / addMeeting) stay the same so the API routes need no
 *   changes.
 *
 * Exported helpers
 *   getMeetings()          – Returns all rows sorted by date/time ascending.
 *   addMeeting(meeting)    – Inserts one meeting and returns the inserted row.
 */

const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'meetings.db');

let _db;

function getDb() {
  if (!_db) {
    _db = new Database(DB_PATH);
    _db.exec(`
      CREATE TABLE IF NOT EXISTS meetings (
        id          INTEGER PRIMARY KEY AUTOINCREMENT,
        who         TEXT    NOT NULL,
        meetingTitle TEXT   NOT NULL,
        meetingDate TEXT    NOT NULL,
        meetingTime TEXT    NOT NULL,
        meetingUrl  TEXT    NOT NULL
      )
    `);
  }
  return _db;
}

function getMeetings() {
  // meetingDate is stored as YYYY-MM-DD and meetingTime as HH:MM, both zero-padded
  // ISO 8601 strings sort correctly with standard text comparison.
  return getDb()
    .prepare('SELECT * FROM meetings ORDER BY meetingDate ASC, meetingTime ASC')
    .all();
}

function addMeeting({ who, meetingTitle, meetingDate, meetingTime, meetingUrl }) {
  const db = getDb();
  const stmt = db.prepare(
    'INSERT INTO meetings (who, meetingTitle, meetingDate, meetingTime, meetingUrl) VALUES (?, ?, ?, ?, ?)'
  );
  const result = stmt.run(who, meetingTitle, meetingDate, meetingTime, meetingUrl);
  return db.prepare('SELECT * FROM meetings WHERE id = ?').get(result.lastInsertRowid);
}

module.exports = { getMeetings, addMeeting };
