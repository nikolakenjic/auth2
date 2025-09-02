'use client'

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form"
import UserService, {RegisterUserData} from "@/app/services/api-client/user.service";

const registerSchema = z.object({
    email: z.string().min(1).max(50),
    password: z.string().min(6).max(50),
    confirmPassword: z.string().min(6).max(50),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type RegisterFormValues = z.infer<typeof registerSchema>;


export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    const onSubmit = async (values: RegisterFormValues) => {
        try {
            setLoading(true)
            const payload: RegisterUserData = {
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
            }
            const response = await UserService.register(payload)

            router.push('/')
        } catch (err) {
            console.error('Registration failed', err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Create Account
                </h1>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Confirm Password */}
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input type="password" placeholder="********" {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        {/* Submit dugme */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
