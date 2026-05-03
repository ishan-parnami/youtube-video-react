export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  statusCode: number;
}

export interface VideoOwner {
  _id: string;
  username: string;
  fullName: string;
  avatar: {
    url: string;
    _id: string;
    localPath: string;
  };
}

export interface VideoFile {
  url: string;
  _id: string;
  localPath: string;
}

export interface Video {
  _id: string;
  videoFile: VideoFile;
  thumbnail: VideoFile;
  title: string;
  description: string;
  duration: number; // in seconds
  views: number;
  isPublished: boolean;
  owner: VideoOwner;
  createdAt: string; // ISO 8601 format
  updatedAt: string;
  __v: number;
}

export interface UseVideosReturn {
  videos: Video[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
