import { useState, useEffect, useCallback, useRef } from 'react';
import { type Video, type UseVideosReturn } from '../types/video.types';
import { fetchYouTubeVideos } from '../services/api';

const VIDEOS_PER_PAGE = 12;

export const useVideos = (): UseVideosReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const isMountedRef = useRef(true);

  const fetchVideos = useCallback(async (page: number = 1, append = false) => {
    if (!isMountedRef.current) return;

    if (append) setLoadingMore(true); else setLoading(true);
    setError(null);

    try {
      const result = await fetchYouTubeVideos(page, VIDEOS_PER_PAGE);

      if (!isMountedRef.current) return;

      if (append) {
        setVideos((prev) => [...prev, ...result.videos]);
      } else {
        setVideos(result.videos);
      }

      setCurrentPage(result.page);
      setHasMore(result.nextPage);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';

      if (isMountedRef.current) {
        setError(errorMessage);
      }

      console.error('Error fetching videos:', err);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
        setLoadingMore(false);
      }
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchVideos(1, false);
  }, [fetchVideos]);

  const loadMore = useCallback(async () => {
    if (!hasMore || loadingMore) return;
    await fetchVideos(currentPage + 1, true);
  }, [currentPage, fetchVideos, hasMore, loadingMore]);

  useEffect(() => {
    isMountedRef.current = true;

    let cancelled = false;

    const loadInitial = async () => {
      if (cancelled) return;
      await fetchVideos(1, false);
    };

    loadInitial();

    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, [fetchVideos]);

  return {
    videos,
    loading,
    loadingMore,
    error,
    refetch,
    hasMore,
    loadMore,
    currentPage,
  };
};

export default useVideos;
