import BaseService from "@/app/services/base.service";
import {
    CoverLetterListResponse,
    CoverLetterResponse,
    CreateCoverLetterInput,
    UpdateCoverLetterInput
} from "@/app/types/coverLetter.types";

export default class CoverLetterService {
    static readonly ENDPOINT = '/cover-letter'

    static async getAll() {
        return BaseService.fetch<CoverLetterListResponse>(this.ENDPOINT);
    }

    static async getById(id: string) {
        return BaseService.fetch<CoverLetterResponse>(`${this.ENDPOINT}/${id}`);
    }

    static async create(data: CreateCoverLetterInput) {
        return BaseService.create<CoverLetterResponse>(this.ENDPOINT, data);
    }

    static async update(id: string, data: UpdateCoverLetterInput) {
        return BaseService.patch<CoverLetterResponse>(`${this.ENDPOINT}/${id}`, data);
    }

    static async remove(id: string) {
        return BaseService.delete<{ status: string; message: string }>(`${this.ENDPOINT}/${id}`);
    }
}