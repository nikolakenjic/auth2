'use client'

import {useCallback, useEffect, useState} from "react";
import {CoverLetter} from "@/app/types/coverLetter.types";
import CoverLetterService from "@/app/services/coverLetter.service";

export function useCoverLetters() {
    const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCoverLetters = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await CoverLetterService.getAll()
            setCoverLetters(res.coverLetters || [])
        } catch (err: any) {
            console.error(err)
            const message = err?.response?.data?.message || err?.message || 'Failed to load cover letters';
            setError(message)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchCoverLetters()
    }, [fetchCoverLetters])

    return {
        coverLetters,
        loading,
        error,
        refetch: fetchCoverLetters,
        setCoverLetters
    }
}