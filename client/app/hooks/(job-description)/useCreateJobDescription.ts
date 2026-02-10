'use client'

import JobDescriptionService from '@/app/services/jobDescription.service';
import {CreateJobDescriptionInput} from '@/app/types/jobDescription.types';
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useCreateJobDescription() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (data: CreateJobDescriptionInput) => {
            const res = await JobDescriptionService.create(data);
            return res.jobDescription;
        }
    );

    return {
        create: mutate,
        loading,
        error,
        clearError
    };
}