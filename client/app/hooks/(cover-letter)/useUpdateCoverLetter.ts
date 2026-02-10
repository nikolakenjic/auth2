'use client'

import CoverLetterService from '@/app/services/coverLetter.service';
import {UpdateCoverLetterInput} from '@/app/types/coverLetter.types';
import {useApiMutation} from '@/app/hooks/useApiMutation';

type UpdateVariables = {
    id: string;
    data: UpdateCoverLetterInput;
};

export function useUpdateCoverLetter() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async ({id, data}: UpdateVariables) => {
            const res = await CoverLetterService.update(id, data);
            return res.coverLetter;
        }
    );

    return {
        update: mutate,
        loading,
        error,
        clearError
    };
}