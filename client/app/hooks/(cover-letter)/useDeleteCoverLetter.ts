'use client';

import CoverLetterService from '@/app/services/coverLetter.service';
import {useApiMutation} from '@/app/hooks/useApiMutation';
import {useState} from 'react';

export function useDeleteCoverLetter() {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const {mutate, error, clearError} = useApiMutation(async (id: string) => {
        await CoverLetterService.remove(id);
    });

    const remove = async (id: string) => {
        setDeletingId(id);
        try {
            await mutate(id);
        } finally {
            setDeletingId(null);
        }
    };

    return {remove, deletingId, error, clearError};
}
