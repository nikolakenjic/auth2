'use client';

import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';

interface ResumePageHeaderProps {
    onCreateNew: () => void;
}

export default function ResumePageHeader({onCreateNew}: ResumePageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">My Resumes</h1>
                <p className="text-gray-500 mt-1">
                    Manage and create your professional resumes
                </p>
            </div>

            <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New
            </Button>
        </div>
    );
}
