import {useAuth} from '@/app/context/AuthContext';
import {Button} from '../ui/button';
import Link from 'next/link';
import {toast} from 'sonner';
import {Sparkles} from 'lucide-react';

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
                        <span className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">
                            {user.email}
                        </span>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login">
                            <Button variant="outline" size="sm">
                                Login
                            </Button>
                        </Link>
                        <Link href="/register">
                            <Button
                                size="sm"
                                className="bg-indigo-500 hover:bg-indigo-700 text-white"
                            >
                                Get Started
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
