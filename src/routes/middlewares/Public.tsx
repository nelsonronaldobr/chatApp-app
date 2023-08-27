import { useAuthStore } from '@/hooks';
import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface Props {
    children: ReactNode;
}
export const Public: FC<Props> = ({ children }) => {
    const { isAuthenticated } = useAuthStore();

    return !isAuthenticated ? <>{children}</> : <Navigate to={'/'} replace />;
};
