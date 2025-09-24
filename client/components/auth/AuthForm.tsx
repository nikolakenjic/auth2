'use client'

import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import {UseFormReturn} from "react-hook-form"
import Link from "next/link";

export type Field = {
    name: string
    label: string
    type?: "text" | "password" | "email"
    placeholder?: string
}

type AuthFormProps = {
    title: string
    form: UseFormReturn<any>
    onSubmit: (values: any) => Promise<void>
    submitText: string
    loading?: boolean
    fields: Field[]
    secondaryAction?: {
        text: string
        linkText: string
        href: string
    }
    forgotPassword?: {
        text: string
        href: string
    }
}

export function AuthForm({
                             title,
                             form,
                             onSubmit,
                             submitText,
                             loading,
                             fields,
                             secondaryAction,
                             forgotPassword
                         }: AuthFormProps) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    {title}
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {fields.map((field) => (
                            <FormField
                                key={field.name}
                                control={form.control}
                                name={field.name}
                                render={({field: f}) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            <Input type={field.type ?? "text"}
                                                   placeholder={field.placeholder}  {...f} />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        ))}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? `${submitText}...` : submitText}
                        </Button>
                    </form>
                </Form>

                {forgotPassword && (
                    <div className="text-center">
                        <Link href={forgotPassword.href} className="text-sm text-blue-500 hover:underline">
                            {forgotPassword.text}
                        </Link>
                    </div>
                )}

                {secondaryAction && (
                    <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                        {secondaryAction.text}{" "}
                        <Link href={secondaryAction.href} className="text-blue-500 hover:underline">
                            {secondaryAction.linkText}
                        </Link>
                    </div>
                )}
            </div>
        </div>

    )
}
