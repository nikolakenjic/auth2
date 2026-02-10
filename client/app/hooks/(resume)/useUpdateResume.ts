'use client'

import ResumeService from '@/app/services/resume.service';
import {UpdateResumeInput} from '@/app/types/resume.types';
import {useApiMutation} from "@/app/hooks/useApiMutation";

type UpdateVariables = {
    id: string;
    data: UpdateResumeInput;
}

export function useUpdateResume() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async ({id, data}: UpdateVariables) => {
            const res = await ResumeService.update(id, data);
            return res.resume
        }
    )

    return {
        update: mutate,
        loading,
        error,
        clearError,
    }

}