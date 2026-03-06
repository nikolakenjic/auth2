'use client';

import {JobDescription} from '@/app/types/jobDescription.types';
import JobDescriptionCard from './JobDescriptionCard';

interface JobDescriptionListProps {
    jobDescriptions: JobDescription[];
    onDelete: (id: string) => void;
    onEdit: (jobDescription: JobDescription) => void;
    deletingId: string | null;
}

export default function JobDescriptionList({
    jobDescriptions,
    onDelete,
    onEdit,
    deletingId,
}: JobDescriptionListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobDescriptions.map((jd) => (
                <JobDescriptionCard
                    key={jd._id}
                    jobDescription={jd}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    deletingId={deletingId}
                />
            ))}
        </div>
    );
}
