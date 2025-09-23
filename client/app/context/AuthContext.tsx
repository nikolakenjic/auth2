'use client'

import {createContext, useContext, useEffect, useState} from "react";
import {AuthContextType, User} from "@/app/types/auth";
import AuthService from "@/app/services/api-client/auth.service";
import UserService from "@/app/services/user.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch user on app start
    const refreshUser = async () => {
        try {
            setLoading(true);
            const response = await UserService.getMe()
            setUser(response.user);
        } catch (err) {
            console.error(err);
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        refreshUser()
    }, []);

    // login
    const login = async (credentials: any) => {
        const response = await AuthService.login(credentials);
        setUser(response.user);
        return response.user;
    };

    // register
    const register = async (payload: any) => {
        const response = await AuthService.register(payload);
        setUser(response.user);
        return response.user;
    };

    // logout
    const logout = async () => {
        await AuthService.logout();
        setUser(null);
    };

    // verify email
    const verifyEmail = async (code: string) => {
        return AuthService.verifyEmail(code);
    };

    // forgot password
    const sendPasswordReset = async (payload: { email: string }) => {
        return AuthService.forgotPassword(payload);
    };

    // reset password
    const resetPassword = async (payload: any) => {
        return AuthService.resetPassword(payload);
    };


    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        verifyEmail,
        sendPasswordReset,
        resetPassword,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
