import ApiClient from "./api-client/api-client";

export default class BaseService {
    static async create<T>(endpoint: string, body: any, queryParams = {}): Promise<T> {
        return ApiClient.post(endpoint, body, queryParams).then(res => res.data);
    }

    static async fetch<T>(endpoint: string, queryParams = {}, config = {}): Promise<T> {
        return ApiClient.get(endpoint, queryParams, config).then(res => res.data);
    }

    static async delete<T>(endpoint: string, queryParams = {}): Promise<T> {
        return ApiClient.remove(endpoint, queryParams).then(res => res.data);
    }

    static async update<T>(endpoint: string, body: any, queryParams = {}): Promise<T> {
        return ApiClient.put(endpoint, body, queryParams).then(res => res.data);
    }
}