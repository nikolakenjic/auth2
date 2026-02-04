'use client'

import ResumeService from '@/app/services/resume.service';
import {Resume} from '@/app/types/resume.types';
import {useState} from 'react';

export function useUpdateResume() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const update = async (id: string, data: Partial<Resume>) => {
        try {
            setLoading(true);
            setError(null)
            const res = await ResumeService.update(id, data);
            return res.resume;
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message || 'Update failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {update, loading, error, clearError};
}