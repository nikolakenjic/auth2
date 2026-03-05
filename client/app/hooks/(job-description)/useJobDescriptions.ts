'use client';

import {useCallback, useEffect, useState} from 'react';
import {JobDescription} from '@/app/types/jobDescription.types';
import JobDescriptionService from '@/app/services/jobDescription.service';

export function useJobDescriptions() {
    const [jobDescriptions, setJobDescriptions] = useState<JobDescription[]>(
        [],
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchJobDescriptions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await JobDescriptionService.getAll();
            setJobDescriptions(res.jobDescriptions || []);
        } catch (err: any) {
            console.error(err);
            const message =
                err?.response?.data?.message ||
                err?.message ||
                'Failed to load job descriptions';
            setError(message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchJobDescriptions();
    }, [fetchJobDescriptions]);

    return {
        jobDescriptions,
        loading,
        error,
        refetch: fetchJobDescriptions,
        setJobDescriptions,
    };
}
