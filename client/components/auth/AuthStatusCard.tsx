import Link from 'next/link';
import {Sparkles, LucideIcon} from 'lucide-react';

interface AuthStatusCardProps {
    icon: LucideIcon;
    message: string;
    description: string;
    linkText: string;
    linkHref: string;
    variant: 'success' | 'error' | 'info';
}

const variantStyles = {
    success: 'bg-green-500/10 border-green-500/20 text-green-400',
    error: 'bg-red-500/10 border-red-500/20 text-red-400',
    info: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
};

export default function AuthStatusCard({
    icon: Icon,
    message,
    description,
    linkText,
    linkHref,
    variant,
}: AuthStatusCardProps) {
    return (
        <div className="flex h-screen items-center justify-center bg-slate-950">
            <div className="flex flex-col items-center gap-6 text-center max-w-md w-full px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-base font-bold text-white tracking-tight">
                        Career<span className="text-indigo-500">Forge</span>
                    </span>
                </Link>

                {/* Status box */}
                <div
                    className={`flex items-center gap-2 p-4 rounded-xl border ${variantStyles[variant]}`}
                >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="text-sm">{message}</span>
                </div>

                <p className="text-sm text-slate-400">{description}</p>

                <Link
                    href={linkHref}
                    className="text-sm text-indigo-500 hover:text-indigo-600 font-medium"
                >
                    {linkText} →
                </Link>
            </div>
        </div>
    );
}
