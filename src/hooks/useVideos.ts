import { useState, useEffect, useCallback, useRef } from 'react';
import { type Video, type UseVideosReturn } from '../types/video.types';
import { fetchYouTubeVideos } from '../services/api';

export const useVideos = (): UseVideosReturn => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const isMountedRef = useRef(true);

  const fetchVideos = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchYouTubeVideos();
      
      if (isMountedRef.current) {
        setVideos(data);
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
    await fetchVideos();
  }, [fetchVideos]);

  useEffect(() => {
    isMountedRef.current = true;
    
    let cancelled = false;
    
    const loadVideos = async () => {
      if (cancelled) return;
      await fetchVideos();
    };
    
    loadVideos();
    
    return () => {
      cancelled = true;
      isMountedRef.current = false;
    };
  }, [fetchVideos]);

  return {
    videos,
    loading,
    error,
    refetch,
  };
};

export default useVideos;
