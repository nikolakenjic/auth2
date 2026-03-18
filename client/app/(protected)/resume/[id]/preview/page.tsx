'use client';

import {useParams} from 'next/navigation';
import Link from 'next/link';
import {ArrowLeft, Printer} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {ResumePreview} from '../../_components/ResumePreview';
import useResume from '../../_hooks/useResume';
import LoadingState from '@/components/loading-state/LoadingState';

export default function ResumePreviewPage() {
    const {id} = useParams();
    const {resume, loading, error} = useResume(id as string);

    const handlePrint = () => window.print();

    if (loading) return <LoadingState message="Loading preview..." />;

    if (error)
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );

    if (!resume)
        return (
            <div className="flex flex-col items-center justify-center h-screen gap-4">
                <p className="text-slate-500">Resume not found.</p>
                <Link href="/resume">
                    <Button variant="outline">Back to Resumes</Button>
                </Link>
            </div>
        );

    return (
        <>
            {/* Toolbar — hidden on print */}
            <div className="print:hidden sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-3">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link href={`/resume/${id}/edit`}>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-500 hover:text-slate-900"
                            >
                                <ArrowLeft className="h-4 w-4 mr-1.5" />
                                Back to Editor
                            </Button>
                        </Link>
                        <div className="h-4 w-px bg-slate-200" />
                        <span className="text-sm font-semibold text-slate-900 truncate max-w-xs">
                            {resume.title}
                        </span>
                    </div>

                    <Button
                        onClick={handlePrint}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                    >
                        <Printer className="h-4 w-4 mr-2" />
                        Print / Save PDF
                    </Button>
                </div>
            </div>

            {/* Preview */}
            <div className="min-h-screen bg-slate-100 py-10 print:bg-white print:py-0">
                <div className="max-w-4xl mx-auto print:max-w-none">
                    <ResumePreview resume={resume} />
                </div>
            </div>
        </>
    );
}
