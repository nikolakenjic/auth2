import {AxiosResponse} from "axios";
import axiosInstance from "./axios-instance";

export default class ApiClient {
    static async get(endpoint: string, queryParams = {}, config = {}): Promise<AxiosResponse> {
        return axiosInstance.get(endpoint, {params: queryParams, ...config});
    }

    static async post(endpoint: string, body: any, queryParams = {}, config = {}): Promise<AxiosResponse> {
        return axiosInstance.post(endpoint, body, {params: queryParams, ...config});
    }

    static async put(endpoint: string, body: any, queryParams = {}, config = {}): Promise<AxiosResponse> {
        return axiosInstance.put(endpoint, body, {params: queryParams, ...config});
    }

    static async patch(endpoint: string, body: any, queryParams = {}, config = {}): Promise<AxiosResponse> {
        return axiosInstance.patch(endpoint, body, {params: queryParams, ...config});
    }

    static async delete(endpoint: string, queryParams = {}, config = {}): Promise<AxiosResponse> {
        return axiosInstance.delete(endpoint, {params: queryParams, ...config});
    }
}

