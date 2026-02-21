'use client';

import {
    Resume,
    ContactInfo,
    ExperienceItem,
    EducationItem,
} from '@/app/types/resume.types';

interface ResumePreviewProps {
    resume: Resume;
}

export function ResumePreview({resume}: ResumePreviewProps) {
    const getSection = (type: string) =>
        resume.sections?.find((s) => s.type === type) as any;

    const contact: ContactInfo = getSection('contact')?.content || {};
    const summary: string = getSection('summary')?.content?.text || '';
    const experience: ExperienceItem[] =
        getSection('experience')?.content?.items || [];
    const education: EducationItem[] =
        getSection('education')?.content?.items || [];
    const skills: string[] = getSection('skills')?.content?.items || [];

    return (
        <div className="bg-white shadow-lg rounded-md p-10 min-h-[1100px] font-serif text-gray-900">
            {/* Header */}
            {contact.fullName && (
                <div className="text-center border-b pb-6 mb-6">
                    <h1 className="text-3xl font-bold tracking-wide">
                        {contact.fullName}
                    </h1>
                    <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm text-gray-600">
                        {contact.email && <span>{contact.email}</span>}
                        {contact.phone && <span>· {contact.phone}</span>}
                        {contact.location && <span>· {contact.location}</span>}
                        {contact.linkedin && <span>· {contact.linkedin}</span>}
                        {contact.portfolio && (
                            <span>· {contact.portfolio}</span>
                        )}
                    </div>
                </div>
            )}

            {/* Summary */}
            {summary && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b mb-3">
                        Summary
                    </h2>
                    <p className="text-sm leading-relaxed">{summary}</p>
                </section>
            )}

            {/* Experience */}
            {experience.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b mb-3">
                        Experience
                    </h2>
                    <div className="space-y-5">
                        {experience.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">
                                            {item.title}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {item.company}
                                            {item.location
                                                ? ` — ${item.location}`
                                                : ''}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500 shrink-0 mt-1">
                                        {item.startDate} —{' '}
                                        {item.endDate || 'Present'}
                                    </p>
                                </div>
                                {item.bullets.length > 0 && (
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        {item.bullets
                                            .filter((b) => b.trim())
                                            .map((bullet, i) => (
                                                <li key={i} className="text-sm">
                                                    {bullet}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Education */}
            {education.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b mb-3">
                        Education
                    </h2>
                    <div className="space-y-4">
                        {education.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-bold">
                                            {item.school}
                                        </p>
                                        {(item.degree || item.field) && (
                                            <p className="text-sm text-gray-600">
                                                {[item.degree, item.field]
                                                    .filter(Boolean)
                                                    .join(' in ')}
                                            </p>
                                        )}
                                    </div>
                                    {(item.startDate || item.endDate) && (
                                        <p className="text-xs text-gray-500 shrink-0 mt-1">
                                            {item.startDate} —{' '}
                                            {item.endDate || 'Present'}
                                        </p>
                                    )}
                                </div>
                                {item.details.length > 0 && (
                                    <ul className="mt-2 space-y-1 list-disc list-inside">
                                        {item.details
                                            .filter((d) => d.trim())
                                            .map((detail, i) => (
                                                <li key={i} className="text-sm">
                                                    {detail}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills.length > 0 && (
                <section>
                    <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 border-b mb-3">
                        Skills
                    </h2>
                    <div className="flex flex-wrap gap-2">
                        {skills
                            .filter((s) => s.trim())
                            .map((skill, index) => (
                                <span
                                    key={index}
                                    className="text-sm bg-gray-100 px-3 py-1 rounded-full"
                                >
                                    {skill}
                                </span>
                            ))}
                    </div>
                </section>
            )}
        </div>
    );
}
