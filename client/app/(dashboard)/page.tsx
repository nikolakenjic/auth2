'use client'

import {useAuth} from "@/app/context/AuthContext";
import React from "react";
import Header from "@/components/header/Header";
import {Loader2} from "lucide-react";
import {CredentialResponse, GoogleLogin} from "@react-oauth/google";


export default function Home() {
    const {user, loading, googleLogin} = useAuth()
    console.log(user)

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-6 w-6 animate-spin text-blue-500"/>
            </div>
        );
    }

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        try {
            const token = credentialResponse.credential
            if (!token) {
                console.error("Google token not found");
                return;
            }

            const user = await googleLogin(token)

            console.log('Google user', user)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <Header/>

            <GoogleLogin onSuccess={handleSuccess} />

            <main className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">Home</h1>
                {!user ? (
                    <>
                        <p className="text-gray-600 mb-4">
                            Dobrodošao! Da bi video celu aplikaciju molimo da se prijaviš ili registruješ.
                        </p>


                        <section className="p-4 rounded border bg-gray-50 dark:bg-gray-800">
                            <h2 className="text-xl font-semibold mb-2">Public teaser</h2>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Ovo je ograničeni sadržaj koji svi vide. Prijavi se da bi pristupio kompletnom sadržaju.
                            </p>
                        </section>
                    </>
                ) : (
                    <>
                        <p className="text-gray-700 mb-4">Dobrodošao nazad, <strong>{user.email.split('@')[0]}</strong>!
                        </p>

                        <section className="grid gap-4">
                            <div className="p-4 rounded border">Full content card #1</div>
                            <div className="p-4 rounded border">Full content card #2</div>
                            <div className="p-4 rounded border">Full content card #3</div>
                        </section>
                    </>
                )}
            </main>
        </>
    );
}
