'use client';

import { useModal } from '@/app/context/ModalContext';
import { Button } from '@/components/ui/button';
import { Resume } from '@/app/types/resume.types';
import { useResumes } from '@/app/hooks/(resume)/useResumes';
import { useDeleteResume } from '@/app/hooks/(resume)/useDeleteResume';
import LoadingState from '@/components/loading-state/LoadingState';
import { FileText, Plus } from 'lucide-react';
import { ResumeModal } from '@/app/(protected)/resume/components/ResumeModal';
import EmptyState from '@/components/empty-state/EmptyState';
import ResumeList from './components/ResumeList';
import { ConfirmDeleteModal } from '@/components/modal/ConfirmDeleteModal';

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
  const { resumes, loading, error, refetch, setResumes } = useResumes();
  const { remove, loading: deleting } = useDeleteResume();
  const { openModal, closeModal } = useModal();

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
            prev.map((r) => (r._id === savedResume._id ? savedResume : r)),
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
            setResumes((prev) => prev.filter((r) => r._id !== resume._id));
          } catch (err) {
            console.error('Delete failed:', err);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Resumes</h1>
          <p className="text-gray-500 mt-1">
            Manage and create your professional resumes
          </p>
        </div>

        <Button onClick={handleCreateNew} className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Create New
        </Button>
      </div>

      {/* Content */}
      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="No resumes yet"
          description="Create your first resume to get started"
          actionLabel="Create Your First Resume"
          onAction={handleCreateNew}
        />
      ) : (
        <ResumeList
          resumes={resumes}
          onDelete={(id) => {
            const resume = resumes.find((r) => r._id === id);
            if (resume) handleDeleteClick(resume);
          }}
          onEdit={handleEdit}
          isDeleting={deleting}
        />
      )}
    </div>
  );
}
