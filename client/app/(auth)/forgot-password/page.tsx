"use client"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {AuthForm, Field} from "@/components/auth/AuthForm";
import {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";
import {toast} from "sonner";
import {AxiosError} from "axios";
import {useRouter} from "next/navigation";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
    const router = useRouter()
    const {sendPasswordReset} = useAuth()
    const [loading, setLoading] = useState(false);

    const form = useForm<ForgotPasswordValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })

    const fields: Field[] = [
        {name: "email", label: "Email", type: "email", placeholder: "Enter your email"},
    ]

    const onSubmit = async (values: ForgotPasswordValues) => {
        console.log("Forgot password request:", values)
        try {
            setLoading(true)
            await sendPasswordReset(values)
            toast.success('Reset link sent. Check your email.')
            form.reset()

            //     Redirect after 1s
            setTimeout(() => {
                router.push("/")
            }, 1000)
        } catch (error) {
            console.log(error)
            let message = 'Something went wrong'
            if (error instanceof AxiosError) {
                message = error.response?.data?.message || message
            }
            toast.error(message)

            form.setError('root', {type: 'server', message})
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthForm
            title="Forgot Password"
            form={form}
            onSubmitAction={onSubmit}
            submitText="Send reset link"
            loading={loading}
            fields={fields}
            secondaryAction={{
                text: "Remember your password?",
                linkText: "Login",
                href: "/login",
            }}
        />
    )
}
