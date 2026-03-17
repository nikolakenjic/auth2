'use client';

import {useParams} from 'next/navigation';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import {useResumeData} from '../../_hooks/useResumeData';
import {ResumeEditorForm} from '../../_components/ResumeEditorForm';

export default function ResumeEditPage() {
    const {id} = useParams<{id: string}>();
    const {resume, loading} = useResumeData(id);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
            </div>
        );
    }

    if (!resume) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
                <p className="text-slate-500">Resume not found.</p>
                <Link href="/resume">
                    <Button variant="outline">Back to Resumes</Button>
                </Link>
            </div>
        );
    }

    return <ResumeEditorForm resume={resume} id={id} />;
}
