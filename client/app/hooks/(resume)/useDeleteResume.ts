'use client';

import ResumeService from '@/app/services/resume.service';
import {useApiMutation} from '@/app/hooks/useApiMutation';
import {useState} from 'react';

export function useDeleteResume() {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const {mutate, error, clearError} = useApiMutation(async (id: string) => {
        await ResumeService.remove(id);
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
