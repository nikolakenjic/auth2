'use client';

import {useModal} from '@/app/context/ModalContext';
import {Button} from '@/components/ui/button';
import {CoverLetter} from '@/app/types/coverLetter.types';
import LoadingState from '@/components/loading-state/LoadingState';
import {CoverLetterModal} from './_components/CoverLetterModal';
import {ConfirmDeleteModal} from '@/components/modal/ConfirmDeleteModal';
import {toast} from 'sonner';
import CoverLetterPageContent from './_components/CoverLetterPageContent';
import {useDeleteCoverLetter} from '@/app/hooks/(cover-letter)/useDeleteCoverLetter';
import {useCoverLetters} from '@/app/hooks/(cover-letter)/useCoverLetters';
import PageHeader from '../_components/PageHeader';
import {Mail} from 'lucide-react';

const DEFAULT_COVER_LETTER: CoverLetter = {
    _id: '',
    userId: '',
    title: '',
    content: '',
    createdAt: '',
    updatedAt: '',
};

export default function CoverLetterPage() {
    const {coverLetters, loading, error, refetch, setCoverLetters} =
        useCoverLetters();
    const {remove, deletingId} = useDeleteCoverLetter();
    const {openModal, closeModal} = useModal();

    const handleCreateNew = () => {
        openModal(
            <CoverLetterModal
                coverLetter={DEFAULT_COVER_LETTER}
                onSave={(saved) => {
                    setCoverLetters((prev) => [saved, ...prev]);
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleEdit = (coverLetter: CoverLetter) => {
        openModal(
            <CoverLetterModal
                coverLetter={coverLetter}
                onSave={(saved) => {
                    setCoverLetters((prev) =>
                        prev.map((cl) => (cl._id === saved._id ? saved : cl)),
                    );
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleDeleteClick = (coverLetter: CoverLetter) => {
        openModal(
            <ConfirmDeleteModal
                title={`Delete "${coverLetter.title}"?`}
                message="This action cannot be undone. Are you sure you want to delete this cover letter?"
                onDelete={async () => {
                    try {
                        await remove(coverLetter._id);
                        setCoverLetters((prev) =>
                            prev.filter((cl) => cl._id !== coverLetter._id),
                        );
                    } catch (err) {
                        console.error('Delete failed:', err);
                        toast.error('Failed to delete cover letter');
                        refetch();
                    }
                }}
                onClose={closeModal}
            />,
        );
    };

    if (loading) {
        return <LoadingState message="Loading cover letters..." />;
    }

    if (error) {
        return (
            <div className="flex h-screen items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <Button onClick={() => refetch()}>Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
            <PageHeader
                title="My Cover Letters"
                description="Manage and create your cover letters"
                icon={Mail}
                onCreateNew={handleCreateNew}
                buttonLabel="Create New"
                count={coverLetters.length}
            />
            <CoverLetterPageContent
                coverLetters={coverLetters}
                deletingId={deletingId}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const cl = coverLetters.find((c) => c._id === id);
                    if (cl) handleDeleteClick(cl);
                }}
            />
        </div>
    );
}
