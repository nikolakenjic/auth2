import BaseService from "../base.service";

export interface  RegisterUserData {
    email: string;
    password: string;
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

export default class UserService {
    static readonly ENDPOINT = '/auth/register';

    static async register(userData: RegisterUserData): Promise<UserResponse> {
        return BaseService.create<UserResponse>(this.ENDPOINT, userData);
    }
}