'use client'

import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {registerSchema} from "@/app/lib/validations/auth";
import {AuthForm, Field} from "@/components/auth/AuthForm";
import {useAuth} from "@/app/context/AuthContext";


type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter()
    const {register: registerUser} = useAuth()
    const [loading, setLoading] = useState(false)

    const registerFields: Field[] = [
        {name: "email", label: "Email", type: "email", placeholder: "Enter your email"},
        {name: "password", label: "Password", type: "password", placeholder: "Enter your password"},
        {name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm Password"},
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
            await registerUser(values)
            router.push('/email/verify')
        } catch (err) {
            console.error('Registration failed', err)
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthForm
            title='Create Account'
            form={form}
            onSubmit={onSubmit}
            submitText="Register"
            loading={loading}
            fields={registerFields}
            secondaryAction={{
                text: "Already have an account?",
                linkText: "Login",
                href: "/login"
            }}
        />

    )
}
