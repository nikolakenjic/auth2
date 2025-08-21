import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

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
    const form = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })


    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-md space-y-4 rounded-2xl border p-6 shadow">
                <h1 className="text-2xl font-bold text-center">Register</h1>

                <Input type="email" placeholder="Your email"/>
                <Input type="password" placeholder="Your password"/>

                <Button className="w-full" variant='outline'>Register</Button>
            </div>
        </div>
    )
}
