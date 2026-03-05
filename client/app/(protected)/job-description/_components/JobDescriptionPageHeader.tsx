'use client';

import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';

interface JobDescriptionPageHeaderProps {
    onCreateNew: () => void;
}

export default function JobDescriptionPageHeader({
    onCreateNew,
}: JobDescriptionPageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">Job Descriptions</h1>
                <p className="text-gray-500 mt-1">
                    Manage and analyze your job descriptions
                </p>
            </div>
            <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Add New
            </Button>
        </div>
    );
}
