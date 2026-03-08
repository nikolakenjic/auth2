import {useAuth} from '@/app/context/AuthContext';
import {Button} from '../ui/button';
import Link from 'next/link';
import {toast} from 'sonner';
import {ArrowRight, LogOut, Sparkles} from 'lucide-react';

export default function Header() {
    const {user, logout} = useAuth();
    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
        } catch (err) {
            console.log('Logout failed', err);
        }
    };

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-7 h-7 rounded-lg bg-indigo-500 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold tracking-tight text-slate-900 dark:text-white">
                    Career<span className="text-indigo-500">Forge</span>
                </span>
            </Link>

            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        {/* Avatar with initials */}
                        <div className="relative group">
                            <div
                                className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 
                      flex items-center justify-center text-white text-xs font-semibold 
                      ring-2 ring-white dark:ring-slate-900 shadow-sm
                      transition-transform group-hover:scale-110 cursor-pointer"
                            >
                                {user.email.charAt(0).toUpperCase()}
                            </div>
                            {/* Online indicator dot */}
                            <span
                                className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-400 rounded-full 
                       ring-1 ring-white dark:ring-slate-900"
                            />
                        </div>

                        {/* Username with subtle label */}
                        <div className="hidden sm:flex flex-col leading-tight">
                            <span className="text-xs text-slate-400 dark:text-slate-500">
                                Signed in as
                            </span>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                {user.email
                                    .split('@')[0]
                                    .charAt(0)
                                    .toUpperCase() +
                                    user.email.split('@')[0].slice(1)}
                            </span>
                        </div>

                        {/* Logout button — subtle destructive style */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleLogout}
                            className="text-slate-500 hover:text-red-500 hover:bg-red-50 
                 dark:hover:bg-red-950/30 transition-colors"
                        >
                            <LogOut className="w-4 h-4 mr-1.5" />
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <Link href="/login">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 
                 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 
                 transition-all duration-200"
                            >
                                Login
                            </Button>
                        </Link>

                        <Link href="/register">
                            <Button
                                size="sm"
                                className="relative bg-indigo-500 hover:bg-indigo-600 text-white 
                 shadow-md shadow-indigo-500/30 hover:shadow-lg hover:shadow-indigo-500/40
                 transition-all duration-200 font-medium"
                            >
                                {/* Subtle shimmer overlay */}
                                <span
                                    className="absolute inset-0 rounded-md bg-gradient-to-r from-white/0 
                       via-white/10 to-white/0 opacity-0 hover:opacity-100 
                       transition-opacity duration-300"
                                />
                                <span className="relative flex items-center gap-1.5">
                                    Get Started
                                    <ArrowRight
                                        className="w-3.5 h-3.5 transition-transform duration-200 
                               group-hover:translate-x-0.5"
                                    />
                                </span>
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
