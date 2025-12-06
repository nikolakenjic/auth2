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
            const res = await ResumeService.update(id, data);
            return res.resume;
        } catch (err: any) {
            setError(err?.message || 'Update failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return {update, loading, error};
}