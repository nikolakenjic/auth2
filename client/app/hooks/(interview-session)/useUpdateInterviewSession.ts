'use client'

import InterviewSessionService from '@/app/services/interviewSession.service';
import {UpdateInterviewSessionInput} from '@/app/types/interviewSession.types';
import {useApiMutation} from '@/app/hooks/useApiMutation';

type UpdateVariables = {
    id: string;
    data: UpdateInterviewSessionInput;
};

export function useUpdateInterviewSession() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async ({id, data}: UpdateVariables) => {
            const res = await InterviewSessionService.update(id, data);
            return res.session;
        }
    );

    return {
        update: mutate,
        loading,
        error,
        clearError
    };
}