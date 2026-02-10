'use client'

import ResumeService from "@/app/services/resume.service";
import {useApiMutation} from "@/app/hooks/useApiMutation";


export function useDeleteResume() {
    const {mutate, loading, error, clearError} = useApiMutation(
        async (id: string) => {
            await ResumeService.remove(id)
        }
    )

    return {
        remove: mutate,
        loading,
        error,
        clearError,
    }
}