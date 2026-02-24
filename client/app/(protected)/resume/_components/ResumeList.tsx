'use client'

import {Resume} from "@/app/types/resume.types";
import ResumeCard from "./ResumeCard";

interface ResumeListProps {
    resumes: Resume[];
    onDelete: (id: string) => void;
    onEdit: (resume: Resume) => void;
    isDeleting: boolean;
}

export default function ResumeList({resumes, onDelete, onEdit, isDeleting}: ResumeListProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
                <ResumeCard
                    key={resume._id}
                    resume={resume}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    isDeleting={isDeleting}
                />
            ))}
        </div>
    );
}