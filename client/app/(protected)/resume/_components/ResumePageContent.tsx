import {FileText} from 'lucide-react';
import {Resume} from '@/app/types/resume.types';
import PageContent from '../../_components/PageContent';
import ResumeCard from './ResumeCard';

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
    return (
        <PageContent
            items={resumes}
            onCreateNew={onCreateNew}
            emptyIcon={FileText}
            emptyTitle="No resumes yet"
            emptyDescription="Create your first resume to get started"
            emptyActionLabel="Create Your First Resume"
            renderItem={(resume) => (
                <ResumeCard
                    resume={resume}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            )}
        />
    );
}
