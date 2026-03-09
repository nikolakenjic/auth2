import {
    FileText,
    Mail,
    MessageSquare,
    FileSearch,
    Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import {Button} from '@/components/ui/button';

const landingFeatures = [
    {
        icon: FileText,
        title: 'AI Resume Builder',
        description:
            'Craft bullet points that beat ATS filters and impress recruiters.',
    },
    {
        icon: FileSearch,
        title: 'Job Description Analyzer',
        description:
            'Paste any job post — get instant keyword and skill gap analysis.',
    },
    {
        icon: MessageSquare,
        title: 'Interview Simulator',
        description:
            'Practice with an AI interviewer and get structured feedback.',
    },
    {
        icon: Mail,
        title: 'Cover Letter Generator',
        description:
            'Generate tailored cover letters in seconds from your resume.',
    },
];

export default function LandingHero() {
    return (
        <div className="h-full bg-slate-950 text-white flex flex-col items-center justify-center gap-8 px-6">
            {/* Hero */}
            <div className="text-center max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-5">
                    <Sparkles className="w-3 h-3" />
                    Powered by GPT-4
                </div>
                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 leading-tight">
                    Land your dream job
                    <span className="block text-indigo-500">
                        with AI on your side.
                    </span>
                </h1>
                <p className="text-slate-400 text-base max-w-xl mx-auto mb-6">
                    CareerForge helps you build stronger resumes, ace
                    interviews, and write cover letters — all powered by AI.
                </p>
                <div className="flex items-center justify-center gap-3">
                    <Link href="/register">
                        <Button
                            size="lg"
                            className="bg-indigo-500 hover:bg-indigo-600 text-white px-8"
                        >
                            Get Started Free
                        </Button>
                    </Link>
                    <Link href="/login">
                        <Button variant="secondary" size="lg">
                            Login
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-4xl w-full">
                {landingFeatures.map(({icon: Icon, title, description}) => (
                    <div
                        key={title}
                        className="p-4 rounded-xl border border-slate-800 bg-slate-900/50"
                    >
                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-3">
                            <Icon className="w-4 h-4 text-indigo-400" />
                        </div>
                        <h3 className="font-semibold text-white text-sm mb-1">
                            {title}
                        </h3>
                        <p className="text-xs text-slate-400">{description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
