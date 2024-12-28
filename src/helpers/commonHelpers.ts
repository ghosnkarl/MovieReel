import { IBaseIdName } from '../models/commonModel';

export const getGenres = (
  genreIds: number[],
  genres: IBaseIdName[] | undefined
) => {
  if (!genres) return '';

  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) // Remove undefined values
    .join(', ');
};
