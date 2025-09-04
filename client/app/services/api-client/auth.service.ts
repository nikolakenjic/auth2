import BaseService from "../base.service";

export interface RegisterUserData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserResponse {
    status: string;
    user: {
        _id: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface LoginUserData {
    email: string;
    password: string;
}

export default class AuthService {
    static readonly ENDPOINT = '/auth';

    // Register
    static async register(userData: RegisterUserData): Promise<UserResponse> {
        return BaseService.create<UserResponse>(`${this.ENDPOINT}/register`, userData);
    }

    // Login
    static async login(userData: LoginUserData): Promise<LoginUserData> {
        return BaseService.create<LoginUserData>(`${this.ENDPOINT}/login`, userData);
    }

    // Logout
    static async logout<T>(): Promise<T> {
        return BaseService.fetch<T>(`${this.ENDPOINT}/logout`);
    }

    // Refresh token
    static async refresh<T>(): Promise<T> {
        return BaseService.fetch<T>(`${this.ENDPOINT}/refresh`);
    }

}