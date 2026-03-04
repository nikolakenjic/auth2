'use client';

import EmptyState from '@/components/empty-state/EmptyState';
import {FileText} from 'lucide-react';
import CoverLetterList from './CoverLetterList';
import {CoverLetter} from '@/app/types/coverLetter.types';

interface CoverLetterPageContentProps {
    coverLetters: CoverLetter[];
    deletingId: string | null;
    onCreateNew: () => void;
    onEdit: (coverLetter: CoverLetter) => void;
    onDelete: (id: string) => void;
}

export default function CoverLetterPageContent({
    coverLetters,
    deletingId,
    onCreateNew,
    onEdit,
    onDelete,
}: CoverLetterPageContentProps) {
    if (coverLetters.length === 0) {
        return (
            <EmptyState
                icon={FileText}
                title="No cover letters yet"
                description="Create your first cover letter to get started"
                actionLabel="Create Your First Cover Letter"
                onAction={onCreateNew}
            />
        );
    }

    return (
        <CoverLetterList
            coverLetters={coverLetters}
            onDelete={onDelete}
            onEdit={onEdit}
            deletingId={deletingId}
        />
    );
}
