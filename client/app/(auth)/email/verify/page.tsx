"use client";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function VerifyNoticePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="max-w-md w-full px-6 py-12 text-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 p-4 rounded-xl bg-green-100 text-green-600">
                        <CheckCircle className="h-6 w-6" />
                        <span>
              Registration successful! <br />
              Please verify your email before logging in.
            </span>
                    </div>
                    <Link
                        href="/login"
                        className="mt-4 text-blue-500 underline"
                    >
                        Go to login
                    </Link>
                </div>
            </div>
        </div>
    );
}
