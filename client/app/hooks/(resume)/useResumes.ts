'use client'

import {useEffect, useState} from "react";
import {Resume} from "@/app/types/resume.types";
import ResumeService from "@/app/services/resume.service";

export function useResumes() {
    const [resumes, setResumes] = useState<Resume[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchResumes = async () => {
        try {
            setLoading(true);
            const res = await ResumeService.getAll()

            setResumes(res.resumes || [])
        } catch (error) {
            console.error(error)
            setError('Failed to load resumes')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchResumes()
    }, [])

    return {
        resumes,
        loading,
        error,
        fetchResumes,
        setResumes
    }
}