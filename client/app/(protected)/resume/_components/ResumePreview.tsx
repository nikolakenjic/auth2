'use client';

import {
    getContactInfo,
    getEducationItems,
    getExperienceItems,
    getSkillItems,
    getSummaryText,
} from '@/app/lib/resume/resume.utils';
import {Resume} from '@/app/types/resume.types';
import {ContactHeader} from '../[id]/preview/_components/ContactHeader';
import {SummarySection} from '../[id]/preview/_components/SummarySection';
import {ExperienceSection} from '../[id]/preview/_components/ExperienceSection';
import {EducationSection} from '../[id]/preview/_components/EducationSection';
import {SkillsSection} from '../[id]/preview/_components/SkillsSection';

interface ResumePreviewProps {
    resume: Resume;
}

export function ResumePreview({resume}: ResumePreviewProps) {
    const contact = getContactInfo(resume.sections);
    const summary = getSummaryText(resume.sections);
    const experience = getExperienceItems(resume.sections);
    const education = getEducationItems(resume.sections);
    const skills = getSkillItems(resume.sections);

    return (
        <div className="bg-white shadow-lg rounded-md p-10 min-h-[1100px] font-serif text-gray-900">
            <ContactHeader contact={contact} />
            <SummarySection summary={summary} />
            <ExperienceSection experience={experience} />
            <EducationSection education={education} />
            <SkillsSection skills={skills} />
        </div>
    );
}
