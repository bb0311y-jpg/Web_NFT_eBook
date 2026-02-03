'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    userEmail: string | null;
    login: (email: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Initialize from localStorage on mount
    useEffect(() => {
        const storedEmail = localStorage.getItem('demo_user_email');
        if (storedEmail) {
            setUserEmail(storedEmail);
            setIsLoggedIn(true);
        }
    }, []);

    const login = (email: string) => {
        localStorage.setItem('demo_user_email', email);
        setUserEmail(email);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('demo_user_email');
        setUserEmail(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
