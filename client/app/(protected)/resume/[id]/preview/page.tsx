'use client';

import ResumeService from '@/app/services/resume.service';
import {Resume} from '@/app/types/resume.types';
import {useParams, useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ResumePreview} from '../../_components/ResumePreview';

export default function ResumePreviewPage() {
    const {id} = useParams();
    const router = useRouter();
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ResumeService.getById(id as string)
            .then(({resume}) => setResume(resume))
            .finally(() => setLoading(false));
    }, [id]);

    console.log(resume);

    if (!resume) {
        return (
            <div className="p-8 text-center text-gray-500">
                Resume not found.
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto">
                <ResumePreview resume={resume} />
            </div>
        </div>
    );
}
