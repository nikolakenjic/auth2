'use client';

import {useAuth} from '@/app/context/AuthContext';
import React from 'react';
import Header from '@/components/header/Header';
import LandingHero from './_components/LandingHero';
import DashboardGrid from './_components/DashboardGrid';
import {Loader2} from 'lucide-react';

export default function Home() {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-500" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-hidden">
                {user ? (
                    <DashboardGrid username={user.email.split('@')[0]} />
                ) : (
                    <LandingHero />
                )}
            </main>
        </div>
    );
}
