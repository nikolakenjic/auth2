import React, {createContext, useContext, useState, useEffect, ReactNode} from "react"
import AuthService from "@/app/services/api-client/auth.service";

interface User {
    _id: string
    email: string
}

interface AuthContextType {
    user: User | null
    login: (data: any) => Promise<void>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    // when the app started, call backend to see if user still login
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
            // To do: Fetch current User
            } catch {
                setUser(null);
            }
        }
    }, []);

    const login = async(data: any) => {
        const res = await AuthService.login<{user: User}>(data)
        setUser(res.email)
    }

}