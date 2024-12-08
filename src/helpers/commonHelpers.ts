import { IIdName } from '../models/commonModel';
import moment from 'moment';

export const formatDate = (date: string | null | undefined) => {
  return date ? moment(date).format('MMM DD, YYYY') : 'Unknown';
};

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
