// hooks/useInfiniteScroll.ts
import { useEffect } from 'react';

export const useInfiniteScroll = (fetchMore: () => void) => {

    useEffect(() => {
        const handleScroll = () => {
            const threshold = 100;
            if (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - threshold
            ) {
                fetchMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [fetchMore]);
};