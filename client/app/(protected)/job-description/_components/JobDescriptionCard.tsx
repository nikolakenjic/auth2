'use client';

import {JobDescription} from '@/app/types/jobDescription.types';
import {Pencil, Trash2, FileSearch, Clock} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface JobDescriptionCardProps {
    jobDescription: JobDescription;
    onDelete: (id: string) => void;
    onEdit: (jobDescription: JobDescription) => void;
    deletingId: string | null;
}

function MatchScoreBadge({score}: {score: number}) {
    const color =
        score >= 70
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
            : score >= 40
              ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
              : 'bg-red-50 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800';

    return (
        <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}
        >
            {score}% match
        </span>
    );
}

export default function JobDescriptionCard({
    jobDescription,
    onDelete,
    onEdit,
    deletingId,
}: JobDescriptionCardProps) {
    const isDeleting = deletingId === jobDescription._id;

    const formattedDate = jobDescription.updatedAt
        ? new Date(jobDescription.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : null;

    const preview = jobDescription.text?.trim().slice(0, 100);
    const visibleKeywords = jobDescription.keywords?.slice(0, 4) ?? [];
    const extraKeywords = (jobDescription.keywords?.length ?? 0) - 4;

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
            {/* Top row */}
            <div
                className="flex items-start gap-3 mb-3 cursor-pointer"
                onClick={() => onEdit(jobDescription)}
            >
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 flex items-center justify-center shrink-0">
                    <FileSearch className="w-4 h-4 text-orange-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate leading-tight">
                        {jobDescription.title || 'Untitled Job Description'}
                    </h3>
                    {preview && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {preview}
                            {jobDescription.text?.length > 100 ? '...' : ''}
                        </p>
                    )}
                </div>
            </div>

            {/* Match score + keywords */}
            <div className="mb-4 space-y-2">
                {jobDescription.matchScore !== undefined && (
                    <MatchScoreBadge score={jobDescription.matchScore} />
                )}
                {visibleKeywords.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {visibleKeywords.map((kw, i) => (
                            <span
                                key={i}
                                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 px-2 py-0.5 rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                        {extraKeywords > 0 && (
                            <span className="text-xs text-slate-400 dark:text-slate-500 py-0.5">
                                +{extraKeywords} more
                            </span>
                        )}
                    </div>
                )}
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
                    onClick={() => onEdit(jobDescription)}
                    className="flex items-center gap-1.5 flex-1 justify-center text-slate-600 dark:text-slate-300 hover:text-orange-600 hover:border-orange-300 dark:hover:text-orange-400 transition-colors"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(jobDescription._id);
                    }}
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
