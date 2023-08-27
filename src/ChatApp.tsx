import { ThemeProvider } from '@/components/theme-provider';
import { AppRouter } from '@/routes';
import { Toaster } from '@/components/ui/toaster';

export const ChatApp = () => {
    return (
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
            <AppRouter />
            <Toaster />
        </ThemeProvider>
    );
};
