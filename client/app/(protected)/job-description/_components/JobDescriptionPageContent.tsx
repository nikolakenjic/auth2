'use client';

import {FileSearch} from 'lucide-react';
import {JobDescription} from '@/app/types/jobDescription.types';
import JobDescriptionCard from './JobDescriptionCard';
import PageContent from '../../_components/PageContent';

interface JobDescriptionPageContentProps {
    jobDescriptions: JobDescription[];
    deletingId: string | null;
    onCreateNew: () => void;
    onEdit: (jobDescription: JobDescription) => void;
    onDelete: (id: string) => void;
}

export default function JobDescriptionPageContent({
    jobDescriptions,
    deletingId,
    onCreateNew,
    onEdit,
    onDelete,
}: JobDescriptionPageContentProps) {
    return (
        <PageContent
            items={jobDescriptions}
            onCreateNew={onCreateNew}
            emptyIcon={FileSearch}
            emptyTitle="No job descriptions yet"
            emptyDescription="Add your first job description to start analyzing keyword matches"
            emptyActionLabel="Add Job Description"
            renderItem={(jd) => (
                <JobDescriptionCard
                    jobDescription={jd}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            )}
        />
    );
}
