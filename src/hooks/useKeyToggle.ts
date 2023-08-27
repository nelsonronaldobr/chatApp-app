import { useEffect } from 'react';

export const useKeyAction = (initialKey: string, action: () => void) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === initialKey && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                action();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [action, initialKey]);
};
