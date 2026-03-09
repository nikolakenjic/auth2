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
import {
    Mail,
    Sparkles,
    FileText,
    MessageSquare,
    FileSearch,
} from 'lucide-react';
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

const highlights = [
    {icon: FileText, text: 'AI-powered resume builder'},
    {icon: FileSearch, text: 'Job description analyzer'},
    {icon: MessageSquare, text: 'Interview simulator with feedback'},
    {icon: Mail, text: 'Cover letter generator'},
];

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
        <div className="flex h-screen overflow-hidden">
            {/* ── Left panel (branding) ── */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-950 flex-col justify-between p-12">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-bold text-white tracking-tight">
                        Career<span className="text-indigo-500">Forge</span>
                    </span>
                </Link>

                {/* Headline */}
                <div>
                    <h2 className="text-3xl font-bold text-white mb-3 leading-snug">
                        Your AI-powered
                        <br />
                        <span className="text-indigo-500">career coach.</span>
                    </h2>
                    <p className="text-slate-400 text-sm mb-8">
                        Everything you need to land your next job — in one
                        place.
                    </p>
                    <div className="space-y-3">
                        {highlights.map(({icon: Icon, text}) => (
                            <div key={text} className="flex items-center gap-3">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                                    <Icon className="w-3.5 h-3.5 text-indigo-400" />
                                </div>
                                <span className="text-sm text-slate-300">
                                    {text}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <p className="text-xs text-slate-600">
                    © {new Date().getFullYear()} CareerForge. All rights
                    reserved.
                </p>
            </div>

            {/* ── Right panel (form) ── */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-8 py-12 bg-white dark:bg-slate-900">
                {/* Mobile logo */}
                <Link
                    href="/"
                    className="flex items-center gap-2 mb-8 lg:hidden"
                >
                    <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-bold tracking-tight">
                        Career<span className="text-indigo-500">Forge</span>
                    </span>
                </Link>

                <div className="w-full max-w-sm">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        {title}
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                        {secondaryAction
                            ? `${secondaryAction.text} `
                            : 'Welcome back!'}
                        {secondaryAction && (
                            <Link
                                href={secondaryAction.href}
                                className="text-indigo-500 hover:text-indigo-600 font-medium"
                            >
                                {secondaryAction.linkText}
                            </Link>
                        )}
                    </p>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmitAction)}
                            className="space-y-4"
                        >
                            {fields.map((field) => (
                                <FormField
                                    key={field.name}
                                    control={form.control}
                                    name={field.name}
                                    render={({field: f}) => (
                                        <FormItem>
                                            <FormLabel className="text-slate-700 dark:text-slate-300">
                                                {field.label}
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    type={field.type ?? 'text'}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    {...f}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            ))}

                            {form.formState.errors.root && (
                                <p className="text-red-500 text-sm">
                                    {form.formState.errors.root.message}
                                </p>
                            )}

                            {forgotPassword && (
                                <div className="text-right">
                                    <Link
                                        href={forgotPassword.href}
                                        className="text-xs text-indigo-500 hover:text-indigo-600"
                                    >
                                        {forgotPassword.text}
                                    </Link>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                disabled={loading}
                            >
                                {loading ? `${submitText}...` : submitText}
                            </Button>
                        </form>
                    </Form>

                    {/* Google Login */}
                    {onGoogleSuccessAction && (
                        <div className="mt-5">
                            <div className="relative mb-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-slate-200 dark:border-slate-700" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white dark:bg-slate-900 px-2 text-slate-400">
                                        or continue with
                                    </span>
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <GoogleLogin
                                    onSuccess={onGoogleSuccessAction}
                                />
                            </div>
                        </div>
                    )}

                    {/* Unverified email */}
                    {unverifiedEmail && (
                        <div className="mt-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm flex items-center justify-between">
                            <div className="flex gap-2 items-center">
                                <Mail className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-600 dark:text-slate-300">
                                    Didn&apos;t get the email?
                                </span>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                onClick={async () => {
                                    if (!unverifiedEmail) return;
                                    await resendVerificationEmail(
                                        unverifiedEmail,
                                    );
                                }}
                            >
                                Resend
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
