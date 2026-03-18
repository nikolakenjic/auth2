'use client';

import {Resume} from '@/app/types/resume.types';
import {Eye, Pencil, Trash2, FileText, Clock} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';
import {useRouter} from 'next/navigation';

interface ResumeCardProps {
    resume: Resume;
    onDelete: (id: string) => void;
    onEdit: (resume: Resume) => void;
    deletingId: string | null;
}

export default function ResumeCard({
    resume,
    onDelete,
    onEdit,
    deletingId,
}: ResumeCardProps) {
    const router = useRouter();
    const isDeleting = deletingId === resume._id;

    const isComplete = resume.status === 'complete';
    const sectionCount = resume.sections?.length ?? 0;

    const formattedDate = resume.updatedAt
        ? new Date(resume.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : null;

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
            {/* Top row */}
            <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 text-indigo-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate leading-tight">
                        {resume.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                isComplete
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                            }`}
                        >
                            {isComplete ? 'Complete' : 'Draft'}
                        </span>
                        {sectionCount > 0 && (
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                {sectionCount} section
                                {sectionCount !== 1 ? 's' : ''}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Updated at */}
            {formattedDate && (
                <div className="flex items-center gap-1.5 mb-4 text-xs text-slate-400 dark:text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Updated {formattedDate}</span>
                </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/resume/${resume._id}/edit`)}
                    className="flex items-center gap-1.5 flex-1 justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 dark:hover:text-indigo-400 transition-colors"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                </Button>

                <Link href={`/resume/${resume._id}/preview`} className="flex-1">
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full flex items-center gap-1.5 justify-center text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:border-indigo-300 dark:hover:text-indigo-400 transition-colors"
                    >
                        <Eye className="h-3.5 w-3.5" />
                        Preview
                    </Button>
                </Link>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDelete(resume._id)}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10 dark:hover:text-red-400 transition-colors"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                    {isDeleting ? 'Deleting...' : ''}
                </Button>
            </div>
        </div>
    );
}
