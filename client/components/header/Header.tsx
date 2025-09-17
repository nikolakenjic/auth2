import {useAuth} from "@/app/context/AuthContext";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
    const {user, logout} = useAuth()

    const handleLogout = async () => {
        try{
            await logout()
        } catch(err){
            console.log('Logout failed',err)
        }
    }

    return (
        <header className="w-full flex items-center justify-between px-6 py-4 border-b bg-white dark:bg-gray-900">
            <div className="text-lg font-semibold">MyApp</div>

            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-700 dark:text-gray-300">{user.email ?? user.email}</span>
                        <Button variant="outline" onClick={handleLogout}>Logout</Button>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="inline-block">
                            <Button variant="outline">Login</Button>
                        </Link>
                        <Link href="/register" className="inline-block">
                            <Button>Register</Button>
                        </Link>
                    </div>
                )}
            </div>
        </header>
    )
}