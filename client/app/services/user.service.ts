import BaseService from "@/app/services/base.service";
import {AuthResponse} from "@/app/types/auth";

export default class UserService {
    static readonly ENDPOINT = '/user';

    static async getMe(): Promise<AuthResponse> {
        return BaseService.fetch<AuthResponse>(`${this.ENDPOINT}/me`);
    }
}