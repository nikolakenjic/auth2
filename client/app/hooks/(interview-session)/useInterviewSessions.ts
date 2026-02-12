'use client'

import {useCallback, useEffect, useState} from "react";
import {InterviewSession} from "@/app/types/interviewSession.types";
import InterviewSessionService from "@/app/services/interviewSession.service";

export function useInterviewSessions() {
    const [sessions, setSessions] = useState<InterviewSession[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSessions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await InterviewSessionService.getAll()
            setSessions(res.sessions || [])
        } catch (err: any) {
            console.error(err)
            const message = err?.response?.data?.message || err?.message || 'Failed to load interview sessions';
            setError(message)
        } finally {
            setLoading(false)
        }
    }, []);

    useEffect(() => {
        fetchSessions()
    }, [fetchSessions])

    return {
        sessions,
        loading,
        error,
        refetch: fetchSessions,
        setSessions
    }
}