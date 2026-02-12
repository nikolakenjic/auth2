'use client'

import CoverLetterService from '@/app/services/coverLetter.service';
import {CreateCoverLetterInput} from '@/app/types/coverLetter.types';
import {useApiMutation} from "@/app/hooks/useApiMutation";


export function useCreateCoverLetter() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (data: CreateCoverLetterInput) => {
            const res = await CoverLetterService.create(data);
            return res.coverLetter;
        }
    );

    return {
        create: mutate,
        loading,
        error,
        clearError
    };
}