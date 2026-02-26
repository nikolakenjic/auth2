import {
    ContactInfo,
    EducationItem,
    ExperienceItem,
    ResumeSection,
    ResumeSectionContact,
    ResumeSectionEducation,
    ResumeSectionExperience,
    ResumeSectionSkills,
    ResumeSectionSummary,
    ResumeSectionType,
} from '@/app/types/resume.types';

export function getSection<T extends ResumeSection>(
    sections: ResumeSection[] | undefined,
    type: ResumeSectionType,
): T | undefined {
    return sections?.find((s) => s.type === type) as T | undefined;
}

export function getContactInfo(
    sections: ResumeSection[] | undefined,
): ContactInfo {
    return (
        getSection<ResumeSectionContact>(sections, 'contact')?.content?.info ??
        ({} as ContactInfo)
    );
}

export function getSummaryText(sections: ResumeSection[] | undefined): string {
    return (
        getSection<ResumeSectionSummary>(sections, 'summary')?.content?.text ??
        ''
    );
}

export function getExperienceItems(
    sections: ResumeSection[] | undefined,
): ExperienceItem[] {
    return (
        getSection<ResumeSectionExperience>(sections, 'experience')?.content
            ?.items ?? []
    );
}

export function getEducationItems(
    sections: ResumeSection[] | undefined,
): EducationItem[] {
    return (
        getSection<ResumeSectionEducation>(sections, 'education')?.content
            ?.items ?? []
    );
}

export function getSkillItems(sections: ResumeSection[] | undefined): string[] {
    return (
        getSection<ResumeSectionSkills>(sections, 'skills')?.content?.items ??
        []
    );
}

export function buildSections({
    summaryText,
    experience,
    education,
    skills,
}: {
    summaryText: string;
    experience: ExperienceItem[];
    education: EducationItem[];
    skills: string[];
}): ResumeSection[] {
    return [
        {type: 'summary', content: {text: summaryText}},
        {type: 'experience', content: {items: experience}},
        {type: 'education', content: {items: education}},
        {
            type: 'skills',
            content: {items: skills.filter((s) => s.trim() !== '')},
        },
    ];
}

export const createEmptyExperience = (): ExperienceItem => ({
    _key: crypto.randomUUID(),
    company: '',
    title: '',
    location: '',
    startDate: '',
    endDate: '',
    bullets: [],
});

export const createEmptyEducation = (): EducationItem => ({
    _key: crypto.randomUUID(),
    school: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: '',
    details: [],
});
