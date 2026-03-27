import { useEffect, useState } from 'react';
import eruda from 'eruda';

// Ensure TypeScript recognizes window.Telegram
declare global {
    interface Window {
        Telegram?: {
            WebApp: any;
        };
    }
}

interface TelegramUser {
    id: number;
    first_name: string;
    username?: string;
    language_code?: string;
}

export function TelegramAuthDebug() {
    const [user, setUser] = useState<TelegramUser | null>(null);

    useEffect(() => {
        // Initialize Eruda for mobile debugging
        eruda.init();

        // Initialize Telegram WebApp
        const tg = window.Telegram?.WebApp;

        if (tg) {
            tg.ready();
            tg.expand();

            const rawInitData = tg.initData;
            const initDataUnsafe = tg.initDataUnsafe;

            console.log('--- Telegram WebApp Debug ---');
            console.log('initData:', rawInitData);
            console.log('initDataUnsafe:', initDataUnsafe);

            const userData = initDataUnsafe?.user;
            if (userData) {
                setUser(userData as TelegramUser);
                console.log('User ID:', userData.id);
                console.log('First Name:', userData.first_name);
                console.log('Username:', userData.username);
                console.log('Language Code:', userData.language_code);
            }
        } else {
            console.log('Telegram WebApp is not natively available. Running in standard browser mode.');
        }

        return () => {
            eruda.destroy();
        };
    }, []);

    return (
        <div className="fixed bottom-0 left-0 right-0 z-100 p-4 bg-slate-100/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgb(0,0,0,0.05)] font-mono text-sm max-h-[40vh] overflow-y-auto">
            <div className="max-w-md mx-auto relative">
                <div className="flex justify-between items-center mb-3">
                    <h2 className="font-bold text-slate-800 text-base">Debug Info</h2>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${user ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-200 text-slate-600 border border-slate-300'
                        }`}>
                        Auth Status: {user ? 'Connected' : 'Not Connected'}
                    </span>
                </div>

                <div className="space-y-2 text-slate-700 bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">User ID</span>
                        <span className="font-medium">{user?.id || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-1">
                        <span className="font-semibold text-slate-500 text-xs uppercase tracking-wider">Name</span>
                        <span className="font-medium">{user?.first_name || 'N/A'}</span>
                    </div>
                </div>

                {!user && (
                    <p className="text-center text-xs text-slate-500 mt-3 flex items-center justify-center gap-1.5 opacity-80">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" /></svg>
                        Open in Telegram Mini App to capture initData.
                    </p>
                )}
            </div>
        </div>
    );
}
