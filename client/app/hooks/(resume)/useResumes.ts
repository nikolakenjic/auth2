'use client'

import {useCallback, useEffect, useState} from "react";
import {Resume} from "@/app/types/resume.types";
import ResumeService from "@/app/services/resume.service";

export function useResumes() {
    const [resumes, setResumes] = useState<Resume[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchResumes = useCallback(async () => { // ✅ useCallback fixes the type issue
        try {
            setLoading(true);
            setError(null);
            const res = await ResumeService.getAll()
            setResumes(res.resumes || [])
        } catch (err: any) {
            console.error(err)
            const message = err?.response?.data?.message || err?.message || 'Failed to load resumes';
            setError(message)
        } finally {
            setLoading(false)
        }
    }, []); // ✅ Empty deps array

    useEffect(() => {
        fetchResumes()
    }, [fetchResumes])

    return {
        resumes,
        loading,
        error,
        refetch: fetchResumes,
        setResumes
    }
}