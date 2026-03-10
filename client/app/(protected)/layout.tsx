'use client';

import AuthGuard from '@/components/auth/AuthGuard';
import React from 'react';
import {ModalProvider} from '@/app/context/ModalContext';
import Header from '@/components/header/Header';

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <ModalProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="flex-1">{children}</main>
                </div>
            </ModalProvider>
        </AuthGuard>
    );
}
