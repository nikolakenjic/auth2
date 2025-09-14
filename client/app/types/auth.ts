export interface RegisterUserData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    email: string;
    verified: boolean;
    isOAuth: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface AuthResponse {
    status: string;
    user: User;
}

