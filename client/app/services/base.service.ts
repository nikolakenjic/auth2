import ApiClient from "./api-client/api-client";

export default class BaseService {
    static async create<T>(endpoint: string, body: any, queryParams = {}): Promise<T> {
        return ApiClient.post(endpoint, body, queryParams).then(res => res.data);
    }
}