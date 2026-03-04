'use client';

import {CoverLetter} from '@/app/types/coverLetter.types';
import CoverLetterCard from './CoverLetterCard';

interface CoverLetterListProps {
    coverLetters: CoverLetter[];
    onDelete: (id: string) => void;
    onEdit: (coverLetter: CoverLetter) => void;
    deletingId: string | null;
}

export default function CoverLetterList({
    coverLetters,
    onDelete,
    onEdit,
    deletingId,
}: CoverLetterListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coverLetters.map((cl) => (
                <CoverLetterCard
                    key={cl._id}
                    coverLetter={cl}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            ))}
        </div>
    );
}
