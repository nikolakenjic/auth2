"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { CheckCircle, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/app/context/AuthContext"

export default function VerifyEmailPage() {
    const { code } = useParams<{ code: string }>()
    const { verifyEmail } = useAuth()

    const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
    const [message, setMessage] = useState("")

    useEffect(() => {
        if (!code) return

        const verify = async () => {
            try {
                const res = await verifyEmail(code)
                setStatus("success")
                setMessage(res.message || "Email verified successfully")
            } catch (error: any) {
                setStatus("error")
                setMessage(error.response?.data?.message || "Invalid or expired verification link")
            }
        }

        verify()
    }, [code, verifyEmail])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="max-w-md w-full px-6 py-12 text-center">
                {status === "loading" && <p>Verifying email...</p>}

                {status === "success" && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-100 text-green-600">
                            <CheckCircle className="h-6 w-6" />
                            <span>{message}</span>
                        </div>
                        <Link href="/login" className="text-blue-500 underline">
                            Go to login
                        </Link>
                    </div>
                )}

                {status === "error" && (
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-100 text-red-600">
                            <AlertCircle className="h-6 w-6" />
                            <span>{message}</span>
                        </div>
                        <Link href="/register" className="text-blue-500 underline">
                            Create a new account
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
