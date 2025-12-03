import BaseService from "@/app/services/base.service";
import {Resume, ResumeListResponse, ResumeResponse} from "@/app/types/resume.types";

export default class ResumeService {
    static readonly ENDPOINT = "/resume";

    static async getAll() {
        return BaseService.fetch<ResumeListResponse>(this.ENDPOINT)
    }

    static async getById(id: string) {
        return BaseService.fetch<ResumeResponse>(`${this.ENDPOINT}/${id}`);
    }

    static async create(data: Partial<Resume>) {
        return BaseService.create<{ status: string; resume: any }>(this.ENDPOINT, data);
    }

    static async update(id: string, data: Partial<Resume>) {
        return BaseService.patch<ResumeResponse>(`${this.ENDPOINT}/${id}`, data);
    }

    static async remove(id: string) {
        return BaseService.delete<{ status: string; message: string }>(`${this.ENDPOINT}/${id}`);
    }
}