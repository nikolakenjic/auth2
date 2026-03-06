'use client';

import {JobDescription} from '@/app/types/jobDescription.types';
import {Pencil, Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface JobDescriptionCardProps {
    jobDescription: JobDescription;
    onDelete: (id: string) => void;
    onEdit: (jobDescription: JobDescription) => void;
    deletingId: string | null;
}

export default function JobDescriptionCard({
    jobDescription,
    onDelete,
    onEdit,
    deletingId,
}: JobDescriptionCardProps) {
    const isDeleting = deletingId === jobDescription._id;

    return (
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            <div
                onClick={() => onEdit(jobDescription)}
                className="cursor-pointer"
            >
                <h3 className="text-xl font-semibold mb-2">
                    {jobDescription.title || 'Untitled Job Description'}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {jobDescription.text}
                </p>

                {/* Match Score */}
                {jobDescription.matchScore !== undefined && (
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs text-gray-500">
                            Match Score:
                        </span>
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                jobDescription.matchScore >= 70
                                    ? 'bg-green-100 text-green-700'
                                    : jobDescription.matchScore >= 40
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                            }`}
                        >
                            {jobDescription.matchScore}%
                        </span>
                    </div>
                )}

                {/* Keywords */}
                {jobDescription.keywords.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                        {jobDescription.keywords.slice(0, 5).map((kw, i) => (
                            <span
                                key={i}
                                className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full"
                            >
                                {kw}
                            </span>
                        ))}
                        {jobDescription.keywords.length > 5 && (
                            <span className="text-xs text-gray-400">
                                +{jobDescription.keywords.length - 5} more
                            </span>
                        )}
                    </div>
                )}

                <p className="text-sm text-gray-500">
                    Created:{' '}
                    {new Date(jobDescription.createdAt).toLocaleDateString()}
                </p>
            </div>

            <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(jobDescription);
                    }}
                    className="flex items-center gap-1"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete(jobDescription._id);
                    }}
                    disabled={isDeleting}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4" />
                    {isDeleting ? 'Deleting...' : 'Delete'}
                </Button>
            </div>
        </div>
    );
}
