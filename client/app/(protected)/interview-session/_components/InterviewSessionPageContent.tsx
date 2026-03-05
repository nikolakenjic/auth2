'use client';

import EmptyState from '@/components/empty-state/EmptyState';
import {MessageSquare} from 'lucide-react';
import InterviewSessionList from './InterviewSessionList';
import {InterviewSession} from '@/app/types/interviewSession.types';

interface InterviewSessionPageContentProps {
    sessions: InterviewSession[];
    deletingId: string | null;
    onCreateNew: () => void;
    onEdit: (session: InterviewSession) => void;
    onDelete: (id: string) => void;
}

export default function InterviewSessionPageContent({
    sessions,
    deletingId,
    onCreateNew,
    onEdit,
    onDelete,
}: InterviewSessionPageContentProps) {
    if (sessions.length === 0) {
        return (
            <EmptyState
                icon={MessageSquare}
                title="No interview sessions yet"
                description="Start your first mock interview to begin practicing"
                actionLabel="Start First Interview"
                onAction={onCreateNew}
            />
        );
    }

    return (
        <InterviewSessionList
            sessions={sessions}
            onDelete={onDelete}
            onEdit={onEdit}
            deletingId={deletingId}
        />
    );
}
