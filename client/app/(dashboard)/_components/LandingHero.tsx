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
        <div className="min-h-screen bg-slate-950 text-white">
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
                    <Sparkles className="w-3 h-3" />
                    Powered by GPT-4
                </div>
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
                    Land your dream job
                    <span className="block text-indigo-400">
                        with AI on your side.
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto mb-10">
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
            </section>

            {/* Features */}
            <section className="max-w-4xl mx-auto px-6 pb-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {landingFeatures.map(({icon: Icon, title, description}) => (
                        <div
                            key={title}
                            className="p-6 rounded-xl border border-slate-800 bg-slate-900/50"
                        >
                            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                                <Icon className="w-4 h-4 text-indigo-400" />
                            </div>
                            <h3 className="font-semibold text-white mb-1">
                                {title}
                            </h3>
                            <p className="text-sm text-slate-400">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
