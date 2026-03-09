'use client';

import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {AuthForm, Field} from '@/components/auth/AuthForm';
import {useState} from 'react';
import {useSearchParams, useRouter} from 'next/navigation';
import {useAuth} from '@/app/context/AuthContext';
import {AlertCircle} from 'lucide-react';
import {toast} from 'sonner';
import {AxiosError} from 'axios';
import AuthStatusCard from '@/components/auth/AuthStatusCard';

const resetPasswordSchema = z
    .object({
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string().min(6, 'Confirm password is required'),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
    const {resetPasswordChange} = useAuth();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const verificationCode = searchParams.get('code');
    const exp = Number(searchParams.get('exp'));
    const now = Date.now();
    const linkIsValid = verificationCode && exp && exp > now;

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const fields: Field[] = [
        {
            name: 'password',
            label: 'New Password',
            type: 'password',
            placeholder: 'Enter new password',
        },
        {
            name: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            placeholder: 'Confirm new password',
        },
    ];

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!verificationCode) {
            form.setError('root', {
                message: 'Invalid or missing verification code',
            });
            toast.error('Invalid reset link');
            return;
        }

        try {
            setLoading(true);
            await resetPasswordChange({
                password: values.password,
                verificationCode,
            });
            toast.success('Password changed successfully, please log in');

            router.replace('/login');
        } catch (error: any) {
            let message = 'Something went wrong';

            if (error instanceof AxiosError) {
                message = error.response?.data?.message || message;
            }
            form.setError('root', {message});
        } finally {
            setLoading(false);
        }
    };

    if (!linkIsValid) {
        return (
            <AuthStatusCard
                icon={AlertCircle}
                variant="error"
                message="Invalid or expired reset link"
                description="Please request a new reset link."
                linkText="Request new reset link"
                linkHref="/forgot-password"
            />
        );
    }

    return (
        <AuthForm
            title="Reset Password"
            form={form}
            onSubmitAction={onSubmit}
            submitText="Reset Password"
            loading={loading}
            fields={fields}
        />
    );
}
