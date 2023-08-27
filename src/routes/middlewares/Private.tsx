import { useAuthStore } from '@/hooks';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}

export const Private: FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to={'/auth'} replace />
    );
};
