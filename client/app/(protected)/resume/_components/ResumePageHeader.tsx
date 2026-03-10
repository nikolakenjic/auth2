'use client';

import {Button} from '@/components/ui/button';
import {Plus, FileText, Sparkles} from 'lucide-react';

interface ResumePageHeaderProps {
    onCreateNew: () => void;
    resumeCount?: number;
}

export default function ResumePageHeader({
    onCreateNew,
    resumeCount = 0,
}: ResumePageHeaderProps) {
    return (
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-6 shadow-sm">
            {/* Decorative background glow */}
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Icon + Text */}
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                My Resumes
                            </h1>
                            {resumeCount > 0 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                    {resumeCount}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Manage and create your professional resumes
                        </p>
                    </div>
                </div>

                {/* Right: CTA */}
                <Button
                    onClick={onCreateNew}
                    className="relative group bg-indigo-500 hover:bg-indigo-600 text-white 
                               shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35
                               transition-all duration-200 font-medium flex items-center gap-2 self-start sm:self-auto"
                >
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                    <span className="relative">New Resume</span>
                    <Sparkles className="h-3.5 w-3.5 opacity-70" />
                </Button>
            </div>
        </div>
    );
}
