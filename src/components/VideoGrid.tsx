import { useEffect, useRef } from 'react';
import { type Video } from '../types/video.types';
import VideoCard from './VideoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  loadMore: () => void;
  error: string | null;
  onRetry?: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ videos, loading, loadingMore, hasMore, loadMore, error, onRetry }) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const node = sentinelRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && hasMore && !loadingMore && !loading) {
            loadMore();
          }
        });
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );

    obs.observe(node);

    return () => obs.disconnect();
  }, [hasMore, loadMore, loadingMore, loading]);

  if (loading) {
    return (
      <div className="flex-1">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ErrorMessage message={error} onRetry={onRetry} />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg font-medium">No videos found</p>
        <p className="text-sm mt-2">Try refreshing the page</p>
      </div>
    );
  }

  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 px-4 md:px-6 lg:px-8 py-6" role="feed" aria-label="YouTube videos">
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
      {/* sentinel for infinite scroll */}
      <div ref={sentinelRef} />
      {/* bottom loader */}
      {loadingMore && (
        <div className="col-span-full flex items-center justify-center py-6">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
};

export default VideoGrid;
