import {
    buildSections,
    getContactInfo,
    getEducationItems,
    getExperienceItems,
    getSkillItems,
    getSummaryText,
} from '@/app/lib/resume/resume.utils';
import {
    ContactInfo,
    EducationItem,
    ExperienceItem,
    Resume,
} from '@/app/types/resume.types';
import {useCallback, useState} from 'react';
import {set} from 'zod';

export function useResumeForm(resume: Resume) {
    const [experience, setExperience] = useState<ExperienceItem[]>(() =>
        getExperienceItems(resume.sections),
    );
    const [education, setEducation] = useState<EducationItem[]>(() =>
        getEducationItems(resume.sections),
    );
    const [summaryText, setSummaryText] = useState<string>(() =>
        getSummaryText(resume.sections),
    );
    const [skills, setSkills] = useState<string[]>(() =>
        getSkillItems(resume.sections),
    );

    const [contact, setContact] = useState<ContactInfo>(() =>
        getContactInfo(resume.sections),
    );

    const addSkill = useCallback(() => {
        setSkills((prev) => [...prev, '']);
    }, []);

    const removeSkill = useCallback((index: number) => {
        setSkills((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const updateSkill = useCallback((index: number, value: string) => {
        setSkills((prev) => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    }, []);

    const assembleSubmitData = useCallback(
        (formikValues: Pick<Resume, 'title' | 'status'>): Resume => {
            const cleanExperience = experience.map(({_key, ...rest}) => rest);
            const cleanEducation = education.map(({_key, ...rest}) => rest);

            return {
                ...resume,
                ...formikValues,
                sections: buildSections({
                    summaryText,
                    experience: cleanExperience,
                    education: cleanEducation,
                    skills,
                    contact,
                }),
            };
        },
        [resume, summaryText, experience, education, skills, contact],
    );

    return {
        experience,
        education,
        summaryText,
        skills,
        contact,
        setExperience,
        setEducation,
        setSummaryText,
        addSkill,
        removeSkill,
        updateSkill,
        setContact,
        assembleSubmitData,
    };
}
