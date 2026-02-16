'use client';

import { Resume } from '@/app/types/resume.types';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResumeCardProps {
  resume: Resume;
  onDelete: (id: string) => void;
  onEdit: (resume: Resume) => void;
  isDeleting: boolean;
}

export default function ResumeCard({
  resume,
  onDelete,
  onEdit,
  isDeleting,
}: ResumeCardProps) {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(resume._id);
  };

  return (
    <div className="border rounded-lg p-6 hover:shadow-lg transition">
      {/* Card Content */}
      <div onClick={() => onEdit(resume)} className="cursor-pointer">
        <h3 className="text-xl font-semibold mb-2">{resume.title}</h3>

        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-2 py-1 text-xs rounded ${
              resume.status === 'complete'
                ? 'bg-green-100 text-green-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
          >
            {resume.status}
          </span>
        </div>

        <p className="text-sm text-gray-500">
          Created: {new Date(resume.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4 pt-4 border-t">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit(resume);
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
