import { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
    id: string;
    fullName: string;
    username: string;
    photoUrl?: string;
    language: number;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    setUser: (user: User | null) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<User | null>(() => {
        try {
            const stored = localStorage.getItem('user');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Hard reset if we detect the known bad static ID the user warned about
                if (parsed.id === 'a3f3af69-c22e-4746-8504-a084d03b1a76') {
                    localStorage.removeItem('user');
                    localStorage.removeItem('token');
                    return null;
                }
                return parsed;
            }
            return null;
        } catch {
            return null;
        }
    });

    const [token, setTokenState] = useState<string | null>(() => {
        return localStorage.getItem('token') || null;
    });

    const setUser = (newUser: User | null) => {
        setUserState(newUser);
        if (newUser) {
            localStorage.setItem('user', JSON.stringify(newUser));
        } else {
            localStorage.removeItem('user');
        }
    };

    const setToken = (newToken: string | null) => {
        setTokenState(newToken);
        if (newToken) {
            localStorage.setItem('token', newToken);
        } else {
            localStorage.removeItem('token');
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, setUser, setToken, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
};
