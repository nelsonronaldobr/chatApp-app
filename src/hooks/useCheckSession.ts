import { useEffect } from 'react';
import { useAuthStore } from '.';

export const useCheckSession = () => {
    const { renew, ...rest } = useAuthStore();

    useEffect(() => {
        renew();
    }, []);

    return {
        ...rest
    };
};
