'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import {UseFormReturn} from 'react-hook-form';
import Link from 'next/link';
import {Mail} from 'lucide-react';
import {useAuth} from '@/app/context/AuthContext';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';

export type Field = {
    name: string;
    label: string;
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
};

type AuthFormProps = {
    title: string;
    form: UseFormReturn<any>;
    onSubmitAction: (values: any) => Promise<void>;
    submitText: string;
    loading?: boolean;
    fields: Field[];
    secondaryAction?: {
        text: string;
        linkText: string;
        href: string;
    };
    forgotPassword?: {
        text: string;
        href: string;
    };
    unverifiedEmail?: string | null;
    onGoogleSuccessAction?: (CredentialResponse: CredentialResponse) => void;
};

export function AuthForm({
                             title,
                             form,
                             onSubmitAction,
                             submitText,
                             loading,
                             fields,
                             secondaryAction,
                             forgotPassword,
                             unverifiedEmail,
                             onGoogleSuccessAction,
                         }: AuthFormProps) {
    const {resendVerificationEmail} = useAuth();

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    {title}
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-4">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({field: f}) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input
                                                type={field.type ?? 'text'}
                                                placeholder={field.placeholder}
                                                {...f}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        {form.formState.errors.root && (
                            <p className="text-red-500 text-sm">
                                {form.formState.errors.root.message}
                            </p>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? `${submitText}...` : submitText}
                        </Button>
                    </form>
                </Form>

                {/* --- Google Login Button --- */}
                {onGoogleSuccessAction && (
                    <div className="mt-6">
                        {/* Divider */}
                        <div className="relative mb-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-gray-300 dark:border-gray-700"></span>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-gray-800 px-2 text-gray-500 dark:text-gray-400">
                  or continue with
                </span>
                            </div>
                        </div>

                        {/* Google Login Button */}
                        <div className="flex justify-center">
                            <GoogleLogin onSuccess={onGoogleSuccessAction}/>
                        </div>
                    </div>
                )}

                {unverifiedEmail && (
                    <div
                        className="mt-4 rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm flex items-center justify-between">
                        <div className="flex gap-2">
                            <Mail className="w-5 h-5 text-gray-600 dark:text-gray-300"/>
                            <span>Didn’t get the email?</span>
                        </div>
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={async () => {
                                if (!unverifiedEmail) return;
                                await resendVerificationEmail(unverifiedEmail);
                                console.log('send resend email', unverifiedEmail);
                            }}
                        >
                            Resend
                        </Button>
                    </div>
                )}

                {forgotPassword && (
                    <div className="text-center">
                        <Link
                            href={forgotPassword.href}
                            className="text-sm text-blue-500 hover:underline"
                        >
                            {forgotPassword.text}
                        </Link>
                    </div>
                )}

                {secondaryAction && (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        {secondaryAction.text}{' '}
                        <Link
                            href={secondaryAction.href}
                            className="text-blue-500 hover:underline"
                        >
                            {secondaryAction.linkText}
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
