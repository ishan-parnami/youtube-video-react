import { useState, useEffect, useCallback, useRef } from 'react';
import { type Video, type UseVideosReturn } from '../types/video.types';
import { fetchYouTubeVideos } from '../services/api';

const VIDEOS_PER_PAGE = 12;

export const useVideos = (): UseVideosReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  
  const isMountedRef = useRef(true);

  const fetchVideos = useCallback(async (page: number = 1) => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchYouTubeVideos(page, VIDEOS_PER_PAGE);
      
      if (isMountedRef.current) {
        setVideos(data);
        setCurrentPage(page);
        // Estimate total pages (assuming ~157 total items from API)
        setTotalPages(Math.ceil(157 / VIDEOS_PER_PAGE));
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      
      if (isMountedRef.current) {
        setError(errorMessage);
      }
      
      console.error('Error fetching videos:', err);
    } finally {
      if (isMountedRef.current) {
        setLoading(false);
      }
    }
  }, []);

  const refetch = useCallback(async () => {
    await fetchVideos(currentPage);
  }, [fetchVideos, currentPage]);

  const nextPage = useCallback(async () => {
    if (currentPage < totalPages) {
      await fetchVideos(currentPage + 1);
    }
  }, [currentPage, totalPages, fetchVideos]);

  const prevPage = useCallback(async () => {
    if (currentPage > 1) {
      await fetchVideos(currentPage - 1);
    }
  }, [currentPage, fetchVideos]);

  useEffect(() => {
    isMountedRef.current = true;
    
    let cancelled = false;
    
    const loadVideos = async () => {
      if (cancelled) return;
      await fetchVideos(currentPage);
    };
    
    loadVideos();
    
    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, []);

  return {
    videos,
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    nextPage,
    prevPage,
  };
};

export default useVideos;
