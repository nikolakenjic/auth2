'use client';

import InterviewSessionService from '@/app/services/interviewSession.service';
import {useApiMutation} from '@/app/hooks/useApiMutation';
import {useState} from 'react';

export function useDeleteInterviewSession() {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const {mutate, error, clearError} = useApiMutation(async (id: string) => {
        await InterviewSessionService.remove(id);
    });

    const remove = async (id: string) => {
        setDeletingId(id);
        try {
            await mutate(id);
        } finally {
            setDeletingId(null);
        }
    };

    return {
        remove,
        deletingId,
        error,
        clearError,
    };
}
