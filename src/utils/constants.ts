export const API_CONFIG = {
  BASE_URL: 'https://api.freeapi.app/api/v1',
  ENDPOINTS: {
    YOUTUBE_VIDEOS: '/public/youtube/videos',
  },
  TIMEOUT: 10000,
} as const;

export const UI_CONFIG = {
  GRID_BREAKPOINTS: {
    MOBILE: 1,
    TABLET: 2,
    DESKTOP: 3,
    LARGE: 4,
  },
  CARD_ASPECT_RATIO: '16/9',
  AVATAR_SIZE: 40,
} as const;

export const ERROR_MESSAGES = {
  FETCH_FAILED: 'Failed to load videos. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  GENERIC_ERROR: 'Something went wrong. Please try again later.',
} as const;

export const LOADING_MESSAGES = {
  FETCHING: 'Loading videos...',
  RETRY: 'Retrying...',
} as const;
