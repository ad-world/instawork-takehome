import { getDb } from "./database";
import { hashPassword } from "./util";

/**
 * Represents a user in the system.
 */
interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    role: string;
}

/**
 * Represents a user with password in the system.
 */
interface UserWithPassword extends User {
    password: string;
}

/**
 * Retrieves all users from the database.
 * @returns A promise that resolves to an array of User objects.
 */
export const getUser = async (): Promise<User[]> => {
    const db = await getDb();
    const users: User[] = await db.all('SELECT * FROM users');

    return users;
}

/**
 * Retrieves a user by their user ID.
 * @param user_id - The ID of the user.
 * @returns A promise that resolves to the User object, or undefined if the user is not found.
 */
export const getUserById = async (user_id: number): Promise<User | undefined> => {
    const db = await getDb();
    const user: User | undefined = await db.get('SELECT * FROM users WHERE user_id = ?', [user_id]);

    return user;
}

/**
 * Retrieves a user by their email.
 * @param email - The email of the user.
 * @returns A promise that resolves to the UserWithPassword object, or undefined if the user is not found.
 */
export const getUserByEmail = async (email: string): Promise<UserWithPassword | undefined> => {
    const db = await getDb();
    const user: UserWithPassword | undefined = await db.get('SELECT * FROM users WHERE email = ?', [email]);

    return user;
}

/**
 * Adds a new user to the database.
 * @param user - The user object to be added.
 * @returns A promise that resolves to the ID of the newly added user, or undefined if the operation fails.
 */
export const addUser = async (user: Omit<UserWithPassword, 'user_id'>): Promise<number | undefined> => {
    const db = await getDb();

    // Hash the password so it is stored safely
    const hashedPassword = await hashPassword(user.password);

    const result = await db.run('INSERT INTO users (first_name, last_name, phone_number, email, password, role) VALUES (?, ?, ?, ?, ?, ?)', [
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        hashedPassword,
        user.role
    ]);

    if (result.lastID) {
        return result.lastID;
    }

    return undefined;
}

/**
 * Updates an existing user in the database.
 * @param user - The updated user object.
 * @returns A promise that resolves to true if the update is successful, or false otherwise.
 */
export const updateUser = async (user: User): Promise<boolean> => {
    const db = await getDb();
    const result = await db.run('UPDATE users SET first_name = ?, last_name = ?, phone_number = ?, email = ?, role = ? WHERE user_id = ?', [
        user.first_name,
        user.last_name,
        user.phone_number,
        user.email,
        user.role,
        user.user_id
    ]);

    if (result.changes) {
        return true;
    }

    return false;
}

/**
 * Deletes a user from the database.
 * @param user_id - The ID of the user to be deleted.
 * @returns A promise that resolves to true if the deletion is successful, or false otherwise.
 * @throws An error if the user is the last remaining user on the team and cannot be deleted.
 */
export const deleteUser = async (user_id: number): Promise<boolean> => {
    const db = await getDb();

    const currentDbSize = await getUser();
    if (currentDbSize.length <= 1) {
        // Cannot delete the last remaining user on the team - then there would be no way to log in
        throw new Error("Cannot delete this user as they are the last remaining user on the team.");
    }

    const result = await db.run('DELETE FROM users WHERE user_id = ?', [user_id]);

    if (result.changes) {
        return true;
    }

    return false;
}