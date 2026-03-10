'use client';

import PageContent from '../../_components/PageContent';
import {MessageSquare} from 'lucide-react';
import {InterviewSession} from '@/app/types/interviewSession.types';
import InterviewSessionCard from './InterviewSessionCard';

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
    return (
        <PageContent
            items={sessions}
            onCreateNew={onCreateNew}
            emptyIcon={MessageSquare}
            emptyTitle="No interview sessions yet"
            emptyDescription="Start your first mock interview to begin practicing"
            emptyActionLabel="Start First Interview"
            renderItem={(session) => (
                <InterviewSessionCard
                    session={session}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            )}
        />
    );
}
