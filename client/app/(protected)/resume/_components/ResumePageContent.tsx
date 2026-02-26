import EmptyState from '@/components/empty-state/EmptyState';
import {FileText} from 'lucide-react';
import ResumeList from './ResumeList';
import {Resume} from '@/app/types/resume.types';

interface ResumePageContentProps {
    resumes: Resume[];
    deletingId: string | null;
    onCreateNew: () => void;
    onEdit: (resume: Resume) => void;
    onDelete: (id: string) => void;
}

export default function ResumePageContent({
    resumes,
    deletingId,
    onCreateNew,
    onEdit,
    onDelete,
}: ResumePageContentProps) {
    if (resumes.length === 0) {
        return (
            <EmptyState
                icon={FileText}
                title="No resumes yet"
                description="Create your first resume to get started"
                actionLabel="Create Your First Resume"
                onAction={onCreateNew}
            />
        );
    }

    return (
        <ResumeList
            resumes={resumes}
            onDelete={onDelete}
            onEdit={onEdit}
            deletingId={deletingId}
        />
    );
}
