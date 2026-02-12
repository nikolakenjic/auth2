'use client'

import ResumeService from '@/app/services/resume.service';
import {CreateResumeInput} from '@/app/types/resume.types';
import {useApiMutation} from "@/app/hooks/useApiMutation";



export function useCreateResume() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (data: CreateResumeInput) => {
            const res = await ResumeService.create(data);
            return res.resume
        }
    )

    return {
        create: mutate,
        loading,
        error,
        clearError
    }
}