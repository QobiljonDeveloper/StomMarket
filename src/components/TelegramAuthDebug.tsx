import { useEffect } from 'react';

// Ensure TypeScript recognizes window.Telegram and window.eruda
declare global {
    interface Window {
        Telegram?: {
            WebApp: any;
        };
        eruda?: any;
    }
}

export function TelegramAuthDebug() {
    useEffect(() => {
        const isDev = import.meta.env.MODE === 'development';

        // Initialize Eruda for console debugging only in dev mode
        if (isDev && window.eruda) {
            window.eruda.init();
        }

        // Always initialize and configure Telegram WebApp natively
        const tg = window.Telegram?.WebApp;

        if (tg) {
            tg.ready();
            tg.expand();

            // Emit structured debug info to the console invisibly
            if (isDev) {
                const rawInitData = tg.initData;
                const initDataUnsafe = tg.initDataUnsafe;

                console.log('--- Telegram WebApp Debug ---');
                console.log('initData:', rawInitData);
                console.log('initDataUnsafe:', initDataUnsafe);

                const userData = initDataUnsafe?.user;
                if (userData) {
                    console.log('User ID:', userData.id);
                    console.log('First Name:', userData.first_name);
                    console.log('Username:', userData.username);
                    console.log('Language Code:', userData.language_code);
                }
            }
        } else {
            if (isDev) {
                console.log('Telegram WebApp is not natively available. Running in standard browser mode.');
            }
        }

        return () => {
            if (isDev && window.eruda) {
                window.eruda.destroy();
            }
        };
    }, []);

    // Completely hidden from the visual UI flow
    return null;
}
