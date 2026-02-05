'use client'

import {useState} from "react";

type MutationFunction<TData, TVariables> = (vvariables: TVariables) => Promise<TData>

export function useApiMutation<TData = any, TVariables = any>(
    mutationFn: MutationFunction<TData, TVariables>
) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const mutate = async (variables: TVariables): Promise<TData> => {
        try {
            setLoading(true);
            setError(null)
            return await mutationFn(variables)
        } catch (err: any) {
            const message =
                err?.response?.data?.message ||
                err?.message ||
                'Operation failed';
            setError(message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const clearError = () => setError(null);

    return {
        mutate, loading, error, clearError
    }
}