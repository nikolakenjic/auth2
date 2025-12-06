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
            const res = await ResumeService.create(data);
            return res.resume;
        } catch (err: any) {
            setError(err?.message || 'Create failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return {create, loading, error};
}