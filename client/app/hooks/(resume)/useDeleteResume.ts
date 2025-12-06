'use client'

import ResumeService from "@/app/services/resume.service";
import {useState} from "react";

export function useDeleteResume() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const remove = async (id: string) => {
        try {
            setLoading(true);
            await ResumeService.remove(id);
        } catch (err: any) {
            setError(err?.message || 'Delete failed');
            throw err;
        } finally {
            setLoading(false);
        }
    };


    return { remove, loading, error };
}