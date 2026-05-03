import { memo } from 'react';
import { type Video } from '../types/video.types';
import { formatDuration, formatViews, formatRelativeTime } from '../utils/formatters';
import { MdVerified } from 'react-icons/md';

interface VideoCardProps {
  video: Video;
}

export const VideoCard: React.FC<VideoCardProps> = memo(({ video }) => {
  const {
    thumbnail,
    title,
    duration,
    owner,
    views,
    createdAt,
  } = video;

  return (
    <article 
      className="group cursor-pointer"
      aria-label={`Video: ${title}`}
    >
      <div className="relative aspect-video mb-3 overflow-hidden rounded-xl bg-gray-200">
        <img
          src={thumbnail.url}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-1 rounded">
          {formatDuration(duration)}
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
      </div>

      <div className="flex gap-3">
        <div className="flex-shrink-0">
          <img
            src={owner.avatar.url}
            alt={owner.fullName}
            className="w-9 h-9 rounded-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">
            {title}
          </h3>

          <div className="flex items-center gap-1 mb-1">
            <p className="text-xs text-gray-600 hover:text-gray-900 transition-colors">
              {owner.fullName}
            </p>
            <MdVerified className="w-3 h-3 text-gray-600" aria-label="Verified channel" />
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-600">
            <span>{formatViews(views)} views</span>
            <span>•</span>
            <span>{formatRelativeTime(createdAt)}</span>
          </div>
        </div>
      </div>
    </article>
  );
});

VideoCard.displayName = 'VideoCard';

export default VideoCard;
