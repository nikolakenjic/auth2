"use client"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {AuthForm, Field} from "@/components/auth/AuthForm"
import {useState} from "react"
import {useSearchParams, useRouter} from "next/navigation"
import {useAuth} from "@/app/context/AuthContext"
import {AlertCircle} from "lucide-react"
import Link from "next/link"


const resetPasswordSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm password is required"),
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

    const verificationCode = searchParams.get("code")
    const exp = Number(searchParams.get("exp"))
    const now = Date.now()
    const linkIsValid = verificationCode && exp && exp > now

    const form = useForm<ResetPasswordValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    const fields: Field[] = [
        {
            name: "password",
            label: "New Password",
            type: "password",
            placeholder: "Enter new password",
        },
        {
            name: "confirmPassword",
            label: "Confirm Password",
            type: "password",
            placeholder: "Confirm new password",
        },
    ]

    const onSubmit = async (values: ResetPasswordValues) => {
        if (!verificationCode) {
            form.setError("password", {
                message: "Invalid or missing verification code",
            })
            return
        }

        try {
            setLoading(true)
            await resetPasswordChange({
                password: values.password,
                verificationCode,
            })
            router.push("/login")
        } catch (error: any) {
            const message =
                error.response?.data?.message || "Something went wrong"
            form.setError("password", {message})
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md w-full px-6 py-12">
                {linkIsValid ? (
                    <AuthForm
                        title="Reset Password"
                        form={form}
                        onSubmit={onSubmit}
                        submitText="Reset Password"
                        loading={loading}
                        fields={fields}
                    />
                ) : (
                    <div className="flex flex-col items-center gap-6 text-center">
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-100 text-red-600">
                            <AlertCircle className="h-6 w-6"/>
                            <span>Invalid or expired link</span>
                        </div>
                        <p className="text-gray-500">
                            The reset link is either invalid or has expired.
                        </p>
                        <Link href="/forgot-password" className="text-blue-500 underline">
                            Request a new password reset link
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
