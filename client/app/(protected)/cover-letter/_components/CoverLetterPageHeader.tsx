'use client';

import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';

interface CoverLetterPageHeaderProps {
    onCreateNew: () => void;
}

export default function CoverLetterPageHeader({
    onCreateNew,
}: CoverLetterPageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">My Cover Letters</h1>
                <p className="text-gray-500 mt-1">
                    Manage and create your cover letters
                </p>
            </div>

            <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                Create New
            </Button>
        </div>
    );
}
