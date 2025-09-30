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

export interface AuthContextType {
    user: User | null;
    login: (credentials: any) => Promise<User | null>;
    register: (payload: any) => Promise<User | null>;
    logout: () => Promise<void>;
    verifyEmail: (code: string) => Promise<any>;
    sendPasswordReset: (payload: { email: string }) => Promise<any>;
    resetPasswordChange: (payload: any) => Promise<any>;
    loading: boolean;
}

export interface ForgotPasswordData {
    email: string;
}