'use client'

import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import AuthService from '@/app/services/api-client/auth.service';

interface User {
    email: string;
    password: string;
}

interface AuthContextType {
    user: User | null;
    login: (data: any) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

    // when the app started, call backend to see if user still login
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                // To do: Fetch current User
            } catch {
                setUser(null);
            }
        };
    }, []);

    const login = async (data: any) => {
        const res = await AuthService.login(data);
        setUser(res);
    };

    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within a AuthProvider');
    return ctx;
};
