"use client"

import {z} from "zod"
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod"
import {AuthForm, Field} from "@/components/auth/AuthForm";
import {useState} from "react";
import {useAuth} from "@/app/context/AuthContext";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})

type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordPage() {
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
            console.log('successfully sent')
            form.reset()
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthForm
            title="Forgot Password"
            form={form}
            onSubmit={onSubmit}
            submitText="Send reset link"
            loading={loading}
            fields={fields}
        />
    )
}
