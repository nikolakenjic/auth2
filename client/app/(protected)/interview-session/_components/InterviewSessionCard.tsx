'use client';

import {InterviewSession} from '@/app/types/interviewSession.types';
import {Pencil, Trash2, PlayCircle} from 'lucide-react';
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

    return (
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <div onClick={() => onEdit(session)} className="cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{session.role}</h3>
                    <span
                        className={`px-2 py-1 text-xs rounded ${
                            session.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                        {session.status === 'completed'
                            ? 'Completed'
                            : 'In Progress'}
                    </span>
                </div>

                {session.level && (
                    <p className="text-sm text-gray-500 mb-2 capitalize">
                        {session.level}
                    </p>
                )}

                <p className="text-sm text-gray-500 mb-2">
                    {session.messages.length} question
                    {session.messages.length !== 1 ? 's' : ''}
                </p>

                <p className="text-sm text-gray-500">
                    Created: {new Date(session.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
                <Link href={`/interview-session/${session._id}`}>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                    >
                        <PlayCircle className="h-4 w-4" />
                        {session.status === 'completed' ? 'View' : 'Continue'}
                    </Button>
                </Link>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(session);
                    }}
                    className="flex items-center gap-1"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(session._id);
                    }}
                    disabled={isDeleting}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
    );
}
