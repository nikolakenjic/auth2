export interface JobDescription {
    _id: string;
    userId: string;
    title?: string;
    text: string;
    keywords: string[];
    missingSkills: string[];
    matchScore?: number;
    createdAt: string;
    updatedAt: string;
}

export interface JobDescriptionResponse {
    status: string;
    jobDescription: JobDescription;
}

export interface JobDescriptionListResponse {
    status: string;
    jobDescriptions: JobDescription[];
}

export type CreateJobDescriptionInput = {
    title?: string;
    text: string;
    keywords?: string[];
    missingSkills?: string[];
    matchScore?: number;
}

export type UpdateJobDescriptionInput = Partial<CreateJobDescriptionInput>;