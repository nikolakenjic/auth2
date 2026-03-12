'use client';

import {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {CheckCircle, AlertCircle, Loader2, Sparkles} from 'lucide-react';
import {useAuth} from '@/app/context/AuthContext';
import AuthStatusCard from '@/components/auth/AuthStatusCard';
import Link from 'next/link';

export default function VerifyEmailPage() {
    const {code} = useParams<{code: string}>();
    const {verifyEmail} = useAuth();

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>(
        'loading',
    );
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (!code) return;
        const verify = async () => {
            try {
                const res = await verifyEmail(code);
                setStatus('success');
                setMessage(res.message || 'Email verified successfully');
            } catch (error: any) {
                setStatus('error');
                setMessage(
                    error.response?.data?.message ||
                        'Invalid or expired verification link',
                );
            }
        };
        verify();
    }, [code, verifyEmail]);

    if (status === 'loading') {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center gap-3">
                    <Link href="/" className="flex items-center gap-2 mb-4">
                        <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-base font-bold text-white tracking-tight">
                            Career<span className="text-indigo-500">Forge</span>
                        </span>
                    </Link>
                    <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
                    <p className="text-sm text-slate-400">
                        Verifying your email...
                    </p>
                </div>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <AuthStatusCard
                icon={CheckCircle}
                variant="success"
                message={message}
                description="Your account is ready. You can now sign in."
                linkText="Go to login"
                linkHref="/login"
            />
        );
    }

    return (
        <AuthStatusCard
            icon={AlertCircle}
            variant="error"
            message={message}
            description="Try registering again or contact support."
            linkText="Create a new account"
            linkHref="/register"
        />
    );
}
