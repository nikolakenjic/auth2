'use client';

import {useAuth} from '@/app/context/AuthContext';
import React from 'react';
import Header from '@/components/header/Header';
import {ArrowRight, FileText, Loader2} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
    const {user, loading} = useAuth();
    console.log(user);

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
                <h1 className="text-3xl font-bold mb-6">Home</h1>
                {!user ? (
                    <>
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

                            {/* Placeholder for future features */}
                            <div className="flex flex-col gap-4 rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-6 opacity-50 cursor-not-allowed">
                                <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                    <span className="text-lg">🚀</span>
                                </div>
                                <div>
                                    <h2 className="font-semibold text-base mb-1">
                                        Uskoro...
                                    </h2>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Nove funkcije su u pripremi.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}
