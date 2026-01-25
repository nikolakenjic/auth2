import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import {GoogleOAuthProvider} from '@react-oauth/google'
import {AuthProvider} from "@/app/context/AuthContext";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "AI Resume & Interview Coach",
    description: "AI Resume & Interview Coach - full-stack MERN app",
};

// const CLIENT_ID = '622547765919-k2mh07dnvdm3strqp91oul51jmetpvb1.apps.googleusercontent.com'
const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

if (!CLIENT_ID) throw new Error('Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID');

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </GoogleOAuthProvider>
        </body>
        </html>
    );
}
