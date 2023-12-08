import { createContext } from "react";
import { User } from "../api";

interface UserContextProps {
    user: User | null;
    setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextProps>({
    user: null,
    setUser: () => {},
});

export default UserContext;