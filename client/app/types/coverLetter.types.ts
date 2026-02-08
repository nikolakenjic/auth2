export interface CoverLetter {
    _id: string;
    userId: string;
    resumeId?: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

export interface CoverLetterResponse {
    status: string;
    coverLetter: CoverLetter;
}

export interface CoverLetterListResponse {
    status: string;
    coverLetters: CoverLetter[];
}

export type CreateCoverLetterInput = {
    title: string;
    resumeId?: string;
    content: string;
}

export type UpdateCoverLetterInput = Partial<CreateCoverLetterInput>;