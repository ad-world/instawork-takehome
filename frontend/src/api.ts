import { ErrorMap } from "./errors";
const API_URL = "http://localhost:3000"

export interface User {
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

interface APIResponse<T> {
    data: T | null,
    error: string | null
}

export const getUsers = async (): Promise<APIResponse<Array<User>>> => {
    const response = await fetch(`${API_URL}/users`);
    const users = await response.json();

    if (response.status !== 500) {
        return { 
            data: users,
            error: null
         };
    } else {
        return { 
            data: null,
            error: ErrorMap[users.errorCode as keyof typeof ErrorMap]
         };
    }
}

export const getUserById = async (user_id: number): Promise<APIResponse<User>> => {
    const response = await fetch(`${API_URL}/user/${user_id}`);
    const user = await response.json();

    if(response.status == 200) {
        return {
            data: user,
            error: null
        }
    } else {
        return {
            data: null,
            error: ErrorMap[user.errorCode as keyof typeof ErrorMap]
        }
    }
}

export const createUser = async (user: Omit<UserWithPassword, 'user_id'>): Promise<APIResponse<number>> => {
    const response = await fetch(`${API_URL}/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();

    if(response.status == 201) {
        return {
            data: result.user_id,
            error: null
        }
    } else {
        return {
            data: null,
            error: ErrorMap[result.errorCode as keyof typeof ErrorMap]
        }
    }
}

export const updateUser = async (user: User): Promise<APIResponse<boolean>> => {
    const response = await fetch(`${API_URL}/user`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    const result = await response.json();

    if(response.status == 200) {
        return {
            data: true,
            error: null
        }
    } else {
        return {
            data: false,
            error: ErrorMap[result.errorCode as keyof typeof ErrorMap]
        }
    }
}

export const deleteUser = async (user_id: number): Promise<APIResponse<boolean>> => {
    const response = await fetch(`${API_URL}/user/${user_id}`, {
        method: 'DELETE'
    });

    const result = await response.json();

    if(response.status == 200) {
        return {
            data: true,
            error: null
        }
    } else {
        return {
            data: false,
            error: ErrorMap[result.errorCode as keyof typeof ErrorMap]
        }
    }
}

export const login = async (email: string, password: string): Promise<APIResponse<User>> => {
    const response = await fetch(`${API_URL}/login`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    const result = await response.json();

    if(response.status == 200) {
        return {
            data: result,
            error: null
        }
    } else {
        return {
            data: null,
            error: ErrorMap[result.errorCode as keyof typeof ErrorMap]
        }
    }
}