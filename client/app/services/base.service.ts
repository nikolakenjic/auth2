import ApiClient from "./api-client/api-client";

export default class BaseService {
    static async fetch<T>(endpoint: string, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.get(endpoint, queryParams, config).then(res => res.data);
    }

    static async create<T>(endpoint: string, body: any, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.post(endpoint, body, queryParams, config).then(res => res.data);
    }

    static async patch<T>(endpoint: string, body: any, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.patch(endpoint, body, queryParams, config).then(res => res.data);
    }

    static async update<T>(endpoint: string, body: any, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.put(endpoint, body, queryParams, config).then(res => res.data);
    }

    static async delete<T>(endpoint: string, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.delete(endpoint, queryParams, config).then(res => res.data);
    }
}