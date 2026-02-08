export type InterviewLevel = 'junior' | 'mid' | 'senior';
export type InterviewStatus = 'in_progress' | 'completed';

export interface InterviewMessage {
    question: string;
    answer?: string;
    feedback?: string;
    createdAt: string;
}

export interface InterviewSession {
    _id: string;
    userId: string;
    role: string;
    level?: InterviewLevel;
    status: InterviewStatus;
    messages: InterviewMessage[];
    overallFeedback?: string;
    endedAt?: string;
    createdAt: string;
    updatedAt: string;
}

export interface InterviewSessionResponse {
    status: string;
    session: InterviewSession;
}

export interface InterviewSessionListResponse {
    status: string;
    sessions: InterviewSession[];
}

export type CreateInterviewSessionInput = {
    role: string;
    level?: InterviewLevel;
    messages?: InterviewMessage[];
    overallFeedback?: string;
    status?: InterviewStatus;
    endedAt?: string;
}

export type UpdateInterviewSessionInput = Partial<CreateInterviewSessionInput>;