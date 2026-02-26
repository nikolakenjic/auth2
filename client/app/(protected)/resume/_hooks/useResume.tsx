'use client';

import ResumeService from '@/app/services/resume.service';
import {Resume} from '@/app/types/resume.types';
import {useEffect, useState} from 'react';

export default function useResume(id: string) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        ResumeService.getById(id)
            .then(({resume}) => setResume(resume))
            .catch(() => setError('Resume not found'))
            .finally(() => setLoading(false));
    }, [id]);

    return {resume, loading, error};
}
