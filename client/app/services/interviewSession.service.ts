import BaseService from "@/app/services/base.service";
import {
    InterviewSessionListResponse,
    InterviewSessionResponse,
    CreateInterviewSessionInput,
    UpdateInterviewSessionInput
} from "@/app/types/interviewSession.types";

export default class InterviewSessionService {
    static readonly ENDPOINT = "/interview-session";

    static async getAll() {
        return BaseService.fetch<InterviewSessionListResponse>(this.ENDPOINT);
    }

    static async getById(id: string) {
        return BaseService.fetch<InterviewSessionResponse>(`${this.ENDPOINT}/${id}`);
    }

    static async create(data: CreateInterviewSessionInput) {
        return BaseService.create<InterviewSessionResponse>(this.ENDPOINT, data);
    }

    static async update(id: string, data: UpdateInterviewSessionInput) {
        return BaseService.patch<InterviewSessionResponse>(`${this.ENDPOINT}/${id}`, data);
    }

    static async remove(id: string) {
        return BaseService.delete<{ status: string; message: string }>(`${this.ENDPOINT}/${id}`);
    }
}