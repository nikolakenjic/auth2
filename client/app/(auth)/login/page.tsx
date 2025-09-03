"use client";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import AuthService, {LoginUserData} from "@/app/services/api-client/auth.service";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").max(50),
    password: z.string().min(6, "Password must be at least 6 characters").max(50),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            const payload: LoginUserData = {
                email: values.email,
                password: values.password,
            }

            const response = await AuthService.login(payload);

            router.push('/')
        } catch (err) {
            console.error("Login failed", err);
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div
                className="w-full max-w-md space-y-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 shadow-lg bg-white dark:bg-gray-800">
                <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
                    Login
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

                        {/* Submit button */}
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Logging in..." : "Login"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
