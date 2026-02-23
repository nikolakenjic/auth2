export type ResumeSectionType =
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills'
    | 'contact';

export type ResumeStatus = 'draft' | 'complete';

export type ContactInfo = {
    fullName: string;
    email: string;
    phone?: string;
    location?: string;
    linkedin?: string;
    portfolio?: string;
};

// --- Item Types ---
export type ExperienceItem = {
    company: string;
    title: string;
    location?: string;
    startDate: string;
    endDate?: string;
    bullets: string[];
};

export type EducationItem = {
    school: string;
    degree?: string;
    field?: string;
    startDate?: string;
    endDate?: string;
    details: string[];
};

// --- Section Types ---
export interface ResumeSectionSummary {
    type: 'summary';
    content: {text: string};
}

export interface ResumeSectionExperience {
    type: 'experience';
    content: {items: ExperienceItem[]};
}

export interface ResumeSectionEducation {
    type: 'education';
    content: {items: EducationItem[]};
}

export interface ResumeSectionSkills {
    type: 'skills';
    content: {items: string[]};
}

export interface ResumeSectionContact {
    type: 'contact';
    content: {info: ContactInfo};
}

export type ResumeSection =
    | ResumeSectionSummary
    | ResumeSectionExperience
    | ResumeSectionEducation
    | ResumeSectionSkills
    | ResumeSectionContact;

// --- Main Resume Type ---
export interface Resume {
    _id: string;
    userId: string;
    title: string;
    status: ResumeStatus;
    templateVersion: number;
    sections: ResumeSection[];
    createdAt: string;
    updatedAt: string;
}

// --- API Response Types ---
export interface ResumeResponse {
    status: string;
    resume: Resume;
}

export interface ResumeListResponse {
    status: string;
    resumes: Resume[];
}

// --- Form Input Types (for create/update) ---
export type CreateResumeInput = {
    title: string;
    status?: ResumeStatus;
    templateVersion?: number;
    sections?: ResumeSection[];
};

export type UpdateResumeInput = Partial<CreateResumeInput>;
