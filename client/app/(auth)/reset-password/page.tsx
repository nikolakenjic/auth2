"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AuthForm, Field } from "@/components/auth/AuthForm"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import {useAuth} from "@/app/context/AuthContext";


const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export default function ResetPasswordPage() {
    const {resetPasswordChange} = useAuth()
    const [loading, setLoading] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    // 👇 pick up the verificationCode from query string
    const verificationCode = searchParams.get("code")
    const exp = Number(searchParams.get("exp"))
    const now = Date.now();
    const linkIsValid = verificationCode && exp && exp > now;

    console.log(linkIsValid)

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const fields: Field[] = [
        { name: "password", label: "New Password", type: "password", placeholder: "Enter new password" },
        { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm new password" },
    ]

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!verificationCode) {
            form.setError("password", { message: "Invalid or missing verification code" })
            return
        }

        try {
            setLoading(true)

            await resetPasswordChange({
                password: values.password,
                verificationCode
            })
            // ✅ after success, redirect to login
            router.push("/login")
        } catch (error: any) {
            const message = error.response?.data?.message || "Something went wrong"
            form.setError("password", { message })
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthForm
            title="Reset Password"
            form={form}
            onSubmit={onSubmit}
            submitText="Reset Password"
            loading={loading}
            fields={fields}
        />
    )
}
