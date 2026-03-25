'use client';

import {CoverLetter} from '@/app/types/coverLetter.types';
import {Pencil, Trash2, Mail, Clock} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface CoverLetterCardProps {
    coverLetter: CoverLetter;
    onDelete: (id: string) => void;
    onEdit: (coverLetter: CoverLetter) => void;
    deletingId: string | null;
}

export default function CoverLetterCard({
    coverLetter,
    onDelete,
    onEdit,
    deletingId,
}: CoverLetterCardProps) {
    const isDeleting = deletingId === coverLetter._id;

    const formattedDate = coverLetter.updatedAt
        ? new Date(coverLetter.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : null;

    const preview = coverLetter.content?.trim().slice(0, 120);

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
            {/* Top row */}
            <div
                className="flex items-start gap-3 mb-4 cursor-pointer"
                onClick={() => onEdit(coverLetter)}
            >
                <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-purple-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate leading-tight">
                        {coverLetter.title}
                    </h3>
                    {preview && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                            {preview}
                            {coverLetter.content?.length > 120 ? '...' : ''}
                        </p>
                    )}
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
                    onClick={() => onEdit(coverLetter)}
                    className="flex items-center gap-1.5 flex-1 justify-center text-slate-600 dark:text-slate-300 hover:text-purple-600 hover:border-purple-300 dark:hover:text-purple-400 transition-colors"
                >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(coverLetter._id);
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
