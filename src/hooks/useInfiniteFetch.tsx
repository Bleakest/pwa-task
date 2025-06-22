import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchData } from '../utils/api';
import type { EntityWithId, Resource } from '../types/types';
import { useLocation } from 'react-router-dom';

export const useInfiniteFetch = <T extends EntityWithId>() => {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const initialFetchRef = useRef(false);

  const fetchMore = useCallback(async () => {
    if (!hasMore || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchData(
        location.pathname as Resource,
        page
      );
      setData(prev => {
        const newItems = response.results.filter(
          newItem => !prev.some(item => item.id === newItem.id)
        );
        return [...prev, ...newItems];
      });
      setPage(prev => prev + 1);
      setHasMore(response.info.next !== null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading, location.pathname]);

  useEffect(() => {
    if (!initialFetchRef.current) {
      initialFetchRef.current = true;
      fetchMore();
    }
  }, [fetchMore]);

  return {
    data,
    isLoading,
    hasMore,
    fetchMore
  };
};