'use client'

import CoverLetterService from "@/app/services/coverLetter.service";
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useDeleteCoverLetter() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (id: string) => {
            await CoverLetterService.remove(id);
        }
    );

    return {
        remove: mutate,
        loading,
        error,
        clearError
    };
}