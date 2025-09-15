'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import AuthService from "@/app/services/api-client/auth.service";
import {registerSchema} from "@/app/lib/validations/auth";
import {AuthForm, Field} from "@/components/auth/AuthForm";


type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    const registerFields: Field[] = [
        {name: "email", label: "Email", type: "email"},
        {name: "password", label: "Password", type: "password"},
        {name: "confirmPassword", label: "Confirm Password", type: "password"},
    ]


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

            const response = await AuthService.register(values)

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

                <AuthForm
                    form={form}
                    onSubmit={onSubmit}
                    submitText="Register"
                    loading={loading}
                    fields={registerFields}
                />

            </div>
        </div>
    )
}
