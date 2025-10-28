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

export interface ForgotPasswordPayload {
    email: string;
}

export interface ResetPasswordPayload {
    token: string;

}

export interface AuthContextType {
    user: User | null;
    login: (credentials: LoginUserData) => Promise<User | null>;
    register: (payload: RegisterUserData) => Promise<User | null>;
    logout: () => Promise<void>;
    googleLogin: (token: string) => Promise<User | null>;
    verifyEmail: (code: string) => Promise<void>;
    resendVerificationEmail: (email: string) => Promise<void>;
    sendPasswordReset: (payload: ForgotPasswordPayload) => Promise<void>;
    resetPasswordChange: (payload: any) => Promise<void>;
    loading: boolean;
}

