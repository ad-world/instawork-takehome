import express, { Request, Response } from 'express'
import cors from 'cors'
import './database'
import { addUser, deleteUser, getUser, getUserById, updateUser } from './controllers';

const app = express();
app.use(cors());
app.use(express.json());

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
        console.log(req);
        const user = req.body;

        console.log(req.body);

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