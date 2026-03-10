'use client';

import {useModal} from '@/app/context/ModalContext';
import {Button} from '@/components/ui/button';
import {InterviewSession} from '@/app/types/interviewSession.types';
import LoadingState from '@/components/loading-state/LoadingState';
import {InterviewSessionModal} from './_components/InterviewSessionModal';
import {ConfirmDeleteModal} from '@/components/modal/ConfirmDeleteModal';
import {toast} from 'sonner';
import InterviewSessionPageContent from './_components/InterviewSessionPageContent';
import {useInterviewSessions} from '@/app/hooks/(interview-session)/useInterviewSessions';
import {useDeleteInterviewSession} from '@/app/hooks/(interview-session)/useDeleteInterviewSession';
import PageHeader from '../_components/PageHeader';
import {MessageSquare} from 'lucide-react';

const DEFAULT_SESSION: InterviewSession = {
    _id: '',
    userId: '',
    role: '',
    level: undefined,
    status: 'in_progress',
    messages: [],
    createdAt: '',
    updatedAt: '',
};

export default function InterviewSessionPage() {
    const {sessions, loading, error, refetch, setSessions} =
        useInterviewSessions();
    const {remove, deletingId} = useDeleteInterviewSession();
    const {openModal, closeModal} = useModal();

    const handleCreateNew = () => {
        openModal(
            <InterviewSessionModal
                session={DEFAULT_SESSION}
                onSave={(saved) => {
                    setSessions((prev) => [saved, ...prev]);
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleEdit = (session: InterviewSession) => {
        openModal(
            <InterviewSessionModal
                session={session}
                onSave={(saved) => {
                    setSessions((prev) =>
                        prev.map((s) => (s._id === saved._id ? saved : s)),
                    );
                }}
                onClose={closeModal}
            />,
        );
    };

    const handleDeleteClick = (session: InterviewSession) => {
        openModal(
            <ConfirmDeleteModal
                title={`Delete "${session.role}" session?`}
                message="This action cannot be undone. Are you sure you want to delete this interview session?"
                onDelete={async () => {
                    try {
                        await remove(session._id);
                        setSessions((prev) =>
                            prev.filter((s) => s._id !== session._id),
                        );
                    } catch (err) {
                        console.error('Delete failed:', err);
                        toast.error('Failed to delete interview session');
                        refetch();
                    }
                }}
                onClose={closeModal}
            />,
        );
    };

    if (loading) {
        return <LoadingState message="Loading interview sessions..." />;
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
                title="Interview Sessions"
                description="Practice and track your interview performance"
                icon={MessageSquare}
                onCreateNew={handleCreateNew}
                buttonLabel="New Session"
                count={sessions.length}
            />
            <InterviewSessionPageContent
                sessions={sessions}
                deletingId={deletingId}
                onCreateNew={handleCreateNew}
                onEdit={handleEdit}
                onDelete={(id) => {
                    const session = sessions.find((s) => s._id === id);
                    if (session) handleDeleteClick(session);
                }}
            />
        </div>
    );
}
