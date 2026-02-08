import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";

export default function ProtectedLayout(
    {children}: { children: React.ReactNode }
) {
    return <AuthGuard>{children}</AuthGuard>
}