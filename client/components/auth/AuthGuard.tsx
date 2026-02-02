'use client'

import {useAuth} from "@/app/context/AuthContext";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AuthGuard({children}: { children: React.ReactNode }) {
    const {user, loading} = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login")
        }
    }, [loading, user, router])

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin"/>
            </div>
        )
    }

    if (!user) return null;

    return <>{children}</>
}