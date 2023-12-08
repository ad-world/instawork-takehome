import express, { Request, Response } from 'express'
import cors from 'cors'
import './database'
import { addUser, deleteUser, getUser, getUserByEmail, getUserById, updateUser } from './controllers';
import { validatePassword } from './util';

const app = express();
app.use(cors());
app.use(express.json());

app.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await getUserByEmail(email);
        if(!user) {
            return res.status(404).json({ error: "A user with this email does not exist." });
        }

        const isPasswordCorrect = await validatePassword(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(401).json({ error: "Incorrect password entered." });
        }
        
        return res.status(200).json({ 
            user_id: user.user_id, 
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone_number: user.phone_number,
            role: user.role });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.get("/users", async (req: Request, res: Response) => {
    try {
        const users = await getUser();
        
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.get("/user/:user_id", async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.user_id);
        const user = await getUserById(user_id);

        if(user) {
            return res.status(200).json(user);
        }

        return res.status(404).json({ error: "User not found" });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.post("/user", async (req: Request, res: Response) => {
    try {
        const user = req.body;

        const result = await addUser(user);

        if(result) {
            return res.status(201).json({ user_id: result });
        }

        return res.status(409).json({ error: "Unable to add user" });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.put('/user', async (req: Request, res: Response) => {
    try {
        const user = req.body;
        const result = await updateUser(user);

        if(result) {
            return res.status(200).json({ message: "User updated" });
        }

        return res.status(409).json({ error: "Unable to update user" });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

app.delete('/user/:user_id', async (req: Request, res: Response) => {
    try {
        const user_id = Number(req.params.user_id);
        const result = await deleteUser(user_id);

        if(result) {
            return res.status(200).json({ message: "User deleted" });
        }

        return res.status(409).json({ error: "Unable to delete user" });
    } catch (err) {
        return res.status(500).json({ error: (err as any).message });
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})