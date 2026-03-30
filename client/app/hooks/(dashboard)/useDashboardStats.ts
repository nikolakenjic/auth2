'use client';

import {useEffect, useState} from 'react';
import ResumeService from '@/app/services/resume.service';
import CoverLetterService from '@/app/services/coverLetter.service';
import InterviewSessionService from '@/app/services/interviewSession.service';
import JobDescriptionService from '@/app/services/jobDescription.service';

export interface DashboardStats {
    resumes: number;
    coverLetters: number;
    interviewSessions: number;
    jobDescriptions: number;
}

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats>({
        resumes: 0,
        coverLetters: 0,
        interviewSessions: 0,
        jobDescriptions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const [resumes, coverLetters, sessions, jobDescriptions] =
                    await Promise.allSettled([
                        ResumeService.getAll(),
                        CoverLetterService.getAll(),
                        InterviewSessionService.getAll(),
                        JobDescriptionService.getAll(),
                    ]);

                setStats({
                    resumes:
                        resumes.status === 'fulfilled'
                            ? (resumes.value.resumes?.length ?? 0)
                            : 0,
                    coverLetters:
                        coverLetters.status === 'fulfilled'
                            ? (coverLetters.value.coverLetters?.length ?? 0)
                            : 0,
                    interviewSessions:
                        sessions.status === 'fulfilled'
                            ? (sessions.value.sessions?.length ?? 0)
                            : 0,
                    jobDescriptions:
                        jobDescriptions.status === 'fulfilled'
                            ? (jobDescriptions.value.jobDescriptions?.length ??
                              0)
                            : 0,
                });
            } catch (err) {
                console.error('Failed to fetch dashboard stats', err);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return {stats, loading};
}
