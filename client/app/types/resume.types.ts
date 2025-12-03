export interface Resume {
    _id: string;
    title: string;
    description: string;
    skills: string[];
    createdAt: string;
    updatedAt: string;
}

export interface ResumeResponse {
    status: string;
    resume: Resume
}

export interface ResumeListResponse {
    status: string;
    resumes: Resume[];
}