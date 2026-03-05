'use client';

import {useAuth} from '@/app/context/AuthContext';
import React from 'react';
import Header from '@/components/header/Header';
import {
    ArrowRight,
    FileText,
    Mail,
    Loader2,
    MessageSquare,
    FileSearch,
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const {user, loading} = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <>
            <Header />

            <main className="max-w-4xl mx-auto p-6">
                {!user ? (
                    <>
                        <h1 className="text-3xl font-bold mb-6">Home</h1>
                        <p className="text-gray-600 mb-4">
                            Dobrodošao! Da bi video celu aplikaciju molimo da se
                            prijaviš ili registruješ.
                        </p>
                        <section className="p-4 rounded border bg-gray-50 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold mb-2">
                                Public teaser
                            </h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Ovo je ograničeni sadržaj koji svi vide. Prijavi
                                se da bi pristupio kompletnom sadržaju.
                            </p>
                        </section>
                    </>
                ) : (
                    <div className="space-y-8">
                        {/* Welcome */}
                        <div>
                            <h1 className="text-3xl font-bold mb-1">
                                Dobrodošao nazad,{' '}
                                <span className="text-blue-600 dark:text-blue-400">
                                    {user.email.split('@')[0]}
                                </span>
                                ! 👋
                            </h1>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">
                                Izaberi šta želiš da radiš danas.
                            </p>
                        </div>

                        {/* Feature cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Resume */}
                            <Link
                                href="/resume"
                                className="group flex flex-col gap-4 rounded-xl border bg-white dark:bg-gray-900 p-6 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base mb-1">
                                        Moji CV-jevi
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Kreiraj, uredi i upravljaj svojim
                                        CV-jevima.
                                    </p>
                                </div>
                            </Link>

                            {/* Cover Letter */}
                            <Link
                                href="/cover-letter"
                                className="group flex flex-col gap-4 rounded-xl border bg-white dark:bg-gray-900 p-6 hover:border-purple-400 dark:hover:border-purple-600 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center">
                                        <Mail className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-purple-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base mb-1">
                                        Moja Propratna Pisma
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Kreiraj, uredi i upravljaj svojim
                                        propratnim pismima.
                                    </p>
                                </div>
                            </Link>

                            {/* Interview Sessions */}
                            <Link
                                href="/interview-session"
                                className="group flex flex-col gap-4 rounded-xl border bg-white dark:bg-gray-900 p-6 hover:border-green-400 dark:hover:border-green-600 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                                        <MessageSquare className="w-5 h-5 text-green-500" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base mb-1">
                                        Intervju Simulator
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Vežbaj intervjue i dobij AI povratne
                                        informacije.
                                    </p>
                                </div>
                            </Link>

                            {/* Job Descriptions    */}
                            <Link
                                href="/job-description"
                                className="group flex flex-col gap-4 rounded-xl border bg-white dark:bg-gray-900 p-6 hover:border-orange-400 dark:hover:border-orange-600 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center">
                                        <FileSearch className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base mb-1">
                                        Opisi Poslova
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Analiziraj opise poslova i uporedi sa
                                        svojim CV-jem.
                                    </p>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
