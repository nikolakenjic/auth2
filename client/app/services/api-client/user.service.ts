import BaseService from "../base.service";

export interface  RegisterUserData {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface  UserResponse {
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

export default class UserService {
    static readonly ENDPOINT = '/auth';

    static async register(userData: RegisterUserData): Promise<UserResponse> {
        return BaseService.create<UserResponse>(`${this.ENDPOINT}/register`, userData);
    }

    static async login(userData: LoginUserData): Promise<LoginUserData> {
        return BaseService.create<LoginUserData>(`${this.ENDPOINT}/login`, userData);
    }
}