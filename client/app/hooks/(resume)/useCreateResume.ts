'use client'

import ResumeService from '@/app/services/resume.service';
import {Resume} from '@/app/types/resume.types';
import {useState} from 'react';


export function useCreateResume() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const create = async (data: Partial<Resume>) => {
        try {
            setLoading(true);
            setError(null)
            const res = await ResumeService.create(data);
            return res.resume;
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message || 'Create failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {create, loading, error, clearError};
}