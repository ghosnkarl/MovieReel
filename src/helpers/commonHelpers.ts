import { IIdName } from '../models/commonModel';

export const getGenres = (
  genreIds: number[],
  genres: IIdName[] | undefined
) => {
  if (!genres) return '';

  return genreIds
    .map((id) => genres.find((genre) => genre.id === id)?.name)
    .filter(Boolean) // Remove undefined values
    .join(', ');
};
