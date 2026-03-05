'use client';

import EmptyState from '@/components/empty-state/EmptyState';
import {FileSearch} from 'lucide-react';
import JobDescriptionList from './JobDescriptionList';
import {JobDescription} from '@/app/types/jobDescription.types';

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
    if (jobDescriptions.length === 0) {
        return (
            <EmptyState
                icon={FileSearch}
                title="No job descriptions yet"
                description="Add your first job description to start analyzing keyword matches"
                actionLabel="Add Job Description"
                onAction={onCreateNew}
            />
        );
    }

    return (
        <JobDescriptionList
            jobDescriptions={jobDescriptions}
            onDelete={onDelete}
            onEdit={onEdit}
            deletingId={deletingId}
        />
    );
}
