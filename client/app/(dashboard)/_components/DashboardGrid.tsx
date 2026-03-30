import {
    FileText,
    Mail,
    MessageSquare,
    FileSearch,
    Trophy,
    Clock,
} from 'lucide-react';
import DashboardFeatureCard from './DashboardFeatureCard';
import {useDashboardStats} from '@/app/hooks/(dashboard)/useDashboardStats';

const features = [
    {
        href: '/resume',
        icon: FileText,
        title: 'My Resumes',
        description: 'Build, edit and manage AI-enhanced resumes.',
        iconBg: 'bg-indigo-50 dark:bg-indigo-900/20',
        iconColor: 'text-indigo-500',
        hoverBorder: 'hover:border-indigo-400 dark:hover:border-indigo-600',
        arrowHover: 'group-hover:text-indigo-500',
        statKey: 'resumes',
    },
    {
        href: '/cover-letter',
        icon: Mail,
        title: 'Cover Letters',
        description: 'Auto-generate cover letters tailored to each job.',
        iconBg: 'bg-purple-50 dark:bg-purple-900/20',
        iconColor: 'text-purple-500',
        hoverBorder: 'hover:border-purple-400 dark:hover:border-purple-600',
        arrowHover: 'group-hover:text-purple-500',
        statKey: 'coverLetters',
    },
    {
        href: '/interview-session',
        icon: MessageSquare,
        title: 'Interview Simulator',
        description: 'Practice interviews and get real AI feedback.',
        iconBg: 'bg-green-50 dark:bg-green-900/20',
        iconColor: 'text-green-500',
        hoverBorder: 'hover:border-green-400 dark:hover:border-green-600',
        arrowHover: 'group-hover:text-green-500',
        statKey: 'interviewSessions',
    },
    {
        href: '/job-description',
        icon: FileSearch,
        title: 'Job Descriptions',
        description: 'Analyze job posts and match them to your resume.',
        iconBg: 'bg-orange-50 dark:bg-orange-900/20',
        iconColor: 'text-orange-500',
        hoverBorder: 'hover:border-orange-400 dark:hover:border-orange-600',
        arrowHover: 'group-hover:text-orange-500',
        statKey: 'jobDescriptions',
    },
] as const;

interface DashboardGridProps {
    username: string;
}

export default function DashboardGrid({username}: DashboardGridProps) {
    const {stats, loading} = useDashboardStats();

    return (
        <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
            {/* Welcome */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                        Welcome back,{' '}
                        <span className="text-indigo-500 dark:text-indigo-400">
                            {username}
                        </span>{' '}
                        👋
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        What would you like to work on today?
                    </p>
                </div>
                <div className="hidden sm:flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Keep it up!</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>
                            {new Date().toLocaleDateString('en-US', {
                                weekday: 'long',
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    </div>
                </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                    <DashboardFeatureCard
                        key={feature.href}
                        {...feature}
                        count={stats[feature.statKey]}
                        loading={loading}
                    />
                ))}
            </div>
        </div>
    );
}
