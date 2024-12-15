// Base URL for image requests
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

const buildImageUrl = (
  path: string | null,
  size: string,
  placeholder: string
): string => {
  return path ? `${BASE_IMAGE_URL}${size}${path}` : placeholder;
};

export const getBackdropImage = (
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original'
): string => {
  return buildImageUrl(path, size, '/backdrop_placeholder.jpg');
};

export const getLogoImage = (
  path: string | null,
  size: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original'
): string => {
  return buildImageUrl(path, size, '/placeholder.png');
};

export const getPosterImage = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
): string => {
  return buildImageUrl(path, size, '/placeholder.png');
};

export const getProfileImage = (
  path: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original'
): string => {
  return buildImageUrl(path, size, '/person_placeholder.jpg');
};

export const getAvatarImage = (path: string | null) => {
  return buildImageUrl(path, 'w200', '/person_placeholder.jpg');
};
