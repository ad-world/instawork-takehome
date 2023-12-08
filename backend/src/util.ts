import bcrypt from 'bcrypt'

const saltRounds = 10


/**
 * Hashes a password using bcrypt.
 * @param password - The password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, saltRounds)
}

/**
 * Validates a password by comparing it with a hashed password.
 * @param password - The password to validate.
 * @param hashedPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the password is valid.
 */
export const validatePassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword)
}


