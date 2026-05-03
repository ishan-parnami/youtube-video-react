import { type Video } from '../types/video.types';
import VideoCard from './VideoCard';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';

interface VideoGridProps {
  videos: Video[];
  loading: boolean;
  error: string | null;
  onRetry?: () => void;
}

export const VideoGrid: React.FC<VideoGridProps> = ({ 
  videos, 
  loading, 
  error, 
  onRetry 
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={onRetry} />;
  }

  if (videos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
        <p className="text-lg font-medium">No videos found</p>
        <p className="text-sm mt-2">Try refreshing the page</p>
      </div>
    );
  }

  return (
    <div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8 px-4 md:px-6 lg:px-8 py-6"
      role="feed"
      aria-label="YouTube videos"
    >
      {videos.map((video) => (
        <VideoCard key={video._id} video={video} />
      ))}
    </div>
  );
};

export default VideoGrid;
