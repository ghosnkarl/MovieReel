const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/';

const url = (
  path: string | null,
  size: string,
  placeholder: string
): string => {
  return path ? `${BASE_IMAGE_URL}${size}${path}` : placeholder;
};

const backdrop = (
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original'
): string => {
  return url(path, size, '/backdrop_placeholder.jpg');
};

const logo = (
  path: string | null,
  size: 'w45' | 'w92' | 'w154' | 'w185' | 'w300' | 'w500' | 'original'
): string => {
  return url(path, size, '/placeholder.png');
};
const poster = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original'
): string => {
  return url(path, size, '/placeholder.png');
};

const profile = (
  path: string | null,
  size: 'w45' | 'w185' | 'h632' | 'original'
): string => {
  return url(path, size, '/person_placeholder.jpg');
};

const avatar = (path: string | null) => {
  return url(path, 'w200', '/person_placeholder.jpg');
};

export const tmdbImage = {
  backdrop,
  logo,
  poster,
  profile,
  avatar,
};
