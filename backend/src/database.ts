import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

let sql = `CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT,
        email TEXT NOT NULL,
        role TEXT NOT NULL
    );`;

const initDb = async () => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    });

    try {
        await db.exec(sql);
    } catch (err) {
        console.log(err);
    }
}

initDb();

export const getDb = async () => {
    const db = await open({
        driver: sqlite3.Database,
        filename:'./database.db',
    })

    return db;
}