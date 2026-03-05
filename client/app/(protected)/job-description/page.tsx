'use client';

import {useModal} from '@/app/context/ModalContext';
import {Button} from '@/components/ui/button';
import {JobDescription} from '@/app/types/jobDescription.types';
import LoadingState from '@/components/loading-state/LoadingState';
import {JobDescriptionModal} from './_components/JobDescriptionModal';
import {ConfirmDeleteModal} from '@/components/modal/ConfirmDeleteModal';
import {toast} from 'sonner';
import JobDescriptionPageContent from './_components/JobDescriptionPageContent';
import JobDescriptionPageHeader from './_components/JobDescriptionPageHeader';
import {useJobDescriptions} from '@/app/hooks/(job-description)/useJobDescriptions';
import {useDeleteJobDescription} from '@/app/hooks/(job-description)/useDeleteJobDescription';

const DEFAULT_JOB_DESCRIPTION: JobDescription = {
    _id: '',
    userId: '',
    title: '',
    text: '',
    keywords: [],
    missingSkills: [],
    createdAt: '',
    updatedAt: '',
};

export default function JobDescriptionPage() {
    const {jobDescriptions, loading, error, refetch, setJobDescriptions} =
        useJobDescriptions();
    const {remove, deletingId} = useDeleteJobDescription();
    const {openModal, closeModal} = useModal();

    const handleCreateNew = () => {
        openModal(
            <JobDescriptionModal
                jobDescription={DEFAULT_JOB_DESCRIPTION}
                onSave={(saved) => {
                    setJobDescriptions((prev) => [saved, ...prev]);
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleEdit = (jobDescription: JobDescription) => {
        openModal(
            <JobDescriptionModal
                jobDescription={jobDescription}
                onSave={(saved) => {
                    setJobDescriptions((prev) =>
                        prev.map((jd) => (jd._id === saved._id ? saved : jd)),
                    );
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleDeleteClick = (jobDescription: JobDescription) => {
        openModal(
            <ConfirmDeleteModal
                title={`Delete "${jobDescription.title || 'this job description'}"?`}
                message="This action cannot be undone. Are you sure you want to delete this job description?"
                onDelete={async () => {
                    try {
                        await remove(jobDescription._id);
                        setJobDescriptions((prev) =>
                            prev.filter((jd) => jd._id !== jobDescription._id),
                        );
                    } catch (err) {
                        console.error('Delete failed:', err);
                        toast.error('Failed to delete job description');
                        refetch();
                    }
                }}
                onClose={closeModal}
            />,
        );
    };

    if (loading) {
        return <LoadingState message="Loading job descriptions..." />;
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
            <JobDescriptionPageHeader onCreateNew={handleCreateNew} />
            <JobDescriptionPageContent
                jobDescriptions={jobDescriptions}
                deletingId={deletingId}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const jd = jobDescriptions.find((j) => j._id === id);
                    if (jd) handleDeleteClick(jd);
                }}
            />
        </div>
    );
}
