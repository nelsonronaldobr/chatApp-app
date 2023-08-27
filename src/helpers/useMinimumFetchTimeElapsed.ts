import { useEffect, useRef, useState } from 'react';

export const useMinimumFetchTimeElapsed = (
    ms: number = 0,
    isLoading: boolean
) => {
    const [hasElapsed, setHasElapsed] = useState<boolean>(true);
    const timeout = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
        if (isLoading) {
            timeout.current && clearTimeout(timeout.current);
            setHasElapsed(false);
            timeout.current = setTimeout(() => {
                setHasElapsed(true);
            }, ms);
        }
    }, [ms, isLoading]);

    useEffect(() => timeout.current && clearTimeout(timeout.current), []);

    return hasElapsed;
};
