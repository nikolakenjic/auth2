'use client';

import {
    User,
    FileText,
    Briefcase,
    GraduationCap,
    Wrench,
    LucideIcon,
} from 'lucide-react';

export type SectionId =
    | 'contact'
    | 'summary'
    | 'experience'
    | 'education'
    | 'skills';

export interface SectionConfig {
    id: SectionId;
    label: string;
    icon: LucideIcon;
}

export const SECTIONS: SectionConfig[] = [
    {id: 'contact', label: 'Contact', icon: User},
    {id: 'summary', label: 'Summary', icon: FileText},
    {id: 'experience', label: 'Experience', icon: Briefcase},
    {id: 'education', label: 'Education', icon: GraduationCap},
    {id: 'skills', label: 'Skills', icon: Wrench},
];

interface ResumeEditSidebarProps {
    activeSection: SectionId;
    onSectionClick: (id: SectionId) => void;
}

export function ResumeEditSidebar({
    activeSection,
    onSectionClick,
}: ResumeEditSidebarProps) {
    const handleClick = (id: SectionId) => {
        onSectionClick(id);
        document
            .getElementById(id)
            ?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    return (
        <aside className="hidden lg:flex flex-col gap-1 w-48 shrink-0 sticky top-24 self-start">
            {SECTIONS.map(({id, label, icon: Icon}) => (
                <button
                    key={id}
                    type="button"
                    onClick={() => handleClick(id)}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all text-left
                        ${
                            activeSection === id
                                ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400'
                                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                        }`}
                >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                </button>
            ))}
        </aside>
    );
}
