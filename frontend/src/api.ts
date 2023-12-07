const API_URL = "http://localhost:3000"

export interface User {
    user_id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    role: string;
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
            error: users.error
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
            error: user.error
        }
    }
}

export const createUser = async (user: Omit<User, 'user_id'>): Promise<APIResponse<number>> => {
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
            error: result.error
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
            error: result.error
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
            error: result.error
        }
    }
}