'use client';

import {useState} from 'react';
import JobDescriptionService from '@/app/services/jobDescription.service';
import {useApiMutation} from '@/app/hooks/useApiMutation';

export function useDeleteJobDescription() {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const {mutate, error, clearError} = useApiMutation(async (id: string) => {
        await JobDescriptionService.remove(id);
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
