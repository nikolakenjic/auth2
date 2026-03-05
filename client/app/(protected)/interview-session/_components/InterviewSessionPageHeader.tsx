'use client';

import {Button} from '@/components/ui/button';
import {Plus} from 'lucide-react';

interface InterviewSessionPageHeaderProps {
    onCreateNew: () => void;
}

export default function InterviewSessionPageHeader({
    onCreateNew,
}: InterviewSessionPageHeaderProps) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">Interview Sessions</h1>
                <p className="text-gray-500 mt-1">
                    Practice and track your interview performance
                </p>
            </div>
            <Button onClick={onCreateNew} className="flex items-center gap-2">
                <Plus className="h-5 w-5" />
                New Session
            </Button>
        </div>
    );
}
