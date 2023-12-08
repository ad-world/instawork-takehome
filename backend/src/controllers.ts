import { getDb } from "./database"
import { hashPassword } from "./util";

interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    role: string;
}

interface UserWithPassword extends User {
    password: string;
}

export const getUser = async () => {
    const db = await getDb();
    const users: Array<User> = await db.all('SELECT * FROM users');

    return users;
}

export const getUserById = async (user_id: number) => {
    const db = await getDb();
    const user: User | undefined = await db.get('SELECT * FROM users WHERE user_id = ?', [user_id]);

    return user;
}

export const getUserByEmail = async (email: string) => {
    const db = await getDb();
    const user: UserWithPassword | undefined = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    return user;
}

export const addUser = async (user: Omit<UserWithPassword, 'user_id'>) => {
    const db = await getDb();

    const hashedPassword = await hashPassword(user.password);

    const result = await db.run('INSERT INTO users (first_name, last_name, phone_number, email, password, role) VALUES (?, ?, ?, ?, ?, ?)', [
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        hashedPassword,
        user.role
    ]);

    if(result.lastID) {
        return result.lastID;
    } 

    return undefined;
}

export const updateUser = async (user: User) => {
    const db = await getDb();
    const result = await db.run('UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ? WHERE user_id = ?', [
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        user.role,
        user.user_id
    ]);

    if(result.changes) {
        return true;
    }

    return false;
}

export const deleteUser = async (user_id: number) => {
    const db = await getDb();

    const currentDbSize = await getUser();
    if(currentDbSize.length <= 1) {
        throw new Error("Cannot delete this user as they are the last remaining user on the team.")
    }

    const result = await db.run('DELETE FROM users WHERE user_id = ?', [user_id]);

    if(result.changes) {
        return true;
    }

    return false;
}