import BaseService from "@/app/services/base.service";
import {
    JobDescriptionListResponse,
    JobDescriptionResponse,
    CreateJobDescriptionInput,
    UpdateJobDescriptionInput
} from "@/app/types/jobDescription.types";

export default class JobDescriptionService {
    static readonly ENDPOINT = "/job-description";

    static async getAll() {
        return BaseService.fetch<JobDescriptionListResponse>(this.ENDPOINT);
    }

    static async getById(id: string) {
        return BaseService.fetch<JobDescriptionResponse>(`${this.ENDPOINT}/${id}`);
    }

    static async create(data: CreateJobDescriptionInput) {
        return BaseService.create<JobDescriptionResponse>(this.ENDPOINT, data);
    }

    static async update(id: string, data: UpdateJobDescriptionInput) {
        return BaseService.patch<JobDescriptionResponse>(`${this.ENDPOINT}/${id}`, data);
    }

    static async remove(id: string) {
        return BaseService.delete<{ status: string; message: string }>(`${this.ENDPOINT}/${id}`);
    }
}