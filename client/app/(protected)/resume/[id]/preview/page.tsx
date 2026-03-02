'use client';

import {useParams} from 'next/navigation';
import {ResumePreview} from '../../_components/ResumePreview';
import useResume from '../../_hooks/useResume';
import LoadingState from '@/components/loading-state/LoadingState';

export default function ResumePreviewPage() {
    const {id} = useParams();
    const {resume, loading, error} = useResume(id as string);

    if (loading) return <LoadingState message="Loading preview..." />;
    if (error)
        return <div className="p-8 text-center text-red-500">{error}</div>;
    if (!resume)
        return (
            <div className="p-8 text-center text-gray-500">
                Resume not found.
            </div>
        );

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto">
                <ResumePreview resume={resume} />
            </div>
        </div>
    );
}
