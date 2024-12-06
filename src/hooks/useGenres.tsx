import { useQuery } from '@tanstack/react-query';
import { fetchGenres } from '../services/http';

const useGenres = ({ type }: { type: 'movie' | 'tv' }) =>
  useQuery({
    queryKey: ['genres', type],
    queryFn: () => fetchGenres(type),
    retry: 1,
  });

export default useGenres;
