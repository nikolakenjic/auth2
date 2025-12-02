import BaseService from "@/app/services/base.service";

export default class ResumeService {
    static readonly ENDPOINT = "/resume";

    static async getAll() {
        return BaseService.fetch<{ status: string; resumes: any[] }>(this.ENDPOINT)
    }

    static async getById(id: string) {
        return BaseService.fetch<{ status: string; resume: any }>(`${this.ENDPOINT}/${id}`);
    }

    static async create(data: any) {
        return BaseService.create<{ status: string; resume: any }>(this.ENDPOINT, data);
    }

    static async update(id: string, data: any) {
        return BaseService.patch<{ status: string; resume: any }>(`${this.ENDPOINT}/${id}`, data);
    }

    static async remove(id: string) {
        return BaseService.delete<{ status: string; message: string }>(`${this.ENDPOINT}/${id}`);
    }
}