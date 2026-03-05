'use client';

import {InterviewSession} from '@/app/types/interviewSession.types';
import InterviewSessionCard from './InterviewSessionCard';

interface InterviewSessionListProps {
    sessions: InterviewSession[];
    onDelete: (id: string) => void;
    onEdit: (session: InterviewSession) => void;
    deletingId: string | null;
}

export default function InterviewSessionList({
    sessions,
    onDelete,
    onEdit,
    deletingId,
}: InterviewSessionListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
                <InterviewSessionCard
                    key={session._id}
                    session={session}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            ))}
        </div>
    );
}
