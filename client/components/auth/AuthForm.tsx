'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { UseFormReturn } from "react-hook-form"

export type Field = {
    name: string
    label: string
    type?: "text" | "password" | "email"
}

type AuthFormProps = {
    form: UseFormReturn<any>
    onSubmit: (values: any) => Promise<void>
    submitText: string
    loading?: boolean
    fields: Field[]
}

export function AuthForm({ form, onSubmit, submitText, loading, fields }: AuthFormProps) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field) => (
                    <FormField
                        key={field.name}
                        control={form.control}
                        name={field.name}
                        render={({ field: f }) => (
                            <FormItem>
                                <FormLabel>{field.label}</FormLabel>
                                <FormControl>
                                    <Input type={field.type ?? "text"} {...f} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                ))}

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? `${submitText}...` : submitText}
                </Button>
            </form>
        </Form>
    )
}
