import {ArrowRight, LucideIcon} from 'lucide-react';
import Link from 'next/link';

interface DashboardFeatureCardProps {
    href: string;
    icon: LucideIcon;
    title: string;
    description: string;
    iconBg: string;
    iconColor: string;
    hoverBorder: string;
    arrowHover: string;
    count?: number;
    loading?: boolean;
}

export default function DashboardFeatureCard({
    href,
    icon: Icon,
    title,
    description,
    iconBg,
    iconColor,
    hoverBorder,
    arrowHover,
    count,
    loading,
}: DashboardFeatureCardProps) {
    return (
        <Link
            href={href}
            className={`group flex flex-col gap-4 rounded-xl border bg-white dark:bg-slate-900 p-6 ${hoverBorder} hover:shadow-md transition-all duration-200`}
        >
            <div className="flex items-center justify-between">
                <div
                    className={`w-10 h-10 rounded-lg ${iconBg} flex items-center justify-center`}
                >
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div className="flex items-center gap-2">
                    {!loading && count !== undefined && (
                        <span
                            className={`text-xs font-semibold px-2 py-0.5 rounded-full ${iconBg} ${iconColor}`}
                        >
                            {count}
                        </span>
                    )}
                    {loading && (
                        <span className="w-8 h-4 bg-slate-100 dark:bg-slate-800 rounded-full animate-pulse" />
                    )}
                    <ArrowRight
                        className={`w-4 h-4 text-slate-300 ${arrowHover} group-hover:translate-x-1 transition-all`}
                    />
                </div>
            </div>
            <div>
                <h2 className="font-semibold text-sm text-slate-900 dark:text-white mb-1">
                    {title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                    {description}
                </p>
            </div>
        </Link>
    );
}
