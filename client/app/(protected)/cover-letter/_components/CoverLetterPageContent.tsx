'use client';

import {FileText} from 'lucide-react';
import {CoverLetter} from '@/app/types/coverLetter.types';
import CoverLetterCard from './CoverLetterCard';
import PageContent from '../../_components/PageContent';

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
    return (
        <PageContent
            items={coverLetters}
            onCreateNew={onCreateNew}
            emptyIcon={FileText}
            emptyTitle="No cover letters yet"
            emptyDescription="Create your first cover letter to get started"
            emptyActionLabel="Create Your First Cover Letter"
            renderItem={(cl) => (
                <CoverLetterCard
                    coverLetter={cl}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            )}
        />
    );
}
