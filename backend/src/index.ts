import express, { Request, Response } from 'express'
import cors from 'cors'
import './database'
import { addUser, deleteUser, getUser, getUserByEmail, getUserById, updateUser } from './controllers';
import { validatePassword } from './util';
import { ErrorCodes } from './errors';

const app = express();
app.use(cors());
app.use(express.json());

// Handles the login endpoint
app.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if (!user) {
            // User with this email does not exist
            return res.status(404).json({
                error: "A user with this email does not exist.",
                errorCode: ErrorCodes.USER_NOT_FOUND,
            });
        }

        const isPasswordCorrect = await validatePassword(password, user.password);
        if (!isPasswordCorrect) {
            // User exists, incorrect password
            return res.status(401).json({
                error: "Incorrect password entered.",
                errorCode: ErrorCodes.INVALID_PASSWORD,
            });
        }

        // Checks pass, send back user object
        return res.status(200).json({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role
        });
    } catch (err) {
        // Send back server failure
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

// Sends back a list of all users
app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await getUser();

        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

// Sends back a user with the given user_id
app.get("/user/:user_id", async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.user_id);
        const user = await getUserById(user_id);

        if (user) {
            return res.status(200).json(user);
        }

        // Send 4040 if user not found
        return res.status(404).json({
            error: "User not found",
            errorCode: ErrorCodes.USER_NOT_FOUND,
        });
    } catch (err) {
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

// Creates a new user
app.post("/user", async (req: Request, res: Response) => {
    try {
        const user = req.body;

        if(await getUserByEmail(user.email)) {
            // User already exists
            return res.status(409).json({
                error: "Unable to add user",
                errorCode: ErrorCodes.USER_ALREADY_EXISTS,
            });
        }
    
        // Create a user in the database
        const result = await addUser(user);

        // If the user was created successfully, send back the user_id
        if (result) {
            return res.status(201).json({ user_id: result });
        }

        // Send back an error if the user was not created
        return res.status(409).json({
            error: "Unable to add user",
            errorCode: ErrorCodes.UNABLE_TO_CREATE_USER,
        });
    } catch (err) {
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

// Updates a user
app.put('/user', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        // Update user based on request body
        const result = await updateUser(user);

        if (result) {
            return res.status(200).json({
                message: "User updated",
            });
        }

        return res.status(409).json({
            error: "Unable to update user",
            errorCode: ErrorCodes.UNABLE_TO_UPDATE_USER,
        });
    } catch (err) {
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

// Delete a user in the database
app.delete('/user/:user_id', async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.user_id);

        const currentDbSize = await getUser();
        if (currentDbSize.length <= 1) {
            // Cannot delete the last remaining user on the team - then there would be no way to log in
            return res.status(409).json({
                errorCode: ErrorCodes.LAST_REMAINING_USER,
            })
        }

        const currentAdmins = currentDbSize.filter(user => user.role === 'admin');
        if(currentAdmins.length <= 1 && currentAdmins[0].user_id === user_id) {
            // Cannot delete the last remaining admin on the team - then there would be no way to log in as an admin or create new admins
            return res.status(409).json({
                errorCode: ErrorCodes.LAST_REMAINING_ADMIN,
            })
        }

        const result = await deleteUser(user_id);

        if (result) {
            return res.status(200).json({ message: "User deleted" });
        }

        return res.status(409).json({
            error: "Unable to delete user",
            errorCode: ErrorCodes.UNABLE_TO_DELETE_USER,
        });
    } catch (err) {
        return res.status(500).json({
            error: (err as any).message,
            errorCode: ErrorCodes.UNKNOWN_ERROR,
        });
    }
})

const port = 3000;
// Listen on port 3000
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})