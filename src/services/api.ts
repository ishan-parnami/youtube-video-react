import axios, { type AxiosError, type AxiosInstance } from 'axios';
import { type ApiResponse, type Video } from '../types/video.types';
import { API_CONFIG, ERROR_MESSAGES } from '../utils/constants';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

interface ApiErrorResponse {
  message?: string;
  statusCode?: number;
}

interface YouTubeVideoResponse {
  kind: string;
  items: {
    kind: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default?: { url: string };
        medium?: { url: string };
        high?: { url: string };
        standard?: { url: string };
        maxres?: { url: string };
      };
      channelTitle: string;
      tags?: string[];
      categoryId: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
    };
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  };
}

const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;
    
    if (!axiosError.response) {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
    
    if (axiosError.response.status >= 500) {
      return ERROR_MESSAGES.GENERIC_ERROR;
    }
    
    return axiosError.response.data?.message || ERROR_MESSAGES.FETCH_FAILED;
  }
  
  return ERROR_MESSAGES.GENERIC_ERROR;
};

const transformYouTubeVideo = (rawVideo: YouTubeVideoResponse): Video => {
  const items = rawVideo.items;
  const snippet = items.snippet;
  const contentDetails = items.contentDetails;
  const statistics = items.statistics;

  const parseDuration = (duration: string): number => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = parseInt(match?.[1] ?? '0') * 3600;
    const minutes = parseInt(match?.[2] ?? '0') * 60;
    const seconds = parseInt(match?.[3] ?? '0');
    return hours + minutes + seconds;
  };

  return {
    _id: items.id,
    videoFile: {
      url: `https://www.youtube.com/watch?v=${items.id}`,
      _id: items.id,
      localPath: items.id,
    },
    thumbnail: {
      url: snippet.thumbnails?.high?.url || snippet.thumbnails?.default?.url || '',
      _id: `thumb_${items.id}`,
      localPath: `thumb_${items.id}`,
    },
    title: snippet.title,
    description: snippet.description,
    duration: parseDuration(contentDetails.duration),
    views: parseInt(String(statistics.viewCount), 10) || 0,
    isPublished: true,
    owner: {
      _id: snippet.channelId,
      username: snippet.channelTitle,
      fullName: snippet.channelTitle,
      avatar: {
        url: `https://i.ytimg.com/cn/${snippet.channelId}/default.jpg`,
        _id: snippet.channelId,
        localPath: snippet.channelId,
      },
    },
    createdAt: snippet.publishedAt,
    updatedAt: snippet.publishedAt,
    __v: 0,
  };
};

interface PaginatedVideoResponse {
  page: number;
  limit: number;
  totalPages: number;
  previousPage: boolean;
  nextPage: boolean;
  totalItems: number;
  currentPageItems: number;
  data: YouTubeVideoResponse[];
}

export const fetchYouTubeVideos = async (): Promise<Video[]> => {
  try {
    const response = await apiClient.get<ApiResponse<PaginatedVideoResponse>>(
      API_CONFIG.ENDPOINTS.YOUTUBE_VIDEOS
    );

    if (!response.data || !response.data.success) {
      throw new Error(ERROR_MESSAGES.FETCH_FAILED);
    }

    const videosData = response.data.data;
    const rawVideos = Array.isArray(videosData?.data) ? videosData.data : [];
    
    return rawVideos.map(transformYouTubeVideo);
  } catch (error) {
    const errorMessage = handleApiError(error);
    throw new Error(errorMessage, { cause: error });
  }
};

export const apiService = {
  getVideos: fetchYouTubeVideos,
};

export default apiService;
