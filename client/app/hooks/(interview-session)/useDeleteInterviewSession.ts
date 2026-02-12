'use client'

import InterviewSessionService from "@/app/services/interviewSession.service";
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useDeleteInterviewSession() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (id: string) => {
            await InterviewSessionService.remove(id);
        }
    );

    return {
        remove: mutate,
        loading,
        error,
        clearError
    };
}