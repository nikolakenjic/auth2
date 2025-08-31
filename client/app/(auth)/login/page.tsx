import { z } from "zod";

const loginSchema = z.object({
    email: z.string().min(1, "Email is required").max(50),
    password: z.string().min(6, "Password must be at least 6 characters").max(50),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
    return <>
        <h1>login</h1>
    </>
}
