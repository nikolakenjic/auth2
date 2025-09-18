import BaseService from "../base.service";
import {AuthResponse, LoginUserData, RegisterUserData} from "@/app/types/auth";

export default class AuthService {
    static readonly ENDPOINT = '/auth';

    // Register
    static async register(userData: RegisterUserData): Promise<AuthResponse> {
        return BaseService.create<AuthResponse>(`${this.ENDPOINT}/register`, userData);
    }

    // Login
    static async login(userData: LoginUserData): Promise<AuthResponse> {
        return BaseService.create<AuthResponse>(`${this.ENDPOINT}/login`, userData);
    }

    // Logout
    static async logout<T>(): Promise<T> {
        return BaseService.fetch<T>(`${this.ENDPOINT}/logout`);
    }

    // Refresh token
    static async refresh<T>(): Promise<T> {
        return BaseService.fetch<T>(`${this.ENDPOINT}/refresh`);
    }

    // Verify Email
    static async verifyEmail(code: string) {
        return BaseService.fetch(`${this.ENDPOINT}/email/verify/${code}`);
    }

    // Forgot password
    static async forgotPassword(payload: { email: string }) {
        return BaseService.create(`${this.ENDPOINT}/password/forgot`, payload);
    }

    // Reset password
    static async resetPassword(payload: any) {
        return BaseService.create(`${this.ENDPOINT}/password/reset`, payload);
    }
}