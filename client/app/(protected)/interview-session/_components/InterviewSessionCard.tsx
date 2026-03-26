'use client';

import {InterviewSession} from '@/app/types/interviewSession.types';
import {
    Pencil,
    Trash2,
    PlayCircle,
    CheckCircle2,
    Clock,
    MessageSquare,
} from 'lucide-react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

interface InterviewSessionCardProps {
    session: InterviewSession;
    onDelete: (id: string) => void;
    onEdit: (session: InterviewSession) => void;
    deletingId: string | null;
}

export default function InterviewSessionCard({
    session,
    onDelete,
    onEdit,
    deletingId,
}: InterviewSessionCardProps) {
    const isDeleting = deletingId === session._id;
    const isCompleted = session.status === 'completed';

    const formattedDate = session.updatedAt
        ? new Date(session.updatedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : null;

    const levelLabel = session.level
        ? session.level.charAt(0).toUpperCase() + session.level.slice(1)
        : null;

    return (
        <div className="group relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:shadow-md hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200">
            {/* Top row */}
            <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                </div>
                <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white truncate leading-tight">
                        {session.role}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                        <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${
                                isCompleted
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800'
                                    : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800'
                            }`}
                        >
                            {isCompleted ? (
                                <CheckCircle2 className="w-3 h-3" />
                            ) : (
                                <PlayCircle className="w-3 h-3" />
                            )}
                            {isCompleted ? 'Completed' : 'In Progress'}
                        </span>
                        {levelLabel && (
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                {levelLabel}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 mb-4 text-xs text-slate-400 dark:text-slate-500">
                <span className="flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {session.messages.length} message
                    {session.messages.length !== 1 ? 's' : ''}
                </span>
                {formattedDate && (
                    <>
                        <span>·</span>
                        <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {formattedDate}
                        </span>
                    </>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {/* Primary action */}
                <Link
                    href={`/interview-session/${session._id}`}
                    className="flex-1"
                >
                    <Button
                        size="sm"
                        className={`w-full flex items-center gap-1.5 justify-center ${
                            isCompleted
                                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                : 'bg-green-500 hover:bg-green-600 text-white shadow-sm shadow-green-500/25'
                        }`}
                    >
                        <PlayCircle className="h-3.5 w-3.5" />
                        {isCompleted ? 'View Session' : 'Continue'}
                    </Button>
                </Link>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(session);
                    }}
                    className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300 hover:text-green-600 hover:border-green-300 dark:hover:text-green-400 transition-colors"
                >
                    <Pencil className="h-3.5 w-3.5" />
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(session._id);
                    }}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/10 dark:hover:text-red-400 transition-colors"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}
