'use client';

import {CoverLetter} from '@/app/types/coverLetter.types';
import {Pencil, Trash2} from 'lucide-react';
import {Button} from '@/components/ui/button';

interface CoverLetterCardProps {
    coverLetter: CoverLetter;
    onDelete: (id: string) => void;
    onEdit: (coverLetter: CoverLetter) => void;
    deletingId: string | null;
}

export default function CoverLetterCard({
    coverLetter,
    onDelete,
    onEdit,
    deletingId,
}: CoverLetterCardProps) {
    const isDeleting = deletingId === coverLetter._id;

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        onDelete(coverLetter._id);
    };

    return (
        <div className="border rounded-lg p-6 hover:shadow-lg transition">
            {/* Card Content */}
            <div onClick={() => onEdit(coverLetter)} className="cursor-pointer">
                <h3 className="text-xl font-semibold mb-2">
                    {coverLetter.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3 mb-4">
                    {coverLetter.content}
                </p>

                <p className="text-sm text-gray-500">
                    Created:{' '}
                    {new Date(coverLetter.createdAt).toLocaleDateString()}
                </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(coverLetter);
                    }}
                    className="flex items-center gap-1"
                >
                    <Pencil className="h-4 w-4" />
                    Edit
                </Button>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDelete}
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
