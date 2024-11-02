export const getBackdropImage = (
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original'
) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}/${path}`
    : '/placeholder.png';
};

export const getLogoImage = (
  path: string | null,
  size: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original'
) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}/${path}`
    : '/placeholder.png';
};

export const getPosterImage = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}/${path}`
    : '/placeholder.png';
};

export const getProfileImage = (
  path: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original'
) => {
  return path
    ? `https://image.tmdb.org/t/p/${size}/${path}`
    : '/placeholder.png';
};
