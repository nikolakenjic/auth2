'use client'

import InterviewSessionService from '@/app/services/interviewSession.service';
import {CreateInterviewSessionInput} from '@/app/types/interviewSession.types';
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useCreateInterviewSession() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (data: CreateInterviewSessionInput) => {
            const res = await InterviewSessionService.create(data);
            return res.session;
        }
    );

    return {
        create: mutate,
        loading,
        error,
        clearError
    };
}