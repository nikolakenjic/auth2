'use client'

import ResumeService from "@/app/services/resume.service";
import {useState} from "react";

export function useDeleteResume() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const remove = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            await ResumeService.remove(id);
        } catch (err: any) {
            const message = err?.response?.data?.message || err?.message || 'Delete failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => setError(null);

    return {remove, loading, error};
}