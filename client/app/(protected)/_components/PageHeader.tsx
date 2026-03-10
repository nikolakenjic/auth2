'use client';

import {Button} from '@/components/ui/button';
import {Plus, Sparkles, LucideIcon} from 'lucide-react';

interface PageHeaderProps {
    title: string;
    description: string;
    icon: LucideIcon;
    onCreateNew: () => void;
    buttonLabel?: string;
    count?: number;
}

export default function PageHeader({
    title,
    description,
    icon: Icon,
    onCreateNew,
    buttonLabel = 'Create New',
    count = 0,
}: PageHeaderProps) {
    return (
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-6 shadow-sm">
            <div className="pointer-events-none absolute -top-10 -right-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                                {title}
                            </h1>
                            {count > 0 && (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                                    {count}
                                </span>
                            )}
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            {description}
                        </p>
                    </div>
                </div>

                <Button
                    onClick={onCreateNew}
                    className="relative group bg-indigo-500 hover:bg-indigo-600 text-white 
                               shadow-md shadow-indigo-500/25 hover:shadow-lg hover:shadow-indigo-500/35
                               transition-all duration-200 font-medium flex items-center gap-2 self-start sm:self-auto"
                >
                    <span className="absolute inset-0 rounded-md bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Plus className="h-4 w-4 transition-transform duration-200 group-hover:rotate-90" />
                    <span className="relative">{buttonLabel}</span>
                    <Sparkles className="h-3.5 w-3.5 opacity-70" />
                </Button>
            </div>
        </div>
    );
}
