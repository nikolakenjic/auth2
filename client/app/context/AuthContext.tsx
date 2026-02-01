"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from "react";
import AuthService from "@/app/services/api-client/auth.service";
import UserService from "@/app/services/user.service";
import type {
    AuthContextType,
    LoginUserData,
    RegisterUserData,
    User,
} from "@/app/types/auth";
import {AxiosError} from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({children}: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);


    const refreshUser = useCallback(async () => {
        setLoading(true);
        try {
            // 1) Try get current user
            const me = await UserService.getMe();
            setUser(me.user);
            return me.user;
        } catch (err) {
            // If it reaches here, the refresh token was likely expired/invalid
            const status = (err as AxiosError)?.response?.status;

            if (status === 401) {
                try {
                    await AuthService.refresh();
                    const me = await UserService.getMe();
                    setUser(me.user);
                    return me.user;
                } catch {
                    setUser(null);
                    return null;
                }
            }

            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Run once on app start
    useEffect(() => {
        void refreshUser();
    }, [refreshUser]);

    // ✅ login
    const login = useCallback(
        async (credentials: LoginUserData) => {
            await AuthService.login(credentials);
            return await refreshUser();
        }, [refreshUser]);

    // ✅ register
    const register = useCallback(
        async (payload: RegisterUserData) => {
            await AuthService.register(payload);
            // Clear cookies so /user/me can't succeed until real login
            await AuthService.logout();
            setUser(null);
            return null;
        }, []);

    // ✅ logout
    const logout = useCallback(
        async () => {
            await AuthService.logout();
            setUser(null);
        }, []);

    // ✅ verify email
    const verifyEmail = useCallback(
        async (code: string) => {
            return AuthService.verifyEmail(code);
        }, []);

    // ✅ resend verification
    const resendVerificationEmail = useCallback(
        async (email: string) => {
            return AuthService.resendVerificationEmail({email});
        }, []);

    // ✅ forgot password
    const sendPasswordReset = useCallback(
        async (payload: { email: string }) => {
            return AuthService.forgotPassword(payload);
        }, []);

    // ✅ reset password
    const resetPasswordChange = useCallback(
        async (payload: any) => {
            return AuthService.resetPassword(payload);
        }, []);

    // ✅ google login/register
    const googleLogin = useCallback(
        async (token: string) => {
            await AuthService.google(token);
            return await refreshUser();
        }, [refreshUser]);

    const value: AuthContextType = useMemo(
        () => ({
            user,
            loading,
            refreshUser,
            login,
            register,
            logout,
            googleLogin,
            verifyEmail,
            resendVerificationEmail,
            sendPasswordReset,
            resetPasswordChange,
        }),
        [
            user,
            loading,
            refreshUser,
            login,
            register,
            logout,
            googleLogin,
            verifyEmail,
            resendVerificationEmail,
            sendPasswordReset,
            resetPasswordChange,
        ]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
