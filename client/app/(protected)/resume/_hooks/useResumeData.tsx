import {useEffect, useState} from 'react';
import {toast} from 'sonner';
import {Resume} from '@/app/types/resume.types';
import ResumeService from '@/app/services/resume.service';

export function useResumeData(id: string) {
    const [resume, setResume] = useState<Resume | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        ResumeService.getById(id)
            .then((res) => setResume(res.resume))
            .catch((err) => {
                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to load resume';
                setError(message);
                toast.error(message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    return {resume, loading, error};
}
