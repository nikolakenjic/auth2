import AuthGuard from "@/components/auth/AuthGuard";
import React from "react";
import {ModalProvider} from "@/app/context/ModalContext";

export default function ProtectedLayout(
    {children}: { children: React.ReactNode }
) {
    return (
        <AuthGuard>
            <ModalProvider>
                {children}
            </ModalProvider>
        </AuthGuard>
    )
}