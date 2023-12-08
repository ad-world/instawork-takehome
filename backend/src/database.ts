import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// SQL to create the users table
let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
    );`;

// Create user table if it doesn't exist
const initDb = async () => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    });

    try {
        await db.run(sql);
    } catch (err) {
        console.log(err);
    }
}

initDb();


/**
 * Retrieves the database connection.
 * @returns {Promise<sqlite3.Database>} The database connection.
 */
export const getDb = async () => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    })

    return db;
}