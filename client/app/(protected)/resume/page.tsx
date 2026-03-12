'use client';

import {useModal} from '@/app/context/ModalContext';
import {Button} from '@/components/ui/button';
import {Resume} from '@/app/types/resume.types';
import {useResumes} from '@/app/hooks/(resume)/useResumes';
import {useDeleteResume} from '@/app/hooks/(resume)/useDeleteResume';
import LoadingState from '@/components/loading-state/LoadingState';
import {ResumeModal} from '@/app/(protected)/resume/_components/ResumeModal';
import {ConfirmDeleteModal} from '@/components/modal/ConfirmDeleteModal';
import {toast} from 'sonner';
import ResumePageContent from './_components/ResumePageContent';
import PageHeader from '../_components/PageHeader';
import {FileText} from 'lucide-react';

const DEFAULT_RESUME: Resume = {
    _id: '',
    userId: '',
    title: '',
    status: 'draft',
    templateVersion: 1,
    sections: [],
    createdAt: '',
    updatedAt: '',
};

export default function ResumePage() {
    const {resumes, loading, error, refetch, setResumes} = useResumes();
    const {remove, deletingId} = useDeleteResume();
    const {openModal, closeModal} = useModal();

    const handleCreateNew = () => {
        openModal(
            <ResumeModal
                resume={DEFAULT_RESUME}
                onSave={(savedResume) => {
                    setResumes((prev) => [savedResume, ...prev]);
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleEdit = (resume: Resume) => {
        openModal(
            <ResumeModal
                resume={resume}
                onSave={(savedResume) => {
                    setResumes((prev) =>
                        prev.map((r) =>
                            r._id === savedResume._id ? savedResume : r,
                        ),
                    );
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleDeleteClick = (resume: Resume) => {
        openModal(
            <ConfirmDeleteModal
                title={`Delete "${resume.title}"?`}
                message="This action cannot be undone. Are you sure you want to delete this resume?"
                onDelete={async () => {
                    try {
                        await remove(resume._id);
                        setResumes((prev) =>
                            prev.filter((r) => r._id !== resume._id),
                        );
                    } catch (err) {
                        console.error('Delete failed:', err);
                        toast.error('Failed to delete resume');
                        refetch();
                    }
                }}
                onClose={closeModal}
            />,
        );
    };

    if (loading) {
        return <LoadingState message="Loading resumes..." />;
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
                title="My Resumes"
                description="Manage and create your professional resumes"
                icon={FileText}
                onCreateNew={handleCreateNew}
                buttonLabel="New Resume"
                count={resumes.length}
                iconBg="bg-indigo-50 dark:bg-indigo-900/20"
                iconColor="text-indigo-500"
            />
            <ResumePageContent
                resumes={resumes}
                deletingId={deletingId}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const resume = resumes.find((r) => r._id === id);
                    if (resume) handleDeleteClick(resume);
                }}
            />
        </div>
    );
}
