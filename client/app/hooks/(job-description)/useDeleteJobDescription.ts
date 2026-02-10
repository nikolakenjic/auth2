'use client'

import JobDescriptionService from "@/app/services/jobDescription.service";
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useDeleteJobDescription() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (id: string) => {
            await JobDescriptionService.remove(id);
        }
    );

    return {
        remove: mutate,
        loading,
        error,
        clearError
    };
}