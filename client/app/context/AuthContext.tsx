'use client'

import { createContext, useContext, useState } from "react";
import {AuthContextType, User} from "@/app/types/auth";
import AuthService from "@/app/services/api-client/auth.service";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);

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
