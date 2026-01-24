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
import { AxiosError } from "axios";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    /**
     * ✅ Source of truth: GET /user/me
     * If 401 -> try refresh -> retry /user/me
     */
    const refreshUser = useCallback(async () => {
        try {
            setLoading(true);

            // 1) Try get current user
            const me = await UserService.getMe();
            setUser(me.user);
            return me.user;
        } catch (err) {
            // 2) If unauthorized -> try refresh
            if (err instanceof AxiosError && err.response?.status === 401) {
                try {
                    await AuthService.refresh();
                    const me = await UserService.getMe();
                    setUser(me.user);
                    return me.user;
                } catch (refreshErr) {
                    setUser(null);
                    return null;
                }
            }

            // other errors
            console.error("refreshUser error:", err);
            setUser(null);
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // Run once on app start
    useEffect(() => {
        refreshUser();
    }, [refreshUser]);

    // ✅ login
    const login = useCallback(async (credentials: LoginUserData) => {
        const response = await AuthService.login(credentials);
        setUser(response.user);
        return response.user;
    }, []);

    // ✅ register
    const register = useCallback(async (payload: RegisterUserData) => {
        const response = await AuthService.register(payload);
        setUser(response.user);
        return response.user;
    }, []);

    // ✅ logout
    const logout = useCallback(async () => {
        await AuthService.logout();
        setUser(null);
    }, []);

    // ✅ verify email
    const verifyEmail = useCallback(async (code: string) => {
        return AuthService.verifyEmail(code);
    }, []);

    // ✅ resend verification
    const resendVerificationEmail = useCallback(async (email: string) => {
        return AuthService.resendVerificationEmail({ email });
    }, []);

    // ✅ forgot password
    const sendPasswordReset = useCallback(async (payload: { email: string }) => {
        return AuthService.forgotPassword(payload);
    }, []);

    // ✅ reset password
    const resetPasswordChange = useCallback(async (payload: any) => {
        return AuthService.resetPassword(payload);
    }, []);

    // ✅ google login/register
    const googleLogin = useCallback(async (token: string) => {
        const response = await AuthService.google(token);
        setUser(response.user);
        return response.user;
    }, []);

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
