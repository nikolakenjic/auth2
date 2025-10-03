"use client";

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {AuthForm, Field} from "@/components/auth/AuthForm";
import {loginSchema} from "@/app/lib/validations/auth";
import {useAuth} from "@/app/context/AuthContext";
import {AxiosError} from "axios";


type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter();
    const {login: loginUser} = useAuth()
    const [loading, setLoading] = useState(false);
    const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null)

    const loginFields: Field[] = [
        {name: "email", label: "Email", type: "email", placeholder: "Enter your email"},
        {name: "password", label: "Password", type: "password", placeholder: "Enter your password"},
    ]

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = async (values: LoginFormValues) => {
        try {
            setLoading(true);
            await loginUser(values);
            router.push('/')
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                console.error("Login failed", err.response?.data);
                const errorMessage = err.response?.data?.message || "Something went wrong";

                if (errorMessage.includes("verify your email")) {
                    setUnverifiedEmail(values.email);
                }

                form.setError("root", {
                    type: "server",
                    message: errorMessage,
                });
            } else {
                console.error("Unexpected error", err);
                form.setError("root", {
                    type: "server",
                    message: "Unexpected error occurred",
                });
            }
        } finally {
            setLoading(false);
        }
    }


    return (
        <AuthForm
            title="Login"
            form={form}
            onSubmit={onSubmit}
            submitText="Login"
            loading={loading}
            fields={loginFields}
            secondaryAction={{
                text: "Don't have an account?",
                linkText: "Register",
                href: "/register"
            }}
            forgotPassword={{
                text: "Forgot your password?",
                href: "/forgot-password"
            }}
            unverifiedEmail={unverifiedEmail}
        />
    )
}
