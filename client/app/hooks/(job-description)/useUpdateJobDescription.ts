'use client'

import JobDescriptionService from '@/app/services/jobDescription.service';
import {UpdateJobDescriptionInput} from '@/app/types/jobDescription.types';
import {useApiMutation} from '@/app/hooks/useApiMutation';

type UpdateVariables = {
    id: string;
    data: UpdateJobDescriptionInput;
};

export function useUpdateJobDescription() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async ({id, data}: UpdateVariables) => {
            const res = await JobDescriptionService.update(id, data);
            return res.jobDescription;
        }
    );

    return {
        update: mutate,
        loading,
        error,
        clearError
    };
}